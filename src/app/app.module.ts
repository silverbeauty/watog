import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';

//import { AlertController } from 'ionic-angular';

	/*Components*/
import { MyApp } from './app.component';

	/*Pages*/
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterOneOfThreePage } from '../pages/register-one-of-three/register-one-of-three';
import { LandingPage } from '../pages/landing/landing';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { BestGroupPhotoWithTheWatogLogoPage } from '../pages/best-group-photo-with-the-watog-logo/best-group-photo-with-the-watog-logo';
import { AccomplishmentsToDatePage } from '../pages/accomplishments-to-date/accomplishments-to-date';
import { BestHumanitaryPhotoPage } from '../pages/best-humanitary-photo/best-humanitary-photo';
import { BestPhotoWithTheWatogLogoPage } from '../pages/best-photo-with-the-watog-logo/best-photo-with-the-watog-logo';
import { BestSurgicalImagePage } from '../pages/best-surgical-image/best-surgical-image';
import { BestUltrasoundImagePage } from '../pages/best-ultrasound-image/best-ultrasound-image';
import { ContestPage } from '../pages/contest/contest';
import { ContestSearchPage } from '../pages/contest-search/contest-search';
import { ContestSearchResultsPage } from '../pages/contest-search-results/contest-search-results';
import { ContestSubmitPage } from '../pages/contest-submit/contest-submit';
import { ContestSubmitedPage } from '../pages/contest-submited/contest-submited';
import { ContestVotePage } from '../pages/contest-vote/contest-vote';
import { FuturNearTermGoalsPage } from '../pages/futur-near-term-goals/futur-near-term-goals';
import { MissionOfWatogPage } from '../pages/mission-of-watog/mission-of-watog';
import { OrganizationPage } from '../pages/organization/organization';
import { ParticipatePage } from '../pages/participate/participate';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterThreeOfThreePage } from '../pages/register-three-of-three/register-three-of-three';
import { RegisterTwoOfThreePage } from '../pages/register-two-of-three/register-two-of-three';
import { UploadCoverPhotoPage } from '../pages/upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../pages/upload-profile-photo/upload-profile-photo';
import { WhatIsWatogPage } from '../pages/what-is-watog/what-is-watog';
import { SettingsPage } from '../pages/settings/settings';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';


	/*Provider*/
import { DataProvider } from '../providers/data/data';
import { DistantDataBaseProvider } from '../providers/distant-data-base/distant-data-base';
import { RestProvider } from '../providers/rest/rest';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
  	LoginPage,
  	RegisterOneOfThreePage,
  	LandingPage,
  	DashboardPage,
  	BestGroupPhotoWithTheWatogLogoPage,
  	AccomplishmentsToDatePage,
  	BestHumanitaryPhotoPage,
  	BestPhotoWithTheWatogLogoPage,
  	BestSurgicalImagePage,
  	BestUltrasoundImagePage,
  	ContestPage,
  	ContestSearchPage,
  	ContestSearchResultsPage,
  	ContestSubmitPage,
  	ContestSubmitedPage,
  	ContestVotePage,
  	FuturNearTermGoalsPage,
  	MissionOfWatogPage,
  	OrganizationPage,
  	ParticipatePage,
  	ProfilePage,
  	RegisterThreeOfThreePage,
  	RegisterTwoOfThreePage,
  	UploadCoverPhotoPage,
  	UploadProfilePhotoPage,
  	WhatIsWatogPage,
	SettingsPage,
	ChangePasswordPage,
	EditProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  	LoginPage,
  	RegisterOneOfThreePage,
  	LandingPage,
  	DashboardPage,
  	BestGroupPhotoWithTheWatogLogoPage,
  	AccomplishmentsToDatePage,
  	BestHumanitaryPhotoPage,
  	BestPhotoWithTheWatogLogoPage,
  	BestSurgicalImagePage,
  	BestUltrasoundImagePage,
  	ContestPage,
  	ContestSearchPage,
  	ContestSearchResultsPage,
  	ContestSubmitPage,
  	ContestSubmitedPage,
  	ContestVotePage,
  	FuturNearTermGoalsPage,
  	MissionOfWatogPage,
  	OrganizationPage,
  	ParticipatePage,
  	ProfilePage,
  	RegisterThreeOfThreePage,
  	RegisterTwoOfThreePage,
  	UploadCoverPhotoPage,
  	UploadProfilePhotoPage,
	WhatIsWatogPage,
	SettingsPage,
	ChangePasswordPage,
	EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    SQLite,
    DistantDataBaseProvider,
    RestProvider,
    HttpClient
  ]
})
export class AppModule {}
