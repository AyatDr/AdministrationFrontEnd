import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';
import { AuthHTTPService } from './auth-http/auth-http.service';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;
  

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    // const subscr = this.getUserByToken().subscribe();
    // this.unsubscribe.push(subscr);
  }

  // public methods
  public login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
  
    return this.authHttpService.login(email, password).pipe(
      switchMap((auth) => {
        const userId = auth.user?.id;
        const nature = auth?.permissions; // Extract the user's nature (permissions)
  
        console.log('Auth Object:', auth); // Display the auth object
        console.log('User ID:', userId);
        console.log('User Nature (Permissions):', nature);
  
        if (!userId) {
          throw new Error('User ID not found');
        }
  
        // Set permissions directly from the login response
        auth.permissions = nature;
  
        // Save the auth object (with permissions) to local storage
        this.setAuthFromLocalStorage(auth);
  
        console.log('Updated AuthModel with permissions:', auth);
  
        // Fetch the user by token after setting permissions
        return this.getUserByToken();
      }),
      catchError((err) => {
        console.error('Error occurred:', err);
        return of(undefined);
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }
  
  
  

  logout() {
    console.log('AuthService: Logging out...');
  
    localStorage.removeItem(this.authLocalStorageToken);
    console.log('AuthService: Token removed from localStorage.');
  
    // Redirection complète via le navigateur
    window.location.href = '/auth/login';
  }
  
  

  getUserByToken(): Observable<UserType> {
    // Récupérer l'authentification depuis le local storage
    const auth = this.getAuthFromLocalStorage();
    console.log('Auth from local storage:', auth);
  
    // Si aucun auth ou authToken n'est trouvé, retourner undefined
    if (!auth || !auth.authToken) {
      return of(undefined);
    }
  
    // Déclencher l'indicateur de chargement
    this.isLoadingSubject.next(true);
  
    // Faire la requête pour récupérer l'utilisateur par token
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      // Traiter la réponse pour vérifier si un utilisateur est retourné
      map((user: UserType) => {
        console.log('UUUUUU');
        console.log('User fetched:', auth.user);
        if (auth.user) {
          // Si un utilisateur est trouvé, mettre à jour le sujet de l'utilisateur courant
          this.currentUserSubject.next(auth.user);
        } else {
          // Si aucun utilisateur n'est trouvé, se déconnecter (optionnel pour diagnostic)
          console.log('No user returned, should log out here.');
          // this.logout();
        }
        return auth.user;
      }),
      // Finaliser le processus en désactivant l'indicateur de chargement
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    if (auth && auth.authToken) {
      console.log('Saving auth to localStorage:', auth);
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    console.error('Auth data is invalid:', auth);
    return false;
  }
  
  private auth: AuthModel | null = null;
   // Définir l'état d'authentification localement
   setAuth(auth: AuthModel): void {
    this.auth = auth;
  }
   getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
