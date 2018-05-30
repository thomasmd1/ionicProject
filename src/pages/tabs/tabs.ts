import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details';
import { PhotoPage } from '../photo/photo';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = PhotoPage;

  constructor() {

  }
}
