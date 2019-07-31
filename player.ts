import { Strategy } from "./strategy";
import { Hand } from "./hand";

export class Player {
    bank: number;
    strategy: Strategy;
    betSize: number;
    hands: Hand[];

    constructor(strategy: Strategy, initialBank: number, betSize: number) {
        this.strategy = strategy;
        this.bank = initialBank;
        this.betSize = betSize;
        this.hands = [];
    }
}