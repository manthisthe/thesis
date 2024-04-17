import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { PasswordService } from './password.service';
import PasswordStrengthBarComponent from './password-strength-bar/password-strength-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NewRevocabilityPasswordChangeTime } from 'app/entities/revocability-password-change-time/revocability-password-change-time.model';
import { RevocabilityPasswordChangeTimeService } from 'app/entities/revocability-password-change-time/service/revocability-password-change-time.service';
import { NewTask3 } from 'app/entities/task-3/task-3.model';
import { Sex } from 'app/entities/enumerations/sex.model';
import { Task3Service } from 'app/entities/task-3/service/task-3.service';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  selector: 'jhi-password',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, PasswordStrengthBarComponent],
  templateUrl: './password.component.html',
})
export default class PasswordSimpleComponent implements OnInit {
  message: string = '';
  errors = 0;

  participantName: string = '';
  age: any;
  sex: any;

  doNotMatch = false;
  error = false;
  success = false;
  account$?: Observable<Account | null>;
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', { nonNullable: true }),
    newPassword: new FormControl('', {
      nonNullable: true,
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
    }),
  });

  constructor(
    private sharedVariablesService: SharedVariablesService,
    private task3Service: Task3Service,
    private passwordService: PasswordService,
    private accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected revocabilityPasswordChangeTimeService: RevocabilityPasswordChangeTimeService,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.account$ = this.accountService.identity();

    // Retrieve data from query parameter
    this.activatedRoute.queryParams.subscribe(params => {
      this.participantName = params['participantName'];
      this.sex = params['sex'];
      this.age = params['age'];
    });
  }

  passResetBtn(): void {
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
  }

  measureStrength(p: string | undefined): number {
    if (p !== undefined) {
      let force = 0;
      const regex = /[$-/:-?{-~!"^_`[\]]/g; // "
      const lowerLetters = /[a-z]+/.test(p);
      const upperLetters = /[A-Z]+/.test(p);
      const numbers = /\d+/.test(p);
      const symbols = regex.test(p);

      const flags = [lowerLetters, upperLetters, numbers, symbols];
      const passedMatches = flags.filter((isMatchedFlag: boolean) => isMatchedFlag === true).length;

      force += 2 * p.length + (p.length >= 10 ? 1 : 0);
      force += passedMatches * 10;

      // penalty (short password)
      force = p.length <= 6 ? Math.min(force, 10) : force;

      // penalty (poor variety of characters)
      force = passedMatches === 1 ? Math.min(force, 10) : force;
      force = passedMatches === 2 ? Math.min(force, 20) : force;
      force = passedMatches === 3 ? Math.min(force, 40) : force;

      return force;
    } else {
      return 666;
    }
  }

  passwordValidator(str: String | undefined): boolean {
    if (str !== undefined) {
      const v1Valid = str?.match('[a-z]') !== null;
      const v2Valid = str?.match('[A-Z]') !== null;
      const v3Valid = str?.match('[0-9]') !== null;
      const v4Valid = str?.match('[!#¤%)$)(&*+=?^_`{|}~.-]') !== null;
      const v5Valid = str?.length >= 4;

      if (v1Valid && v2Valid && v3Valid && v4Valid && v5Valid) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  changePassword(): void {
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const newPwValid = this.passwordValidator(newPassword);
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    const pw2Valid = confirmPassword === newPassword && newPassword !== this.passwordForm.get('currentPassword')?.value;

    if (newPwValid && pw2Valid) {
      this.sharedVariablesService.setActiveTaskObservable('');
      //Calc time taken to complete the task
      const startTime = Number(localStorage.getItem('taskStartedTime'));
      const dateTime: Date = new Date();
      const endTime: number = dateTime.getTime();
      const timeTakenInSeconds = (endTime - startTime) / 1000;

      let sex: Sex = localStorage.getItem('sex') as Sex;

      let newTask3: NewTask3 = {
        id: null,
        participantName: localStorage.getItem('participantName'),
        sex: sex,
        age: Number(localStorage.getItem('age')),
        taskCompletionTimeSeconds: timeTakenInSeconds,
        errors: this.errors,
      };

      this.task3Service.create(newTask3).subscribe((res: any) => {
        this.router.navigate(['/task-3']);
      });
    } else {
      this.errors += 1;
    }
  }
}
