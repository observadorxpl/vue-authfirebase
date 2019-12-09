<template>
  <div>
    <form @submit.prevent="agregarTarea(tarea)">
      <div class="form-group mt-5">
      
      <input class="form-control" placeholder="Nombre de tarea" type="text" :class="{'is-invalid': $v.tarea.nombre.$error}" v-model="$v.tarea.nombre.$model"/>
      <p class="text-danger" v-if="!$v.tarea.nombre.required">Campo requerido</p>
      <p class="text-danger" v-if="!$v.tarea.nombre.minLength">Minimo 6 caracteres</p>
      <p>{{$v.tarea}}</p>
      <div class="text-center mt-3">
      <button class="btn btn-primary" type="submit" :disabled="$v.$invalid || cargando">Aceptar</button>
      </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { required, minLength} from 'vuelidate/lib/validators'
export default {
  name: "agregar",
  computed: {
    ...mapState(["tarea", "cargando"])
  },
  methods: {
      ...mapActions(['agregarTarea'])
  },
  validations:{
    tarea:{
      nombre:{
        required,
        minLength: minLength(6)
      }
    }
  },
};
</script>