export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;
  user?: any; // Information de l'utilisateur
  permissionsProjets?: string[]; // Permissions pour les projets
  permissionsClients?: string[]; // Permissions pour les clients
  permissionsTypeProjet?: string[]; // Permissions pour les types de projets

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.user = auth.user;
    this.permissionsProjets = auth.permissionsProjets;
    this.permissionsClients = auth.permissionsClients;
    this.permissionsTypeProjet = auth.permissionsTypeProjet;
  }
}
