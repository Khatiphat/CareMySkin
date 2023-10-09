import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { Router } from '@angular/router'
import { MemberServiceService } from '../services/member-service.service';
import { Member } from '../models/member-model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Product } from '../models/product-model';
import { ProductServiceService } from '../services/product-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  products : Product[] = [];
  product: Product = {
    productid: 0,
    categoryid: 0,
    productname: '',
    productimage: '',
    productbrand: '',
    ratescore: 0
};
  member : Member = {
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
  memberid : any;
  loginForm: FormGroup;

  loginEmail: string = ''
  loginPassword: string = ''
  constructor(private storage: Storage, private router: Router, private memberServiceService : MemberServiceService, 
    public formBuilder: FormBuilder, private alertController: AlertController, private productServiceService : ProductServiceService) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async ngOnInit() {
    await this.storage.create();
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm = () => {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      return false;
    } else {
      return console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  ionViewWillEnter() {
    this.resetForm();
  }

  resetForm() {
    this.loginEmail = '';
    this.loginPassword = '';
  }

  async onClickLoginButton(){
    if (this.loginEmail === '') {
      const alert = await this.alertController.create({
        header: 'กรุณากรอกอีเมลของคุณ',
        message: '',
        buttons: ['ตกลง'],
      });
      await alert.present();
      return;
    }

    if (this.loginPassword === '') {
      const alert = await this.alertController.create({
        header: 'กรุณากรอกรหัสผ่านของคุณ',
        message: '',
        buttons: ['ตกลง'],
      });
      await alert.present();
      return;
    }

    this.memberServiceService.loginMember(this.loginEmail, this.loginPassword).subscribe(async (response) => {
      this.member = response.member; 
      console.log('member = ', this.member);
      if (response.status != 'success'){
        const alert = await this.alertController.create({
          header: 'เข้าสู่ระบบไม่สำเร็จ',
            message: 'ไม่สามารถเข้าสู่ระบบได้!! กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
            buttons: ['ตกลง'],
        });
        await alert.present();
        return;
      }
      await this.storage.set('member', this.member);

      this.router.navigate(['/main-page/start-page']);
      this.resetForm();
    });

    // this.productServiceService.inquiryProduct().subscribe((response) => {
    //   if (response.status != 'success') {
    //     return;
    //   }
    //   this.products = response.products;
    //   console.log(response);
    //   console.log(this.products);
    // });
    // await this.storage.set('product', this.products);
  }

  onClickRegisterButton(){
    console.log('click register button');

    this.router.navigate(['/register']);
  }
}
