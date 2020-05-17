import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateAvatarDialogComponent } from './user-update-avatar-dialog.component';

describe('UserUpdateAvatarDialogComponent', () => {
  let component: UserUpdateAvatarDialogComponent;
  let fixture: ComponentFixture<UserUpdateAvatarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateAvatarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateAvatarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
