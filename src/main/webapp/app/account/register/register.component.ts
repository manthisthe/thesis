import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import SharedModule from 'app/shared/shared.module';
import PasswordStrengthBarComponent from '../password/password-strength-bar/password-strength-bar.component';
import { RegisterService } from './register.service';
import { TaskCompletionTimeSimpleService } from 'app/entities/task-completion-time-simple/service/task-completion-time-simple.service';
import { NewTaskCompletionTime2 } from 'app/entities/task-completion-time-2/task-completion-time-2.model';
import { TaskCompletionTime2Service } from 'app/entities/task-completion-time-2/service/task-completion-time-2.service';
import { Task4Service } from 'app/entities/task-4/service/task-4.service';
import { NewTask4 } from 'app/entities/task-4/task-4.model';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  selector: 'jhi-register',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule, PasswordStrengthBarComponent],
  templateUrl: './register.component.html',
})
export default class RegisterComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;
  sexValues = Object.keys(Sex);

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  participantName: string = '';
  age: any;
  sex: any;

  registerForm = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
    /*     sex: new FormControl('', {
      validators: [Validators.required],
    }),
    age: new FormControl('', {
      validators: [Validators.required],
    }), */
  });

  constructor(
    private registerService: RegisterService,
    private task4Service: Task4Service,
    private sharedVariablesService: SharedVariablesService,
    protected taskCompletionTime2Service: TaskCompletionTime2Service,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }

    // Retrieve data from query parameter
    this.activatedRoute.queryParams.subscribe(params => {
      this.participantName = params['participantName'];
      this.sex = params['sex'];
      this.age = params['age'];
    });
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const { password, confirmPassword } = this.registerForm.getRawValue();
    if (password !== confirmPassword) {
      this.doNotMatch = true;
    } else {
      const { login, email } = this.registerForm.getRawValue();
      this.registerService.save({ login, email, password, langKey: 'en' }).subscribe({
        next: () => {
          this.success = true;
          this.registerbtn();
        },
        error: response => this.processError(response),
      });
    }
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

  registerbtn(): void {
    this.sharedVariablesService.setActiveTaskObservable('');
    //Calc time taken to complete the task
    const startTime = Number(localStorage.getItem('taskStartedTime'));
    const dateTime: Date = new Date();
    const endTime: number = dateTime.getTime();
    const timeTakenInSeconds = (endTime - startTime) / 1000;

    let sex: Sex = localStorage.getItem('sex') as Sex;

    let newTask4: NewTask4 = {
      id: null,
      participantName: localStorage.getItem('participantName'),
      sex: sex,
      age: Number(localStorage.getItem('age')),
      taskCompletionTimeSeconds: timeTakenInSeconds,
      errors: 0,
    };

    this.task4Service.create(newTask4).subscribe((res: any) => {
      this.router.navigate(['/task-4']);
    });
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
