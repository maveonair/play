import {Component, Inject, OnInit} from '@angular/core';
import {ControlsComponent} from "../controls/controls.component";
import {RoomSelectionData} from "../models/room-selection-data";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Zone} from "../models/zone";

@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.scss']
})
export class RoomSelectionComponent implements OnInit {

  constructor(
    public bottomSheetRef: MatBottomSheetRef<ControlsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: RoomSelectionData) {
  }

  ngOnInit(): void {
  }

  onClick(zone: Zone): void {
    this.bottomSheetRef.dismiss(zone);
  }
}
