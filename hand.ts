import { Card } from "./card";

export class Hand {
    public cards: Card[];
    public hasAce: boolean = false;
    // count is the sum of all card values and Ace is always 1.
    // This is used to lookup actions in the strategy table.
    public count: number;
    public splitAllowed: boolean = false;
    public doubleAllowed: boolean = false;
    public busted: boolean = false;
    public betSize: number;
    public hasBlackJack: boolean = false;

    constructor(bet: number = 0) {
        // default to zero because dealer will not have a bet.
        this.cards = [];
        this.count = 0;
        this.betSize = bet;
    }

    doubleBet() {
        this.betSize *= 2;
    }

    removeCard(): Card {
        // Only called during split.
        let card = this.cards.pop();
        this.count -= card.value;
        return card;
    }

    toString(): string {
        let handString: string = '';
        this.cards.forEach(card => {
            handString += `${card.rankString} `
        });
        handString += `(${this.trueCount()})`;
        return handString;
    }

    // trueCount is the count adjusted for aces.
    // used when determining winner.
    trueCount(): number {
        if (this.hasAce && this.count < 12) {
            return this.count + 10;
        } else {
            return this.count;
        }
    }

    addCard(card: Card) {
        this.cards.push(card);

        if (card.value === 1) {
            this.hasAce = true;
        }

        if (this.cards.length === 2) {
            this.doubleAllowed = true;
        } else {
            this.doubleAllowed = false;
        }

        if (this.cards.length === 2 &&
            this.cards[0].value === this.cards[1].value) {
            this.splitAllowed = true;
        } else {
            this.splitAllowed = false;
        }

        this.count += card.value;

        // If hand count is greater than 21, hand is busted.
        if (this.count > 21) {
            this.busted = true;
        }

        if (this.cards.length === 2 && this.count === 11 && this.hasAce) {
            this.hasBlackJack = true;
        }
    }
}