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
// messageText:'Hello Dosto...kasie hai app log',
// sentAt: timestamp,
// sentBy: 'user-id-4',
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
let allmsg = []
db.collection('oc-group-messages')
    .doc('oc-group-1')
    .collection('messages')
    .orderBy('sentAt')
    .onSnapshot((querySnapshot) => {
    const allMessages = []
    querySnapshot.forEach((doc) => {
        if (doc) allMessages.push(doc.data())
    })
    // console.log(allMessages)
    console.table(allMessages)
    document.getElementById("messages").innerHTML = JSON.stringify(allMessages);
    allmsg = allMessages;
    
})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let createdBy = '';
let myPromise3 = new Promise((resolve, reject) => {
const groupRef = db.collection('oc-group')
groupRef
.where('name', '==', 'oc-group-1')
.onSnapshot((querySnapshot) => {
    const allGroups = []
    querySnapshot.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    createdBy = data.createdBy;
    // console.log(data.createdBy+'  created by')
    })
    })
})
//     //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
    e.preventDefault();
    // console.log('inside msg function')
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const userInput = document.getElementById("user-input");
    // console.log(userInput.value+'user value');

    // const groupInput = document.getElementById("group-input");
    const messageText = messageInput.value;
    // const grp = groupInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    let uid = '';
    uid = 'user-id-'+userInput.value;
    if(allmsg.length == 0)
        if('user-id-'+userInput.value != createdBy){
            alert('only admin can start the conversation');
            return;
        }
    
    const message = {
    messageText:messageText,
    sentAt: timestamp,
    sentBy: uid,
    }
    let myPromise = new Promise((resolve, reject) => {
    db.collection('oc-group-messages')
        .doc('oc-group-1')
        .collection('messages')
        .add(message)
        .then(function (docRef) {
        resolve(message)
        // console.table(message)
        })
        .catch(function (error) {
        reject(error)
        })
    })
    console.log('message sent')

}
