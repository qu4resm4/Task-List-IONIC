import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
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

  constructor(private db: StorageService) {}

  async exibirTarefas() {
    this.tarefas = null;
    this.tarefas = await this.db.getTarefas();
    console.log("EXIBINDO")
  }

  async criarTarefa() {
    if (this.novaTarefa.trim()) {
      const id = uuidv4();
      const task = {
        name: this.novaTarefa,
        activate: true
      };

      await this.db.addTarefa(id, task);
      this.novaTarefa = '';
      this.exibirTarefas();
    }
  }

  editarTarefa(tarefa: any) {
    this.tarefaEmEdicao = tarefa;
    this.novaTarefa = tarefa.name;
  }

  async salvarEdicao() {
    if (this.novaTarefa.trim()) {
      const id = this.tarefaEmEdicao.id;
      const task = {
        name: this.novaTarefa,
        activate: this.tarefaEmEdicao.activate
      };

      await this.db.updateTarefa(id, task);
      this.novaTarefa = '';
      this.tarefaEmEdicao = null;
      this.exibirTarefas();
    }
  }

  async excluirTarefa(tarefa: any) {
    await this.db.removeTarefa(tarefa.id)
    this.exibirTarefas();
  }

  ngOnInit() {
    this.exibirTarefas();
  }
}
