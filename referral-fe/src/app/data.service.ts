import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInput } from './user/models/user-input.model';

@Injectable()
export class DataServices {
    constructor(
        private httpClient: HttpClient,
    ){}

    getUserReferrals(id: string) {
        return this.httpClient.get(environment.API_URL + '/users/' + id + '/referrals')
        .pipe(catchError(this.handleError))
    }

    getUsers(){
        return this.httpClient.get(environment.API_URL + '/users/')
        .pipe(catchError(this.handleError))
    }

    register(user: UserInput){
        return this.httpClient.post(environment.API_URL + '/users/register', user, {})
        .pipe(catchError(this.handleError))
    }

    handleError(error: HttpErrorResponse) {
        return throwError(() => error)
    }
}