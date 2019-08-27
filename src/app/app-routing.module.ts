import { DetailEventComponent } from './pages/detail-event/detail-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MatInputModule } from '@angular/material';
import { CreateEventControllerComponent } from './pages/create-event/controller/create-event.controller.component';
import { LoginComponent } from './pages/login/login.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { EventListingComponent } from './shared/components/event-listing/presenter/event-listing.component';
import { AdminEventDetailComponent } from './pages/admin-event-detail/admin-event-detail.component';
import { ProfileViewComponent } from './pages/profile/profile.component';
import { EventAproveListComponent } from './pages/event-aprove-list/event-aprove-list.component';
import { RegisterEventTypeComponent } from './pages/register-event-type/register-event-type.component';
import { MyEventsComponent } from './pages/my-events/presenter/my-events.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';


const routes: Routes = [
  { path: '',             component: HomeComponent },
  { path: 'novo-evento', component: CreateEventControllerComponent },
  { path: 'event/:id', component: DetailEventComponent},
  { path: 'cadastrar', component: SingUpComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin/lista-eventos', component: EventAproveListComponent},
  { path: 'admin/detalhe-evento/:id', component: AdminEventDetailComponent},
  { path: 'profile', component: ProfileViewComponent},
  { path: 'admin/tag-categoria', component: RegisterEventTypeComponent},
  { path: 'meus-eventos', component: MyEventsComponent},
  { path: 'edit-event/:id', component: EditEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatInputModule],
  exports: [RouterModule, MatInputModule]
})
export class AppRoutingModule { }
