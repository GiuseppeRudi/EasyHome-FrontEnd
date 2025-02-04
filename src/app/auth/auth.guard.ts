import {catchError, of, switchMap} from 'rxjs';
import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {UserRole} from './user-role';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const navbar = inject(NavbarComponent);

  const expectedRole: UserRole[] = route.data['requiredRoles'];

  return authService.getUser().pipe(
    switchMap(user => {
      if (!user) {
        router.navigate([ "/" ]);
        navbar.openLoginDialog();
        return of(false);  // Blocca l'accesso
      }

      if (!expectedRole) {
        return of(true);  // Consenti l'accesso se non ci sono ruoli richiesti
      }

      if (expectedRole[0] === user.authorities[0].authority) {
        return of(true);  // Consenti l'accesso se il ruolo dell'utente corrisponde
      }

      router.navigate([ "/403" ]);
      return of(false);  // Reindirizza a /403 se il ruolo non è corretto
    }),
    catchError(() => {
      router.navigate([ "/login" ]);
      return of(false);  // Blocca l'accesso in caso di errore
    })
  );
};
