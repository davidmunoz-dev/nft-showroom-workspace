import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('user') user: any;
  isUserMenuOpen: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isUserMenuOpen = false;
  }

  goHome(): void {
    this.router.navigate(['/nft-list']);
  }

  logout(): void {
    localStorage.removeItem('user_id');
    this.router.navigate(['/auth/login']);
  }

  goToWantlist(): void {
    this.router.navigate(['/nft-list/wantlist']);
  }
}
