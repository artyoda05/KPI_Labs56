<template>
    <div v-if="SoleTraderArray" class="container">
        <div class="row">
            <div class="col-4">Ім'я</div>
            <div class="col-8">Тип діяльності</div>
        </div>
        <div class="row f_data" v-for="(soletrader, index) in SoleTraderArray" :key="index">
            <div class="col-4">
                <router-link :to="{name: 'soletrader', params: {id: soletrader.id}}">
                    {{soletrader.fullName}}
                </router-link>
            </div>
            <div class="col-8">
                <router-link :to="{name: 'soletrader', params: {id: soletrader.id}}">
                    {{soletrader.activity.type}}: {{soletrader.activity.description}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'soletrader',
        data() {
            return {
                SoleTraderArray: 0
            }
        },
        props: {
            SoleTraderArr: Array
        },
        beforeMount() {
            this.SoleTraderArray = this.SoleTraderArr
        }
    }
</script>