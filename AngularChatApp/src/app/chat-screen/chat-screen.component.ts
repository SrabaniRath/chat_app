import { Component, Input, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { map, of } from 'rxjs';
// import { chatData } from 'src/assets/chat-data';
import { MessageService } from '../message.service';
import {
  addDoc,
  collectionData,
  WriteBatch,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  updateDoc,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { collection, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { combineLatest, concatMap, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class GroupMessagesComponent implements OnInit {


  chatInbox: any = [];
  selectedChat: any;
  @Input() loggedInUser: any;
  msgToSend: any = '';
  selectedGroupName = '';
  chatHistory: any = [];
  newGroupName: any = '';
  userLists: any = [];
  chatGroups: any = [];
  searchControl:any='';
  constructor(private messageService: MessageService, private fireStore: Firestore) { }

  ngOnInit(): void {

    this.getmyGroups();
    this.getAllUsers();
    //this.createChat();
  }
  /**
   * 
   * left panel selection handler
   */
  setSelectGroup(e: any) {
    this.selectedGroupName = e;
    this.getChatMessages(e);
  }

  sendMessage() {
    let timestamp = Date.now();
    //this.updateMessages(this.msgToSend);
    const ref = collection(this.fireStore, 'oc-group-messages',`${this.selectedGroupName}`, 'messages');
    addDoc(ref, {
      sentAt:timestamp,
      messageText:this.msgToSend,
      sentBy:this.loggedInUser
    })
    this.msgToSend = '';
  }
/**
 * @ not required
 */
  // updateMessages(msg: any) {

  //   const updatedInbox = this.chatInbox.map((eachInbox: any) => {
  //     if (eachInbox.name == this.selectedChat.name) {
  //       const chats = eachInbox.chats;
  //       return {
  //         ...eachInbox,
  //         chats: [...chats, {
  //           sender: this.loggedInUser,
  //           content: msg,
  //           id: eachInbox.chats.length + 1
  //         }]
  //       }
  //     }
  //     return eachInbox
  //   })
  //   sessionStorage.setItem('inbox', JSON.stringify(updatedInbox))
  //   this.chatInbox = updatedInbox;
  //   this.selectedChat = updatedInbox.find((eachI: any) => {
  //     return eachI.name == this.selectedChat.name;
  //   })
  //   //console.log(updatedInbox);
  // }

  /**
   * 
   * not required
   */
  loadChatHistory(groupName: string) {
    /**
     * @Usage user lists
     */
    // this.firestore.collection('oc-group').valueChanges().subscribe((res)=>{
    //   //console.log("user lists", res);
    // })

    /**
     * @Usage message lists
     */
    // this.chatHistory = [];
    // this.firestore.collection(`oc-group-messages/${groupName}/messages`).valueChanges().subscribe((res: any) => {
    //   //console.log("messages lists", res);
    //   this.chatHistory = res || [];
    //  // this.chatHistory.sort((a: any, b: any) => a.sentAt - b.sentAt);
    //   // this.chatHistory = this.chatHistory.map((eachMsg: any) => {
    //   //   return {
    //   //     ...eachMsg,
    //   //     sentAt: new Date(eachMsg.sentAt)
    //   //   }
    //   // })
    //   //console.log(this.chatHistory)
    // })

  }



  /**
   * fetching group chat messages
   */
  getChatMessages(groupName: string) {
    const ref = collection(this.fireStore, 'oc-group-messages', `${groupName}`, 'messages');
    const queryAll = query(ref, orderBy('sentAt', 'asc'));
    const data = collectionData(queryAll)
    data.forEach(e => {
      console.log(e)
      this.chatHistory = e;
      console.log(this.chatHistory)
    });
  }

  /**
   * fetching groups
   */
  getmyGroups() {
    const ref = collection(this.fireStore, 'oc-group');
    const myQuery = query(
      ref,
      where('members', 'array-contains', this.loggedInUser)  //userid to be passed
    );
    const data = collectionData(myQuery);
    data.subscribe(console.log)
    data.pipe(map((rec: any) => rec.map((eachGrp: any) => eachGrp['name']))).subscribe((res: any) => {
      this.chatGroups = res || [];
      //console.log(res);
    })
  }

  /**
   * create a chat group
   */
  // createChat(user:any) {
  //   console.log(user);
  //   const ref = collection(this.fireStore, 'oc-group-messages',`${ this.chatGroups}`, 'messages');
  //   addDoc(ref, {
  //     name: 'oc-grp'
  //   })
  //   console.log("create chat",ref);
  // }
  /**
   * fetching all user lists
   */
  getAllUsers() {
    const ref = collection(this.fireStore, 'oc-user');
    const querryAll = query(ref);
    const data = collectionData(querryAll);
    data.subscribe(console.log)
    data.pipe(
      map((userData:any)=>userData.map((rec:any)=>rec['uid']))
    ).subscribe((res:any)=>{
      this.userLists=res || [];
       console.log(res);
    })

  }
  userSelects:any=[];
  show: boolean = false;
  suggest() {
    this.show = true;
  }

  isSelected(user:any) {
   return this.userSelects.findIndex((item:any) => item === user) > -1 ? true : false;
  }
 
  selectUser(user:any) {
    this.userSelects.find((item:any) => item === user) ? (this.userSelects = this.userSelects.filter((item:any) => item !== user)) :this.userSelects.push(user);
    this.show=false;
  }

  deleteSelects(user:any) {
    this.userSelects = this.userSelects.filter((item:any) => item!== user);
  
  }
  /**
   * create a new group
   */
  addNewGroup() {
    //console.log(this.userSelects);
    let timestamp = Date.now();
    let userArray=this.userSelects;
    const ref = collection(this.fireStore, 'oc-group');
    const refdoc = doc(ref, this.newGroupName)  //username and timstamp
    setDoc(refdoc, {
      name: this.newGroupName, //dyanmic
      type: 'private',  // privat public
      createdAt: timestamp,
      createdBy: this.loggedInUser,   //logged in username
      groupId:this.newGroupName, //username and timstamp
      members: userArray,
    })
  }

}
