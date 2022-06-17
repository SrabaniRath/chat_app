import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
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

}
