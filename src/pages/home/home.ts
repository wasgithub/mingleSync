import { LoginPage } from './../login/login';
import { LoginService } from './../../providers/login.service';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Customer } from '../../models/customer.model';
import { THFSyncService } from '@totvs/thf-sync/services/thf-sync/thf-sync.service';
import { THFModelSchema } from '@totvs/thf-sync/models/thf-model-schema';
import { THFSyncConfig } from '@totvs/thf-sync/models/thf-sync-config';
import { THFNetworkType } from '@totvs/thf-sync/enums/thf-network-type.enum';
import { THFRequestType } from '@totvs/thf-sync/enums/thf-request-type.enum';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ThfSyncEditPage } from '../thf-sync-edit/thf-sync-edit';
import { MingleService } from '@totvs/mobile-mingle';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customers: Customer[];
  hasNext: boolean;
  currentPage: number;
  public header:boolean = true;

  constructor(public navCtrl: NavController, 
              private _loginService: LoginService, 
              private _app: App, 
              private thfSync: THFSyncService, 
              private toastCtrl: ToastController,
              private mingle: MingleService
              ) {
    this.currentPage = 1;
    this.hasNext = false;
   // this.buildSchemas();
  }

  mapSchemas(): Promise<any> {
    let customerSchema = new THFModelSchema({
      getUrlApi: '/ping',
      diffUrlApi: 'api/v1/customers/diff',
      // getUrlApi: 'http://thfservices.totvs.com.br/customer-api/api/v1/customers',
      // diffUrlApi: 'http://thfservices.totvs.com.br/customer-api/api/v1/customers/diff',
      name: 'Customers',
      fields: [
        'id', 'name'
      ],
      pageSize: 20,
      deletedField: 'deleted',
      idField: 'id'
    });

    return this.thfSync.prepare([customerSchema], new THFSyncConfig(THFNetworkType._ethernet, 4500))
      .then(() => {
        // this.thfSync.sync();
        this.thfSync.loadData()
          .subscribe((res) => {
            console.log("Retorno subscribe");
            res.forEach(
              (el) => {
                console.log('Entity: ' + el.entity + ' (' + el.data.length + ' loaded)');
                this.customers = el.data;
              }
            )
          });        
        console.log("Schemas mapped");
      });
  }

  ionViewDidEnter() {
    this.mapSchemas()
      .then(() => {
        this.getData();
        console.log("chamou")
      });
    this.thfSync.onSync().subscribe(() => {
      this.getData();
    });
  }

  itemTapped(event, customer) {
    this.navCtrl.push(ThfSyncEditPage, {
      customer: customer
    });
  }

  newCustomer() {
    this.navCtrl.push(ThfSyncEditPage, {});
  }

  getData() {
    this.thfSync.getModel('Customers').find()
      .page(this.currentPage)
      .sort("name")
      .pageSize(10)
      // .select("id name")
      .exec()
      .then((data) => {
        this.customers = data.items;
        console.log("xitao")
        console.log(data.items)
        this.hasNext = data.hasNext;
      });
      console.log(this.customers);
  }

  // newCustomer() {
  //   this.navCtrl.push(ThfSyncEditPage, {});
  // }

  nextPage() {
    this.currentPage++;
    this.getData();
  }

  prevPage() {
    this.currentPage--;
    this.getData();
  }

  sync() {
    console.log("Syncing");
    this.thfSync.sync()
    .then(() => {
      this.getData();
      console.log("Synced");
      let toast = this.toastCtrl.create({
        message: 'Data synced',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    })
    .catch((err) => {
      console.log("Error on sync: ", err);
    });
  }
  
  logout() {
    this._loginService.signOut().subscribe(
      () => {
        this._app.getRootNav().setRoot(LoginPage);
        console.log("Usuário deslogado");
      }
    );
  }

  // buildSchemas() {
  //   console.log('loaddata....')
  //   let customerSchema = new THFModelSchema({
  //     urlApi: 'http://localhost:8200/api/v1/customers',
  //     name: 'Customers',
  //     fields: [
  //       'id', 'name'
  //     ],
  //     pageSize: 20
  //   });

  //   let userSchema = new THFModelSchema({
  //     urlApi: 'http://localhost:8200/api/v1/users',
  //     name: 'Users',
  //     fields: [
  //       'id', 'name', 'login'
  //     ],
  //     pageSize: 20
  //   });

  //   this.thfSync.prepare([customerSchema, userSchema])
  //     .then(() => {
  //       console.log("Schemas ready");
  //       this.thfSync.loadData()
  //         .subscribe((res) => {
  //           console.log("Retorno subscribe");
  //           res.forEach(
  //             (el) => {
  //               console.log('Entity: ' + el.entity + ' (' + el.data.length + ' loaded)');
  //               this.customers = el.data;
  //             }
  //           )
  //         });
  //     });
  // } 
}
