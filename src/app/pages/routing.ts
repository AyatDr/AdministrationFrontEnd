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
];

export { Routing };
