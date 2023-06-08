import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { User } from 'src/user.class';

export interface kitapBilgi {
  id?: string;
  kitapIsim?: string;
  kitapYazar?: string;
  kitapSayfa?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FireService {
  constructor(private firestore: Firestore, private auth:Auth) {}

  kayitListele() {
    const kitapSonuc = collection(this.firestore, 'kitaplar');
    return collectionData(kitapSonuc, { idField: 'id' });
  }

  yeniKayit(kitap: kitapBilgi) {
    const kitapSonuc = collection(this.firestore, 'kitaplar');
    return addDoc(kitapSonuc, kitap);
  }

  siraliKayitListele() {
    const kitapSonuc = collection(this.firestore, 'kitaplar');
    const q = query(kitapSonuc, orderBy('kitapSayfa', 'desc'));
    return collectionData(q);
  }

  kitapSil(id: kitapBilgi['id']) {
    const kitapSonuc = doc(this.firestore, `kitaplar/${id}`);
    return deleteDoc(kitapSonuc);
  }

  kitapGuncelle(kitap: kitapBilgi) {
    console.log(kitap.id)
    const kitapSonuc = doc(this.firestore, `kitaplar/${kitap.id}`);
    return updateDoc(kitapSonuc, {
      kitapIsim: kitap.kitapIsim,
      kitapYazar: kitap.kitapYazar,
      kitapSayfa: kitap.kitapSayfa,
    });
  }

   async kayitOl(user:User)
  {
    try {
      const kayitliKullanici = await createUserWithEmailAndPassword(this.auth,user.email,user.password);
      return kayitliKullanici;
    } catch (error) {
      return error;
    }   
  }

  async girisYap(user:User)
  {
    try {
      const kullanici = await signInWithEmailAndPassword(this.auth,user.email,user.password);
      return kullanici;
    } catch (error) {
      return error;
    }   
  }
 
  cikisYap()
  {
    signOut(this.auth);
  }

}
