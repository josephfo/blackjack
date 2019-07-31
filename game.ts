import { BlackJack } from "./blackjack";
import { Player } from "./player";
import { Strategy } from "./strategy";

let player: Player = new Player(new Strategy(), 1000, 10);
let blackJack: BlackJack = new BlackJack(6, player);

for (let i = 0; i < 100; i++) {
    blackJack.playShoe();
    console.log(`${i + 1} ${player.bank}`)
}
