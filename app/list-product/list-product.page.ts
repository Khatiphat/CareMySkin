import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Product } from '../models/product-model';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {
  products: Product[] = [];
  product: Product = {
    productid:0,
    categoryid: 0,
    productname: '',
    productimage:  '',
    productbrand: '',
    ratescore: 0
  }
  constructor( private productServiceService: ProductServiceService, private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadProductData();
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

  // async productDetail(productid : any) {
  //   this.productServiceService.getProductDetail(productid).subscribe(async (response) => {
  //     this.product = response.product; 
  //     console.log('product = ', this.product);
  //     await this.storage.set('product', this.product);
  //     this.router.navigate(['/product-detail']);
  //   });

  // }

}
