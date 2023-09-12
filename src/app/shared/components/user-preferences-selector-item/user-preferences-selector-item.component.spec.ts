import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserPreferencesSelectorItemComponent } from './user-preferences-selector-item.component';

describe('UserPreferencesSelectorItemComponent', () => {
  let component: UserPreferencesSelectorItemComponent;
  let fixture: ComponentFixture<UserPreferencesSelectorItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPreferencesSelectorItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPreferencesSelectorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
