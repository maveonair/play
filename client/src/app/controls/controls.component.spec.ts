import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ControlsComponent} from './controls.component';
import {HttpClientModule} from "@angular/common/http";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatBottomSheetModule],
      declarations: [ControlsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
