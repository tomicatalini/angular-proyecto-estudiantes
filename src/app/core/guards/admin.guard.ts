import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsAdmin).pipe(
    map((isAdmin: boolean) => {
      console.log('Es admin', isAdmin);
      if(!isAdmin){
        return router.createUrlTree(['dashboard/home']);
      }
      return true;
    })
  );
};
