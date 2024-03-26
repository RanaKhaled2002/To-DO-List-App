import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private _UserService:UserService,private _Router:Router){}

  checkCorrectData:boolean = false;
  MessageError!:string;
  inputType: string = 'password';

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
    age: new FormControl(null,[Validators.required,Validators.pattern(/^(1[89]|[2-9]\d)$/)]),
    phone : new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  submit()
  {
    this.checkCorrectData = true;
    this._UserService.signupData(this.registerForm.value).subscribe({

      next:(res)=>
      {
        this.MessageError = "";
        if(res.msg=='done')
        {
          this.checkCorrectData = false;
          this._Router.navigate(['/login'])
        }
      },

      error:(err)=>
      {
        this.MessageError=err.error.msg;
        this.checkCorrectData = false;
      }
    })
  }

  togglePassword(input: HTMLInputElement) {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.inputType = (this.inputType === 'password') ? 'text' : 'password';
  }

}
