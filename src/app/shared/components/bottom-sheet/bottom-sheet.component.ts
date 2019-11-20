import { Component, OnInit } from '@angular/core';
import { LocalSettingsService, RealDataService } from '../../services';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.less']
})
export class BottomSheetComponent implements OnInit {
  fileToUpload: File = null;


  constructor(
    public settings: LocalSettingsService,
    public bottomSheetRef: MatBottomSheetRef,
    private real: RealDataService,
  ) { }

  ngOnInit() {}

  signOut() {
    this.bottomSheetRef.dismiss();
    this.settings.signOut();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.real.getSingleUser(this.settings.userId).subscribe((a) => {
      let handle = a[0].handle
      this.settings.updateProfilePic(handle, this.fileToUpload);
    })
  }

}
