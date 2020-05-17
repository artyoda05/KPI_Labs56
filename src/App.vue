<template>
  <div class="contents">
    <header class="navbar navbar-style">
      <div class="title">
        <router-link to="/">
          <a href="#">Реєстр юридичних осіб, фізичних осіб – підприємців та громадських формувань</a>
        </router-link>
      </div>
      <router-link v-if="loggedIn" to="/">
        <button v-on:click="exit" class="btn btn-outline-dark">Вийти</button>
      </router-link>
      <router-link v-if="!loggedIn" to="/LoginPage">
        <button class="btn btn-outline-dark">Увійти</button>
      </router-link>
    </header>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  // import HelloWorld from './components/HelloWorld.vue'
  // import SearchPage from './components/SearchPage.vue'
  // import GOInformation from './components/GOInformation.vue'
  // import STInforamtion from './components/STInforamtion.vue'
  // import LEInformation from './components/LEInformation.vue'
  // import AboutPage from './components/AboutPage.vue'

  export default {
    name: 'App',
    data() {
      return {
        key: 0
      }
    },
    computed: {
      loggedIn: function () {
        return localStorage.usertoken;
      }
    },
    methods: {
      exit: function () {
        localStorage.removeItem('userrole');
        localStorage.removeItem('usertoken');
        location.reload()
      }
    }
  }
</script>

<style>
  .navbar-style {
    background-color: #3b882b;
    height: 75px;
  }

  .title {
    display: flex;
    justify-content: space-around;
  }

  .title a {
    color: white;
    text-decoration: none;
    font-size: 20px;
  }

  .title a:hover {
    color: white;
    text-decoration: none;
  }

  html,
  body {
    height: 100%;
    background: rgb(2, 0, 36);
    background: linear-gradient(180deg, rgba(2, 0, 36, 0) 70%, rgba(9, 121, 36, 0.36) 90%, rgba(40, 111, 23, 0.5) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .contents {
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .btn_edit {
    margin-left: 200px;
    margin-top: 50px;
  }

  .btn_edit a{
    text-decoration: none;
    color: white;
  }
  
  .button_func {
    margin-left: 100px;
  }
</style>