import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfilePage } from 'src/app/tabs/edit-profile/edit-profile.page';

describe('EditProfilePage', () => {
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(EditProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
