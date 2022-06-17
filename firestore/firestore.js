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

// wriet data
// db.collection("users").doc("user2").set({
//   name: "Gaurav",
//   state: "KA",
//   country: "IN"
// })
// .then(() => {
//   console.log("data updated")
// })
// .catch((error) => {
//   console.error("Error writing document: ", error);
// });

// var cityRef = db.collection('cities').doc('BJ');

// var setWithMerge = cityRef.set({
//     capital: true
// }, { merge: true });
                       
let vm = this;                             
firebase                               
   .firestore()                               
   .collection("users")                               
   .orderBy("country")                               
   .onSnapshot(querySnapshot => {                                 
    const allUser = [];                                 
    querySnapshot.forEach(doc => {                                   
      allUser.push(doc.data());                                 
    });                                 
     vm.messages = allUser; 
     const user = `<li><span>${allUser.name}</span></li>`;
     // append the message on the page
     document.getElementById("user").innerHTML = JSON.stringify(allUser);     
     console.table(allUser)                         
  });

userArray = ['gaurav','raunak','amit'] ; 

const group = {
    createdAt: new Date(),
    createdBy:'Gaurav',
    members: userArray,
    name: 'Group 1',
    type: 'OC',
} 
  
db.collection('group').doc(group.name)
        .set(group)
        .then(function (docRef) {
          group.id = docRef.id
          console.log(docRef);
          // vm.fetchGroupByUserID(vm.user.uid)
        })
        .catch(function (error) {
        })