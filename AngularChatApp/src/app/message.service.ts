import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


  getMessageLists() { 
     //return this.firestore.collection('oc-group-messages').doc('oc-group-1').collection('message').snapshotChanges();
    //return this.firestore.collection('oc-group-messages').snapshotChanges();
  }
}
