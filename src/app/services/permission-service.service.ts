import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service'; // Assurez-vous d'importer votre AuthService
import { AuthModel } from '../modules/auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissionsProjets: string[] = [];
  private permissionsClients: string[] = [];
  private permissionsTypeProjet: string[] = [];

  constructor(private authService: AuthService) {
    this.loadPermissionsFromAuthModel();
  }

  /**
   * Charger les permissions depuis l'AuthModel
   */
  private loadPermissionsFromAuthModel() {
    // const auth = null
    // if (auth) {
    //   this.permissionsProjets = auth.permissionsProjets || [];
    //   this.permissionsClients = auth.permissionsClients || [];
    //   this.permissionsTypeProjet = auth.permissionsTypeProjet || [];
    // }
  }

  /**
   * Vérifie si l'utilisateur a une permission spécifique pour un projet
   * @param permissionId - Identifiant de la permission
   * @returns boolean - true si l'utilisateur a la permission
   */
  hasProjetPermission(permissionId: string): boolean {
    return this.permissionsProjets.includes(permissionId);
  }

  /**
   * Vérifie si l'utilisateur a une permission spécifique pour un client
   * @param permissionId - Identifiant de la permission
   * @returns boolean - true si l'utilisateur a la permission
   */
  hasClientPermission(permissionId: string): boolean {
    return this.permissionsClients.includes(permissionId);
  }

  /**
   * Vérifie si l'utilisateur a une permission spécifique pour un type de projet
   * @param permissionId - Identifiant de la permission
   * @returns boolean - true si l'utilisateur a la permission
   */
 

  hasTypeProjetPermission(type: string): boolean {
    console.log('Checking permission for type:', type);
    console.log('Available permissions:', this.permissionsTypeProjet);
    return this.permissionsTypeProjet.includes('all') || this.permissionsTypeProjet.includes(type);
  }

  /**
   * Met à jour les permissions avec les nouveaux paramètres de l'AuthModel.
   * Cette méthode peut être appelée lors de la connexion ou de la mise à jour des permissions.
   */
  updatePermissions(auth: AuthModel) {
    this.permissionsProjets = auth.permissionsProjets || [];
    this.permissionsClients = auth.permissionsClients || [];
    this.permissionsTypeProjet = auth.permissionsTypeProjet || [];
  }



  
  
  // Permission : 

hasListProjectsPermission(): boolean {
  return this.hasProjetPermission('0'); // Vérifie si l'utilisateur peut lister les projets
}

hasAddProjectPermission(): boolean {
  return this.hasProjetPermission('1'); // Vérifie si l'utilisateur peut ajouter un projet
}

hasEditProjectPermission(): boolean {
  return this.hasProjetPermission('2'); // Vérifie si l'utilisateur peut modifier un projet
}

hasDeleteProjectPermission(): boolean {
  return this.hasProjetPermission('3'); // Vérifie si l'utilisateur peut supprimer un projet
}

hasDuplicateProjectPermission(): boolean {
  return this.hasProjetPermission('4'); // Vérifie si l'utilisateur peut dupliquer un projet
}

hasImportProjectsPermission(): boolean {
  return this.hasProjetPermission('6'); // Vérifie si l'utilisateur peut importer des projets
}

hasExportProjectsPermission(): boolean {
  return this.hasProjetPermission('9'); // Vérifie si l'utilisateur peut exporter des projets
}

hasModeTableauPermission(): boolean {
  return this.hasProjetPermission('10'); // Vérifie si l'utilisateur peut activer le mode tableau
}

hasModeCartePermission(): boolean {
  return this.hasProjetPermission('12'); // Vérifie si l'utilisateur peut activer le mode carte
}



hasListReceivedPiecesPermission(): boolean {
  return this.hasProjetPermission('30'); // Vérifie si l'utilisateur peut lister les pièces reçues
}

hasAddReceivedPiecePermission(): boolean {
  return this.hasProjetPermission('31'); // Vérifie si l'utilisateur peut ajouter des pièces reçues
}

hasEditReceivedPiecePermission(): boolean {
  return this.hasProjetPermission('32'); // Vérifie si l'utilisateur peut modifier des pièces reçues
}

hasDeleteReceivedPiecePermission(): boolean {
  return this.hasProjetPermission('33'); // Vérifie si l'utilisateur peut supprimer des pièces reçues
}

hasVisualizeReceivedPiecePermission(): boolean {
  return this.hasProjetPermission('34'); // Vérifie si l'utilisateur peut visualiser les pièces reçues
}




hasListStatusPermission(): boolean {
  return this.hasProjetPermission('60'); // Vérifie si l'utilisateur peut lister les statuts
}

hasEditStatusPermission(): boolean {
  return this.hasProjetPermission('61'); // Vérifie si l'utilisateur peut modifier des statuts
}

hasDeleteStatusPermission(): boolean {
  return this.hasProjetPermission('62'); // Vérifie si l'utilisateur peut supprimer des statuts
}



