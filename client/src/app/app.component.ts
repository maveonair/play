import {Component} from '@angular/core';
import {ZonesService} from "./zones.service";
import {Zone} from "./models/zone";
import {Track} from "./models/track";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  zones: Zone[];
  currentZone: Zone;
  currentTrack: Track;
  background: SafeStyle;

  constructor(
    private zonesService: ZonesService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.zonesService.getZones()
      .subscribe(zones => {
        this.zones = zones;

        for (let zone of zones) {
          if (zone.is_playing) {
            this.currentZone = zone;
            break;
          }
        }

        if (!this.currentZone) {
          this.currentZone = zones[0];
        }

        this.fetchCurrentTrack();
      });
  }

  onChangedZone(zone: Zone): void {
    this.currentZone = zone;
    this.fetchCurrentTrack();
  }

  onChangedTrack(track: Track): void {
    this.currentTrack = track;
    this.updateBackground(track);
  }

  onFinishedTrack(isFinished: boolean): void {
    if (isFinished) {
      this.fetchCurrentTrack();
    }
  }

  private fetchCurrentTrack(): void {
    this.zonesService.getCurrentTrack(this.currentZone.ip_address)
      .subscribe(track => {
        this.currentTrack = track;
        this.updateBackground(track);
      });
  }

  private updateBackground(track: Track): void {
    this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${track.album_art})`)
  }
}
