import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';
import {  addDoc,
  collectionData,
  WriteBatch,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  updateDoc,
  setDoc,
  where,} from '@angular/fire/firestore';
import { collection, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { concatMap, map, Observable } from 'rxjs';
import { chatData } from 'src/assets/chat-data';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class GroupMessagesComponent implements OnInit {


  chatInbox: any = [];
  selectedChat:any;
  @Input() loggedInUser:any;
  msgToSend:any='';
  selectedChatName='';
  constructor(public firestore: Firestore) { }

  ngOnInit(): void {
    // this.updateGroup();
    this.getAllUsers();
    // this.getChatMessages();
    // this.getmyGroups();
    // this.createChat();
    // this.createGroup();
    // this.deleteGroup();
   let inbox = sessionStorage['inbox'];
   if(inbox && typeof inbox == 'string'){
    inbox = JSON.parse(inbox);
   }
   
    if(!inbox){
      sessionStorage.setItem('inbox',JSON.stringify(chatData))
      this.chatInbox = chatData;
      console.log({ chatData: this.chatInbox })
    }else{
      this.chatInbox=inbox;
    }
   

    
  }

  loadMessages(e: any) {
    this.selectedChat = e;
    console.log(this.selectedChat);
    this.selectedChatName = e.name;
  }

  sendMessage(){
     this.updateMessages(this.msgToSend);
     this.msgToSend='';
  }

  updateMessages(msg:any){
    
     const updatedInbox = this.chatInbox.map((eachInbox:any)=>{
      if(eachInbox.name == this.selectedChat.name){
        const chats = eachInbox.chats;
        return {
          ...eachInbox,
          chats:[...chats,{
            sender:this.loggedInUser,
            content:msg,
            id:eachInbox.chats.length + 1
          }]
        }
      }
      return eachInbox
     })
     sessionStorage.setItem('inbox',JSON.stringify(updatedInbox))
     this.chatInbox = updatedInbox;
     this.selectedChat = updatedInbox.find((eachI:any)=>{
      return eachI.name == this.selectedChat.name;
     })
     console.log(updatedInbox);
  }

  getChatMessages(){
    const ref = collection(this.firestore, 'oc-group-messages', 'oc-group-1','messages');
    const queryAll = query(ref, orderBy('sentAt', 'asc'));
    const data = collectionData(queryAll)
    data.forEach(e => {
      console.log(e)
    });
  }

  getmyGroups() {
    const ref = collection(this.firestore, 'oc-group');
        const myQuery = query(
          ref,
          where('members', 'array-contains','user-id-3')  //userid to be passed
        );
        const data = collectionData(myQuery)
        data.forEach(e => {
          console.log(e)
        })
  }

  createChat(){
    const ref = collection(this.firestore, 'oc-group-messages','oc-group-2','messages');
    addDoc(ref,{
      name: 'oc-grp'
    })
  }

  createGroup(){
    let timestamp = Date.now();
    let userArray = ['uid1','uid2','uid3'];
    const ref = collection(this.firestore, 'oc-group');
    const refdoc = doc(ref,'oc-group-5')  //username and timstamp
    setDoc(refdoc,{
      name: 'oc-grp', //dyanmic
      type: 'private',  // privat public
      createdAt: timestamp,
      createdBy: 'admin',   //logged in username
      groupId: '', //username and timstamp
      members: userArray,
    },)
  }

  // deleteGroup(){
  //   const refGroup = collection(this.firestore, 'oc-group');
  //   const refdocGrp = doc(refGroup,'oc-group-5')
  //   deleteDoc(refdocGrp)
  // }

  //getAllUser
  getAllUsers() {
    const ref = collection(this.firestore, 'oc-user');
        const querryAll = query(ref);
        const data = collectionData(querryAll)
        data.forEach(e =>{
          console.log(e)
        })
  }

  //update group
  updateGroup(){
    const groupRef = collection(this.firestore,'oc-group')
    const groupDocRef = doc(groupRef,'oc-group-1')
    updateDoc(groupDocRef,{
      members: ['user-id-1','user-id-2']
    })
  }



}
