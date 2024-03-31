import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NUMBER } from 'src/app/core/constants/general.constant';

export interface ISubmenuModel {
  path: string;
  desc: string;
}
export interface IMenuModel {
  desc: string;
  path?: string;
  logoPath: string;
  active: boolean;
  submenu: ISubmenuModel[] | [];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  mandUiPathLogo = 'assets/images/cooking.svg';
  mandUiMenu: IMenuModel[] = [
    {
      desc: 'Dashboard',
      logoPath: 'assets/icons/pages.svg',
      path: '/admin/home',
      active: false,
      submenu: [],
    },
    {
      desc: 'Article',
      logoPath: 'assets/icons/pages.svg',
      path: '/admin/article',
      active: false,
      submenu: [],
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.validateScreenSize();
  }

  isLogo = false;
  isOpen = true;
  isMobile = false;
  innerWidth: number;
  toggleHamburger = false;

  constructor(private readonly router: Router) {
    this.innerWidth = window.innerWidth;
    this.validateScreenSize();
  }

  ngOnInit(): void {
    if (this.mandUiPathLogo) {
      this.isLogo = true;
    }
  }

  validateScreenSize() {
    if (this.innerWidth <= NUMBER.ONE_THOUSAND_TWENTY_FOUR) {
      this.isOpen = false;
      this.isMobile = true;
    } else {
      this.isOpen = true;
      this.isMobile = false;
    }
  }

  onClickClose() {
    this.isOpen = false;
    for (const menu of this.mandUiMenu) {
      menu.active = false;
    }
  }

  onClickOpen() {
    this.isOpen = true;
  }

  onClickSubmenu(i: number) {
    if (this.isOpen === false) {
      this.isOpen = true;
      this.mandUiMenu[i].active = true;
    } else {
      this.mandUiMenu[i].active = !this.mandUiMenu[i].active;
    }
  }

  onClickLogo() {
    this.router.navigate(['/apps/home']);
  }
}
