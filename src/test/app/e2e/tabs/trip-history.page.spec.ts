import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripHistoryPage } from 'src/app/tabs/trip-history/trip-history.page';

describe('TripHistoryPage', () => {
  let component: TripHistoryPage;
  let fixture: ComponentFixture<TripHistoryPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(TripHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
