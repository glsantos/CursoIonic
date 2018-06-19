import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

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

    titulo:"Gabriel Santos",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível!",
    qntd_likes: 12,
    qtnd_comments: 4,
    time_comment: "11h ago"
  }


  public lista_filmes = new Array<any>();

  public nome_usuario: string = "Gabriel Santos";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider
  ) {
  }

  public somaDoisNumeros(num1: number, num2: number): void{
    
    alert(num1+num2);
  }

  ionViewDidLoad() {
    
    this.movieProvider.getLatestMovies().subscribe(
      data=>{

        const response =(data as any);
      
        this.lista_filmes = response.results;
      }, error=>{
          console.log(error);
      }
    );
  }

}