hasListTasksPermission(): boolean {
  return this.hasProjetPermission('40'); // Vérifie si l'utilisateur peut lister les tâches
}

hasAddTaskPermission(): boolean {
  return this.hasProjetPermission('41'); // Vérifie si l'utilisateur peut ajouter des tâches
}

hasEditTaskPermission(): boolean {
  return this.hasProjetPermission('42'); // Vérifie si l'utilisateur peut modifier des tâches
}

hasImportTasksPermission(): boolean {
  return this.hasProjetPermission('43'); // Vérifie si l'utilisateur peut importer des tâches
}

hasDeleteTaskPermission(): boolean {
  return this.hasProjetPermission('44'); // Vérifie si l'utilisateur peut supprimer des tâches
}



hasListRegulationsPermission(): boolean {
  return this.hasProjetPermission('50'); // Vérifie si l'utilisateur peut lister les règlements
}

hasAddRegulationPermission(): boolean {
  return this.hasProjetPermission('51'); // Vérifie si l'utilisateur peut ajouter des règlements
}

hasEditRegulationPermission(): boolean {
  return this.hasProjetPermission('52'); // Vérifie si l'utilisateur peut modifier des règlements
}

hasDeleteRegulationPermission(): boolean {
  return this.hasProjetPermission('53'); // Vérifie si l'utilisateur peut supprimer des règlements
}

hasViewAmountPermission(): boolean {
  return this.hasProjetPermission('57'); // Vérifie si l'utilisateur peut afficher les montants
}



hasViewDetailsRemarksPermission(): boolean {
  return this.hasProjetPermission('24'); // Vérifie si l'utilisateur peut consulter les remarques dans les détails
}

hasViewDetailsClientPermission(): boolean {
  return this.hasProjetPermission('16'); // Vérifie si l'utilisateur peut consulter les détails
}

hasViewDetailsCoordinatesPermission(): boolean {
  return this.hasProjetPermission('17'); // Vérifie si l'utilisateur peut consulter les coordonnées dans les détails
}



hasNonOwnModifyPermission(): boolean {
  return this.hasProjetPermission('70'); // Vérifie si l'utilisateur peut modifier des projets non propres
}

hasNonOwnViewAmountPermission(): boolean {
  return this.hasProjetPermission('71'); // Vérifie si l'utilisateur peut afficher les montants pour des projets non propres
}

hasNonOwnAddPiecePermission(): boolean {
  return this.hasProjetPermission('72'); // Vérifie si l'utilisateur peut ajouter des pièces à des projets non propres
}

hasNonOwnModifyPiecePermission(): boolean {
  return this.hasProjetPermission('58'); // Vérifie si l'utilisateur peut modifier des pièces dans des projets non propres
}




hasDashboardClientsPermission(): boolean {
  return this.hasClientPermission('500'); // Vérifie si l'utilisateur peut accéder au dashboard des clients
}

hasManageClientsPermission(): boolean {
  return this.hasClientPermission('100'); // Vérifie si l'utilisateur peut gérer les clients
}


hasListClientsPermission(): boolean {
  return this.hasClientPermission('101'); // Vérifie si l'utilisateur peut lister les projets
}

hasAddClientPermission(): boolean {
  return this.hasClientPermission('102'); // Vérifie si l'utilisateur peut ajouter un projet
}

hasEditClientPermission(): boolean {
  return this.hasClientPermission('103'); // Vérifie si l'utilisateur peut modifier un projet
}

hasDeleteClientPermission(): boolean {
  return this.hasClientPermission('104'); // Vérifie si l'utilisateur peut supprimer un projet
}





hasManageCollaboratorsPermission(): boolean {
  return this.hasClientPermission('200'); // Vérifie si l'utilisateur peut gérer les collaborateurs
}

hasListCollaboratorsPermission(): boolean {
  return this.hasClientPermission('201'); // Vérifie si l'utilisateur peut lister les projets
}

hasAddCollaboratorPermission(): boolean {
  return this.hasClientPermission('202'); // Vérifie si l'utilisateur peut ajouter un projet
}

hasEditCollaboratorPermission(): boolean {
  return this.hasClientPermission('203'); // Vérifie si l'utilisateur peut modifier un projet
}

hasDeleteCollaboratorPermission(): boolean {
  return this.hasClientPermission('204'); // Vérifie si l'utilisateur peut supprimer un projet
}

hasAddGroupePermission(): boolean {
  return this.hasClientPermission('205'); // Vérifie si l'utilisateur peut supprimer un projet
}

hasManagePlanningPermission(): boolean {
  return this.hasClientPermission('400'); // Vérifie si l'utilisateur peut gérer la planification
}

hasManageComptabilitePermission(): boolean {
  return this.hasClientPermission('300'); // Vérifie si l'utilisateur peut gérer la comptabilité
}



}
