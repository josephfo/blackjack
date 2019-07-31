import { Card } from "./card";
import { Deck } from "./deck";

export class Shoe {
    cards: Card[];
    constructor(deckCount: number) {
        this.cards = [];
        for (let i = 0; i < deckCount; i++) {
            let deck = new Deck();
            deck.cards.forEach(card => {
                this.cards.push(card);
            })
        }
    }

    shuffle() {
        var m = this.cards.length, temp, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          temp = this.cards[m];
          this.cards[m] = this.cards[i];
          this.cards[i] = temp;
        }
      }
}