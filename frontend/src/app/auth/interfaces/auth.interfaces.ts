import { Player } from "src/app/nba/interfaces/nba.interfaces";

export interface AuthResponse {
    ok: boolean,
    msg?: string,
    username? : string,
    email?: string,
    token?: string,
    roleId: string,
    role?: string,
    id: string,
    favs?: Player[]
}

export interface Usuario {
    username: string,
    email: string,
    role: string,
    userId: string
}