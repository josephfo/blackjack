import { Strategy } from "./strategy";
import { Hand } from "./hand";

export class Player {
    bank: number;
    strategy: Strategy;
    baseBet: number;
    spread: number;
    hands: Hand[];

    constructor(strategy: Strategy, initialBank: number, baseBet: number, spread: number) {
        this.strategy = strategy;
        this.bank = initialBank;
        this.baseBet = baseBet;
        this.spread = spread;
        this.hands = [];
    }

    betSize(trueCount: number): number {
        let bet = this.baseBet;
        if (trueCount > 0) {
            bet += trueCount * this.spread * this.baseBet;
            console.log(`Positive True Count. Increasing Bet to ${bet}`)
        }
        return  bet;
    }


}