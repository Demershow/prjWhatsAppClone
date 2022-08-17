const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyB6e942V2boX1dnfCciyHPjzRvvUAvXMNw",
            authDomain: "whatsappclone-baaa9.firebaseapp.com",
            projectId: "whatsappclone-baaa9",
            storageBucket: "whatsappclone-baaa9.appspot.com",
            messagingSenderId: "986325085371",
            appId: "1:986325085371:web:127f0c2bedd019c84acd9e",
            measurementId: "G-E6V8NWKQ01"
          };
        
        this.init()

    }

    init(){

        if(!window._initializedFirebase){
            firebase.initializeApp(this._config)

            firebase.firestore().settings({
                timestampsInSnapshots: true

            });

            window._initializedFirebase = true;
        }

       

    }

    static db(){

        return firebase.firestore();
    }

    static hd (){

        return firebase.storage();
    }

    initAuth(){

        return new Promise((s, f) =>{
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result =>{
                let token = result.credential.accessToken;
                let user = result.user;
                s({
                    user,
                    token
                });
            }).catch(err=>{
                f(err);
            })
        })

    }

}