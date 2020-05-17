<template>
    <div class="results" id="st_search_results">
        <div class="container">
            <h1>Фізична особа підприємець</h1>
            <h2>{{SoleTrader.fullName}}</h2>
            <div class="row">
                <div class="col-3 entity-data">ПІБ</div>
                <div class="col-9 entity-data">{{SoleTrader.fullName}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Паспортні дані</div>
                <div class="col-9 entity-data">{{SoleTrader.passportData}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Місце проживання</div>
                <div v-if="SoleTrader.location" class="col-9 entity-data">
                    <span v-if="SoleTrader.location.region">
                        {{SoleTrader.location.region}},
                    </span>
                    <span v-if="SoleTrader.location.settlement">
                        {{SoleTrader.location.settlement}},
                    </span>
                    <span v-if="SoleTrader.location.district">
                        {{SoleTrader.location.district}},
                    </span>
                    <span v-if="SoleTrader.location.street">
                        {{SoleTrader.location.street}},
                    </span>
                    <span v-if="SoleTrader.location.building">
                        {{SoleTrader.location.building}}
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Тип діяльності</div>
                <div v-if="SoleTrader.activity" class="col-9 entity-data">{{SoleTrader.activity.type}}: {{SoleTrader.activity.description}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Контакти</div>
                <div class="col-9 entity-data">{{SoleTrader.contacts}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Дата реєстрації</div>
                <div class="col-9 entity-data">{{SoleTrader.registerDate}}</div>
            </div>
        </div>
        <div class="btn_edit">
            <div v-if="isRegistrator" class='btn btn-success button_func'>
                <router-link :to="{name: 'soletraderedit', params: {id: SoleTrader.id}}">Редагувати</router-link>
            </div>
            <button v-on:click="delete_func" v-if="isRegistrator" class="btn btn-danger button_func">
                Архівувати
            </button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from "../router"

    export default {
        name: 'soletrader',
        data() {
            return {
                SoleTrader: 0
            }
        },
        computed: {
            isRegistrator: () => {
                return localStorage.getItem('userrole') == 'registrant'
            }
        },
        beforeCreate() {
            console.log('getting')
            console.log(this.$route.params.id)
            axios.get('https://nationalregistry.azurewebsites.net/api/soletrader/'.concat(this.$route.params.id))
                .then(response => {
                    console.log(response.data)
                    this.SoleTrader = response.data
                })
                .catch(error => {
                    console.log(error)
                    router.push('/NotFound')
                })
        },
        methods: {
            delete_func: function () {
                axios.delete('https://nationalregistry.azurewebsites.net/api/soletrader/'.concat(this.$route.params.id), {
                        headers: {
                            'Authorization': 'Bearer '.concat(localStorage.getItem('usertoken'))
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        router.push('/SearchPage')
                    })
            }
        }
    }
</script>