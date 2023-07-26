export interface Student {
    id: number,
    name: string,
    surname: string,
    registerDate: Date,
    email: string,
    birthdate?: Date,
    inscriptions?: Inscription[]
}

export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    token: string,
    role: string
}

export interface Subject {
    id: number,
    name: string,
    description: string
}

export interface Course {
    id: number,
    startDate: Date,
    endDate: Date,
    subject: Subject
}

export interface Inscription {
    id: number,
    student: Student,
    course: Course,
    subject: Subject //?
}