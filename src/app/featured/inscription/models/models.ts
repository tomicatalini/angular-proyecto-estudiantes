import { Course } from "../../course/model/model"
import { Student } from "../../student/model/student"

export interface Inscription {
    id: number | null,
    studentId: number,
    courseId: number,
    date: Date,
    course?: Course,
    student?: Student
}

export interface StudentModalInscription {
    courseId: number,
    enrolledStudentsIds: number[] | null,
}

export interface CourseModalInscription {
    studenId: number,
    enrolledCoursesIds: number[] | null,
}