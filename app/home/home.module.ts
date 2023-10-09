import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Storage } from '@ionic/storage-angular';
import { Collection } from '../models/collection-model';
import { Member } from '../models/member-model';
import { CollectionServiceService } from '../services/collection-service.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
})
export class RoutinePage implements OnInit {
  collection: Collection[] = [];

  countProduct: any;

  member: Member = {
    memberid: 0,
    email: '',
    password: '',
    username: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
    profileimage: '',
    status: 0
  };

  constructor(private collectionService: CollectionServiceService,
    private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  async ionViewWillEnter() {
    this.member = await this.storage.get('member');
    console.log('member profile :: ', this.member);
    this.loadCollectionData();
  }

  loadCollectionData() {
    this.collectionService.inquiryCollection().subscribe((response) => {
      if (response.status != 'success') {
        return;
      }
      this.collection = response.collection;
      console.log('value of this.products variable');
      console.log(this.collection);
    });

    this.collection.collection_detail[];
  }

}
