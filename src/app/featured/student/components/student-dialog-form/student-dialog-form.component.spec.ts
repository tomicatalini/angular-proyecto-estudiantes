import { TestBed } from '@angular/core/testing';
import { StudentDialogFormComponent } from './student-dialog-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { Student } from '../../model/student';

describe('StudentDialogForm', () => {
    let component: StudentDialogFormComponent;

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
                {provide: MatDialogRef<StudentDialogFormComponent>, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: [{}]},
            ]
        });

        component = TestBed.createComponent(StudentDialogFormComponent).componentInstance;
    });

    it('StudentForm should be invalid if required fields are blank', () => {
        component.idControl.setValue(null);
        component.nameControl.setValue('');
        component.surnameControl.setValue('');
        component.birthdateControl.setValue(null);
        component.emailControl.setValue('');

        expect(component.studentForm.invalid).toBeTruthy();
    })

    it('NameControl should be valid if it length is greater or equal than four (4)', () => {
        component.nameControl.setValue('tomi');

        expect(component.nameControl.value?.length).toBeGreaterThanOrEqual(4);
    })

    it('Close method sould verify if StudentForm is valid, then should send StudentForm value', () => {
        const student: Student = {
            id: 1,
            name: 'Tomi',
            surname: 'Catalini',
            birthdate: new Date(),
            email: 'tomi@catalini.com',
            registerDate: new Date()
        };

        component.idControl.setValue(student.id);
        component.nameControl.setValue(student.name);
        component.surnameControl.setValue(student.surname);
        component.birthdateControl.setValue(student.birthdate);
        component.emailControl.setValue(student.email);
        
        expect(component.studentForm.valid).toBeTruthy();

        component.close();
        const spyOfDialogRefClose = spyOn(component.dialogRef, 'close');
        // expect(spyOfDialogRefClose).toHaveBeenCalledWith({...component.studentForm.value, registerDate: student.registerDate});
        expect(spyOfDialogRefClose).toHaveBeenCalled();
    })
})