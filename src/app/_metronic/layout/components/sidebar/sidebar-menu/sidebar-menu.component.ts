import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PermissionService } from 'src/app/services/permission-service.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  hasEtudiantPermission : boolean;
  hasDirecteurPermission : boolean;
  hasEnseignantPermission : boolean;


  constructor( private authService: AuthService, private permissionService: PermissionService) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (auth) {
      this.permissionService.updatePermissions(auth);

      this.hasEtudiantPermission = this.permissionService.hasEtudiantPermission();
      this.hasDirecteurPermission = this.permissionService.hasDirecteurPermission();
      this.hasEnseignantPermission = this.permissionService.hasEnseignantPermission();
      

    }
   }

  ngOnInit(): void {
  }


}
