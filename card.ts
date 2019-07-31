import { Suit } from "./suit";

export class Card {
    rank: number;
    rankString: string;
    suit: Suit;
    value: number;

    constructor(rank: number, suit: Suit) {
        switch (rank) {
            case 1: {
                this.rank = rank;
                this.rankString = 'A';
                this.suit = suit;
                this.value = 1;
                break;
            }
            case 2: {
                this.rank = rank;
                this.rankString = '2';
                this.suit = suit;
                this.value = 2;
                break;
            }
            case 3: {
                this.rank = rank;
                this.rankString = '3';
                this.suit = suit;
                this.value = 3;
                break;
            }
            case 4: {
                this.rank = rank;
                this.rankString = '4';
                this.suit = suit;
                this.value = 4;
                break;
            }
            case 5: {
                this.rank = rank;
                this.rankString = '5';
                this.suit = suit;
                this.value = 5;
                break;
            }
            case 6: {
                this.rank = rank;
                this.rankString = '6';
                this.suit = suit;
                this.value = 6;
                break;
            }
            case 7: {
                this.rank = rank;
                this.rankString = '7';
                this.suit = suit;
                this.value = 7;
                break;
            }
            case 8: {
                this.rank = rank;
                this.rankString = '8';
                this.suit = suit;
                this.value = 8;
                break;
            }
            case 9: {
                this.rank = rank;
                this.rankString = '9';
                this.suit = suit;
                this.value = 9;
                break;
            }
            case 10: {
                this.rank = rank;
                this.rankString = '10';
                this.suit = suit;
                this.value = 10;
                break;
            }
            case 11: {
                this.rank = rank;
                this.rankString = 'J';
                this.suit = suit;
                this.value = 10;
                break;
            }
            case 12: {
                this.rank = rank;
                this.rankString = 'Q';
                this.suit = suit;
                this.value = 10;
                break;
            }
            case 13: {
                this.rank = rank;
                this.rankString = 'K';
                this.suit = suit;
                this.value = 10;
                break;
            }
        }
    }
}

