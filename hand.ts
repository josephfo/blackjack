import { Card } from "./card";

export class Hand {
    public cards: Card[];
    public hasAce: boolean = false;
    public splitAllowed: boolean = false;
    public doubleAllowed: boolean = false;
    public busted: boolean = false;
    public betSize: number;
    public hasBlackJack: boolean = false;

    constructor(bet: number = 0) {
        // default to zero because dealer will not have a bet.
        this.cards = [];
        this.betSize = bet;
    }

    doubleBet() {
        this.betSize *= 2;
    }

    removeCard(): Card {
        return this.cards.pop();
    }

    toString(): string {
        let handString: string = '';
        this.cards.forEach(card => {
            handString += `${card.rankString} `
        });
        return handString;
    }

    // This returns the count of the hand with all A's count as 1.
    // This is used to determine strategy.
    get count(): number {
        let count = 0;
        this.cards.forEach(card => {
            count += card.value;
        });

        return count;
    }

    // Final score - used to determine who won hand.
    // A's may be 1 or 11.
    get finalCount(): number {
        let final = this.count;
        if (this.hasAce) {
            if (final < 12) {
                // Only one A can be an 11.
                final += 10;
            }
        }
        return final;
    }


    addCard(card: Card) {
        this.cards.push(card);

        if (card.value === 1) {  // Bug here.  card was undefined.
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

        // If hand count is greater than 21, hand is busted.
        if (this.count > 21) {
            this.busted = true;
        }

        if (this.cards.length === 2 && this.count === 11 && this.hasAce) {
            this.hasBlackJack = true;
        }
    }
}