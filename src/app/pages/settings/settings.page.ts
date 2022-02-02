import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  darkMode: boolean = true;
  platform: string;
  logo: string;

  constructor(public plt: Platform) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit(): void {
      if (this.plt.is('ios')) {
        this.platform = 'IOS';
        this.logo = 'logo-apple';
      }
      if (this.plt.is('android')) {
        this.platform = 'Android';
        this.logo = 'logo-android';
      }
      if (this.plt.is('desktop')) {
        this.platform = 'Microsoft Windows';
        this.logo = 'logo-microsoft';
      }
  }

  change() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  getColor(so: string): string {
    if (so === "Microsoft Windows") return "#00A4EF";
    if (so === "IOS") return "rgb(255,59,48)";
    if (so === "Android") return "#A4C639";
  }

}
