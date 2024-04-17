import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';
import { VERSION } from 'app/app.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import NavbarItem from './navbar-item.model';
import { NewTask1Visibility } from 'app/entities/task-1-visibility/task-1-visibility.model';
import { Sex } from 'app/entities/enumerations/sex.model';
import { Task1VisibilityService } from 'app/entities/task-1-visibility/service/task-1-visibility.service';
import { Observable, ReplaySubject } from 'rxjs';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, SharedModule, HasAnyAuthorityDirective],
})
export default class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: NavbarItem[] = [];
  account$?: Observable<Account | null>;
  userisLoggedIn: boolean = false;
  activeTask: string = '';

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private sharedVariablesService: SharedVariablesService,
    protected task1VisibilityService: Task1VisibilityService,
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
      this.account$ = this.accountService.identity();
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });

    this.sharedVariablesService.getActiveTaskObservable().subscribe(o => (this.activeTask = o));
  }

  createTask1Entry(): void {
    //no active tasks
    this.sharedVariablesService.setActiveTaskObservable('');

    //Calc time taken to complete the task
    const startTime = Number(localStorage.getItem('taskStartedTime'));
    const dateTime: Date = new Date();
    const endTime: number = dateTime.getTime();
    const timeTakenInSeconds = (endTime - startTime) / 1000;

    let sex: Sex = localStorage.getItem('sex') as Sex;

    let newTask1Visibility: NewTask1Visibility = {
      id: null,
      participantName: localStorage.getItem('participantName'),
      sex: sex,
      age: Number(localStorage.getItem('age')),
      timecompletionTimeSeconds: timeTakenInSeconds,
      errors: 0,
      taskCompleted: true,
    };

    this.userisLoggedIn = true;

    this.task1VisibilityService.create(newTask1Visibility).subscribe((res: any) => {
      this.router.navigate(['/task-1-visibility']);
    });
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
