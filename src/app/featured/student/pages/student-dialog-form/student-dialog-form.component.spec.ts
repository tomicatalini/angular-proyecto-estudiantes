import { TestBed } from '@angular/core/testing';
import { StudentDialogFormComponent } from './student-dialog-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { Student } from '../../model/student';

describe('StudentDialogForm', () => {
    let component: StudentDialogFormComponent;

    const dialogMock ={
        close:(dialogMockResukt?: any) => {},
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StudentDialogFormComponent],
            imports: [
                MatFormFieldModule, 
                MatInputModule, 
                MatDatepickerModule, 
                MatDialogModule, 
                ReactiveFormsModule,
                MatNativeDateModule
            ],
            providers: [
                {provide: MatDialogRef<StudentDialogFormComponent>, useValue: dialogMock},
                {provide: MAT_DIALOG_DATA, useValue: []},
            ]
        });

        component = TestBed.createComponent(StudentDialogFormComponent).componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });    

    it('StudentForm should be invalid if required fields are blank', () => {
        component.idControl.setValue(null);
        component.nameControl.setValue('');
        component.surnameControl.setValue('');
        component.birthdateControl.setValue(null);
        component.emailControl.setValue('');

        expect(component.studentForm.invalid).toBeTruthy();
    });

    it('NameControl should be valid if it length is greater or equal than four (4)', () => {
        component.nameControl.setValue('tomi');

        expect(component.nameControl.value?.length).toBeGreaterThanOrEqual(4);
    });

    it('Emails should have a valid pattern if needed', () => {

        const controls = component.studentForm.controls;
        const emailsControls: AbstractControl[] = [];
        const validEmail = 'valid@example.com'
        const invalidEmail = 'invalid.com'

        for(let controlKey in controls){
            let control: AbstractControl = controls[controlKey];

            if(control.hasValidator(Validators.email)){
                emailsControls.push(control);
            }
        }

        //Verifica si un mail es valido.
        for(let control of emailsControls){
            control.setValue(validEmail);
            expect(control.valid).toBeTruthy();
        }

        //Verifica si un mail es invalido.
        for(let control of emailsControls){
            control.setValue(invalidEmail);
            expect(control.invalid).toBeTruthy();
        }
    });

    it('Close method sould verify if StudentForm is valid, then should send StudentForm value with register date', () => {      

        const validMockStudent: Student = {
            id: 1,
            name: 'Tomi',
            surname: 'Catalini',
            birthdate: new Date(1995,2,11),
            email: 'tomi@catalini.com',
            registerDate: new Date(2023,3,2),
        };

        component.idControl.setValue(validMockStudent.id);
        component.nameControl.setValue(validMockStudent.name);
        component.surnameControl.setValue(validMockStudent.surname);
        component.birthdateControl.setValue(validMockStudent.birthdate);
        component.emailControl.setValue(validMockStudent.email);
        
        expect(component.studentForm.valid).toBeTruthy();

        const spyOfDialogRefClose = spyOn(component.dialogRef, 'close');

        component.close();

        expect(spyOfDialogRefClose).toHaveBeenCalledWith({...validMockStudent, registerDate: new Date()});
    })
})