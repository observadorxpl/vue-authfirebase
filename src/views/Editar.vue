<template>
    <div>
        <form @submit.prevent="updateTarea(tarea)">
            <div class="form-group mt-5">
                <label for="text_nombre"></label>
                <input class="form-control" id="text_nombre" placeholder="Nombre de tarea" v-model="tarea.nombre">
                <div class="text-center mt-3">
                    <button class="btn btn-primary" type="submit">Aceptar</button>
                </div>
            </div>
        </form>
  </div>

</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    name: 'editar',
    data(){
        return{
            id: this.$route.params.id
        }
    },
    methods: {
        ...mapActions(['getTarea','updateTarea']),
        ...mapMutations(['inicializarVariables'])
    },
    computed: {
        ...mapState(['tarea'])
    },
    created() {
        this.getTarea(this.id);
    },
    destroyed() {
        this.inicializarVariables();
    },
}
</script>