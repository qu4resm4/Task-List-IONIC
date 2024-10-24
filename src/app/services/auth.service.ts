import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId: string | null = null;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  setUserID(i: string) {
    this.userId = i;
    console.log("foi setado")
  }

  getUserID(){
    return this.userId;
  }

  // Logout usando Firebase
  async logout() {
    try {
      await this.afAuth.signOut(); 
      console.log("Usuário desconectado");
      
      // Após o logout, redireciona pra página login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Erro ao desconectar: ", error);
    }
  }

   resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('E-mail de redefinição enviado.');
      })
      .catch((error) => {
        console.error('Erro ao enviar e-mail de redefinição: ', error);
        throw error;
      });
  }
}

