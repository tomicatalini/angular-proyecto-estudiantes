import { Inscription } from "../../inscription/models/models"

export interface Student {
    id: number,
    name: string,
    surname: string,
    registerDate: Date,
    email: string,
    birthdate?: Date,
    inscriptions?: Inscription[]
}