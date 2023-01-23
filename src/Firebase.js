
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// firebase se utilzara para realizar la autenticacion 

const firebaseConfig = {
    apiKey: "AIzaSyCa0XsYsIMR48lRqDK8Jz-weJbtzK3kEJ8",
    authDomain: "e-commerce2023-303f2.firebaseapp.com",
    projectId: "e-commerce2023-303f2",
    storageBucket: "e-commerce2023-303f2.appspot.com",
    messagingSenderId: "317831008695",
    appId: "1:317831008695:web:069489ae67ac23fd3a5832"
  }; // esto lo copio de la parte de configuracion de la pag de Firebase

  // npm i firebase ...

  const firebaseApp = firebase.initializeApp(firebaseConfig)  ; 

  const  auth = firebase.auth() ;

  export {auth} ; 