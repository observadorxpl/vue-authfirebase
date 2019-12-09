<template>
  <div>
    <form @submit.prevent="loginUser({email: email, password: password})">
      <label for="text_email">Email</label>
      <input class="form-control" id="text_email" placeholder="Ingrese su correo" type="text" v-model="email"  required/>

      <label for="text_password">Contraseña</label>
      <input class="form-control" id="text_password" placeholder="Ingrese su contraseña" type="password" v-model="password" required/>
      <p class="text-danger mt-2">{{error}}</p>
      <button class="btn btn-primary btn-block mt-3" type="submit" :disabled = "validarInputs">Ingresar</button>
    </form>
  </div>

</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
      ...mapActions(['loginUser'])
  },
  computed: {
      ...mapState(['error']),
      validarInputs(){
            return this.email === ''|| this.password === ''
        }
  },
};
</script>