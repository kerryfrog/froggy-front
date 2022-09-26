// import { Injectable } from '@angular/core';
// import { Plugins } from '@capacitor/core';

// import { Storage } from '@capacitor/storage';


// @Injectable({
//   providedIn: 'root'
// })
// export class LocalStorageService {

//   constructor() { }
//   async setLocalStorage(key, value) {
//     await Storage.set({
//       key,
//       value,
//     });
//   }

//   async getLocalStorage(key) {
//     const valueObj = await Storage.get({ key });
//     if (valueObj.value) {
//       return valueObj;
//     }
//   }

//   async storeFavorite(type, targetId) {
//     let key = '';
//     if (type === 'yarn') key = 'favoriteYarn';
//     else if (type === 'pattern') key = 'favoritePattern';

//     const favoriteList = await this.getFavorite(key);

//     if (!favoriteList) {
//       await this.setLocalStorage(key, JSON.stringify([targetId]));
//       return [targetId];
//     } else {
//       const newList = [...favoriteList, targetId];
//       await this.setLocalStorage(key, JSON.stringify(newList));
//       return newList;
//     }
//   }

//   async getFavorite(key) {
//     const favoriteObj = await this.getLocalStorage(key);
//     if (!favoriteObj) return false;
//     else return JSON.parse(favoriteObj.value);
//   }

//   async removeFavorite(type, targetId) {
//     let key = '';
//     if (type === 'yarn') key = 'favoriteYarn';
//     else if (type === 'pattern') key = 'favoritePattern';

//     const favoriteList = await this.getFavorite(key);

//     if (!favoriteList) return;

//     const newList = favoriteList.filter((id) => id !== targetId);

//     await this.setLocalStorage(key, JSON.stringify(newList));

//     return newList;
//   }


// }
