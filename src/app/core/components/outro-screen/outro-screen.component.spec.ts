import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutroScreenComponent } from './outro-screen.component';

describe('OutroScreenComponent', () => {
  let component: OutroScreenComponent;
  let fixture: ComponentFixture<OutroScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutroScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutroScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
