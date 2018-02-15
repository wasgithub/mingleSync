import { PROVIDERS } from './../providers/providers';
import { PAGES } from './../pages/pages';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Configuration, MingleModule, MingleHttpInterceptor } from '@totvs/mobile-mingle';
import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';



import { THFSyncService } from '@totvs/thf-sync/services/thf-sync/thf-sync.service';
import { THFEventSourcingService } from '@totvs/thf-sync/services/thf-event-sourcing/thf-event-sourcing.service';
import { THFNetworkService } from '@totvs/thf-sync/services/thf-network/thf-network.service';
import { THFStorageModule } from '@totvs/thf-storage';
import { Network } from '@ionic-native/network';
import { ThfSyncEditPage } from '../pages/thf-sync-edit/thf-sync-edit';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



export function mingleFactory() {
  
    let config = new Configuration();
  
    config.app_identifier = '5a62216ffbf1bb0001c88e6f';
    config.environment = 'DEV';
    config.server = 'https://dev-mingle.totvs.com.br/api';
    config.modules.crashr = false;
    config.modules.usage_metrics = true;
    config.modules.gateway = true;
  
    return config;
  }

@NgModule({
  declarations: [
    MyApp,
    PAGES,
    ThfSyncEditPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    MingleModule.forRoot({
			provide: Configuration,
			useFactory: mingleFactory,
    }),
    THFStorageModule.forRoot({
      name: "test",
      storeName: "testdb",
      driverOrder: ['websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PAGES,
    ThfSyncEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PROVIDERS,
    THFSyncService,
    THFEventSourcingService,
    THFNetworkService,
    Network,
    { provide: HTTP_INTERCEPTORS, useClass: MingleHttpInterceptor, multi: true }
  ]
})
export class AppModule {}
