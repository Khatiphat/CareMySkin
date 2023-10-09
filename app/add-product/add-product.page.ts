import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Product } from '../models/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  product : Product = {
    
    productid: 0,
    categoryid:  0,
    productname: '',
    productimage:  '',
    productbrand:  '',
    ratescore: 0 
  }

  constructor(private productServiceService: ProductServiceService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.resetForm();
  }

  resetForm() {
    this.product = {
      productid: 0,
      categoryid:  0,
      productname: '',
      productimage:  '',
      productbrand:  '',
      ratescore: 0
    };
  }

  onClickAddButton() {
    console.log('handle on click add button');
    console.log(this.product);
    this.productServiceService.addProduct(this.product).subscribe((response) => {
      if (response.status != 'success') {
        return;
      }

      this.router.navigate(['/list-product'])
    })
  }

}
