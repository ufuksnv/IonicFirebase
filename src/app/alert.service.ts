import { Injectable } from '@angular/core';
import{FireService,kitapBilgi} from './fire.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/user.class';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private fireService:FireService, private alertController:AlertController) {  }

  async ekleAlert() {
    const alert = await this.alertController.create({
      header: 'Kitap Ekle',
      inputs: [
        {
          name: 'kitapIsim',
          placeholder: 'Kitap adı giriniz',
          type: 'text'
        },
        {
          name: 'kitapYazar',
          placeholder: 'Yazar adı giriniz',
          type: 'text'
        },
        {
          name: 'kitapSayfa',
          type:'number',
          placeholder:'Sayfa sayısı giriniz',
          min:1,
          max:1000
        }
      ],
      buttons: [
        {
          text:'Vazgeç',
          role:'Cancel'
        },
        {
          text:'Ekle',
          handler: (res:kitapBilgi) => {
           let kitap:kitapBilgi = {
            kitapIsim:res.kitapIsim,
            kitapYazar:res.kitapYazar,
            kitapSayfa:res.kitapSayfa && +res.kitapSayfa,           
           };
           this.fireService.yeniKayit(kitap);
          }
        }
      ],
    });

    await alert.present();
  }

  async guncelleAlert(kitap:kitapBilgi) {
    const alert = await this.alertController.create({
      header: 'Kitap guncelle',
      inputs: [
        {
          name: 'kitapIsim',
          placeholder: 'Kitap adı güncelleyiniz',
          type: 'text'
        },
        {
          name: 'kitapYazar',
          placeholder: 'Yazar adı güncelleyiniz',
          type: 'text'
        },
        {
          name: 'kitapSayfa',
          type:'number',
          placeholder:'Sayfa sayısı güncelleyiniz',
          min:1,
          max:1000
        }
      ],
      buttons: [
        {
          text:'Vazgeç',
          role:'Cancel'
        },
        {
          text:'Güncelle',
          handler: (res:kitapBilgi) => {
           let guncelKitap:kitapBilgi = {
            id:kitap.id,
            kitapIsim:res.kitapIsim,
            kitapYazar:res.kitapYazar,
            kitapSayfa:res.kitapSayfa && +res.kitapSayfa,           
           };
           this.fireService.kitapGuncelle(guncelKitap);
          }
        }
      ],
    });

    await alert.present();
  }

  async kayitAlert() {
    const alert = await this.alertController.create({
      header: 'Kayıt Ol',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email adresinizi giriniz',
          type: 'text'
        },
        {
          name: 'password',
          placeholder: 'Şifrenizi giriniz',
          type: 'password'
        },
      ],
      buttons: [
        {
          text:'Vazgeç',
          role:'Cancel'
        },
        {
          text:'Kayıt ol',
           handler: async (res:User) => {
           let user:User = {
            email: res.email,
            password: res.password,           
           };
           
           const response = await this.fireService.kayitOl(user);
           console.log(response);
          }
        }
      ],
    });

    await alert.present();
  }

  async girisAlert() {
    const alert = await this.alertController.create({
      header: 'Giriş Yap',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email adresinizi giriniz',
          type: 'text'
        },
        {
          name: 'password',
          placeholder: 'Şifrenizi giriniz',
          type: 'password'
        },
      ],
      buttons: [
        {
          text:'Vazgeç',
          role:'Cancel'
        },
        {
          text:'Giriş Yap',
           handler: async (res:User) => {
           let user:User = {
            email: res.email,
            password: res.password,           
           };
           
           const response = await this.fireService.girisYap(user);
           console.log(response);
          }
        }
      ],
    });

    await alert.present();
  }

}
