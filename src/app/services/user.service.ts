import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';


@Injectable({
providedIn: 'root'
})
export class UserService {
  constructor(
    public storageService: StorageService
  ) { }


  async saveUser(user) {

    await this.storageService.set('user', JSON.stringify(user));
    console.log("save user");
    
    //const testUser = await this.storageService.get('user');
    //console.log("test local storage", testUser);
  }

  async getUser() {
    return await this.storageService.get('user');
  }

  async deleteUser() {
    return await this.storageService.delete('user');
  }
}
