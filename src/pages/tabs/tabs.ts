import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { News } from '../news/news';
import { BookingPage } from '../booking/main/booking';
import { Profile } from '../profile/internal-main/profile';
import { TransactionHistoryPage } from '../transactions/main/transaction-history';
import { Messenger } from '../messenger/messenger';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Messenger;
  tab3Root = Profile;
  tab4Root = BookingPage;
  tab5Root = TransactionHistoryPage;

  constructor() {

  }
}
