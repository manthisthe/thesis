import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import SharedModule from 'app/shared/shared.module';
import PasswordStrengthBarComponent from '../password/password-strength-bar/password-strength-bar.component';
import { RegisterService } from './register.service';
import {
  ITaskCompletionTimeSimple,
  NewTaskCompletionTimeSimple,
} from '../../entities/task-completion-time-simple/task-completion-time-simple.model';
import { TaskCompletionTimeSimpleService } from '../../entities/task-completion-time-simple/service/task-completion-time-simple.service';
import { Sex } from 'app/entities/enumerations/sex.model';
import { NewTask2 } from 'app/entities/task-2/task-2.model';
import { Task2Service } from 'app/entities/task-2/service/task-2.service';

@Component({
  selector: 'jhi-register',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule, PasswordStrengthBarComponent],
  templateUrl: './register.component.html',
})
export default class RegisterSimpleComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  participantName: string = '';
  age: any;
  sex: any;

  registrationSuccess: boolean = false;
  passwordValid = true;
  errors = 0;

  registerForm = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [
        // Validators.required,
        // Validators.minLength(1),
        // Validators.maxLength(50),
        // Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      // validators: [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      // validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      // validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
  });

  constructor(
    private registerService: RegisterService,
    protected activatedRoute: ActivatedRoute,
    protected taskCompletionTimeSimpleService: TaskCompletionTimeSimpleService,
    protected router: Router,
    protected task2Service: Task2Service,
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

    this.registerForm.get('login')?.setValue('');
    this.registerForm.get('email')?.setValue('');
    this.registerForm.get('password')?.setValue('');
    this.registerForm.get('confirmPassword')?.setValue('');
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
          this.addEntryToTask2();
        },
        error: response => this.processError(response),
      });
    }
  }

  addEntryToTask2(): void {
    const login = this.registerForm
      .get('login')
      ?.value.match('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$');
    const email = this.registerForm.get('email')?.value;
    const emailValid = this.emailValidator(email);
    const password = this.registerForm.get('password')?.value;
    const pwValid = this.passwordValidator(password);
    this.passwordValid = pwValid;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    const pw2Valid = confirmPassword === password;

    //Calc time taken to complete the task
    const startTime = Number(localStorage.getItem('taskStartedTime'));
    const dateTime: Date = new Date();
    const endTime: number = dateTime.getTime();
    //const timeTaken = (endTime - startTime) // milliseconds
    const timeTakenInSeconds = (endTime - startTime) / 1000;
    //localStorage.setItem("timeTakenInSeconds", timeTakenInSeconds.toString());

    let sex: Sex = localStorage.getItem('sex') as Sex;

    let newTask2: NewTask2 = {
      id: null,
      participantName: localStorage.getItem('participantName'),
      sex: sex,
      age: Number(localStorage.getItem('age')),
      taskCompletionTimeSeconds: timeTakenInSeconds,
      errors: 0,
    };

    if (login !== null && emailValid && pwValid && pw2Valid) {
      this.registrationSuccess = true;
      this.task2Service.create(newTask2).subscribe((res: any) => {
        this.router.navigate(['/task-2']);
      });
    } else {
      this.registrationSuccess = false;
      this.errors += 1;
    }
  }

  emailValidator(str: String | undefined): boolean {
    if (str !== undefined) {
      const v1Valid = str?.indexOf('@') !== -1;
      const v2Valid = str?.length >= 5;
      const v3Valid = str?.length <= 254;
      if (v1Valid && v2Valid && v3Valid) {
        return true;
      } else {
        return false;
      }
    }
    return false;
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
