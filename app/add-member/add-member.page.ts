import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member-model';
import { MemberServiceService } from '../services/member-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

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

  constructor(private memberServiceService: MemberServiceService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.resetForm();
  }

  resetForm() {
    this.member = {
      memberid: 0,
      email:  '',
      password: '',
      username:  '',
      firstname:  '',
      lastname: '',
      phonenumber:  '',
      profileimage: '',
      status: 0
    };
  }

  onClickSaveButton() {
    console.log('handle on click save button');
    console.log(this.member);
    this.memberServiceService.addMember(this.member).subscribe((response) => {
      if (response.status != 'success') {
        return;
      }

      // if(this.member.memberid === '')

      this.router.navigate(['/list-member'])
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
