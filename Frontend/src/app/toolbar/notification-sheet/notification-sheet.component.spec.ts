import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSheetComponent } from './notification-sheet.component';

describe('NotificationSheetComponent', () => {
  let component: NotificationSheetComponent;
  let fixture: ComponentFixture<NotificationSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
