<template>
    <div>
        <h1>Registro de usuarios</h1>
    <form @submit.prevent="registrarUsuario({usuario: email, password: password})">
        <div class="form-group">
            <label for="text_email">Email</label>
            <input class="form-control" id="text_email" placeholder="Email" type="email" v-model="email">

            <label for="text_password">Contraseña</label>
            <input class="form-control" id="text_password" placeholder="Contraseña" type="password" v-model="password">

            <label for="text_confirm_password">Confirmacion de contraseña</label>
            <input class="form-control" id="text_confirm_password" placeholder="Confirma la contraseña" type="password" v-model="password_two">
            <p class="text-danger mt-2">{{error}}</p>
            <button class="btn btn-primary mt-3" type="submit" :disabled= "validarContraseña">Registrar</button>
        </div>
    </form>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'registro',
    data() {
        return {
            email: '',
            password: '',
            password_two: ''
        }
    },
    computed: {
        ...mapState(['error']),
        validarContraseña(){
            return this.password !== this.password_two || this.password === '' || this.email === null || this.email === '' || this.email.length < 5
        }
    },
    methods: {
        ...mapActions(['registrarUsuario'])
    },
}
</script>