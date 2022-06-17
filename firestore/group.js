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

// creating group+++++++++++++++++++++++++++++++++
// let userArray = ['user-id-1','user-id-2']
// const group = {
//     createdAt: new Date(),
//     createdBy: 'user-id-1',
//     members: userArray,
//     name:'oc-group-1',
//     type:'private',
//     gorupId: 'oc-gid-1',
// }
// let myPromise =  new Promise((resolve, reject) => {
//     db.collection('oc-group')
//     .doc('oc-group-1')
//     .set(group)
//     .then(function (docRef) {
//         // vm.fetchGroupByUserID(vm.user.uid)
//         resolve(group)
//         console.log('group added')
//     })
//     .catch(function (error) {
//         reject(error)
//     })
// let groups =[]
// const userRef = db.collection('oc-user')
//  userArray.forEach(e => {
//     userRef.doc(e).update({
//         // displayname: e,
//         // email:e+'@email.com',
//         groups:['oc-gid-1'],
//         // photoUrl:'default-photo',
//         // uid:e

//     })
//   })
// })

//filter gorup++++++++++++++++++++++++++++++++++++++++++++
// let userArray = ['user-id-2','user-id-3','user-id-4']
// let myPromise1 = new Promise((resolve, reject) => {
// let groupRef = db.collection('oc-group')
//     userArray.forEach((userId) => {
//     groupRef = groupRef.where('members', '==', userId)
//     })
//     groupRef
//     .get()
//     .then(function (querySnapshot) {
//         const allGroups = []
//         querySnapshot.forEach((doc) => {
//         const data = doc.data()
//         data.id = doc.id
//         allGroups.push(data)
//         })
//         if (allGroups.length > 0) {
//         resolve(allGroups[0])
//         console.table(allGroups)
//         } else {
//         resolve(null)
//         }
//     })
//     .catch(function (error) {
//         reject(error)
//     })
// })

//fetch group by userId
// let myPromise2 = new Promise((resolve, reject) => {
//     const groupRef = db.collection('oc-group')
//     groupRef
//     .where('members', 'array-contains', 'user-id-1')
//     .onSnapshot((querySnapshot) => {
//         const allGroups = []
//         querySnapshot.forEach((doc) => {
//         const data = doc.data()
//         data.id = doc.id
//         console.log(data)
//         if (data.recentMessage) allGroups.push(data)
//         })
//         console.table(allGroups)
//         // document.getElementById("group-list").innerHTML += JSON.stringify(allGroups);
//     })
// })

//fetch group by group name
// let myPromise3 = new Promise((resolve, reject) => {
//     const groupRef = db.collection('oc-group')
//     groupRef
//     .where('name', '==', 'oc-group-1')
//     .onSnapshot((querySnapshot) => {
//         const allGroups = []
//         querySnapshot.forEach((doc) => {
//         const data = doc.data()
//         data.id = doc.id
//         console.log(data)
//         if (data.recentMessage) allGroups.push(data)
//         })
//         console.table(allGroups)
//     })
// })


//fetch group by ids++++++++++++++++++++
// gids = ['oc-group-2','oc-group-1']
// const groups = []
// const groupRef = db.collection('oc-group')
// gids.forEach(async (groupId) => {
//     await groupRef
//     .doc(groupId)
//     .get()
//     .then(function (doc) {
//         groups.push(doc.data())
//     })
//     .catch(function (error) {
//         // eslint-disable-next-line no-console
//         console.error('Error get document: ', error)
//     })
// })
// console.log(groups)

//update group++++++++++++++++++++++++++++++++++++++++
// let userArray = ['user-id-1','user-id-3','user-id-4']
// const group = {
//     createdAt: new Date(),
//     createdBy: 'user-id-1',
//     members: userArray,
//     name:'oc-group-1',
//     type:'private',
//     gorupId: 'oc-gid-1',
// }
// db.collection('oc-group')
//     .doc('oc-group-1')
//     .set(group)
//     .then(function (docRef) {
//         console.log("group upated")   
//     })
//     .catch(function (error) {
//         // eslint-disable-next-line no-console
//      console.error('Error writing document: ', error)
//      console.log("group upated")
//     })

//++++++++++++++++++++++++++++++++++
// let userArray = ['user-id-1','user-id-2','user-id-4']
// db.collection('oc-group')
//     .doc('oc-group-1')
//     .update({
//       members: userArray,
//     })
//     .then(function (docRef) {
//         console.log("group upated")   
//     })
//     .catch(function (error) {
//         // eslint-disable-next-line no-console
//      console.error('Error writing document: ', error)
//      console.log("group upated")
//     })

//add user to group++++++++++++++++++++++++++++++++++++++++++
// user = {
//     uid: 'user-is-1',
//     displayName: 'oc user 1',
//     photoURL: 'default-photo',
//     email: 'user1@email.com',
//     groups:[]
// }
// const groups = user.groups ? user.groups : []
// const existed = groups.filter((group) => group === 'oc-group-1')
// if (existed.length === 0) {
//     groups.push('oc-group-1')
//     user.groups = groups
//     const userRef = db.collection('oc-user')
//     userRef.doc('user-id-1').set(user)
//     console.log('group added to user')
// }

//Deleting group by group name+++++++++++++
// const res = db.collection('oc-group').doc('oc-group-2').delete()
// console.log('Group deleted')

// renaming the group+++++++++++++++++++++++++++++++++++      GROUPID and DOC NAME SHOULD BE SAME
// db.collection('oc-group').doc('oc-group-2s')
//     .get()
//     .then(function (doc){
//         if(doc && doc.exists) {
//             const data = doc.data();
//             //saving data to new name doc
//             data.groupId = 'oc-group-2-renamed'
//             db.collection('oc-group').doc('oc-group-2-renamed').set(data)
//             //deleting old data
//             db.collection('oc-group').doc('oc-group-2s').delete()
//         }
//         console.log('group renamed')
//     });

//deleting the group++++++++++++++++++++++++++++++++++++++++++++
// const res = db.collection('oc-group').doc('oc-group-1').delete()
// const res1 = db.collection('oc-group-messages').doc('oc-group-1').delete();

//deleting group messages+++++++++++++++++++++++++++++++++++++++++
// const collectionRef = db.collection('oc-group-messages').doc('oc-group-1').collection('messages')
// let myPromise2 = new Promise((resolve, reject) => {
//     // const groupRef = db.collection('oc-group')
//     collectionRef
//     .onSnapshot((querySnapshot) => {
//         const batch = db.batch();
//         querySnapshot.forEach((doc) => {
//         batch.delete(doc.ref);
//         console.log('deleted')
//         })
//         batch.commit();
//     })
// })




// console.log(res)

//adding more prople to groups++++++++++++++++++++++++++++++++++++++++++++++++
// db.collection('oc-group').doc('oc-group-3').update({
//     members:['user-id-2','user-id-3']
// })