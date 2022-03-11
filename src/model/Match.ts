import {Player} from "./Player";

export class Match {
    private _team1: Array<Player>;
    private _team2: Array<Player>;
    private _allPlayers: Array<Player>;

    constructor() {
        this._team1 = []
        this._team2 = []
        this._allPlayers = []
    }

    public addPlayerInTeam1(player: Player): void {
        this._team1?.push(player)
        this._allPlayers?.push(player)
    }

    public addPlayerInTeam2(player: Player): void {
        this._team2?.push(player)
        this._allPlayers?.push(player)
    }

    public getDiffRatings(): number {
        let sumTeam1: number = 0;
        let sumTeam2: number = 0;

        for (let player of this._team1) {
            sumTeam1 += player.rating;
        }

        for (let player of this._team2) {
            sumTeam2 += player.rating;
        }

        return Match.modul(sumTeam1 - sumTeam2);
    }


    get allPlayers(): Array<Player> {
        return this._allPlayers;
    }

    get team1(): Array<Player> {
        return this._team1;
    }

    get team2(): Array<Player> {
        return this._team2;
    }

    private static modul(n: number): number {
        if (n < 0) {
            n = n * -1;
        }
        return n;
    }
}