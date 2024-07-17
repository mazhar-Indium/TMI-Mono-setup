import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepAndVizComponent } from './rep-and-viz.component';

describe('RepAndVizComponent', () => {
  let component: RepAndVizComponent;
  let fixture: ComponentFixture<RepAndVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepAndVizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepAndVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
