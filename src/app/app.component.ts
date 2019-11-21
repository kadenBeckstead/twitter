import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import * as IconReg from './icon-registry';
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LocalSettingsService, RealDataService } from './shared/services';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {

  constructor(
    private registry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private af: AngularFireAuth,
    private router: Router,
    private settings: LocalSettingsService,
  ) { }

  ngOnInit() {
    IconReg.icons.forEach((icon) => {
      this.registry.addSvgIcon(icon.title, this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path));
    })
    this.af.authState.subscribe((a) => {
      if (!a || !a.uid) {
        this.router.navigate(['login'])
      } else {
        this.settings.setUserId(a.uid);
      }
    })
  }
}
