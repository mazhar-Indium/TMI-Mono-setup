import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfilepicComponent } from './upload-profilepic.component';

describe('UploadProfilepicComponent', () => {
  let component: UploadProfilepicComponent;
  let fixture: ComponentFixture<UploadProfilepicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProfilepicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProfilepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
