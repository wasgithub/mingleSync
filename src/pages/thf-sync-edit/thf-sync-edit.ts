import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { THFSyncService } from '@totvs/thf-sync/services/thf-sync/thf-sync.service';
import { Customer } from '../../models/customer.model';

/**
 * Generated class for the ThfSyncEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thf-sync-edit',
  templateUrl: 'thf-sync-edit.html',
})
export class ThfSyncEditPage {

  customer: Customer = new Customer();
  title: string = '';
  public header: boolean = true;


  constructor(public viewCtrl: ViewController, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              public thfSync: THFSyncService, 
              public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThfSyncEditPage');
  }

  save() {
    const model = this.thfSync.getModel("Customers");

    model.save(this.customer)
        .then(() => {
            alert('Dados salvos com sucesso!');
        });
  }
}
