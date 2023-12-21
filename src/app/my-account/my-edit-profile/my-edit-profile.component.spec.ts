import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEditProfileComponent } from './my-edit-profile.component';

describe('MyEditProfileComponent', () => {
  let component: MyEditProfileComponent;
  let fixture: ComponentFixture<MyEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
