<template>
    <div v-if="OrganizationArray" class="container">
        <div class="row">
            <div class="col-4">Назва</div>
            <div class="col-8">Тип діяльності</div>
        </div>
        <div class="row f_data" v-for="(organization, index) in OrganizationArray" :key="index">
            <div class="col-4">
                <router-link :to="{name: 'organization', params: {id: organization.id}}">
                    {{organization.shortName}}
                </router-link>
            </div>
            <div class="col-8">
                <router-link :to="{name: 'organization', params: {id: organization.id}}">
                    {{organization.activity.type}}: {{organization.activity.description}}
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'organizationsearch',
        data() {
            return {
                OrganizationArray: 0
            }
        },
        props: {
            OrganizationArr: Array
        },
        beforeMount() {
            this.OrganizationArray = this.OrganizationArr
        }
    }
</script>