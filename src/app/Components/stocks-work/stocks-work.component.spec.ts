import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksWorkComponent } from './stocks-work.component';

describe('StocksWorkComponent', () => {
  let component: StocksWorkComponent;
  let fixture: ComponentFixture<StocksWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
