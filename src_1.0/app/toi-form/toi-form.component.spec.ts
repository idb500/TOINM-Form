import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiFormComponent } from './toi-form.component';

describe('ToiFormComponent', () => {
  let component: ToiFormComponent;
  let fixture: ComponentFixture<ToiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
