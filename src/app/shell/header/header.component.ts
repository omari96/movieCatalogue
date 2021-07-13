import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  get isKa(): boolean {
    return this.isLanguage("ka")

  }
  get isEn(): boolean {
    return this.isLanguage("en")
  }

  get isLoginedIn(): boolean {
    return this.auth.isLoginedIn;
  }

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private auth: AuthService,
  ) { }


  private isLanguage(lang: string): boolean {

    let defaultLang = this.translateService.defaultLang;
    let currentLang = this.translateService.currentLang;

    return currentLang ? currentLang === lang : defaultLang === lang;
  }

  en() {
    this.translateService.use('en');
  }

  ka() {
    this.translateService.use('ka');
  }

  goToSignIn() {
    this.router.navigate(['sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['sign-up']);
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['sign-in']);
    })
  }


  ngOnInit(): void { }
}
