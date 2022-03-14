export class Player {

    private _team: number | undefined;
    private _rating: number;
    private _name: string;

    public constructor(name: string, rating: number) {
        this._rating = rating;
        this._name = name;
    }

    public getInfo(): string {
        return "Name: " + this.name +
            " Rating: " + this._rating.toString()
    }

    public setTeam(team: number) {
        this._team = team;
    }

    public getTeam(): number { return <number>this._team; }


    get team(): number | undefined {
        return this._team;
    }

    set team(value: number | undefined) {
        this._team = value;
    }

    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this._rating = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}