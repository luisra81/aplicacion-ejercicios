import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ 
    projectId: "autorenta-edae0", 
    appId: "1:254362843284:web:20c3beecc6481434921c81", 
    storageBucket: "autorenta-edae0.firebasestorage.app", 
    apiKey: "AIzaSyBHZnv2oPo4gmfhzFbKhMQbJbxvXoxmVRw", 
    authDomain: "autorenta-edae0.firebaseapp.com", 
    messagingSenderId: "254362843284", 
    measurementId: "G-SZX4Q1VK0Q" })), provideFirestore(() => getFirestore())]
};
