<template>
    <div class="results">
        <div class="container add">
            <h1>Додавання нового реєстратора</h1>
            <div class="row">
                <div class="col-3 entity-data">Повне ім'я</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="fullname">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Логін</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="login">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Пароль</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="password">
                </div>
            </div>
            <div class="row">
                <div class="col-3 entity-data">Пошта</div>
                <div class="col-9 entity-data">
                    <input type="string" v-model="email">
                </div>
            </div>
        </div>
        <div class="button">
            <button class="btn btn-success" v-on:click="saveChanges">Додати</button>
        </div>
    </div>
</template>

<style>
    .button {
        margin-top:30px;
        margin-left:200px;
    }

    .add {
        width: 60%;
    }
</style>

<script>
    import axios from 'axios'
    import router from '../router'
    export default {
        name: 'soletrader',
        data() {
            return {
                login: '',
                fullname: '',
                password: '',
                role: '',
                email: ''
            }
        },
        methods: {
            saveChanges: function () {
                axios.post('https://nationalregistry.azurewebsites.net/api/user/register', {
                    "fullname": this.fullname,
                    "login": this.login,
                    "password": this.password,
                    "email": this.email,
                    "role": ''
                }, {
                    headers: {
                        'Authorization': 'Bearer '.concat(localStorage.getItem('usertoken'))
                    }
                }).then(response => {
                    console.log(response)
                    router.push('/SearchPage')
                }).catch(error => {
                    console.log(error)
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
