/*
 * Copyright 2018 Markus Andersons
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AppConstants from "../AppConstants";
import * as ApiTools from './ApiTools';
import axios from 'axios';

class AuthService {
  /**
   * Remove the token from storage, log out
   */
  static removeToken() {
    localStorage.removeItem("token");
    localStorage.setItem("authenticated", false);
    localStorage.setItem("auth_time", Date.now())
  }

  /**
   * Store the given access token
   * @param {string} token the access token
   */
  static storeToken(token) {
    localStorage.setItem("token", token);
    localStorage.setItem("authenticated", true);
    localStorage.setItem("auth_time", Date.now())
  }

  /**
   * Determine if the user is authenticated
   * @returns boolean, true if authenticated
   */
  static isAuthenticated() {
    const authenticated = (localStorage.getItem("authenticated") === "true");
    if (authenticated === null || !authenticated) return false;
    if (localStorage.getItem("auth_time") != null) {
      if (Date.now() - localStorage.getItem("auth_time") > AppConstants.MAX_AUTH_AGE) {
        return this.checkAuthenticationStatus();
      } else {
        return true;
      }
    }
    return false;
  }

  /**
   * Check with the server if the user is currently authenticated
   * Should only be run when the localStorage value for `token` is set
   * @returns boolean, true if authenticated
   */
  static checkAuthenticationStatus() {
    const header = ApiTools.getDefaultHeader();
    let authenticated = false;
    axios.get(AppConstants.API_STATUS, {headers: header})
      .then((result) => {
        const status = result.data.status;
        if (status !== "OK") {
          this.removeToken();
          authenticated = false;
        } else {
          authenticated = true;
          localStorage.setItem("auth_time", Date.now())
        }
      })
      .catch((error) => {
        // If not authenticated, remove token
        this.removeToken();
        authenticated = false;
      });
    return authenticated;
  }
}

export default AuthService;
