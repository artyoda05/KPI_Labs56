<template>
    <div class="container about">
        <div class="row">
            <div class="col-12">
                <h1>Реєстр юридичних осіб, фізичних осіб – підприємців та громадських формувань </h1>
                ABOUT Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, omnis laudantium temporibus consectetur quaerat
                distinctio non, dolorem suscipit harum vel autem doloremque delectus, soluta a vero? Deleniti labore quos
                voluptas.
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-right searchButton">
                <router-link class='btn btn-outline-success' to="/SearchPage">Перейти до пошуку</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'about',
    }
</script>

<style>
    .about {
        margin-top: 100px;
    }

    .searchButton {
        padding-right: 200px;
    }
</style>