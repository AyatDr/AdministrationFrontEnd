import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service'; // Assurez-vous d'importer votre AuthService
import { AuthModel } from '../modules/auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissions: string;


  constructor(private authService: AuthService) {
    
  }

  /**
   * Charger les permissions depuis l'AuthModel
   */


  /**
   * Vérifie si l'utilisateur a une permission spécifique pour un projet
   * @param permissionId - Identifiant de la permission
   * @returns boolean - true si l'utilisateur a la permission
   */
  hasEtudiantPermissions(permission: string): boolean {
    return this.permissions === permission;
  }
  
  hasDirecteurPermissions(permission: string): boolean {
    return this.permissions === permission;
  }
  
  hasEnseignantPermissions(permission: string): boolean {
    return this.permissions === permission;
  }
  


  /**
   * Met à jour les permissions avec les nouveaux paramètres de l'AuthModel.
   * Cette méthode peut être appelée lors de la connexion ou de la mise à jour des permissions.
   */
  updatePermissions(auth: AuthModel) {
    this.permissions = auth.permissions ?? '';
  }
  



  
  
  // Permission : 

  hasEtudiantPermission(): boolean {
  return this.hasEtudiantPermissions('etudiant'); // Vérifie si l'utilisateur peut lister les projets
}

hasDirecteurPermission(): boolean {
  return this.hasDirecteurPermissions('directeur'); // Vérifie si l'utilisateur peut ajouter un projet
}

hasEnseignantPermission(): boolean {
  return this.hasEnseignantPermissions('prof'); // Vérifie si l'utilisateur peut modifier un projet
}





}
