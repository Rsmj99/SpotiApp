import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  //paises: any[] = [];
  constructor(
    private _spotify: SpotifyService
    //private _http: HttpClient
  ) {
    /* console.log('Constructor del home hecho');
    this._http.get('https://restcountries.eu/rest/v2/lang/es').subscribe( (resp:any) => {
      this.paises = resp;
      console.log(resp);
    } ); */
    //Si da errores en la consola, ejecutar con: ng serve --prod
    this.loading = true;
    this.error = false;
    this._spotify.getNewReleases().subscribe((data:any)=>{
      this.nuevasCanciones = data;
      this.loading = false;
    }, (errorServicio)=> {
      this.loading = false;
      this.error = true;
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;
    });
  }
}
