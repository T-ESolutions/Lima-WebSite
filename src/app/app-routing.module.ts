import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { FavouriteComponent } from './components/account/favourite/favourite.component';
import { LoginComponent } from './components/account/login/login.component';
import { MyinfoComponent } from './components/account/myinfo/myinfo.component';
import { PasswordComponent } from './components/account/password/password.component';
import { RegisterComponent } from './components/account/register/register.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';
import { TestComponent } from './components/account/test/test.component';
import { VarifyComponent } from './components/account/varify/varify.component';
import { ArticlesComponent } from './components/kids/articles/articles.component';
import { CartoonComponent } from './components/kids/cartoon/cartoon.component';
import { KidsComponent } from './components/kids/kids.component';
import { StoriesComponent } from './components/kids/stories/stories.component';
import { TalesComponent } from './components/kids/tales/tales.component';
import { MomsComponent } from './components/moms/moms.component';
import { ParentingArticlesComponent } from './components/moms/parenting-articles/parenting-articles.component';
import { ParentingVideosComponent } from './components/moms/parenting-videos/parenting-videos.component';
import { ApplicationComponent } from './components/more/application/application.component';
import { ContactComponent } from './components/more/contact/contact.component';
import { IdeaComponent } from './components/more/idea/idea.component';
import { MoreComponent } from './components/more/more.component';
import { PrivacyComponent } from './components/more/privacy/privacy.component';
import { TeamComponent } from './components/more/team/team.component';
import { TermsComponent } from './components/more/terms/terms.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LogGuard } from './guards/log.guard';

const routes: Routes = [
  { path: '', redirectTo: 'kids', pathMatch: 'full' },
  { path: 'kids', component: KidsComponent },
  { path: 'kids/cartoon', component: CartoonComponent },
  { path: 'kids/tales', component: TalesComponent },
  { path: 'kids/stories', component: StoriesComponent },
  { path: 'kids/articles', component: ArticlesComponent },
  { path: 'moms', component: MomsComponent },
  { path: 'moms/parenting-videos', component: ParentingVideosComponent },
  { path: 'moms/parenting-articles', component: ParentingArticlesComponent },
  { path: 'account', component: AccountComponent },
  { path: 'more', component: MoreComponent },
  { path: 'account/test', component: TestComponent },
  { path: 'account/favourite', component: FavouriteComponent, canActivate:[LogGuard]},
  { path: 'account/myinfo', component: MyinfoComponent , canActivate:[LogGuard]},
  { path: 'account/subscribe', component: SubscribeComponent, canActivate:[LogGuard] },
  { path: 'account/password', component: PasswordComponent, canActivate:[LogGuard] },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/varify', component: VarifyComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'more/privacy', component: PrivacyComponent },
  { path: 'more/terms', component: TermsComponent },
  { path: 'more/application', component: ApplicationComponent },
  { path: 'more/contact', component: ContactComponent },
  { path: 'more/idea', component: IdeaComponent },
  { path: 'more/team', component: TeamComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
