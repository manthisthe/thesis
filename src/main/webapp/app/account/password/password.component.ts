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
import { Sex } from 'app/entities/enumerations/sex.model';
import { NewTask5 } from 'app/entities/task-5/task-5.model';
import { Task5Service } from 'app/entities/task-5/service/task-5.service';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  selector: 'jhi-password',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, PasswordStrengthBarComponent],
  templateUrl: './password.component.html',
})
export default class PasswordComponent implements OnInit {
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
    currentPassword: new FormControl('', { nonNullable: true, validators: Validators.required }),
    newPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
  });

  constructor(
    private passwordService: PasswordService,
    private sharedVariablesService: SharedVariablesService,
    private task5Service: Task5Service,
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

  changePassword(): void {
    this.sharedVariablesService.setActiveTaskObservable('');
    //Calc time taken to complete the task
    const startTime = Number(localStorage.getItem('taskStartedTime'));
    const dateTime: Date = new Date();
    const endTime: number = dateTime.getTime();
    //const timeTaken = (endTime - startTime) // milliseconds
    const timeTakenInSeconds = (endTime - startTime) / 1000;

    let sex: Sex = localStorage.getItem('sex') as Sex;

    let newTask5: NewTask5 = {
      id: null,
      participantName: localStorage.getItem('participantName'),
      sex: sex,
      age: Number(localStorage.getItem('age')),
      taskCompletionTimeSeconds: timeTakenInSeconds,
      errors: this.errors,
    };

    this.task5Service.create(newTask5).subscribe((res: any) => {
      this.router.navigate(['/task-5']);
    });
  }
}
