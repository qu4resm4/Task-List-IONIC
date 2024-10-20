import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router // Injetando o Router
  ) {}

  async login() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const user = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();
      this.isAuthenticated = true;
      this.showToast('LOGIN EFETUADO COM SUCESSO');

      // Redireciona para a página HomePage após login bem-sucedido
      this.router.navigate(['/home']); 

    } catch (error) {
      await loading.dismiss();
      this.showToast('E-MAIL OU SENHA INCORRETOS');
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.isAuthenticated = false;
    this.showToast('DESCONECTADOS COM SUCESSO');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
