<template>
    <div class="container">
        <h1 class="nf">Помилка 404</h1>
        <h2>Такої сторінки не існує</h2>
        <router-link to="/SearchPage">На головну</router-link>
    </div>
</template>

<script>
    export default {
        name: 'notfound'
    }
</script>

<style>
    .nf {
        margin-top: 200px;
    }
</style>