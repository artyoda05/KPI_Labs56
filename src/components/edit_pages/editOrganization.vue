<template>
    <div class="results" id="or_search_results">
        <div>
            <div class="container">
                <h1>Редагування</h1>
                <h2>Організація</h2>
                <h3>{{Organization.name}}</h3>
                <div class="row">
                    <div class="col-3 entity-data">Назва</div>
                    <div class="col-9 entity-data">
                        <input type="string" v-model="shortName">
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Повне найменування</div>
                    <div class="col-9 entity-data">
                        <input type="string" v-model="fullname">
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Тип керування</div>
                    <div class="col-9 entity-data">
                        <input type="string" v-model="ruleForm">
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
                <div class="row">
                    <div class="col-3 entity-data">Дата реєстрації</div>
                    <div class="col-9 entity-data">{{Organization.registerDate}}</div>
                </div>
            </div>

        </div>
        <div class="btn_edit">
            <button class='btn btn-success' v-on:click="saveChanges">Зберегти</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import router from "../../router"

    export default {
        name: 'organization',
        data() {
            return {
                Organization: 0,
                id: 0,
                fullname: '',
                shortName: '',
                ruleForm: '',
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
                addSurname: '',
                addPassport: ''
            }
        },
        created() {
            var url = 'https://nationalregistry.azurewebsites.net/api/organization/'.concat(this.$route.params.id)
            axios.get(url)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                        this.Organization = response.data
                        this.fullname = response.data.fullname
                        this.ruleForm = response.data.ruleForm
                        this.shortName = response.data.shortName
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
        methods: {
            saveChanges: function () {
                console.log(this.founders_array)
                console.log()
                this.founders_array = Array.from(this.founders_array)
                var org_obj = {
                    "id": this.Organization.id,
                    "shortName": this.shortName,
                    "ruleForm": this.ruleForm,
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
                        "description": this.activity_decription,
                        "type": this.activity
                    }
                }
                console.log(org_obj)
                axios.put('https://nationalregistry.azurewebsites.net/api/organization', org_obj
                    , {
                        headers: {
                            'Authorization': 'Bearer '.concat(localStorage.getItem('usertoken'))
                        }
                    })
                    .then(response => {
                        console.log(response)
                        var id = this.Organization.id
                        router.push('/Organization/'.concat(id))
                    })
            },
            debug: function () {
                console.log(this.data)
            },
            addFounder: function () {
                this.founders_array.push({
                    "firstName": this.addName,
                    "lastName": this.addSurname,
                    "passportData": this.addPassport
                })
            },
            deleteFounder: function (index) {
                this.founders_array.splice(index, 1)
            }
        },
    }
</script>