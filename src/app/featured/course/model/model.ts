export interface Course {
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    subject?: Subject
}

export interface Subject {
    id: number,
    name: string,
    description: string
}