import { Component } from '@angular/core';
import { FireService, kitapBilgi } from '../fire.service';
import { AlertService } from '../alert.service';
import { Auth } from '@angular/fire/auth';
import { User } from 'src/user.class';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  kitaplar: kitapBilgi[] = [];
  user:any;
  constructor(
    private fireService: FireService,
    private alertService: AlertService,
    public auth: Auth,
  ) {
    this.fireService.kayitListele().subscribe((sonuc) => {
      this.kitaplar = sonuc;
      console.log(this.kitaplar);
    });
    this.user = this.auth.currentUser;
  }

  yeniKayit() {
    this.alertService.ekleAlert();
  }

  sirala() {
    this.fireService.siraliKayitListele().subscribe((sonuc) => {
      this.kitaplar = sonuc;
      console.log(this.kitaplar);
    });
  }

  sil(id: kitapBilgi['id']) {
    this.fireService.kitapSil(id);
  }

  guncelle(kitap:kitapBilgi) {
    this.alertService.guncelleAlert(kitap);
  }

  kayit()
  {
    this.alertService.kayitAlert();
  }

  giris()
  {
    this.alertService.girisAlert();
  }

  cikis()
  {
   this.fireService.cikisYap();
  }
}
