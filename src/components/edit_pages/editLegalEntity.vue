<template>
    <div class="results" id="le_search_results">
        <div class="container">
            <div class="row">
                <div class="col-3 entity-data">Назва</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="shortName">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Повна назва</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="fullname">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Місцезнаходження</div>
                <div class="col-9 entity-data">
                    <div class="container">
                        <div class="row">
                            <div class="col-2">
                                <label for="region">Регіон</label>
                            </div>
                            <div class="col-10">
                                <input type="string" v-model="region">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <label for="region">Поселення</label>
                            </div>
                            <div class="col-10">
                                <input type="string" v-model="settlement">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <label for="region">Район</label>
                            </div>
                            <div class="col-10">
                                <input type="string" v-model="district">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <label for="region">Вулиця</label>
                            </div>
                            <div class="col-10">
                                <input type="string" v-model="street">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <label for="region">Будинок</label>
                            </div>
                            <div class="col-10">
                                <input type="string" v-model="building">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Тип діяльності</div>
                <div class="col-9 entity-data">
                    <div class="row">
                        <div class="col-2">
                            <label for="region"></label>
                        </div>
                        <div class="col-10">
                            <input type="string" v-model="activity">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <label for="region">Опис :</label>
                        </div>
                        <div class="col-10">
                            <textarea type="text" v-model="activity_decription"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Контакти</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="contacts">
                </div>
            </div>
        </div>
        <div class="btn_edit">
            <button class='btn btn-success' v-on:click="saveChanges">Зберегти</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../../router'
    export default {
        name: 'legalentity',
        data() {
            return {
                LegalEntity: 0,
                id: 0,
                fullname: '',
                shortName: '',
                ruleform: '',
                enterpreneurialActivity: false,
                region: '',
                settlement: '',
                district: '',
                street: '',
                building: '',
                activity: '',
                activity_decription: '',
                contacts: '',
                founders_array: [],
                addName: '',
                addPassport: '',
                addSurname: ''
            }
        },
        created() {
            var url = 'https://nationalregistry.azurewebsites.net/api/legalentity/'.concat(this.$route.params.id)
            axios.get(url)
                .then(response => {
                    if (response.status === 200) {
                        // console.log(response.data)
                        this.LegalEntity = response.data
                        this.fullname = response.data.fullname
                        this.shortName = response.data.name
                        this.region = response.data.location.region
                        this.settlement = response.data.location.settlement
                        this.district = response.data.location.district
                        this.street = response.data.location.street
                        this.building = response.data.location.building
                        this.activity = response.data.activity.type
                        this.activity_decription = response.data.activity.description
                        this.contacts = response.data.contacts
                        this.founders_array = response.data.founders
                    }
                })
        },
        // beforeCreated() {
        //     console.log('heloo')
        //     axios.get('https://nationalregistry.azurewebsites.net/api/legalentity/'.concat(this.$route.query.id))
        //         .then(response => {
        //             console.log(response.data)

        //         })
        // },
        methods: {
            saveChanges: function () {
                axios.put('https://nationalregistry.azurewebsites.net/api/legalentity', {
                    "id": this.LegalEntity.id,
                    "name": this.shortName,
                    "fullname": this.fullname,
                    "location": {
                        "region": this.region,
                        "settlement": this.settlement,
                        "district": this.district,
                        "street": this.street,
                        "building": this.building
                    },
                    "contacts": this.contacts,
                    "activity": {
                        "type": this.activity,
                        "description": this.activity_decription
                    }
                }, {
                        headers: {
                            'Authorization': 'Bearer '.concat(localStorage.getItem('usertoken'))
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        var id = this.LegalEntity.id
                        router.push('/LegalEntity/'.concat(id))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            debug: function () {
                console.log(this.data)
            },
            addFounder: function () {
                console.log(this)
                this.founders_array.push({
                    "firstName": this.addName,
                    "lastName": this.addSurname,
                    "passportData": this.addPassport
                })
            },
            deleteFounder: function (index) {
                this.founders_array.splice(index, 1)
            }
        }
    }
</script>