import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SwingModule } from 'angular2-swing';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { Keyboard } from "@ionic-native/keyboard";

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
import { ContestVoteSearchDetailPage } from '../pages/contest-vote-search-detail/contest-vote-search-detail';
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
import { UploadWatogLogoPage} from "../pages/upload-watog-logo/upload-watog-logo";
import { WhatIsWatogPage } from '../pages/what-is-watog/what-is-watog';
import { SettingsPage } from '../pages/settings/settings';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EnterTokenPage } from '../pages/enter-token/enter-token';
import { VoteRandomPage } from '../pages/vote-random/vote-random';
import { VoteModalPage } from '../pages/vote-modal/vote-modal';
import { ModalPrinciplesPage } from '../pages/modal-principles/modal-principles';
import { ModalContestPage } from '../pages/modal-contest/modal-contest';
import { SelectionPage } from '../pages/selection/selection';
import { ProfilesLoadPage } from '../pages/profiles-load/profiles-load';
import { BestPhotoPage} from "../pages/best-photo/best-photo";
import { ModalChangeVotePage } from '../pages/modal-change-vote/modal-change-vote';
import { ImageModalPage } from '../pages/imge-modal/img-modal';
import { ModalLogout } from '../pages/modal-logout/modal-logout';
import { PartnersPage } from '../pages/partners/partners';
import { AdModalPage } from '../pages/ad-modal/ad-modal';
import { WatogContactPage } from '../pages/watog-contact/watog-contact';
import { ModalQualification } from '../pages/modal-qualification/modal-qualification';

import { AccomplishmentsToDatePageModule } from '../pages/accomplishments-to-date/accomplishments-to-date.module';


import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { MyRoomListPage } from '../pages/my-room-list/my-room-list';
import { PublicRoomListPage } from '../pages/public-room-list/public-room-list';
import { RoomCreatePrePage } from '../pages/room-create-pre/room-create-pre';
import { RoomCreatePage } from '../pages/room-create/room-create';
import { ChatPage } from '../pages/chat/chat';
import { EditChatRoomPage } from '../pages/edit-chat-room/edit-chat-room';
import { ReportModalPage } from '../pages/report-modal/report-modal';
import { RoomInfoPage } from '../pages/room-info/room-info';

import { LearnPage } from '../pages/learn/learn';
import { InstitutionalContentsPage } from '../pages/institutional-contents/institutional-contents';
import { SponsoredContentPage } from '../pages/sponsored-content/sponsored-content';
import { BreakingNewsPage } from '../pages/breaking-news/breaking-news';
import { VideosListPage } from '../pages/videos-list/videos-list';
import { PlayVideoPage } from '../pages/play-video/play-video';
import { LivePage } from '../pages/live/live';
import { LearnContentPage } from '../pages/learn-content/learn-content';
// components
import { HeaderActionBarComponent } from '../components/header-action-bar/header-action-bar';
import {EmojiPickerComponent} from '../components/emoji-picker/emoji-picker';

import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatService} from '../providers/chat-service/chat-service';
import { RelativeTime } from "../pipes/relative-time";

/*Provider*/
import { DataProvider } from '../providers/data/data';
import { DistantDataBaseProvider } from '../providers/distant-data-base/distant-data-base';
import { RestProvider } from '../providers/rest/rest';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CameraProvider } from '../providers/camera/camera';
import { ValidatorsModule } from '../providers/validator/validators.module';

// Directives
import { HideHeaderDirective } from '../directives/scroll-hide';
import { ZoomPanDirective } from '../directives/photo-zoom';

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
  	ContestVoteSearchDetailPage,
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
    UploadWatogLogoPage,
    WhatIsWatogPage,
    SettingsPage,
    ChangePasswordPage,
    EditProfilePage,
    EnterTokenPage,
    VoteRandomPage,
    VoteModalPage,
    ModalContestPage,
    ModalPrinciplesPage,
    SelectionPage,
    ProfilesLoadPage,
    BestPhotoPage,
    ModalChangeVotePage,
    ImageModalPage,
    HideHeaderDirective,
    ZoomPanDirective,
    ModalLogout,
    PartnersPage,
    AdModalPage,
    WatogContactPage,
    ModalQualification,

    ChatRoomPage,
    MyRoomListPage,
    PublicRoomListPage,
    RoomCreatePrePage,
    RoomCreatePage,
    ChatPage,
    EditChatRoomPage,
    ReportModalPage,
    RoomInfoPage,
    LearnPage,
    InstitutionalContentsPage,
    SponsoredContentPage,
    BreakingNewsPage,
    VideosListPage,
    PlayVideoPage,
    LivePage,
    LearnContentPage,


    // compoment
    HeaderActionBarComponent,
    EmojiPickerComponent,

    RelativeTime
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ValidatorsModule,
    SwingModule,
    IonicImageViewerModule,
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
  	ContestVoteSearchDetailPage,
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
    UploadWatogLogoPage,
    WhatIsWatogPage,
    SettingsPage,
    ChangePasswordPage,
    EditProfilePage,
    EnterTokenPage,
    VoteRandomPage,
    VoteModalPage,
    ModalContestPage,
    ModalPrinciplesPage,
    SelectionPage,
    ProfilesLoadPage,
    BestPhotoPage,
    ModalChangeVotePage,
    ImageModalPage,
    ModalLogout,
    PartnersPage,
    AdModalPage,
    WatogContactPage,
    ModalQualification,

    ChatRoomPage,
    MyRoomListPage,
    PublicRoomListPage,
    RoomCreatePrePage,
    RoomCreatePage,
    ChatPage,
    EditChatRoomPage,
    ReportModalPage,
    RoomInfoPage,
    LearnPage,
    InstitutionalContentsPage,
    SponsoredContentPage,
    BreakingNewsPage,
    VideosListPage,
    PlayVideoPage,
    LivePage,
    LearnContentPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    SQLite,
    DistantDataBaseProvider,
    RestProvider,
    HttpClient,
    NativeStorage,
    ImagePicker,
    CameraProvider,
    Camera,
    FileOpener,
    File,
    DocumentViewer,
    FileChooser,
    FilePath,
    FileTransferObject,
    InAppBrowser,
    PhotoViewer,
    EmailComposer,
    Keyboard,
    EmojiProvider,
    ChatService
  ]
})
export class AppModule {}
