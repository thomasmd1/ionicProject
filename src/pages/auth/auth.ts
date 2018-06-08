import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from "../../providers/auth/auth"
import { HomePage } from "../../pages/home/home"

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  public loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public view:ViewController,
    formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });

  }

  loginUser() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authProvider.loginUser(email, password).then(success => {
      this.navCtrl.setRoot(HomePage);
    })
    .catch(error => {
      if (error.code === "auth/user-not-found") {
        this.authProvider.signupUser(email, password).then(authData => {
          let alert = this.alertCtrl.create({
            title: 'Success !',
            subTitle: "Vous êtes connecté",
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(HomePage);
        }, error => {
          console.log(error)
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        })
      } else {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error,
          buttons: ['OK']
        });
        alert.present();
      }
      
    })
  }
}

