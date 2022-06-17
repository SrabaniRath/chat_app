import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularChatApp';
  item$: Observable<any>;
  username = '';
  constructor(firestore: Firestore) {
    const colec = collection(firestore, 'items');
    this.item$ = collectionData(colec);
  }

  ngOnInit(): void {
    if (!sessionStorage['username']) {
     this.toggleModal();
    } else {
      this.username = sessionStorage['username'];
      const backDrop= document.querySelector('.modal-backdrop');
      if(backDrop?.classList.contains('in')){
        backDrop.classList.remove('in')
       
      }
    }
  }

  toggleModal() {
    const modal = document.getElementById('loginModal');
    const backDrop= document.querySelector('.modal-backdrop');
    if (modal?.classList.contains('in')) {
      if(backDrop?.classList.contains('in')){
        backDrop.classList.remove('in')
       
      }
      modal.classList.remove('in')
      modal.style.display = 'none';
    } else if(modal && !modal.classList.contains('in')) {
      modal.classList.add('in')
      modal.style.display = 'block';
    }
  }



  joinChat() {
    console.log("print the name", this.username);
    this.toggleModal();
    sessionStorage.setItem('username',this.username);
    
  }
}
