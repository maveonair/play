import {Track} from "./track";

export class TrackPosition {
  private position: number;
  private readonly duration: number;

  constructor(track: Track) {
    this.position = this.getTimeInSeconds(track.position);
    this.duration = this.getTimeInSeconds(track.duration);
  }

  getValue() {
    return Math.abs(this.position * 100 / this.duration);
  }

  increment() {
    this.position++;
  }

  finished() {
    return this.position === this.duration;
  }

  private getTimeInSeconds(hms): number {
    const a = hms.split(':'); // split it at the colons

    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  }
}
