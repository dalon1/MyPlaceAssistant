import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/IUser';
import { Role } from '../../models/Role';
import { SignUpModel } from '../../models/form-models/SignUpModel';
import { PaymentMethodManager } from '../data-service/payment-method-service';




@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public afFirestore: AngularFirestore,
    //private paymentMethodManager: PaymentMethodManager
  ) { }

  loginUser(newEmail?: string, newPassword?: string): Promise<any> {
    if (typeof newEmail !== 'undefined' && typeof newPassword !== 'undefined')
      return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
    else
      return this.afAuth.auth.signInAnonymously()
  }

  resetPassword(email: string): Promise<IUser> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<IUser> {
    return this.afAuth.auth.signOut();
  }

  signUpUser(user: IUser, password: string): Promise<IUser> {
    let newUser: Promise<IUser> = this.afAuth.auth.createUserWithEmailAndPassword(user.email, password);
    newUser
      .then(() => {
        user.id = this.afAuth.auth.currentUser.uid;
        const usersCollection = this.afFirestore.collection<IUser>('users').doc(this.afAuth.auth.currentUser.uid);
        usersCollection.set(user);
      });
    return newUser;
  }
}