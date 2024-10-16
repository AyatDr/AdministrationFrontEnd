import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PermissionService } from 'src/app/services/permission-service.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  hasListProjectsPermission : boolean;
  hasDashboardClientsPermission : boolean;
  hasManageClientsPermission : boolean;
  hasListClientsPermission : boolean;
  hasManageCollaboratorsPermission : boolean;
  hasListCollaboratorsPermission : boolean;
  hasManagePlanningPermission : boolean;
  hasManageComptabilitePermission : boolean;

  constructor( private authService: AuthService, private permissionService: PermissionService) {
    const auth = null
    if (auth) {
      this.permissionService.updatePermissions(auth);

      this.hasListProjectsPermission = this.permissionService.hasListProjectsPermission();
      this.hasDashboardClientsPermission = this.permissionService.hasDashboardClientsPermission();
      this.hasManageClientsPermission = this.permissionService.hasManageClientsPermission();
      this.hasListClientsPermission = this.permissionService.hasListClientsPermission();
      this.hasManageCollaboratorsPermission = this.permissionService.hasManageCollaboratorsPermission();
      this.hasListCollaboratorsPermission = this.permissionService.hasListCollaboratorsPermission();
      this.hasManagePlanningPermission = this.permissionService.hasManagePlanningPermission();
      this.hasManageComptabilitePermission = this.permissionService.hasManageComptabilitePermission();

    }
   }

  ngOnInit(): void {
  }

  // hasDashboardClientsPermission(): boolean {
  //   return this.permissionService.hasClientPermission('500'); // Vérifie si l'utilisateur peut accéder au dashboard des clients
  // }

  // hasListProjectsPermission(): boolean {
  //   return this.permissionService.hasProjetPermission('0'); // Vérifie si l'utilisateur peut lister les projets
  // }

  // hasManagePlanningPermission(): boolean {
  //   return this.permissionService.hasClientPermission('400'); // Vérifie si l'utilisateur peut gérer la planification
  // }
  
  // hasManageComptabilitePermission(): boolean {
  //   return this.permissionService.hasClientPermission('300'); // Vérifie si l'utilisateur peut gérer la comptabilité
  // }

  // hasManageClientsPermission(): boolean {
  //   return this.permissionService.hasClientPermission('100'); // Vérifie si l'utilisateur peut gérer les clients
  // }
  // hasListClientsPermission(): boolean {
  //   return this.permissionService.hasClientPermission('101'); // Vérifie si l'utilisateur peut lister les projets
  // }
  
  // hasManageCollaboratorsPermission(): boolean {
  //   return this.permissionService.hasClientPermission('200'); // Vérifie si l'utilisateur peut gérer les collaborateurs
  // }

  // hasListCollaboratorsPermission(): boolean {
  //   return this.permissionService.hasClientPermission('201'); // Vérifie si l'utilisateur peut lister les projets
  // }

  
}