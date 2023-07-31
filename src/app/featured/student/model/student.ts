import { Course } from "../../course/model/model"
import { Subject } from "../../subject/model/models"

export interface Student {
    id: number,
    name: string,
    surname: string,
    registerDate: Date,
    email: string,
    birthdate?: Date,
    inscriptions?: Inscription[]
}

export interface Inscription {
    id: number,
    student: Student,
    course: Course,
    subject: Subject //?
}