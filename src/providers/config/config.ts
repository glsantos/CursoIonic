import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let config_KEY_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {

    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {

  }

  // Recupera os dados do LocalStorage
  getConfigData(): any{
    
    return localStorage.getItem(config_KEY_name);
  }

  // Grava os dados do LocalStorage
  setConfigData(showSlide?: boolean, name?: string, username?: string){

    let config = {

      showSlide: false,
      name: "",
      username: ""
    };

    if(showSlide){

      config.showSlide = showSlide;
    }

    if(name){

      config.name = name
    }

    if(username){

      config.username = username;
    }

    localStorage.setItem(config_KEY_name, JSON.stringify(config));
  }

}
