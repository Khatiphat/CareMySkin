import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { Product } from '../models/product-model';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CheckboxCustomEvent } from '@ionic/angular';
import { Member } from '../models/member-model';
import { CollectionServiceService } from '../services/collection-service.service';
import { Favorite } from '../models/collection-model';
import { count } from 'console';
@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.page.html',
  styleUrls: ['./add-collection.page.scss'],
})
export class AddCollectionPage implements OnInit {
  allProducts = [];
  products: Product[] = [];
  favorites:Favorite[] = []; 
  favorite: Favorite = {
    favoriteid: 0,
    productid:0,
    memberid:0,
    productimage:'',
    productname:'',
    productbrand:'',
  }
  product: Product = {
    productid:0,
    categoryid: 0,
    productname: '',
    productimage:  '',
    productbrand: '',
    ratescore: 0
  }
  member : Member = {
    memberid: 0,
    email:  '',
    password: '',
    username:  '',
    firstname:  '',
    lastname: '',
    phonenumber:  '',
    profileimage: '',
    status: 0
  }
  isOpenSelectProduct = false
  canDismiss = false;

  public alertButtons = ['OK'];
  public alertInputs : any;
  isModalOpen = false;
  view = false;
  result: number[] = [];

  selectedCollections : Product[] = [];
  
  
  constructor( private activate : ActivatedRoute, private productServiceService : ProductServiceService, private storage : Storage, private collectionService : CollectionServiceService) { 
    //this.productid = this.activate.snapshot.paramMap.get('productid');
  }

  async ngOnInit() {
    await this.storage.create();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  viewOpen(view : boolean ) {
    this.view = view
  }

  ionViewWillEnter(){
    this.loadProductData();
    this.loadFavoriteData();
    // console.log('member profile :: ', this.member)
  }

  loadProductData(){
    this.productServiceService.inquiryProduct().subscribe((response) => {
      if (response.status != 'success') {
        return;
      }
      this.products = response.products;
      console.log('value of this.products variable');
      console.log(this.products);
    });
  }

  async loadFavoriteData(){
    this.member = await this.storage.get('member')
    this.collectionService.inquiryFavorite(this.member.memberid).subscribe((response) => {
      if (response.status != 'success') {
        return;
      }
      this.favorites = response.favorites;
      console.log('value of this.products variable');
      console.log(this.favorites);
      console.log('memberid :');
      console.log(this.member.memberid);
    });
  }

  tranferValue(event: Event, productid: number) {
    const ev = event as CheckboxCustomEvent;
    console.log(ev.detail.checked)
    console.log(productid)
    var num : number;
    if (ev.detail.checked) {
      const selectedProduct = this.products.filter(product => {
        return product.productid === productid
      })

      this.selectedCollections = [...this.selectedCollections, ...selectedProduct]
    } else {
      const selectedProduct = this.selectedCollections.filter(product => {
        return product.productid !== productid
      })

      this.selectedCollections = selectedProduct
    }

    console.log('this.selectedCollections')
    console.log(this.selectedCollections)
  }

}
