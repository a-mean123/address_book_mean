import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListComponent } from './home/list/list.component';
import { AddComponent } from './home/add/add.component';
import { EditComponent } from './home/edit/edit.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', canActivate: [ AuthGuard ] , component: HomeComponent, children: [
    
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'add', component: AddComponent },
    { path: 'update/:id', component: EditComponent }

  ] },



  
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: '**' , component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
