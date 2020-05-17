<template>
    <div class="results" id="st_search_results">
        <div class="container">
            <h1>Редагування</h1>
            <h2>Фізична особа підприємець</h2>
            <h3>{{SoleTrader.fullName}}</h3>
            <div class="row">
                <div class="col-3 entity-data">Повне ім'я</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="fullname">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Паспортні дані</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="passportData">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Місце проживання</div>
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
                <div class="col-9 entity-data">{{SoleTrader.registerDate}}</div>
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
        name: 'soletrader',
        data() {
            return {
                SoleTrader: 0,
                id: 0,
                fullname: '',
                region: '',
                settlement: '',
                district: '',
                street: '',
                building: '',
                activity: '',
                activity_decription: '',
                contacts: '',
                passportData: ''
            }
        },
        created() {
            var url = 'https://nationalregistry.azurewebsites.net/api/soletrader/'.concat(this.$route.params.id)
            axios.get(url)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                        this.SoleTrader = response.data
                        this.fullname = response.data.fullName
                        this.passportData = response.data.passportData
                        this.region = response.data.location.region
                        this.settlement = response.data.location.settlement
                        this.district = response.data.location.district
                        this.street = response.data.location.street
                        this.building = response.data.location.building
                        this.activity = response.data.activity.type
                        this.activity_decription = response.data.activity.description
                        this.contacts = response.data.contacts
                    }
                })
        },
        methods: {
            saveChanges: function () {
                axios.put('https://nationalregistry.azurewebsites.net/api/soletrader', {
                    "id": this.SoleTrader.id,
                    "fullName": this.fullname,
                    "passportData": this.passportData,
                    "location": {
                        "region": this.region,
                        "settlement": this.settlement,
                        "district": this.district,
                        "street": this.street,
                        "building": this.building
                    },
                    "activity": {
                        "type": this.activity,
                        "description": this.activity_decription
                    },
                    "registerDate": this.SoleTrader.registerDate,
                    "contacts": this.contacts
                }, {
                        headers: {
                            'Authorization': 'Bearer '.concat(localStorage.getItem('usertoken'))
                        }
                    }
                ).then(response => {
                    console.log(response)
                    var id = this.SoleTrader.id
                    router.push('/SoleTrader/'.concat(id))
                })
            },
            debug: function () {
                console.log(this.data)
            }
        },
        mounted() {

        }
    }
</script>