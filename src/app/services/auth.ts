import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
 
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}
 
  async login(email: string, password: string): Promise<string> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password);
    const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
    if (!userDoc.exists()) throw new Error('Utente non autorizzato.');
    return userDoc.data()['role'];
  }
}