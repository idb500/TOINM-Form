import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentexistsComponent } from './documentexists.component';

describe('DocumentexistsComponent', () => {
  let component: DocumentexistsComponent;
  let fixture: ComponentFixture<DocumentexistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentexistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentexistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
