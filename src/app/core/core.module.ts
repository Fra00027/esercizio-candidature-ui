import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { coreRoutes } from './core.routes';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostItemComponent } from '../shared/post-item/post-item.component';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    CoreComponent,
    NavbarComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes),
    PostItemComponent
  ],
  providers: [ApiService]
})
export class CoreModule { }