import Axios from 'axios';
import qs from 'querystring';
import { API_AUTHENTICATION_SIGNUP, API_AUTHENTICATION_LOGIN, API_AUTHENTICATION_VERIFY_SESSION } from '../helpers/apiUrls.helper';
const sessionStorageName = 'jwtAuthentication';

class Auth {
    constructor () {
        this.authenticated = false;
        this.user = {};
        this.options = { 'Content-Type': 'application/x-www-from-urlencoded' };
    }

    signUp(params) {
        return new Promise((resolve, reject) => {
            Axios.post(API_AUTHENTICATION_SIGNUP, qs.stringify(params), this.options)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        })
    }

    logIn(email, password) {
        return new Promise((resolve, reject) => {
            Axios.post(API_AUTHENTICATION_LOGIN, qs.stringify({ email, password }), this.options)
            .then(({ data }) => {
                console.log('Authorization Service: ', data);
                this.authenticated = data.authenticationSuccess;
                this.user = data.user;
                sessionStorage.setItem(sessionStorageName, data.tokenAuthorization);
                resolve({
                    authenticated: data.authenticationSuccess,
                    user: data.user
                });
            })
            .catch((error) => {
                reject(error)
            });
        });
    }

    logOut() {
        sessionStorage.removeItem(sessionStorageName);
        window.location.reload();
    }

    verifySession() {
        return new Promise((resolve, reject) => {
            const jwtClientSession = sessionStorage.getItem(sessionStorageName);
            if (jwtClientSession) {
                Axios.post(API_AUTHENTICATION_VERIFY_SESSION, { jwtClientSession })
                .then(({ data }) => {
                    if (data.error) reject(data.error);
                    resolve({
                        authenticated: data.authenticationSuccess,
                        user: data.user
                    });
                })
                .catch(error => {
                    reject(error.response.data);
                })
            } else {
                reject('Aún no has iniciado sesión.');
            }
        })
    }

}

export default new Auth();