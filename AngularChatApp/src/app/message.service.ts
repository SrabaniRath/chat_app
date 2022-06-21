import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { map } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  userLists:any=[];
  constructor(private firestore:Firestore) { }

  // getAllUsers() {
  //   const ref = collection(this.firestore, 'oc-user');
  //   const querryAll = query(ref);
  //   return collectionData(querryAll);
  //   // data.subscribe(console.log)
  //   // data.pipe(
  //   //   map((userData:any)=>userData.map((rec:any)=>rec['displayname']))
  //   // ).subscribe((res:any)=>{
  //   //   this.userLists=res || [];
  //   //    //console.log(res);
  //   // })

  // }
}
