<template>
    <div class="results" id="le_search_results">
        <div class="container">
            <h1>Юридична особа</h1>
            <h2>{{LegalEntity.name}}</h2>
            <div class="row">
                <div class="col-3 entity-data">Назва</div>
                <div class="col-9 entity-data">{{LegalEntity.name}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Повна назва</div>
                <div class="col-9 entity-data">{{LegalEntity.fullname}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Підприємницька діяльність</div>
                <div v-if="LegalEntity.enterpreneurialActivity" class="col-9 entity-data">Так</div>
                <div v-else class="col-9 entity-data">Ні</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Місцезнаходження</div>
                <div v-if="LegalEntity.location" class="col-9 entity-data">
                    <span v-if="LegalEntity.location.region">
                        {{LegalEntity.location.region}},
                    </span>
                    <span v-if="LegalEntity.location.settlement">
                        {{LegalEntity.location.settlement}},
                    </span>
                    <span v-if="LegalEntity.location.district">
                        {{LegalEntity.location.district}},
                    </span>
                    <span v-if="LegalEntity.location.street">
                        {{LegalEntity.location.street}},
                    </span>
                    <span v-if="LegalEntity.location.building">
                        {{LegalEntity.location.building}}
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Тип діяльності</div>
                <div v-if="LegalEntity.activity" class="col-9 entity-data">{{LegalEntity.activity.type}}: {{LegalEntity.activity.description}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Контакти</div>
                <div class="col-9 entity-data">{{LegalEntity.contacts}}</div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Засновники</div>
                <div class="col-9 entity-data">
                    <span v-for="(founder, index) in LegalEntity.founders" :key="index">{{founder.firstName}} {{founder.lastName}}
                        <br>
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Дата реєстрації</div>
                <div class="col-9 entity-data">{{LegalEntity.registerDate}}</div>
            </div>
        </div>
        <div class="btn_edit">
            <div v-if="isRegistrator" class='btn btn-success button_func'>
                <router-link :to="{name: 'legalentityedit', params: {id: LegalEntity.id}}">Редагувати</router-link>
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
        name: 'legalentity',
        data() {
            return {
                LegalEntity: 0
            }
        },
        computed: {
            isRegistrator: () => {
                return localStorage.getItem('userrole') == 'registrant'
            }
        },
        beforeCreate() {
            console.log('hello')
            console.log(this.$route.params.id)
            axios.get('https://nationalregistry.azurewebsites.net/api/legalentity/'.concat(this.$route.params.id))
                .then(response => {
                    console.log(response.data)
                    this.LegalEntity = response.data
                })
                .catch(error => {
                    console.log(error)
                    router.push('/NotFound')
                })
        },
        methods: {
            delete_func: function () {
                axios.delete('https://nationalregistry.azurewebsites.net/api/legalentity/'.concat(this.$route.params.id))
                    .then(response => {
                        console.log(response.data)
                        router.push('/SearchPage')
                    })
            }
        }
    }
</script>