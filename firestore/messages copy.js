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
const timestamp = Date.now();
// initialize database
const db = firebase.firestore();

// save meassage++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const message = {
// messageText:'welcome bhai jaan',
// sentAt: timestamp,
// sentBy: 'user-id-1',
// }
// let myPromise = new Promise((resolve, reject) => {
// db.collection('oc-group-messages')
//     .doc('oc-group-3')
//     .collection('messages')
//     .add(message)
//     .then(function (docRef) {
//     resolve(message)
//     console.table(message)
//     })
//     .catch(function (error) {
//     reject(error)
//     })
// })

// fetching message by gorup++++++++++++++++++++++++++++++
db.collection('oc-group-messages')
    .doc('oc-group-3')
    .collection('messages')
    .orderBy('sentAt')
    .onSnapshot((querySnapshot) => {
    const allMessages = []
    querySnapshot.forEach((doc) => {
        if (doc) allMessages.push(doc.data())
    })
    console.log(allMessages)
    console.log(allMessages[1].messageText)
})

