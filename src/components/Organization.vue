<template>
    <div class="results" id="or_search_results">
        <div>
            <div class="container">
                <h1>Організація</h1>
                <h2>{{Organization.shortName}}</h2>
                <div class="row">
                    <div class="col-3 entity-data">Назва</div>
                    <div class="col-9 entity-data">{{Organization.shortName}}</div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Повне найменування</div>
                    <div class="col-9 entity-data">{{Organization.fullname}}</div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Організаційно правова форма</div>
                    <div class="col-9 entity-data">{{Organization.ruleForm}}</div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Підприємницька діяльність</div>
                    <div v-if="Organization.enterpreneurialActivity" class="col-9 entity-data">Так</div>
                    <div v-else class="col-9 entity-data">Ні</div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Місцезнаходження</div>
                    <div v-if="Organization.location" class="col-9 entity-data">
                        <span v-if="Organization.location.region">
                            {{Organization.location.region}},
                        </span>
                        <span v-if="Organization.location.settlement">
                            {{Organization.location.settlement}},
                        </span>
                        <span v-if="Organization.location.district">
                            {{Organization.location.district}},
                        </span>
                        <span v-if="Organization.location.street">
                            {{Organization.location.street}},
                        </span>
                        <span v-if="Organization.location.building">
                            {{Organization.location.building}}
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Тип діяльності</div>
                    <div v-if="Organization.activity" class="col-9 entity-data">{{Organization.activity.type}}: {{Organization.activity.description}}</div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Контакти</div>
                    <div class="col-9 entity-data">{{Organization.contacts}}</div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Засновники</div>
                    <div class="col-9 entity-data">
                        <span v-for="(founder, index) in Organization.founders" :key="index">{{founder.firstName}} {{founder.lastName}}
                            <br>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 entity-data">Дата реєстрації</div>
                    <div class="col-9 entity-data">{{Organization.registerDate}}</div>
                </div>
            </div>
        </div>
        <div class="btn_edit">
            <div v-if="isRegistrator" class='btn btn-success button_func'>
                <router-link :to="{name: 'organizationedit', params: {id: Organization.id}}">Редагувати</router-link>
            </div>
            <button v-on:click="delete_func" v-if="isRegistrator" class="btn btn-danger button_func">
                Архівувати
            </button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import router from "../router"

    export default {
        name: 'organization',
        data() {
            return {
                Organization: 0
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
            axios.get('https://nationalregistry.azurewebsites.net/api/organization/'.concat(this.$route.params.id))
                .then(response => {
                    console.log(response.data)
                    this.Organization = response.data
                })
                .catch(error => {
                    console.log(error)
                    router.push('/NotFound')
                })
        },
        methods: {
            delete_func: function() {
                axios.delete('https://nationalregistry.azurewebsites.net/api/organization/'.concat(this.$route.params.id))
                .then(response => {
                    console.log(response.data)
                    router.push('/SearchPage')
                })
            }
        }
    }
</script>