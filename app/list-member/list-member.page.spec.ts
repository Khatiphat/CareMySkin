import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMemberPage } from './list-member.page';

describe('ListMemberPage', () => {
  let component: ListMemberPage;
  let fixture: ComponentFixture<ListMemberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
