import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth.service';
import { LoginPage } from '../login/login.page'
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  novaTarefa: string = '';
  tarefas: any = null;
  tarefaEmEdicao: any = null;
  idUser: string | null = 'initialized_fail';

  constructor(private db: StorageService, private authService: AuthService) {} // Injeta o AuthService

  // Função para exibir as tarefas
  async exibirTarefas() {
    this.tarefas = null;
    this.tarefas = await this.db.getTarefas(this.idUser || '');
    console.log('EXIBINDO');
  }

  // Função para criar uma nova tarefa
  async criarTarefa() {
    if (this.novaTarefa.trim()) {
      const idTarefa = uuidv4();
      const task = {
        name: this.novaTarefa,
        activate: true
      };

      await this.db.addTarefa(this.idUser || '', idTarefa, task);
      this.novaTarefa = '';
      this.exibirTarefas();
    }
  }

  // Função para editar uma tarefa
  editarTarefa(tarefa: any) {
    this.tarefaEmEdicao = tarefa;
    this.novaTarefa = tarefa.name;
  }

  // Função para salvar as edições feitas em uma tarefa
  async salvarEdicao() {
    if (this.novaTarefa.trim()) {
      const id = this.tarefaEmEdicao.id;
      const task = {
        name: this.novaTarefa,
        activate: this.tarefaEmEdicao.activate,
      };

      await this.db.updateTarefa(this.idUser || '', id, task);
      this.novaTarefa = '';
      this.tarefaEmEdicao = null;
      this.exibirTarefas();
    }
  }

  // Função para excluir uma tarefa
  async excluirTarefa(tarefa: any) {
    await this.db.removeTarefa(this.idUser || '', tarefa.id);
    this.exibirTarefas();
  }

  // Função de logout
  async logout() {
    await this.authService.logout(); // Chama o serviço de logout
  }

  async getUserId() {
    this.idUser = await this.authService.getUserID();
  }

  // Função inicial para exibir as tarefas ao carregar a página
  ngOnInit() {
    this.getUserId();
    this.exibirTarefas();
  }
}
