<template>
    <div class="container">
        <div class="container desc">
            <h1>Журнал подій реєстру</h1>
            <div class="row">
                <div class="col-3 structured text-center">ID</div>
                <div class="col-3 structured text-center">
                    Invoker login
                </div>
                <div class="col-3 structured text-center">Type</div>
                <div class="col-3 structured text-center">Time</div>
            </div>
        </div>
        <div v-for="(log, index) in logs" :key="index" class="row">
            <div class="container">
                <div class="row">
                    <div class="col-3 structured text-center">{{log.id}}</div>
                    <div class="col-3 structured text-center">
                        <span v-if="log.creator">{{log.creator.login}}</span>
                    </div>
                    <div class="col-3 structured text-center">{{log.type}}</div>
                    <div class="col-3 structured text-center">{{log.time}}</div>
                </div>
                <div class="row raw">
                    <div class="col-12 text-center">
                        {{log.description}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'login',
        data() {
            return {
                logs: 0
            }
        },
        beforeCreate() {
            axios.get("https://nationalregistry.azurewebsites.net/api/log", {
                headers: {
                    'Authorization': 'Bearer '.concat(localStorage.getItem('usertoken'))
                }
            }).then(response => {
                console.log(response.data)
                this.logs = response.data
            })
        },
    }
</script>

<style>
    .desc {
        margin-top: 50px;
        margin-bottom: 10px;
    }

    .structured {
        border: 1px grey solid;
        padding: 2px;
        background-color: rgba(255, 255, 255, 0.521);
        width: 25%;
    }

    .raw {
        border: 1px rgb(133, 114, 114) solid;
        padding: 2px;
        background-color: rgba(59, 59, 59, 0.521)
    }
</style>