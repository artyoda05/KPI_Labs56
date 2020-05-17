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
    import router from '../router'

    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            debug: function () {
                axios.post('https://nationalregistry.azurewebsites.net/api/user/token', {
                    "login": this.username,
                    "password": this.password
                })
                .then(response => {
                    console.log(response)
                    if(response.data.access_token) {
                        localStorage.setItem('usertoken', response.data.access_token)
                        localStorage.setItem('userrole', response.data.roles[0])
                        router.push('/SearchPage')
                        location.reload()
                    }
                    else {
                        console.log('404 user')
                    }
                })
            }
        },
    }
</script>