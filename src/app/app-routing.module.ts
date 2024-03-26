import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userGuard } from './core/guard/user.guard';

const routes: Routes = [

  // blank
  {path:"",
    canActivate:[userGuard],
    loadComponent:()=>import('./layout/blank-layout/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
    children:[
      {path:"",redirectTo:"home",pathMatch:"full"},
      {path:"home",loadComponent:()=>import('./component/all-list/all-list.component').then((m)=>m.AllListComponent),title:"Home"},
    ]
  },

  // auth
  {path:"",
    loadComponent:()=>import('./layout/auth-layout/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
    children:[
      {path:"login",loadComponent:()=>import('./component/signin/signin.component').then((m)=>m.SigninComponent),title:"Login"},
      {path:"register",loadComponent:()=>import('./component/signup/signup.component').then((m)=>m.SignupComponent),title:"SignUp"},
    ]
  },

  // notfound
  {path:"**",
    loadComponent:()=>import('./component/notfound/notfound.component').then((m)=>m.NotfoundComponent),title:"Not Found"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
