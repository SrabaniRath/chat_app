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
import { concatMap, map, Observable } from 'rxjs';
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
  // chatGroups: any = [
  //   'oc-group-1',
  //   'oc-group-3'
  // ];
  chatGroups: any = [];
  constructor(private messageService: MessageService, private fireStore: Firestore) { }

  ngOnInit(): void {

    //  let inbox = sessionStorage['inbox'];
    //  if(inbox && typeof inbox == 'string'){
    //   inbox = JSON.parse(inbox);
    //  }

    //   if(!inbox){
    //     sessionStorage.setItem('inbox',JSON.stringify(chatData))
    //     this.chatInbox = chatData;
    //     console.log({ chatData: this.chatInbox })
    //   }else{
    //     this.chatInbox=inbox;
    //   }
    this.getmyGroups();
    this.getAllUsers();
  }
  /**
   * 
   * left panel selection handler
   */
  setSelectGroup(e: any) {
    this.selectedGroupName = e;
    console.log(this.selectedGroupName);
    //this.loadChatHistory(e)
    this.getChatMessages(e);
  }

  sendMessage() {
    this.updateMessages(this.msgToSend);
    this.msgToSend = '';
  }

  updateMessages(msg: any) {

    const updatedInbox = this.chatInbox.map((eachInbox: any) => {
      if (eachInbox.name == this.selectedChat.name) {
        const chats = eachInbox.chats;
        return {
          ...eachInbox,
          chats: [...chats, {
            sender: this.loggedInUser,
            content: msg,
            id: eachInbox.chats.length + 1
          }]
        }
      }
      return eachInbox
    })
    sessionStorage.setItem('inbox', JSON.stringify(updatedInbox))
    this.chatInbox = updatedInbox;
    this.selectedChat = updatedInbox.find((eachI: any) => {
      return eachI.name == this.selectedChat.name;
    })
    console.log(updatedInbox);
  }

  /**
   * 
   * not required
   */
  loadChatHistory(groupName: string) {
    /**
     * @Usage user lists
     */
    // this.firestore.collection('oc-group').valueChanges().subscribe((res)=>{
    //   console.log("user lists", res);
    // })

    /**
     * @Usage message lists
     */
    // this.chatHistory = [];
    // this.firestore.collection(`oc-group-messages/${groupName}/messages`).valueChanges().subscribe((res: any) => {
    //   console.log("messages lists", res);
    //   this.chatHistory = res || [];
    //  // this.chatHistory.sort((a: any, b: any) => a.sentAt - b.sentAt);
    //   // this.chatHistory = this.chatHistory.map((eachMsg: any) => {
    //   //   return {
    //   //     ...eachMsg,
    //   //     sentAt: new Date(eachMsg.sentAt)
    //   //   }
    //   // })
    //   console.log(this.chatHistory)
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
      //console.log(e)
      this.chatHistory = e;
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
      console.log(res);
    })
    // data.forEach(e => {
    //   console.log(e)
    //   this.chatGroups = e.map((eachGrpName) => {
    //     return eachGrpName['name']
    //   });
    // })
  }

  /**
   * create a chat group
   */
  createChat() {
    const ref = collection(this.fireStore, 'oc-group-messages', 'oc-group-2', 'messages');
    addDoc(ref, {
      name: 'oc-grp'
    })
  }
  /**
   * fetching all user lists
   */
  getAllUsers() {
    const ref = collection(this.fireStore, 'oc-user');
    const querryAll = query(ref);
    const data = collectionData(querryAll);
    data.pipe(
      map((userData:any)=>userData.map((rec:any)=>rec['uid']))
    ).subscribe((res:any)=>{
      this.userLists=res || [];
       console.log(res);
    })
    // data.forEach(e => {
    //   console.log("user listss", e)
    //   this.userLists = e.map((eachUser) => {
    //     return eachUser['uid']
    //   });

    // })
    //console.log("user listss", this.userLists)
  }

  /**
   * create a new group
   */
  addNewGroup() {
    let timestamp = Date.now();
    let userArray= this.userLists;
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
