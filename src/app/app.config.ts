import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
 
const firebaseConfig = {
  apiKey: 'LA_TUA_API_KEY',
  authDomain: 'TUO_PROGETTO.firebaseapp.com',
  projectId: 'TUO_PROGETTO',
  storageBucket: 'TUO_PROGETTO.appspot.com',
  messagingSenderId: '...',
  appId: '...'
};
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};