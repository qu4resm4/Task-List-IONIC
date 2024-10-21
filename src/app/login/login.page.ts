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
  userId: string | null = null; // Armazena o UID do usuário

  constructor(
    private afAuth: AngularFireAuth, 
    private toastController: ToastController, 
    private loadingController: LoadingController, 
    private router: Router 
  ) {}

  // Função de login
  async login() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();  
      this.isAuthenticated = true; 
      
      // Obtém o UID do usuário
      this.userId = userCredential.user?.uid || null;
      console.log('UID do usuário:', this.userId);

      this.showToast('Login bem sucedido'); 

      // Redireciona pra página Home
      this.router.navigate(['/home']); 

    } catch (error) {
      await loading.dismiss();  
      this.showToast('E-mail ou senha incorretos.'); 
    }
  }

   // Função para logout
   async logout() {
    await this.afAuth.signOut();
    this.showToast('Desconectado com sucesso!');

    // Redireciona para a tela de login
    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
