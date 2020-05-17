<template>
    <div class="results">
        <div class="header">
            <h1>
                Результати пошуку:
            </h1>
        </div>
        <div v-if="type=='LegalEntity'">
            <LegalEntityResults v-bind:LegalEnitiyArr="data" ></LegalEntityResults>
        </div>
        <div v-if="type=='SoleTrader'">
            <SoleTraderResults v-bind:SoleTraderArr='data'></SoleTraderResults>
        </div>
        <div v-if="type=='Organization'">
            <OrganizationResults v-bind:OrganizationArr='data'></OrganizationResults>
        </div>
    </div>
</template>


<script>
    import LegalEntityResults from './search_results_models/LegalEntitySearch'
    import OrganizationResults from './search_results_models/OrganizationSearch'
    import SoleTraderResults from './search_results_models/SoleTraderSearch'
    export default {
        name: "search_results",
        data() {
            return {
                SoleTraderArray: [
                    {

                        "id": 0,
                        "fullName": "string",
                        "passportData": "string",
                        "location": {
                            "region": "string",
                            "settlement": "string",
                            "district": "string",
                            "street": "string",
                            "building": "string"
                        },
                        "activity": {
                            "type": "string",
                            "description": "string"
                        },
                        "registerDate": "2020-05-14T12:07:46.286Z",
                        "contacts": "string"
                    }],
                OrgArray: [
                    {
                        "id": 0,
                        "fullname": "string",
                        "shortName": "string",
                        "ruleForm": "string",
                        "enterpreneurialActivity": true,
                        "contacts": "string",
                        "location": {
                            "region": "string",
                            "settlement": "string",
                            "district": "string",
                            "street": "string",
                            "building": "string"
                        },
                        "activity": {
                            "type": "string",
                            "description": "string"
                        },
                        "founders": [
                            {
                                "firstName": "string",
                                "lastName": "string",
                                "passportData": "string"
                            }
                        ]
                    }
                ],
                LegalEntArray: [{
                    "id": 0,
                    "name": "string",
                    "enterpreneurialActivity": true,
                    "fullname": "string",
                    "location": {
                        "region": "string",
                        "settlement": "string",
                        "district": "string",
                        "street": "string",
                        "building": "string"
                    },
                    "registerDate": "2020-05-14T13:45:43.037Z",
                    "founders": [
                        {
                            "firstName": "string",
                            "lastName": "string",
                            "passportData": "string"
                        }
                    ],
                    "contacts": "string",
                    "activity": {
                        "type": "string",
                        "description": "string"
                    }
                }],
            }
        },
        components: {
            LegalEntityResults,
            OrganizationResults,
            SoleTraderResults
        },
        computed: {
            type: function() {
                console.log(this.$route.params.type)
                return this.$route.params.type
            }, 
            data: function() {
                console.log('data: ')
                console.log(this.$route.params.data)
                return this.$route.params.data
            } 
        }
    }
</script>

<style>
    .results {
        margin-top: 50px;
    }
    .header {
        margin-left: 20px;
    }
    .entity-data {
        border: 1px grey solid;
    }
</style>