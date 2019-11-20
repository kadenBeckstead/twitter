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

  users = [
    { username: 'Jared Beckstead', handle: 'jbecks1', photoUrl: null },
    { username: 'Lindsay Beckstead', handle: 'linlula', photoUrl: null },
    { username: 'Ken Rodham', handle: 'krod', photoUrl: null },
    { username: 'Katy Perry', handle: 'KPerry', photoUrl: null },
    { username: 'Russel M. Nelson', handle: 'theProphet', photoUrl: null },
    { username: 'Peyton Manning', handle: 'pMan18', photoUrl: null },
    { username: 'Zack Alger', handle: 'zag', photoUrl: null },
    { username: 'Alfred Pennyweather', handle: 'the_butler007', photoUrl: null },
    { username: 'Bruce Wayne', handle: 'batman', photoUrl: null },
    { username: 'Selina Kyle', handle: 'cat73628', photoUrl: null },
    { username: 'Oswald Cobblepot', handle: 'the_penguin', photoUrl: null },
    { username: 'Oliver Queen', handle: 'archery4lyfe', photoUrl: null },
    { username: 'Joe Flacco', handle: 'avg_qb', photoUrl: null },
    { username: 'Diana Prince', handle: 'wonderwoman', photoUrl: null },
    { username: 'Steve Trevor', handle: 'I_steal_planes', photoUrl: null },
    { username: 'Barry Allen', handle: 'lightningSpeed', photoUrl: null },
    { username: 'an0nymous', handle: 'an0nymous', photoUrl: null },
    { username: 'thanos', handle: 'snap_master', photoUrl: null },
  ]
  

  constructor(
    private registry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private af: AngularFireAuth,
    private router: Router,
    private settings: LocalSettingsService,
    private real: RealDataService,
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

    this.real.testFunction();
    
  }

}
