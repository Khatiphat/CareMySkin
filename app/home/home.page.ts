import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
   await this.storage.clear();
  }
  
  async startApp(){
    console.log('Navigate page login');
    this.router.navigate(['/main-page/start-page/']);
  }
}
