import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPassWordComponent } from './my-pass-word.component';

describe('MyPassWordComponent', () => {
  let component: MyPassWordComponent;
  let fixture: ComponentFixture<MyPassWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPassWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
