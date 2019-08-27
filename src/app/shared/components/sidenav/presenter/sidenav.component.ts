import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from 'src/app/pages/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  currentUser: User;
  @ViewChild('drawer') drawer;
  @Input() opened: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
  .pipe(
    map(result => result.matches)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router,
    ) {
      this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });

  }

  /**
   * Opens/closes the sidenav
   */
  menuToggle() {
    this.drawer.toggle();
  }

  logout(){
    this.authenticationService.logout()
    this.router.navigate(['/']);
  }

  public get authenticated(): boolean {
    return this.currentUser !== null;
  }

  public get adminAuthenticated(): boolean {
    return this.currentUser !== null && this.currentUser.role == "Admin";
  }
}
