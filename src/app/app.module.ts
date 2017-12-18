import { PROVIDERS } from './../providers/providers';
import { PAGES } from './../pages/pages';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Configuration, MingleModule } from '@totvs/mobile-mingle';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

export function mingleFactory() {
  
    let config = new Configuration();
  
    config.app_identifier = '5a32a617c8bee300017fe862';
    config.environment = 'DEV';
    config.server = 'http://thfservices.totvs.com.br:8083';
    config.modules.crashr = false;
    config.modules.usage_metrics = true;
    config.modules.gateway = true;
  
    return config;
  }

@NgModule({
  declarations: [
    MyApp,
    PAGES
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MingleModule.forRoot({
			provide: Configuration,
			useFactory: mingleFactory
		})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PAGES
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PROVIDERS
  ]
})
export class AppModule {}
