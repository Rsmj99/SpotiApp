import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(
    private _router: ActivatedRoute,
    private _spotify: SpotifyService
  ) {
    this.loading=true;
    this._router.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id:string) {
    this.loading = true;
    this._spotify.getArtista(id).subscribe(artista => {
      console.log(artista);
      this.artista = artista;
      this.loading = false;
    });
  }

  getTopTracks(id:string) {
    this._spotify.getTopTracks(id).subscribe(topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }
}
