import { BlackJack } from "./blackjack";
import { Player } from "./player";
import { Strategy } from "./strategy";




for (let j = 0; j < 2; j++) {
    let player: Player = new Player(new Strategy(), 0, 10, 1);
    let blackJack: BlackJack = new BlackJack(6, player);

    //let min = 1000;
    //let max = 1000;

    for (let i = 0; i < 10; i++) {
        blackJack.playShoe();
        // if (player.bank > max) {
        //     max = player.bank;
        // }

        // if (player.bank < min) {
        //     min = player.bank;
        // }

        //console.log(`${i + 1} ${player.bank}`);
    }
    console.log(`${blackJack.totalBetAmount},${player.bank},${player.bank / blackJack.totalBetAmount}`);
    //console.log(`MAX: ${max}`);
    //console.log(`MIN: ${min}`);
}





