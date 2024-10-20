import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

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
  async addTarefa(key: any, value: any) {
    this.isReady();  // Verifica se o Storage está pronto
    await this._storage?.set(key, value);
  }

  // Read - Obtém todas as tarefas
  async getTarefas() {
    this.isReady();  // Verifica se o Storage está pronto
    const keys = await this._storage?.keys();
    let tarefas = [];

    if (keys) {
      for (const key of keys) {
        const tarefa = await this._storage?.get(key);
        if (tarefa) {
          tarefas.push({ id: key, ...tarefa });
        }
      }
    }
    
    return tarefas;
  }

  // Update - Atualiza uma tarefa existente
  async updateTarefa(key: string, value: any) {
    this.isReady();  // Verifica se o Storage está pronto
    await this._storage?.set(key, value);
  }

  // Delete - Remove uma tarefa pelo ID
  async removeTarefa(key: string) {
    this.isReady();  // Verifica se o Storage está pronto
    await this._storage?.remove(key);
  }
}
