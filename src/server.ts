import * as WebSocket from "ws"
import {Player} from "./model/Player";
import * as express from 'express';
import * as http from 'http';
import { MatchMakingService } from "./MatchMakingService";
import {Match} from "./model/Match";

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const matchMakingService = new MatchMakingService()

let players: Array<Player> = [];
let count: number = 0;

wss.on('connection', (ws: WebSocket) => {
    console.log("open connection");

    // рандом 0 - 1000
    let randomRating: number = Math.random() * 1000;

    let player: Player = new Player(count.toString(), randomRating)
    players.push(player)
    ws.send("New player: " + player.getInfo());
    count++;
    console.log('players size: ', players.length)
    console.log('player Reiting: ', randomRating)

    let matchs: Array<Match> = matchMakingService.startMatchMaking(players)

    if (matchs.length > 0) {
        ws.send(matchs.map(m => m.toString()).toString());
        for (let playersInMatch of matchs.map(m => m.allPlayers)) {
            playersInMatch.forEach(p => {
                players = players.filter((a: Player) => a.name != p.name)
            })
        }
    }
});

server.listen(process.env.PORT || 8000, () => {

    // @ts-ignore
    console.log(`Server port: ${server.address().port} :)`);
});
