import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Toiform1Component } from './toiform1.component';

describe('Toiform1Component', () => {
  let component: Toiform1Component;
  let fixture: ComponentFixture<Toiform1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Toiform1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Toiform1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
