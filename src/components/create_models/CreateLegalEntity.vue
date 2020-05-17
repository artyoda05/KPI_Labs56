<template>
    <div class="results" id="le_search_results">
        <div class="container">
            <h1>Додати юридичну особу</h1>
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
                <div class="col-3 entity-data">Підприємницька діяльність</div>
                <div class="col-9 entity-data">
                    <input type="checkbox" v-model="enterpreneurialActivity">
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
                    <input type="string" v-model="activity">
                    <input type="string" v-model="activity_decription">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Контакти</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="contacts">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Засновники</div>
                <div class="col-9 entity-data">
                    <div class="container">
                        <div class="row">
                            <div class="col-3">Ім'я</div>
                            <div class="col-3">Призвіще</div>
                            <div class="col-3">Пасспортні дані</div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <input type="text" v-model="addName">
                            </div>
                            <div class="col-3">
                                <input type="text" v-model="addSurname">
                            </div>
                            <div class="col-3">
                                <input type="text" v-model="addPassport">
                            </div>
                            <div class="col-3">
                                <button v-on:click="addFounder" class="btn btn-outline-success">Додати</button>
                            </div>
                        </div>
                        <div class="row" v-for="(founder, index) in founders_array" :key="index">
                            <div class="col-3">
                                {{founder.firstName}}
                            </div>
                            <div class="col-3">
                                {{founder.lastName}}
                            </div>
                            <div class="col-3">
                                <button class="btn btn-outline-danger" v-on:click="deleteFounder(index)"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_edit">
            <button class='btn btn-success' v-on:click="saveChanges">Додати</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../../router'
    export default {
        name: 'createlegalentity',
        data() {
            return {
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
        methods: {
            saveChanges: function () {
                axios.post('https://nationalregistry.azurewebsites.net/api/legalentity', {
                    "name": this.shortName,
                    "enterpreneurialActivity": this.enterpreneurialActivity,
                    "fullname": this.fullname,
                    "location": {
                        "region": this.region,
                        "settlement": this.settlement,
                        "district": this.district,
                        "street": this.street,
                        "building": this.building
                    },
                    "registerDate": Date.now().toString(),
                    "founders": this.founders_array,
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
                    .then(response => {
                        console.log(response)
                        var id = response.data
                        router.push('/LegalEntity/'.concat(id))
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