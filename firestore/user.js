// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAkvIklBdS1CCmZ6KNjRHZ-fv-bMxnGjYo",
    authDomain: "chat-app-9d872.firebaseapp.com",
    databaseURL: "https://chat-app-9d872-default-rtdb.firebaseio.com",
    projectId: "chat-app-9d872",
    storageBucket: "chat-app-9d872.appspot.com",
    messagingSenderId: "937878414308",
    appId: "1:937878414308:web:3083d9c23cec51a24d1df1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // initialize database
  const db = firebase.firestore();

// Saving user to database+++++++++++++++++++++++++++++++++++++++++++++++++++++
const userRef = db.collection('oc-user')
userRef.doc('user-id-4').set({
    uid: 'user-is-4',
    displayName: 'oc user 4',
    photoURL: 'default-photo',
    email: 'user1@email.com',
    groups:[]
})

//Checking for existing user in db++++++++++++++++++++++++++++++++++++++++++++++
// const docRef = db.collection('oc-user').doc('user-id-3')
//     docRef
//     .get()
//     let myPromise = new Promise((resolve, reject) => {
//         docRef
//           .get()
//           .then(function (doc) {
//             resolve(doc.exists)
//           })
//           .catch(function (error) {
//             reject(error)
//           })
//       })
// console.log(myPromise)

//fetching user+++++++++++++++++++++++++++++++++++++++++++++++++
let myPromise1 = new Promise((resolve, reject) => {
    db.collection('oc-user')
    .get()
    .then(function (querySnapshot) {
        const allUsers = []
        querySnapshot.forEach((doc) => {
        const user = doc.data()
        allUsers.push(user)
        })
        resolve(allUsers.length > 0)
        console.table(allUsers)
    })
    .catch(function (error) {
        reject(error)
    })
    })
// get user by id from firestore++++++++++++++++++++++++++++++++++++++++++++
// const docRef = db.collection('oc-user').doc('user-id-3')
// let myPrimise2 = new Promise((resolve, reject) => {
//     docRef.onSnapshot(function (doc) {
//     resolve(doc.data())
//     console.table(doc.data())
//     })
// })
