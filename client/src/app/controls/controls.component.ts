import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ZonesService} from "../zones.service";
import {Zone} from '../models/zone';
import {RoomSelectionComponent} from "../room-selection/room-selection.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Track} from "../models/track";
import {ThemePalette} from "@angular/material/core";
import {TrackPosition} from "../models/track-position";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() zones: Zone[];
  @Input() currentZone: Zone;
  @Input() currentTrack: Track;
  @Output() changedTrack = new EventEmitter<Track>();
  @Output() changedZone = new EventEmitter<Zone>();
  @Output() finishedTrack = new EventEmitter<boolean>();

  private positionInterval: any;
  trackPosition: TrackPosition;

  constructor(
    private zonesService: ZonesService,
    private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.clearPositionInterval();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('currentTrack')) {
      if (this.currentTrack) {
        this.trackPosition = new TrackPosition(this.currentTrack);
        this.startPositionInterval();
      }
    }
  }

  onPreviousTrack(): void {
    this.clearPositionInterval();

    this.zonesService.previous(this.currentZone.ip_address)
      .subscribe(track => {
        this.currentTrack = track;
        this.changedTrack.emit(track);
      });
  }

  onTogglePlay(): void {
    if (this.currentZone.is_playing) {
      this.currentZone.is_playing = false;
      this.zonesService.pause(this.currentZone.ip_address);

      this.clearPositionInterval();
    } else {
      this.zonesService.play(this.currentZone.ip_address);
      this.currentZone.is_playing = true;

      this.startPositionInterval();
    }
  }

  onNextTrack(): void {
    this.clearPositionInterval();

    this.zonesService.next(this.currentZone.ip_address)
      .subscribe(track => {
        this.currentTrack = track;
        this.changedTrack.emit(track);
      });
  }

  openRoomSelection(): void {
    const bottomSheetRef = this.bottomSheet.open(RoomSelectionComponent, {
      data: {
        current_zone: this.currentZone,
        zones: this.zones
      }
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        this.clearPositionInterval();

        this.currentZone = result;
        this.changedZone.emit(result)
      }
    });
  }

  private clearPositionInterval(): void {
    clearInterval(this.positionInterval);
  }

  private startPositionInterval(): void {
    this.positionInterval = setInterval(() => {
      if (this.trackPosition.finished()) {
        this.clearPositionInterval();
        this.finishedTrack.emit(true);
      } else {
        this.trackPosition.increment();
      }
    }, 1000);
  }
}
