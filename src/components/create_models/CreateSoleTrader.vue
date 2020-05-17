<template>
    <div class="results" id="st_search_results">
        <div class="container">
            <h1>Додати фізичну особу підприємця</h1>
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
            <!-- <div class="row">
                <div class="col-3 entity-data">Дата реєстрації</div>
                <div class="col-9 entity-data">{{soletrader.registerDate}}</div>
            </div> -->
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
        name: 'createsoletrader',
        data() {
            return {
                SoleTrader: 0,
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
        methods: {
            saveChanges: function () {
                axios.post('https://nationalregistry.azurewebsites.net/api/soletrader', {
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
                    "registerDate": Date.now().toString(),
                    "contacts": this.contacts
                }, {
                        headers: {
                            'Authorization': 'Bearer '.concat(localStorage.getItem('usertoken'))
                        }
                    }
                ).then(response => {
                    console.log(response)
                    var id = response.data
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