import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //Es una forma de importar servicios, con esto ya no hay necesidad de importar el servicio y ponerlo en el providers de app.module
})
export class SpotifyService {

  public token:string;

  constructor(
    private _http: HttpClient
  ) {
    console.log('Spotify service listo');
    this.getToken();
  }

  getToken(){
		return this._http.get('http://localhost:3000/spotify/a57ba49f365744fea157670551a3cd13/8871f93f48114041abcfa7910b3f6667').subscribe((resp:any)=>{
      this.token=resp.access_token;
      console.log(this.token);
    });
	}

  getQuery(query:string) {
    const URL = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer `+this.token
    });

    return this._http.get(URL, { headers });
  }

  getNewReleases() {
    /* const headers = new HttpHeaders({
      'Authorization': '*'
    }); */
    return this.getQuery('browse/new-releases')
    .pipe( map(data=>{
      return data['albums'].items;//Se pone los corchetes y comillas en vez de .(data.albums) o se define a la data tipo any (data:any en la linea superior), ambos resuelven lo mismo
    }) );
    //this._http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
  }

  getArtistas(termino:string) {
    /* const headers = new HttpHeaders({
      'Authorization': '*'
    }); */
    //this._http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe( map(data=>data['artists'].items) );
  }

  getArtista(id:string) {
    return this.getQuery(`artists/${ id }`);//.pipe( map(data=>data['artists'].items) );
  }

  getTopTracks(id:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe( map(data=>data['tracks']) );
  }
}
