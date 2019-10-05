import { Component, OnInit } from '@angular/core';
import { LocalSettingsService } from '../../services';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.less']
})
export class BottomSheetComponent implements OnInit {

  constructor(
    public settings: LocalSettingsService,
    public bottomSheetRef: MatBottomSheetRef,
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.bottomSheetRef.dismiss();
    this.settings.signOut();
  }

}
