import {Queue} from "./model/Queue";
import {Player} from "./model/Player";
import {Match} from "./model/Match";
import * as WebSocket from "ws";

export class MatchMakingService {
    // @ts-ignore
    private static distributionSixPlayers(sortedPlayers: Array<Player>): Match {
        let match: Match = new Match();
        console.log("start matching, players: ", sortedPlayers.length)
        if (sortedPlayers.length != 6) {
            console.log("match != 6")
            return match;
        }

        console.log("running matching")
        let isFirstTeam: boolean = false;
        let size: number = sortedPlayers.length;

        for (let i = 0; i < size; i++) {
            if (i === 0) {
                match.addPlayerInTeam1(<Player>sortedPlayers.at(i))
            } else {
                if (isFirstTeam) {
                    match.addPlayerInTeam1(<Player>sortedPlayers.at(i))
                    i++;
                    if (i < size) {
                        match.addPlayerInTeam1(<Player>sortedPlayers.at(i))
                    }
                    isFirstTeam = false;
                } else {
                    match.addPlayerInTeam2(<Player>sortedPlayers.at(i))
                    i++;
                    if (i < size) {
                        match.addPlayerInTeam2(<Player>sortedPlayers.at(i))
                    }
                    isFirstTeam = true;
                }
            }
        }

        let diff = match.getDiffRatings();

        console.log("rating diff: ", diff)
        if (diff > 50) {
            return new Match()
        }

        return match
    }

    public startMatchMaking(players: Array<Player>): Array<Match> {
        let playersIsDiff: boolean = true;
        let matchs: Array<Match> = [];

        while (playersIsDiff) {
            let match = MatchMakingService.startDistribution(players)

            for (let player of match.allPlayers) {
                players = players.filter((a: Player) => a.name != player.name)
            }
            console.log('All players : ', players)
            if (match.allPlayers.length == 0) {
                playersIsDiff = false;
            } else {
                matchs.push(match)
            }

        }

        console.log('All players at END : ', players)
        return matchs;
    }

    private static startDistribution(players: Array<Player>): Match {
        let startIndex = 0;
        let match: Match = new Match();

        let sortedPlayers: Array<Player> = players.sort((a: Player, b: Player) => a.rating - b.rating)

        while (startIndex + 6 <= sortedPlayers.length) {
            match = MatchMakingService.distributionSixPlayers(sortedPlayers.slice(startIndex, startIndex + 6))

            startIndex++;
            if (match.allPlayers.length == 6) {
                console.log("MATCH STARTED! : ", match)
                return match;
            }
        }
        return match;
    }
}

