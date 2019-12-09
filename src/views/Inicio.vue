<template>
    <div>
        <h1>Ruta protegida</h1>
        <h3 class="mt-5">Bienvenido {{usuario.email}}</h3>
        <router-link :to="{name:'agregar'}"><button class="btn btn-success btn-block">Agregar</button></router-link>
        <div v-if="cargando" class="text-center mt-5">
            <h1>Cargando Contenido ...</h1>
            <b-spinner  variant= "success" label="Loading..."></b-spinner>
        </div>
        <ul class="list-group mt-5">
            <li class="list-group-item" v-for="tarea of tareas" :key="tarea.idTarea">{{tarea.nombre}}
                <div class="float-right">
                    <router-link :to="{name: 'editar', params:{ id: tarea.idTarea}}"><button class="btn btn-warning mx-2">Editar</button></router-link>
                    <button class="btn btn-danger mx-2" @click="deleteTarea(tarea) ">Eliminar</button>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name: 'inicio',
    methods: {
        ...mapActions(['getTareas','deleteTarea']),
        ...mapMutations(['inicializarVariables'])
    },
    computed: {
        ...mapState(['usuario', 'tareas', 'cargando'])
    },
    created() {
        this.getTareas();
    },
    destroyed() {
        this.inicializarVariables()
    },
}
</script>
