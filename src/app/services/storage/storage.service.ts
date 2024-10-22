import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Tarefa {
  name: string;
  activate: boolean;
}

interface Tarefas {
  [idTarefa: string]: Tarefa;  // Mapeia cada ID de tarefa para um objeto Tarefa
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;  // Variável para guardar a instância do storage

  constructor(private storage: Storage) {
    this.init();  // Inicializa o storage ao criar o serviço
  }

  // Inicializa o Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;  // Atribui o storage criado à variável _storage
  }

  // Verifica se o Storage está inicializado
  private isReady() {
    if (!this._storage) {
      throw new Error("Storage não foi inicializado corretamente");
    }
  }

  // Create - Adiciona uma tarefa
  async addTarefa(userID: string, idTarefa: string, tarefa: any) {
    this.isReady();  // Verifica se o Storage está pronto
    const tarefas: Tarefas = (await this._storage?.get(userID)) || {};  // Obtém as tarefas existentes ou um objeto vazio
    tarefas[idTarefa] = tarefa;  // Adiciona ou atualiza a tarefa
    await this._storage?.set(userID, tarefas);  // Armazena o objeto atualizado
  }

  // Read - Obtém todas as tarefas de um usuário
  async getTarefas(userID: string): Promise<{ id: string; name: string; activate: boolean }[]> {
    this.isReady();  // Verifica se o Storage está pronto
    const tarefas: Tarefas = (await this._storage?.get(userID)) || {};  // Obtém as tarefas do usuário ou um objeto vazio
    return Object.entries(tarefas).map(([id, tarefa]) => ({ id, ...tarefa }));  // Retorna um array de tarefas
  }

  // Update - Atualiza uma tarefa existente
  async updateTarefa(userID: string, idTarefa: string, tarefa: any) {
    this.isReady();  // Verifica se o Storage está pronto
    const tarefas: Tarefas = (await this._storage?.get(userID)) || {};  // Obtém as tarefas existentes
    if (tarefas[idTarefa]) {  // Verifica se a tarefa existe
      tarefas[idTarefa] = tarefa;  // Atualiza a tarefa
      await this._storage?.set(userID, tarefas);  // Armazena o objeto atualizado
    }
  }

  // Delete - Remove uma tarefa pelo ID
  async removeTarefa(userID: string, idTarefa: string) {
    this.isReady();  // Verifica se o Storage está pronto
    const tarefas: Tarefas = (await this._storage?.get(userID)) || {};  // Obtém as tarefas existentes
    if (tarefas[idTarefa]) {  // Verifica se a tarefa existe
      delete tarefas[idTarefa];  // Remove a tarefa
      await this._storage?.set(userID, tarefas);  // Armazena o objeto atualizado
    }
  }
}
