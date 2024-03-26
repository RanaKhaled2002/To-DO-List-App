import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';




export const userGuard: CanActivateFn = (route, state) => {

 let _Router:Router = inject(Router);
 let _UserService:UserService = inject(UserService);

  if(localStorage.getItem('Token')==null)
  {
    _Router.navigate(['/login']);
    return false;
  }
  
  else
  {
    _UserService.decodeToken();
    return true;
  }
};
