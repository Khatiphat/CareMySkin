import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from '../services/member-service.service';
import { Member } from '../models/member-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.page.html',
  styleUrls: ['./list-member.page.scss'],
})
export class ListMemberPage implements OnInit {
  members: Member[] = [];
  constructor( private memberServiceService: MemberServiceService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadMemberData();
  }

  loadMemberData(){
    
    this.memberServiceService.inquiryMember().subscribe((response) => {
      if (response.status != 'success') {
        return;
      }
      this.members = response.members;
      console.log('value of this.members variable');
      console.log(this.members);
    });

  }

  onClickDeleteMember(member: Member){
    console.log('delete success');
    console.log(member);
    this.memberServiceService.deleteMember(member.memberid).subscribe((response) => {   
      if (response.status != 'success')  {
        return;
      }

      console.log(response);
      this.loadMemberData();
    });
    
  }

  // onClickUpdateMember(member : Member){
  //   console.log('update success');
  //   console.log(member);
  //   // this.memberServiceService.updateMember(member.memberid).subscribe((response) => {   
  //   //   if (response.status != 'success')  {
  //   //     return;
  //   //   }

  //   //   console.log(response);
  //   //   this.loadMemberData();

      
  //   // });
  //   this.router.navigate(['/update-member/'])
    
  // }

}
