import { Card } from "./card";
import { Deck } from "./deck";

export class Shoe {
    private cards: Card[];
    public count: number;
    
    constructor(deckCount: number) {
        this.cards = [];
        this.count = 0;
        for (let i = 0; i < deckCount; i++) {
            let deck = new Deck();
            deck.cards.forEach(card => {
                this.cards.push(card);
            })
        }
    }

    popCard(): Card {
        let card = this.cards.pop();
        if (card.value === 10 || card.value === 1) {
            this.count--;
        } else if (card.value > 1 && card.value < 7) {
            this.count++;
        }
        return card;
    }

    get remainingDecks(): number {
        return Math.round(this.cards.length / 52);
    }

    get trueCount(): number {
        return Math.round(this.count / this.remainingDecks)
    }

    cardsLeftInShoe(): number {
        return this.cards.length;
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