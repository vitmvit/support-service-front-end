import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {IndexComponent} from './view/welcome/index/index.component';
import {LoginComponent} from './view/welcome/login/login.component';
import {Page404Component} from "./view/welcome/page404/page404.component";
import {CabinetMyProfileComponent} from "./view/auth/cabinet/cabinet-my-profile/cabinet-my-profile.component";

import {
  CabinetPageGeneralMessagesComponent
} from "./view/auth/cabinet/cabinet-page-general-messages/cabinet-page-general-messages.component";
import {CabinetPageChatComponent} from './view/auth/cabinet/cabinet-page-chat/cabinet-page-chat.component';
import {CabinetPageMessagesComponent} from './view/auth/cabinet/cabinet-page-messages/cabinet-page-messages.component';
import { CabinetPageControlUserCreateComponent } from './view/auth/cabinet/cabinet-page-control-user-create/cabinet-page-control-user-create.component';
import { CabinetPageControlUserDeleteComponent } from './view/auth/cabinet/cabinet-page-control-user-delete/cabinet-page-control-user-delete.component';
import { Page500Component } from './view/welcome/page500/page500.component';
import { CabinetEditImageComponent } from './view/auth/cabinet/cabinet-edit-image/cabinet-edit-image.component';
import { CabinetStateTemplateCreateComponent } from './view/auth/cabinet/cabinet-state-template-create/cabinet-state-template-create.component';
import { CabinetEditDirectoryComponent } from './view/auth/cabinet/cabinet-edit-directory/cabinet-edit-directory.component';

export const routes: Routes = [
  // welcome
  {path: '', component: IndexComponent},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  // cabinet
  {path: 'auth', component: CabinetMyProfileComponent},
  {path: 'auth/cabinet', component: CabinetMyProfileComponent},
  {path: 'auth/cabinet/control/create', component: CabinetPageControlUserCreateComponent},
  {path: 'auth/cabinet/control/delete', component: CabinetPageControlUserDeleteComponent},
  {path: 'auth/cabinet/message', component: CabinetPageMessagesComponent},
  {path: 'auth/cabinet/general/message', component: CabinetPageGeneralMessagesComponent},

  // cabinet chats
  {path: '', redirectTo: 'auth/cabinet/chat-list', pathMatch: 'full' },
  {path: 'auth/cabinet/chat-list', component: CabinetPageChatComponent },
  {path: 'auth/cabinet/chat/:id', component: CabinetPageChatComponent },

  // cabinet edit image
  {path: 'auth/cabinet/edit/image', component: CabinetEditImageComponent },

  // cabinet edit state template
  {path: 'auth/cabinet/edit/stateTemplate', component: CabinetStateTemplateCreateComponent },

  // cabinet edit directory
  {path: 'auth/cabinet/edit/directory', component: CabinetEditDirectoryComponent },

  // 500
  {path: 'page500', component: Page500Component},

  // 404
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class AppRoutingModule {

}

