import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  // Create
  async addTarefa(key: any, value: any) {
    await this.storage.set(key, value);
  }

  // Read
  async getTarefas() {
    const keys = await this.storage.keys();
    let tarefas = [];
    
    for (const key of keys) {
      const tarefa = await this.storage.get(key);
      tarefas.push({ id: key, ...tarefa });
    }
    
    return tarefas;
  }

  // Update
  async updateTarefa(key: string, value: any) {
    await this.storage.set(key, value);
  }

  // Delete
  async removeTarefa(key: string) {
    await this.storage.remove(key);
  }
}
