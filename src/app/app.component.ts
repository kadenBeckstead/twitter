import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import * as IconReg from './icon-registry';
import { DomSanitizer } from "@angular/platform-browser";
import { LambdaConnectorService } from './shared/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit{
  
  constructor(
    private registry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private lambda: LambdaConnectorService
  ) { }

  ngOnInit() {
    IconReg.icons.forEach((icon) => {
      this.registry.addSvgIcon(icon.title, this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path));
    })

  }
  
}
