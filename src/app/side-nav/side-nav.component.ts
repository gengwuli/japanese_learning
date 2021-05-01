import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public textService: TextService) {
    makeAutoObservable(this)
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  GetItemList() {
    let res =  ['yin50', 'vocabulary']
    for (let lesson of this.textService.GetLessons()) {
      res.push(lesson);
    }
    return res;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getRouterLink(nav:string) {
    if (nav.startsWith("lesson")) {
      return "/lesson/" + nav.split("lesson")[1]
    } else {
      return nav;
    }
    
  }
}
