import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../providers/login.service';

// import { StorageService } from './../../providers/storage.service';
// import { TabsPage } from './../tabs/tabs.page';
// import { FieldsService } from '../../providers/fields.service';

@Component({
	selector: 'login-page',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: FormGroup;
	showErrors: boolean = false;

	constructor(
		// public translate: TranslateService,
		private _navCtrl: NavController,
		private formBuilder: FormBuilder,
		private _loginService: LoginService,
		private toastCtrl: ToastController,
		// private _storageService: StorageService,
		private loadingCtrl: LoadingController,
		// private _fieldsService:FieldsService
	) {

		this.login = this.formBuilder.group({
			user: ['', Validators.required],
			password: [''],
			alias: ['', Validators.required],
			showPassword: false
		});
	}

	public signIn(user: string, password: string, alias: string): void {
		let loading = this.loadingCtrl.create({
			dismissOnPageChange: true
		});
		loading.present();

		this._loginService.signIn(user, password, alias)
			.subscribe(() => {
				console.log('Sign in ok');
				// this._fieldsService.loadCheckedFields();
				// this._storageService.set(StorageService.ALIAS, alias).subscribe();
				this._navCtrl.setRoot(HomePage);
			},
			(authError) => {
				console.log('authError');
				console.log(authError);
				this.showErrorToast();
				loading.dismiss();
			});
	}

	public managePwd(passwordEl): void {
		passwordEl.type = this.login.controls.showPassword.value ? 'text' : 'password';
		passwordEl.setBlur();
		passwordEl.setFocus();
	}

	public showErrorToast(): void {

		// value is our translated string
		let toast = this.toastCtrl.create({
			message: 'Usuário ou senha invalidos!',
			duration: 5000,
			position: 'top',
			cssClass: 'error',
			showCloseButton: true,
			closeButtonText: 'X'
		});
		toast.present(toast);
	}

	public processKeyUp(e, el): void {
		if (e.keyCode == 13) { // 13 = enter
			el.setFocus();
		}
	}

	public processKeyUpLogin(e, user: string, password: string, alias: string): void {
		if (e.keyCode == 13) { // 13 = enter
			this.signIn(user, password, alias);
		}
	}

}
