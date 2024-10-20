import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Simulação de um método de logout
  logout() {
    // Aqui você deve implementar a lógica para desconectar o usuário
    console.log("Usuário desconectado");
    // Por exemplo, você pode remover o token de autenticação do armazenamento local
    // localStorage.removeItem('token');
  }
}
