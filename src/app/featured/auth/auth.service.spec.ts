import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { User } from '../user/models/models';
import { environment } from 'src/environments/environment';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';

describe('InscriptionService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;

    let mockUser: User;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                MockProvider(Router)
            ]
        });

        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);

        mockUser = {
            id: 1,
            name: 'test-name',
            surname: 'test-username',
            email: 'testinglogin@email.com',
            password: 'test-password',
            token: 'asdsadsa123zxd',
            role: 'admin'
        };
    });

    afterEach(() => {
        httpController.verify();
    }),

    it('should be created', () => {
        expect(service).toBeTruthy();
    }); 

    it('If user is VALID, login should emit the user and navigates to /dashboard', (done) => {
        const router: Router = TestBed.inject(Router);        

        const mockUser: User = {
            id: 1,
            name: 'test-name',
            surname: 'test-username',
            email: 'testinglogin@email.com',
            password: 'test-password',
            token: 'asdsadsa123zxd',
            role: 'admin'
        };

        const mockResponse: User[] = [mockUser];
        
        const navigatesSpy = spyOn(router, 'navigate');

        service.login({
            email: mockUser.email,
            pass: mockUser.password
        });

        httpController.expectOne({
            method: 'GET',
            url: `${environment.baseApiUrl}/users?email=${mockUser.email}&password=${mockUser.password}`            
        }).flush(mockResponse);

        service.authUser$.subscribe({
            next: (user) => {
                expect(user).toBeTruthy();
                expect(user).toEqual(mockUser);
                expect(navigatesSpy).toHaveBeenCalledWith(['/dashboard']);
                done();
            }
        });

    });

    it('If user is INVALID, login should emit null and NO navigates', (done) => {
        const router: Router = TestBed.inject(Router);      
        const mockResponse = null;

        let failEmail = 'fail@email.com';
        let failPass = '123';

        const navigatesSpy = spyOn(router, 'navigate');

        service.login({
            email: failEmail,
            pass: failPass
        });

        httpController.expectOne({
            method: 'GET',
            url: `${environment.baseApiUrl}/users?email=fail@email.com&password=123`            
        }).flush(mockResponse);

        service.authUser$.subscribe({
            next: (user) => {
                expect(user).toBeNull();
                expect(navigatesSpy).not.toHaveBeenCalled();
                done();
            }
        })
    });

    it('Logout should be remove token stored in LocalStorage and navigates to /auth/login', () => {
        const router: Router = TestBed.inject(Router);  
        const removeSpy = spyOn(localStorage, 'removeItem');
        const navigatesSpy = spyOn(router, 'navigate');

        service.logout();

        expect(removeSpy).toHaveBeenCalled();
        expect(navigatesSpy).toHaveBeenCalledWith(['/auth/login']);
    })
})