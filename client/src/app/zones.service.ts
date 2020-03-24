import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {environment} from 'src/environments/environment';
import {Zone} from './models/zone';
import {catchError} from "rxjs/operators";
import {Track} from "./models/track";

@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.baseApiUrl}/zones`;
  }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.apiUrl)
      .pipe(
        catchError(
          this.handleError<Zone[]>('getZones', [])
        )
      );
  }

  getCurrentTrack(ipAddress: string): Observable<Track> {
    return this.httpClient.get<Track>(`${this.apiUrl}/${ipAddress}/current-track`)
      .pipe(
        catchError(
          this.handleError<Track>('getZones', {
            album: '',
            album_art: '',
            artist: '',
            title: '',
            duration: '',
            position: '',
          })
        )
      );
  }

  play(ipAddress: string): void {
    this.httpClient.put(`${this.apiUrl}/${ipAddress}/play`, {})
      .pipe(
        catchError(
          this.handleError('play')
        )
      ).subscribe();
  }

  pause(ipAddress: string): void {
    this.httpClient.put(`${this.apiUrl}/${ipAddress}/pause`, {})
      .pipe(
        catchError(
          this.handleError('pause')
        )
      ).subscribe();
  }

  next(ipAddress: string): Observable<Track> {
    return this.httpClient.put<Track>(`${this.apiUrl}/${ipAddress}/next`, {})
      .pipe(
        catchError(
          this.handleError<Track>('getZones', {
            album: '',
            album_art: '',
            artist: '',
            title: '',
            duration: '',
            position: '',
          })
        )
      );
  }

  previous(ipAddress: string): Observable<Track> {
    return this.httpClient.put<Track>(`${this.apiUrl}/${ipAddress}/previous`, {})
      .pipe(
        catchError(
          this.handleError<Track>('getZones', {
            album: '',
            album_art: '',
            artist: '',
            title: '',
            duration: '',
            position: '',
          })
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
