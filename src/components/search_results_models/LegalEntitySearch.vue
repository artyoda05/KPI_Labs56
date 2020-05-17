<template>
    <div v-if="LegalEnitiyArray" class="container">
        <div class="row">
            <div class="col-4">Назва</div>
            <div class="col-8">Тип діяльності</div>
        </div>
        <div class="row f_data" v-for="(legalentity, index) in LegalEnitiyArray" :key="index">
            <div class="col-4 ">
                <router-link :to="{name: 'legalentity', query: {id: legalentity.id}}">
                    {{legalentity.name}}
                </router-link>
            </div>
            <div class="col-8 ">
                <router-link :to="{name: 'legalentity', params: {id: legalentity.id}}">
                    {{legalentity.activity.type}}: {{legalentity.activity.description}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'legalentity',
        data() {
            return {
                LegalEnitiyArray: 0
            }
        },
        props: {
            LegalEnitiyArr: Array
        },
        beforeMount() {
            this.LegalEnitiyArray = this.LegalEnitiyArr
            console.log(this.LegalEnitiyArray)
        },
    }
</script>