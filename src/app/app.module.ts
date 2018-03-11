import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AngularFireAuthModule} from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'; // Dependency not being used.
import { File } from '@ionic-native/file'; // Dependency not being used.
import { Camera } from '@ionic-native/camera'; // Dependency not being used.

import { MainApp } from './app.component';

import { HttpModule } from "@angular/http";

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { Welcome } from '../pages/welcome/welcome';
import { News } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news/news-details';
import { NewsAddForm } from '../pages/news-manage/news-add-form';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Profile } from '../pages/profile/internal-main/profile';
import { ProfileForm } from '../pages/profile/form/profile-form';
import { ExternalProfile } from '../pages/profile/external-main/external-profile';
import { FilesPage } from '../pages/file-page/files-page';
import { FileAddForm } from '../pages/file-manage/file-add-form';
import { FileDetailPage } from '../pages/file-details/file-details';
import { FileUpload } from '../pages/file-upload/file-upload';

// My Place Assistant: New Pages >>
import { Signup } from '../pages/signup/user-form/signup';
import { SignUpPaymentFormPage } from '../pages/signup/payment-form/signup-payment';
import { SignUpPlaceFormPage } from '../pages/signup/place-form/signup-place';

import { PaymentMethodPage } from '../pages/payment-method/main/payment-method';
//import { PaymentMethodDetailsPage } from '../pages/payment-method/details/payment-method-details';
//import { PaymentMethodDetailsPage } from '../pages/payment-method/details/payment-method-details';
import { PaymentMethodFormPage } from '../pages/payment-method/form/payment-method-form';
import { PaymentMethodSelectPage } from '../pages/payment-method/select/payment-method-select';

import { TransactionHistoryPage } from '../pages/transactions/main/transaction-history';
import { TransactionDetailsPage } from '../pages/transactions/details/transaction-details';
import { TransactionFormPage } from '../pages/transactions/form/transaction-form';

import { MyPlacePage } from '../pages/myplace/main/myplace';
import { MyPlaceDetailsPage } from '../pages/myplace/details/myplace-details';
import { MyPlaceFormPage } from '../pages/myplace/form/myplace-form';
import { MyPlaceSelectPage } from '../pages/myplace/select/myplace-select';

import { BookingPage } from '../pages/booking/main/booking';
import { BookingFormPage } from '../pages/booking/form/booking-form';
import { BookingDetailsPage } from '../pages/booking/details/booking-details';

import { Messenger } from '../pages/messenger/messenger';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Camera } from '@ionic-native/camera'; npm install --save @ionic-native/core@4.2.0 - current 3.12.1
import { AuthService } from '../providers/auth-service/auth-service';
import { Common } from '../providers/common/common';
import { SplitPane } from '../providers/split-pane/split-pane';
import { DataService } from '../providers/data-service/data-service';
import { FileManager } from '../providers/data-service/file-service';
import { FileCommentManager } from '../providers/data-service/file-comments-service'
import { UserManager } from '../providers/data-service/user-service';
import { NewsManager} from '../providers/data-service/news-service';
import { CountryManager } from '../providers/data-service/country-service';

// My Place Assistant : New Providers >>
import { BookingManager } from '../providers/data-service/booking-service';
import { PaymentMethodManager } from '../providers/data-service/payment-method-service';
import { PlaceManager } from '../providers/data-service/place-service';
import { FacilityManager } from '../providers/data-service/facility-service';
import { TransactionManager } from '../providers/data-service/transaction-service';

import { UserIdPipe } from '../utils/pipes/user-id-pipe';
import { EnumToArray } from '../utils/pipes/enum-to-array';
import { MaskCardNumber } from '../utils/pipes/mask-card-number';
import { MaskRefNumber } from '../utils/pipes/mask-ref-number';

import { LocalSession } from '../providers/session/local-session';

export const firebaseConfig = {
  apiKey: "AIzaSyDNmA_voZbbnbJ5S6JwvddZRbq70yvXAn8",
  authDomain: "myplaceassistant-x2018.firebaseapp.com",
  databaseURL: "https://myplaceassistant-x2018.firebaseio.com",
  projectId: "myplaceassistant-x2018",
  storageBucket: "myplaceassistant-x2018.appspot.com",
  messagingSenderId: "1746596476"
}


@NgModule({
  declarations: [
    MainApp,
    HomePage,
    TabsPage,
    Signup,
    SignUpPlaceFormPage,
    SignUpPaymentFormPage,
    Login,
    Welcome,
    News,
    NewsDetailPage,
    NewsAddForm,
    ResetPassword,
    Profile,
    ProfileForm,
    ExternalProfile,
    FileAddForm,
    FilesPage,
    FileDetailPage,
    UserIdPipe,
    EnumToArray,
    MaskCardNumber,
    MaskRefNumber,
    FileUpload,
    PaymentMethodPage,
   // PaymentMethodDetailsPage,
    PaymentMethodFormPage,
    PaymentMethodSelectPage,
    TransactionHistoryPage,
    TransactionDetailsPage,
    TransactionFormPage,
    MyPlacePage,
    MyPlaceDetailsPage,
    MyPlaceFormPage,
    MyPlaceSelectPage,
    BookingPage,
    BookingFormPage,
    BookingDetailsPage,
    Messenger
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MainApp),    
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,    
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MainApp,
    HomePage,
    TabsPage,
    Signup,
    SignUpPlaceFormPage,
    SignUpPaymentFormPage,
    Login, 
    Welcome,
    News,
    NewsDetailPage,
    NewsAddForm,
    ResetPassword,
    Profile,
    ProfileForm,
    ExternalProfile,
    FileAddForm,
    FilesPage,
    FileDetailPage,
    FileUpload,
    PaymentMethodPage,
    //PaymentMethodDetailsPage,
    PaymentMethodFormPage,
    PaymentMethodSelectPage,
    TransactionHistoryPage,
    TransactionDetailsPage,
    TransactionFormPage,
    MyPlacePage,
    MyPlaceDetailsPage,
    MyPlaceFormPage,
    MyPlaceSelectPage,
    BookingPage, 
    BookingFormPage,
    BookingDetailsPage,
    Messenger
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Common,
    SplitPane,
    AngularFireModule,
    DataService,
    FileManager,
    FileCommentManager,
    UserManager,
    NewsManager,
    CountryManager,
    LocalSession,
    PlaceManager,
    FacilityManager,
    BookingManager, 
    PaymentMethodManager,
    TransactionManager
  ]
})
export class AppModule {}
