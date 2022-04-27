import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEventComponent } from './components/crear-event/crear-event.component';
import { CrearBookComponent } from './components/crear-book/crear-book.component';
import { CrearUserComponent } from './components/crear-user/crear-user.component';
import { ChatCreateComponent } from './components/chat-create/chat-create.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ListarUsersComponent } from './components/listar-users/listar-users.component';
import { ListarBookComponent } from './components/listar-book/listar-book.component';
import { ListarEventsComponent } from './components/listar-events/listar-events.component';
import { ListarClubsComponent } from './components/listar-clubs/listar-clubs.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { InfoClubComponent } from './components/info-club/info-club.component';
import { CrearClubComponent } from './components/crear-club/crear-club.component';
import { InfoEventComponent } from './components/info-event/info-event.component';

// Routes
const routes: Routes = [
  // Login & Register
  { path: '', component: LoginComponent },

  // DashBoard
  { path: 'home', component: DashBoardComponent, canActivate: [AuthGuard] },

  // List of objects
  { path: 'listar-users', component: ListarUsersComponent, canActivate: [AuthGuard] },

  { path: 'listar-books', component: ListarBookComponent, canActivate: [AuthGuard] },
  { path: 'listar-events', component: ListarEventsComponent, canActivate: [AuthGuard] },
  { path: 'listar-clubs', component: ListarClubsComponent },

  { path: 'subscribe-club/:id', component: CrearClubComponent },
  { path: 'info-club/:id', component: InfoClubComponent },
  { path: 'info-event/:id', component: InfoEventComponent },
  { path: 'chat-list/:id', component: ChatListComponent, canActivate: [AuthGuard] },

  // Create an object
  { path: 'crear-user', component: CrearUserComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
  { path: 'crear-event', component: CrearEventComponent, canActivate: [AuthGuard] },
  { path: 'crear-book', component: CrearBookComponent, canActivate: [AuthGuard] },
  { path: 'chat-create', component: ChatCreateComponent, canActivate: [AuthGuard] },
  { path: 'crear-club', component: CrearClubComponent, canActivate: [AuthGuard] },

  // Edit objects
  { path: 'editar-user/:id', component: CrearUserComponent, canActivate: [AuthGuard] },
  { path: 'editar-event/:name', component: CrearEventComponent, canActivate: [AuthGuard] },
  { path: 'editar-book/:_id', component: CrearBookComponent, canActivate: [AuthGuard] },

  // In case of a wrong URL, the code redirects to the main path
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
