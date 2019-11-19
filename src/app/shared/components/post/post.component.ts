import { Component, OnInit, Input } from '@angular/core';
import { FeatureFlagsService, FormatterService, LocalSettingsService } from '../../services';
import { DomSanitizer } from "@angular/platform-browser";

interface Post {
  id: number, 
  userId: number, 
  timestamp: number, 
  title: string, 
  body: string, 
  attachmentUrl: string | null;
  attachmentType: 'video' | 'photo';
  photoUrl: string | null;
}

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Input() isViewer: boolean = false;

  ff;
  username: string;

  constructor(
    private ffs: FeatureFlagsService,
    public formatter: FormatterService,
    private settings: LocalSettingsService,
    private sanitizer: DomSanitizer,
  ) { 
    this.ff = ffs.ff;
  }

  ngOnInit() {
    this.ff.feed.service.getSingleUser(this.post.userId).subscribe((res) => {
      this.username = res[0].username
    })
  }

  routeToProfile() {
    this.settings.changeRoute({
      title: 'user_outline',
      route: 'app/profile',
      params: {...this.ff.profile.service.getSingleUser(this.post.userId), backToFeed: true}
    })
  }

  handleClick(el) {
    let target = el.toElement.className;
    if (target ===' username' || target === 'portrait') {
      this.routeToProfile();
    } else if (!this.isViewer) {
      this.settings.changeRoute({
        title: null,
        route: 'app/viewer',
        params: {...this.post}
      })
    }
  }

  VideoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.post.attachmentUrl);
  }

}
