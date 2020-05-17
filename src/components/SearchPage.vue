<template>
    <div>
        <div class='container' id="search_forms">
            <div class='row middle'>
                <div class="col search_separator_ph">
                    <button v-on:click="showST" class="search_separator" id="st_btn">
                        Фізична особа
                    </button>
                    <button v-on:click="showLE" class="search_separator" id="le_btn">
                        Юридична особа
                    </button>
                    <button v-on:click="showOG" class="search_separator" id="og_btn">
                        Громадська організація
                    </button>
                </div>
            </div>
            <div class='row'>
                <div class="form-group middle" id="sole_trader" hidden>
                    <div class="dropdown">
                        <p>Оберіть поле для пошуку</p>
                        <select v-on:input="enable_button" v-model="selected">
                            <option disabled value="">Оберіть спосіб пошуку</option>
                            <option value="id">Ідентифікатор (ІПН)</option>
                            <option value="name">ПІБ</option>
                        </select>
                    </div>
                    <div class="form-input">
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="query">
                    </div>
                </div>

                <div class="form-group middle" id="legal_entity" hidden>
                    <div class="dropdown">
                        <p>Оберіть поле для пошуку</p>
                        <select v-on:input="enable_button" v-model="selected">
                            <option disabled value="">Оберіть спосіб пошуку</option>
                            <option value="id">Ідентифікатор (ІПН)</option>
                            <option value="fullname">Найменування</option>
                            <option value="name">Скорочене найменування</option>
                        </select>
                    </div>
                    <div class="form-input">
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="query">
                    </div>
                </div>

                <div class="form-group middle" id="organization" hidden>
                    <div class="dropdown">
                        <p>Оберіть поле для пошуку</p>
                        <select v-on:input="enable_button" v-model="selected">
                            <option disabled value="">Оберіть спосіб пошуку</option>
                            <option value="id">Ідентифікатор (ІПН)</option>
                            <option value="fullname">Найменування</option>
                            <option value="name">Скорочене найменування</option>
                        </select>
                    </div>
                    <div class="form-input">
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="query">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="middle">
                    <button v-on:click="search_function" id="search_button" class="btn btn-success" disabled>Пошук</button>
                </div>
            </div>
            <div id='not_found' class="row" hidden>
                <div class="middle">
                    <p class="color_red">Результатів за даним запитом не знайдено</p>
                </div>
            </div>
        </div>
        <div class="container functions" v-if="isRegisrator">
            <h1>Функції реєстратора</h1>
            <button class="button_dist btn btn-outline-success">
                <router-link to="CreateLegalEntity">
                    Створити запис про Юридичну особу
                </router-link>
            </button>
            <button class="button_dist btn btn-outline-success">
                <router-link to="CreateOrganization">
                    Створити запис про Організацію
                </router-link>
            </button>
            <button class="button_dist btn btn-outline-success">
                <router-link to="CreateSoleTrader">
                    Створити запис про Фізичну особу підприємця
                </router-link>
            </button>
        </div>
        <div class="container functions" v-if="isAdmin">
            <h1>Функції адміністратора</h1>
            <button class="button_dist btn btn-outline-success">
                <router-link to="AddRegistrator">
                    Створити реєстратора
                </router-link>
            </button>
            <button class="button_dist btn btn-outline-success">
                <router-link to="Journal">
                    Переглянути журнал змін реєстру
                </router-link>
            </button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../router/index.js'

    export default {
        name: 'searchpage',
        data() {
            return {
                type: '',
                data: '',
                selected: '',
                query: '',
                results_div: document.getElementById('results'),
                search_form: document.getElementById('search_forms'),
                st_form: document.getElementById('sole_trader'),
                le_form: document.getElementById('legal_entity'),
                org_form: document.getElementById('organization'),
                st_btn: document.getElementById('st_btn'),
                le_btn: document.getElementById('st_btn'),
                org_btn: document.getElementById('og_btn'),
            }
        },
        computed: {
            isRegisrator: () => {
                return localStorage.getItem('userrole') == 'registrant'
            },
            isAdmin: () => {
                return localStorage.getItem('userrole') == 'admin'
            }
        },
        mounted() {
            this.results_div = document.getElementById('results'),
                this.search_form = document.getElementById('search_forms'),
                this.st_form = document.getElementById('sole_trader'),
                this.le_form = document.getElementById('legal_entity'),
                this.org_form = document.getElementById('organization'),
                this.st_btn = document.getElementById('st_btn'),
                this.le_btn = document.getElementById('le_btn'),
                this.org_btn = document.getElementById('og_btn')
        },
        methods: {
            showST: function () {
                this.type = 'SoleTrader'
                this.st_btn.classList.add('active')
                this.le_btn.classList.remove('active')
                this.org_btn.classList.remove('active')
                this.st_form.removeAttribute('hidden')
                this.le_form.setAttribute('hidden', true)
                this.org_form.setAttribute('hidden', true)
            },
            showLE: function () {
                this.type = 'LegalEntity'
                this.st_btn.classList.remove('active')
                this.le_btn.classList.add('active')
                this.org_btn.classList.remove('active')
                this.st_form.setAttribute('hidden', true)
                this.le_form.removeAttribute('hidden')
                this.org_form.setAttribute('hidden', true)
            },
            showOG: function () {
                this.type = 'Organization'
                this.st_btn.classList.remove('active')
                this.le_btn.classList.remove('active')
                this.org_btn.classList.add('active')
                this.st_form.setAttribute('hidden', true)
                this.le_form.setAttribute('hidden', true)
                this.org_form.removeAttribute('hidden')
            },
            search_function: function () {
                var querystring = 'https://nationalregistry.azurewebsites.net/api/'
                if (this.type == 'Organization') {
                    querystring = querystring.concat('organization/')
                }
                if (this.type == 'LegalEntity') {
                    querystring = querystring.concat('legalentity/')
                }
                if (this.type == 'SoleTrader') {
                    querystring = querystring.concat('soletrader/')
                }
                if (this.selected == 'name' || this.selected == 'fullname') {
                    querystring = querystring.concat(this.selected, '?', this.selected, '=', this.query)
                } else {
                    querystring = querystring.concat(this.query)
                }
                axios.get(querystring)
                    .then(response => {
                        if (response.status == 200) {
                            this.data = response.data
                            console.log('type: ')
                            console.log(this.data[0])
                            router.push({ name: 'search-results', params: { 'type': this.type, 'data': this.data[0] != undefined ? this.data : [this.data] } })
                        }
                    })
                    .catch(error => {
                        if (error.response.status == 404) {
                            console.log('err 404')
                            document.getElementById('not_found').removeAttribute('hidden')
                        }
                    })

                console.log(this.data)

            },
            enable_button: () => {
                document.getElementById('search_button').removeAttribute('disabled')
            }
        }
    }
</script>


<style>
    .search_separator_ph {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-content: center;
    }

    .middle {
        width: 60%;
        margin: auto;
        margin-top: 40px;
        text-align: center;
        align-self: center;
    }

    .search_separator {
        border: 1px solid grey;
        border-radius: 5px;
        margin: 2px;
        padding: 4px;
    }

    .search_separator.active {
        background-color: rgb(27, 155, 27);
        box-shadow: -2px -2px 2px 2px;
    }

    .dropdown {
        margin-bottom: 30px;
        color: black;
    }

    .functions {
        margin-top: 50px;
    }

    .button_dist {
        margin: 10px;
    }

    .color_red {
        color: red;
        border: 1px solid red;
        padding: 10px;
    }

    .f_data {
        border: 1px solid grey;
        border-radius: 3px;
        padding: 5px;
    }
</style>