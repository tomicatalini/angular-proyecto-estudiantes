import { Course } from "../../course/model/model";
import { Student } from "../../student/model/student";

export interface Inscription {
    id: number | string | null,
    studentId: number | string ,
    courseId: number | string
}