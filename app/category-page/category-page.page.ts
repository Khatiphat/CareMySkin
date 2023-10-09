import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Product } from '../models/product-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category-model';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.page.html',
  styleUrls: ['./category-page.page.scss'],
})
export class CategoryPagePage implements OnInit {
  products: Product[]=[];
  category: Category = {
    categoryid : 0,
    categoryimage : '',
    categoryname : ''
  }
  productid : any
  categoryid : any

  constructor(private productServiceService : ProductServiceService, private router: Router, private activate : ActivatedRoute) {
    this.categoryid = this.activate.snapshot.paramMap.get('categoryid');
    
  console.log ('>>>', this.categoryid);
  }

  ngOnInit() {
  }

ionViewWillEnter() {
  this.loadProductData();
}


loadProductData() {
  this.productServiceService.inquiryProduct().subscribe((response) => {
    if (response.status != 'success') {
      // display alert
      return;
    }

    this.products = response.products;
    console.log('value of this.products variable');
    console.log(this.products);
  });
  if (this.categoryid != null){
    
    this.productServiceService.searchCategory(this.categoryid).subscribe((response) => {
      if (response.status != 'success') {
        // display alert
        return;
      }

      this.products = response.products;
      console.log('value of this.productc variable');
      console.log(this.products);
   });
    }
    this.productServiceService.getCategory(this.categoryid).subscribe((response) => {
      if (response.status != 'success') {
        // display alert
        return;
      }
  
      this.category = response.category;
      console.log('value of this.products variable');
      console.log(this.category);
    });
}


nextProductDetail(productid : any) {
  this.router.navigate(['/product-detail/'+ productid])
}

}
  

