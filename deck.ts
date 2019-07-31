import { Card } from "./card";
import { Suit } from "./suit";

export class Deck {
    cards: Card[];
    
    constructor() {
        this.cards = [];
        for (let i = 1; i < 14; i++) {
            this.cards.push(new Card(i, Suit.Club));
            this.cards.push(new Card(i, Suit.Heart));
            this.cards.push(new Card(i, Suit.Spade));
            this.cards.push(new Card(i, Suit.Diamond));
        }
    }

}