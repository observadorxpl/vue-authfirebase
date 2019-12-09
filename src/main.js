import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
var firebase = require("firebase/app");

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// Add the Firebase products that you want to use
require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");
//require("firebase/messaging");
//require("firebase/functions");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCaIouRkYUelu0mfloqymul08oyCsXJp1Q",
  authDomain: "firevue-auth.firebaseapp.com",
  databaseURL: "https://firevue-auth.firebaseio.com",
  projectId: "firevue-auth",
  storageBucket: "firevue-auth.appspot.com",
  messagingSenderId: "388651823550",
  appId: "1:388651823550:web:7adf43e3878558fc9f89ef",
  measurementId: "G-WX87LGQ064"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()
// ESTO YA NO SE USA ERRORfirebaseApp.firestore().settings({timestampsInSnapshots: true})

//firebase.analytics();


/// OBTENER ESTADO DEL DATOS DEL USUARIO
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  store.dispatch('detectarUsuario',{email: user.email, uid: user.uid})
  // User is signed in.
  //var displayName = user.displayName;
  //var email = user.email;
  //var emailVerified = user.emailVerified;
  //var photoURL = user.photoURL;
  //var isAnonymous = user.isAnonymous;
  //var uid = user.uid;
  //var providerData = user.providerData;
  // ...
  //store.dispatch('setUsuario',{user.})
} else {
  store.dispatch('detectarUsuario',null)
}
});
///





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



  