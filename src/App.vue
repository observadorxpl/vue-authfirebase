<template>
  <div id="app" class="container mt-5">
    <div id="nav" class="text-center">
      <router-link class="btn btn-outline-primary mx-2" :to="{name: 'registro'}" v-if="!existeUsuario">
        Registro
      </router-link>
      <router-link class="btn btn-link mx-2" :to="{name: 'inicio'}" v-if="existeUsuario">
        Inicio
      </router-link>
      <router-link class="btn btn-light mx-2" :to="{name: 'login'}" v-if="!existeUsuario">
        Ingresar
      </router-link>
      <button class="btn btn-danger mx-2" @click="logoutUsuario" v-if="existeUsuario">Cerrar Sesion</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'App',
    methods: {
      ...mapActions(['logoutUsuario'])
    },
    computed: {
      ...mapGetters(['existeUsuario'])
    },
}
</script>
<style>
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
