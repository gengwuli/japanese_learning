import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component} from '@angular/core';
import { TextService } from '../text.service';
import { makeAutoObservable } from 'mobx';

/** @title Responsive sidenav */
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  lessonList: Array<string> = ['yin50', 'vocabulary'];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public textService: TextService) {
    makeAutoObservable(this)
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.textService.GetLessonList().subscribe((resp) => {
      if (resp instanceof Array) {
        let res: Array<string> = []
        for (let lesson of resp) {
          res.push(lesson);
        }
        res.sort((a, b) => a < b ? -1 : 1)
        for (let r of res) {
          this.lessonList.push(r);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getRouterLink(nav: string) {
    if (nav.startsWith("lesson")) {
      return "/lesson/" + nav.split("lesson")[1]
    } else {
      return nav;
    }

  }
}
