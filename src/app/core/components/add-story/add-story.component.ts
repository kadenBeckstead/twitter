import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';
import { Browser } from '@capacitor/core';


@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.less']
})
export class AddStoryComponent implements OnInit {
  body;
  title;
  attachmentType = null;
  attachmentUrl;
  ff;

  constructor(
    private ffs: FeatureFlagsService
  ) {
    this.ff = ffs.ff.feed;
  }

  ngOnInit() { }

  focus(code) {
    if (code === 13) {
      document.getElementById('textarea').focus()
    }
  }

  sendStatus() {
    this.ff.service.getBaseUser().subscribe((user) => {
      let userId = user[0].id;
      let attachment = {}
      if (this.attachmentType !== 'none') {
        attachment = {attachmentType: this.attachmentType, attachmentUrl: this.attachmentUrl}
      }
      this.ff.service.postStatus(userId, this.title, attachment, this.body).subscribe();
    })
  }

}
