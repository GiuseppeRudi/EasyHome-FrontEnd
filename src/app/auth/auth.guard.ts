import {CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {UserRole} from './user-role';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole:UserRole[] = route.data['requiredRoles']

  return firstValueFrom(authService.getUser())
    .then(user => {

      if(!user){
        // if not logged go to login page
        router.navigate([  "/login" ]);
      }


      if (user) {

        //check if is not required a specific role:
        if(!expectedRole){
          return true;
        }

        //check has the same role
        //TODO format the user model
        if(expectedRole[0]==user.authorities[0].authority){
          return true;
        }

        router.navigate([  "/403" ]);
      }

      // never used
      return false;
    })
    .catch(() => router.navigate([  "/login" ])
    ); // Blocca l'accesso in caso di error

};
