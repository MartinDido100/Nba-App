export interface PlayerResponse {
    ok: boolean,
    players?: Player[],
    msg?: string,
    player?: Player
}

export interface Player {
    name: string,
    team: string,
    age: number,
    titles: number,
    _id: string,
    img?: string,
}