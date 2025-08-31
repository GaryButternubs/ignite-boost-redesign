import { Injectable, signal } from '@angular/core';
import { User } from './User';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class UserRequests {
  private delay = 1000;
  private loggedIn = signal<boolean>(false);
  private user = signal<User>({
    username: '',
    password: ''
  });

  async getAuth(): Promise<boolean> {
    await this.simulateDelay();
    return this.loggedIn();
  }

  async signup(newUser: User): Promise<Response> {
    await this.simulateDelay();

    try {
      this.user.set(newUser);
      return {
        status: 200,
        message: 'Account created successfully.',
        redirect: '',
      };
    } catch(error) {
      return {
        status: 500,
        message: 'Unable to create account. Please try again later.',
      };
    }
  }

  async login(credentials: User): Promise<Response> {
    await this.simulateDelay();

    // Check that login data is correct
    if (credentials.username !== this.user().username || credentials.password !== this.user().password) {
      return {
        status: 400,
        error: 'Incorrect username or password. Please try again.'
      };
    }

    try {
      this.loggedIn.set(true);
      return {
        status: 200,
        message: 'Logged in successfully.',
        redirect: '',
      }
    } catch(error) {
      return {
        status: 500,
        error: 'Unable to log in. Please try again later.',
      };
    }
  }

  async logout(): Promise<Response> {
    await this.simulateDelay();

    try {
      this.loggedIn.set(false);
      return {
        status: 200,
        message: 'Successfully logged out.',
        redirect: '',
      }
    } catch(error) {
      return {
        status: 500,
        error: 'Unable to logout. Please try again later.'
      }
    }
  }

  async changePassword(newCredentials: User): Promise<Response> {
    await this.simulateDelay();

    // Check that username is correct
    if (newCredentials.username !== this.user().username) {
      return {
        status: 400,
        error: 'Username is incorrect. Please try again.'
      }
    } else if (newCredentials.retypePassword !== newCredentials.password) {
      return {
        status: 400,
        error: 'Passwords do not match. Please try again.'
      }
    }

    try {
      this.user.update(user => {
        user.password = newCredentials.password;
        return user;
      });

      return {
        status: 200,
        message: 'Password updated successfully',
        redirect: ''
      };
    } catch(error) {
      return {
        status: 500,
        error: 'Unable to update password. Please try again later.'
      };
    }
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
