import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [

    MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {

    titulo: "Gabriel Santos",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível!",
    qntd_likes: 12,
    qtnd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = new Array<any>();
  public page = 1;
  public nome_usuario: string = "Gabriel Santos";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) { }

  abrirCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

  fecharCarregando() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1: number, num2: number): void {

    alert(num1 + num2);
  }

  doRefresh(refresher) {

    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  ionViewDidEnter() {

    this.carregarFilmes();
  }

  abrirDetalhes(filme) {

    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {

    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false) {

    this.abrirCarregando();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {

        const response = (data as any);

        if (newpage) {

          this.lista_filmes = this.lista_filmes.concat(response.results);
          console.log(this.lista_filmes);
          this.infiniteScroll.complete();
        } else if (this.lista_filmes.length == 0) {
          
          this.lista_filmes = response.results;
        }

        this.fecharCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fecharCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
  }

}
