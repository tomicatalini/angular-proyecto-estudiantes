import { Course } from "../../course/model/model"
import { Student } from "../../student/model/student"

export interface Inscription {
    id: number | null,
    studentId: number,
    courseId: number,
    course?: Course,
    student?: Student
}

export interface InscriptionModalData {
    id: number,
    students: Student[] | null,
    courses: Course[] | null,
    entity: string,
}