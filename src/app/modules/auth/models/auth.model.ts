export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;
  user?: any; // Information de l'utilisateur
  permissions?: string; // Permissions pour les projets
 

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.user = auth.user;
    this.permissions = auth.permissions;
  }
}
