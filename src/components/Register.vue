<template>
    <div>
        <div class='container center'>
            <div class="row">
                <div class="col-12">
                    <h1>Вхід для реєстратора</h1>
                </div>
            </div>
            <div class="form">
                <div class='row'>
                    <div class="col-12">
                        <!-- search -->Логін
                    </div>
                </div>
                <div class='row'>
                    <div class="col-12">
                        <input type="text" v-model="username">
                    </div>
                </div>
                <div class='row'>
                        <div class="col-12">
                            <!-- search -->ПІБ
                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-12">
                            <input type="text" v-model="fullname">
                        </div>
                    </div>
                <div class='row'>
                    <div class="col-12">
                        <!-- search -->Пароль
                    </div>
                </div>
                <div class='row'>
                    <div class="col-12">
                        <input type="password" v-model="password">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 button_go">
                    <button class="btn btn-outline-secondary" v-on:click="debug">
                        Вхід
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .center {
        margin-top: 75px;
        text-align: center;
    }

    .form {
        margin-top: 25px;
    }

    .button_go {
        margin-top: 25px;
    }
</style>

<script>
    import axios from 'axios'

    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                fullname: '',
                email: ''
            }
        },
        methods: {
            debug: function () {
                console.log('debug')
                config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
                axios.post('https://nationalregistry.azurewebsites.net/api/user/register', {
                    "id": 0, // ?????
                    "fullname": this.fullname,
                    "login": this.login,
                    "password": this.password,
                    "email": this.email,
                    "role": 'registrator'
                }, config)
                    .then(response => {
                        
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
    }
</script>