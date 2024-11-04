import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () => import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule),
    // data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () => import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () => import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () => import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    // data: { layout: 'light-sidebar' },
  },
  // {
  //   path: 'apps/users',
  //   loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  // },
  // {
  //   path: 'apps/employe',
  //   loadChildren: () => import('./Employe/employe.module').then((m) => m.EmployeModule),
  // },
 
  {
    path: 'apps/roles',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  },
  
  // {
  //   path: '',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: 'error/404',
  },
  {
    path: 'apps/FormationDirecteur',
    loadChildren: () => import('./formation-directeur/formation-directeur.module').then((m) => m.FormationDirecteurModule),
  },
  {

    path: 'apps/FormationSemestreDirecteur',
    loadChildren: () => import('./semestre-formation-directeur/semestre-formation-directeur.module').then((m) => m.SemestreFormationDirecteurModule),
  },
  {
    path: 'prof/formations/list',
    loadChildren: () => import('./formation-professeur/formation-professeur.module').then((m) => m.FormationProfesseurModule),

  },
  {


    path: 'apps/ProfesseurDirecteur',
    loadChildren: () => import('./professeur-directeur/professeur-directeur.module').then((m) => m.ProfesseurDirecteurModule),
  },
  {
    path: 'apps/ProfesseurEtudiant',
    loadChildren: () => import('./etudiant-directeur/etudiant-directeur.module').then((m) => m.EtudiantDirecteurModule),
  },
  {
  path: 'apps/FormationModuleDirecteur',
  loadChildren: () => import('./module-formation-directeur/module-formation-directeur.module').then((m) => m.ModuleFormationDirecteurModule),
 },
 {
  path: 'apps/FormationMatiereDirecteur',
  loadChildren: () => import('./matiere-formation-directeur/matiere-formation-directeur.module').then((m) => m.MatiereFormationDirecteurModule),
 },
 {
  path: 'apps/FormationCoursDirecteur',
  loadChildren: () => import('./cours-formation-directeur/cours-formation-directeur.module').then((m) => m.CoursFormationDirecteurModule),
 },
 {
  path: 'apps/FormationCoursDetailDirecteur',
  loadChildren: () => import('./cours-details-directeur/cours-details-directeur.module').then((m) => m.CoursDetailsDirecteurModule),
 },

{
    path: 'prof/formation/:id/semestres/list',
    loadChildren: () => import('./semestre-professeur/semestre-professeur.module').then((m) => m.SemestreProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/modules/list',
    loadChildren: () => import('./module-professeur/module-professeur.module').then((m) => m.ModuleProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matieres/list',
    loadChildren: () => import('./matiere-professeur/matiere-professeur.module').then((m) => m.MatiereProfesseurModule),
  }, 
  {
    path: 'apps/Etudiant',
    loadChildren: () => import('./etudiant/etudiant.module').then((m) => m.EtudiantModule),
  }, 
  {
    path: 'apps/MatiereEtudiant',
    loadChildren: () => import('./matiere-etudiant/matiere-etudiant.module').then((m) => m.MatiereEtudiantModule),
  },  
  {
    path: 'apps/CoursEtudiant',
    loadChildren: () => import('./cours-etudiant/cours-etudiant.module').then((m) => m.CoursEtudiantModule),
  },  
  {
    path: 'apps/DocumentsEtudiant',
    loadChildren: () => import('./cours-etudiant-details/cours-etudiant-details.module').then((m) => m.CoursEtudiantDetailsModule),
  },  
  
  
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matiere/:matiere/cours/list',
    loadChildren: () => import('./cours-professeur/cours-professeur.module').then((m) => m.CoursProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matiere/:matiere/cours/create',
    loadChildren: () => import('./add-cours-professeur/add-cours-professeur.module').then((m) => m.AddCoursProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matiere/:matiere/cours/:cours/edit',
    loadChildren: () => import('./edit-cours-professeur/edit-cours-professeur.module').then((m) => m.EditCoursProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matiere/:matiere/cours/:cours/resources/list',
    loadChildren: () => import('./cours-resources-professeur/cours-resources-professeur.module').then((m) => m.CoursResourcesProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matiere/:matiere/cours/:cours/lien/create',
    loadChildren: () => import('./add-lien-professeur/add-lien-professeur.module').then((m) => m.AddLienProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matiere/:matiere/cours/:cours/document/create',
    loadChildren: () => import('./add-document-professeur/add-document-professeur.module').then((m) => m.AddDocumentProfesseurModule),
  },
  {
    path: 'prof/formation/:formation/semestre/:semestre/module/:module/matiere/:matiere/etudiants/list',
    loadChildren: () => import('./etudiant-professeur/etudiant-professeur.module').then((m) => m.EtudiantProfesseurModule),
  },

];

export { Routing };
