import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomSelectionComponent} from './room-selection.component';
import {HttpClientModule} from "@angular/common/http";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from "@angular/material/bottom-sheet";

describe('RoomSelectionComponent', () => {
  let component: RoomSelectionComponent;
  let fixture: ComponentFixture<RoomSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatBottomSheetModule],
      providers: [
        {provide: MatBottomSheetRef, useValue: {}},
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}}
      ],
      declarations: [RoomSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
