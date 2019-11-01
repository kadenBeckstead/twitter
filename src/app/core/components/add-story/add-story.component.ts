import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;


@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.less']
})
export class AddStoryComponent implements OnInit {
  body;
  title;
  ff;

  constructor(
    private ffs: FeatureFlagsService
  ) {
    this.ff = ffs.ff.feed;
  }

  ngOnInit() { }

  async getAttachment() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;

    // imageElement.src = imageUrl;
  }

  focus(code) {
    if (code === 13) {
      document.getElementById('textarea').focus()
    }
  }

  sendAttachment() {
    this.ff.service.getBaseUser().subscribe((user) => {
      let userId = user[0].id;
      let attachmentUrl = '';
      this.ff.service.postStatus(userId, this.title, attachmentUrl, this.body).subscribe((res) => {
        console.log(res)
      })
    })
  }

}
