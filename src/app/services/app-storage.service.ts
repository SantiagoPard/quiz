import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private storageObject: Storage | null = null;

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    this.storageObject = await this.storage.create();
  }
  async get<T>(key: string): Promise<any>{
    return await this.storageObject?.get(key);
    
   }
  set<T>(key:string, value:T):void{
    this.storageObject?.set(key, value);
  }
}

