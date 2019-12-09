import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import db from '../main'
import { stat } from 'fs';

var firebase = require("firebase/app");
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
    tareas: [],
    tarea: {idTarea: '', nombre:''},
    cargando: false
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setTareas(state, payload){
      state.tareas = payload
    },
    setTarea(state, payload){
      state.tarea = payload
    },
    refreshTareas(state, idTarea){
      state.tareas = state.tareas.filter(item =>{
        return item.idTarea != idTarea
      })
    },
    setCargando(state, payload){
      state.cargando = payload;
    },
    inicializarVariables(state){
    state.error = '',
    state.tareas= [],
    state.tarea = {idTarea: '', nombre:''}
    }
  },
  actions: {
    registrarUsuario({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.usuario, payload.password).then(res => {
        let referencia_doc = db.collection(res.user.email).doc();
        let id = referencia_doc.id
        referencia_doc.set({
          idTarea: id,
          nombre: 'Ejemplo de una tarea'
        })
        commit('setUsuario', {email : res.user.email, uid: res.user.uid})
        router.push({name: 'inicio'})
      }).catch(error => {
        commit('setError', error.message)
      })
    },
    loginUser({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(res=>{
        commit('setUsuario', {email : res.user.email, uid: res.user.uid})
        router.push({name: 'inicio'})
      }).catch(error => {
        console.log(error);
        commit('setError', error.message)
      })
    },
    detectarUsuario({commit}, payload){
      if(payload !== null){
        commit('setUsuario', {email: payload.email, uid: payload.uid})
      }else{
        commit('setUsuario', null)
      }
      
    },
    logoutUsuario({commit}){
      firebase.auth().signOut().then(()=>{
        commit('setUsuario', null);
        router.push({name: 'login'})
      })
    },
    getTarea({commit}, idTarea){
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).doc(idTarea).get().then(res=>{
        commit('setTarea', res.data());
      }).catch(error=>{
        console.log(error)
      })
    },
    getTareas({commit}){
      const usuario = firebase.auth().currentUser
      let tareas = []
      commit('setCargando', true)
      db.collection(usuario.email).get().then(res =>{
        res.forEach(item =>{
          tareas.push(item.data())
        });
        commit('setTareas', tareas)
        commit('setCargando', false)
      })
    },
    agregarTarea({commit}, payload){
      commit('setCargando', true)
      const usuario = firebase.auth().currentUser
      let referencia_doc = db.collection(usuario.email).doc();
      payload.id = referencia_doc.id
      referencia_doc.set({
        idTarea: payload.id,
        nombre: payload.nombre
      }).then(()=>{
        router.push({name: 'inicio'})
        commit('setCargando', false)
      }).catch(error=>{
        console.log(error)
      })
    },
    updateTarea({commit}, payload){
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).doc(payload.idTarea).set({
        idTarea: payload.idTarea,
        nombre: payload.nombre
      }).then(()=>{
        router.push({name:'inicio'})
      }).catch(error=>{
        console.log(error);
      })
    },
    deleteTarea({commit}, payload){
      //Eliminacion fisica de una tarea
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).doc(payload.idTarea).delete().then(()=>{
        commit('refreshTareas', payload.idTarea)
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  modules: {
  },
  getters:{
    existeUsuario(state){
      if(state.usuario == null || state.usuario == undefined || state.usuario == ''){
        return false
      }else{
        return true
      }
    }
  }
})
