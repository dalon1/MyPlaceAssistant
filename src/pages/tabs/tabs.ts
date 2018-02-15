import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { News } from '../news/news';
import { BookingPage } from '../booking/booking';
import { Profile } from '../profile/profile';
import { OneToOnePage } from '../one2one/one-to-one';
import { TransactionHistory } from '../transactions/transaction-history';
import { Messenger } from '../messenger/messenger';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Messenger;
  tab3Root = Profile;
  tab4Root = BookingPage;
  tab5Root = TransactionHistory;

  constructor() {

  }
}
