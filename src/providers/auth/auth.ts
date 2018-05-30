import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private user: firebase.User;

  get authenticated(): boolean {
    if (firebase.auth().currentUser != null) {
      return true
    } else {
      return false
    }
  }

  constructor() {
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref(`/users/${newUser.uid}/email`)
          .set(email);
      })
      .catch(error => console.error(error));
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }
}
