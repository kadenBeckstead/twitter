import { Component, OnInit, Input } from '@angular/core';
import { FeatureFlagsService, FormatterService, LocalSettingsService } from '../../services';
import { DomSanitizer } from "@angular/platform-browser";
import { User } from 'Instagram';

interface Post {
  id: number, 
  userId: number, 
  timestamp: number, 
  title: string, 
  body: string, 
  attachmentUrl: string | null;
  attachmentType: 'video' | 'photo';
  photoUrl: string | null;
  creatorId?: string
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
  user: User;

  constructor(
    private ffs: FeatureFlagsService,
    public formatter: FormatterService,
    private settings: LocalSettingsService,
    private sanitizer: DomSanitizer,
  ) { 
    this.ff = ffs.ff;
  }

  ngOnInit() {
    let idToUse = this.post.creatorId || this.post.userId;
    this.ff.feed.service.getSingleUser(idToUse).subscribe((res) => {
      this.username = res[0].username
      this.user = res[0];
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
}
