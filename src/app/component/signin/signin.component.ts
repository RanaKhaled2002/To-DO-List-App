import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private _UserService:UserService,private _Router:Router){}

  checkCorrectData:boolean = false;
  MessageError!:string;
  inputType: string = 'password';

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
  })

  submit()
  {
    this.checkCorrectData = true;
    this._UserService.signinData(this.loginForm.value).subscribe({

      next:(res)=>
      {
        this.MessageError = "";
        if(res.msg=='done')
        {
          this.checkCorrectData = false;
          localStorage.setItem("Token","3b8ny__"+res.token)
          this._UserService.decodeToken();
          this._Router.navigate(['/home']);
        }
      },

      error:(err)=>
      { 
        this.MessageError = err.error.msg;
        this.checkCorrectData = false;
      }
    })
  }

  togglePassword(input: HTMLInputElement) {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.inputType = (this.inputType === 'password') ? 'text' : 'password';
  }

}
