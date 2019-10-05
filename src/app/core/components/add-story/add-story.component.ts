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
  params;
  status;
  title;

  constructor(
    private featureFlags: FeatureFlagsService
  ) { }

  ngOnInit() {
    this.params = this.featureFlags['add'] || [];
  }

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

}
