import * as WebSocket from "ws"
import {Player} from "./model/Player";
import * as express from 'express';
import * as http from 'http';
import { MatchMakingService } from "./MatchMakingService";

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

    players.push(new Player(count.toString(), randomRating))
    count++;
    console.log('players size: ', players.length)
    console.log('player Reiting: ', randomRating)

    matchMakingService.startMatchMaking(players)
});

server.listen(process.env.PORT || 8000, () => {

    // @ts-ignore
    console.log(`Server port: ${server.address().port} :)`);
});
