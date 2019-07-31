import { Hand } from "./hand";
import { Card } from "./card";

export class Strategy {
    tableHard = {
        '5': ['h','h','h','h','h','h','h','h','h','h'],
        '6': ['h','h','h','h','h','h','h','h','h','h'],
        '7': ['h','h','h','h','h','h','h','h','h','h'],
        '8': ['h','h','h','h','h','h','h','h','h','h'],
        '9': ['h','h','d','d','d','d','h','h','h','h'],
        '10': ['h','d','d','d','d','d','d','d','d','h'],
        '11': ['d','d','d','d','d','d','d','d','d','d'],
        '12': ['h','h','h','s','s','s','h','h','h','h'],
        '13': ['h','s','s','s','s','s','h','h','h','h'],
        '14': ['h','s','s','s','s','s','h','h','h','h'],
        '15': ['h','s','s','s','s','s','h','h','h','h'],
        '16': ['h','s','s','s','s','s','h','h','h','h'],
        '17': ['s','s','s','s','s','s','s','s','s','s'],
        '18': ['s','s','s','s','s','s','s','s','s','s'],
        '19': ['s','s','s','s','s','s','s','s','s','s'],
        '20': ['s','s','s','s','s','s','s','s','s','s'],
        '21': ['s','s','s','s','s','s','s','s','s','s']
    };

    tableSoft = {
        '2': ['p','p','p','p','p','p','p','p','p','p'],
        '3': ['h','h','h','h','d','d','h','h','h','h'],
        '4': ['h','h','h','h','d','d','h','h','h','h'],
        '5': ['h','h','h','d','d','d','h','h','h','h'],
        '6': ['h','h','h','d','d','d','h','h','h','h'],
        '7': ['h','h','d','d','d','d','h','h','h','h'],
        '8': ['h','d','d','d','d','d','s','h','h','h'],
        '9': ['s','s','s','s','s','d','s','s','s','s'],
        '10': ['s','s','s','s','s','s','s','s','s','s'],
        '11': ['s','s','s','s','s','s','s','s','s','s'],
        '12': ['h','h','h','s','s','s','h','h','h','h'],
        '13': ['h','s','s','s','s','s','h','h','h','h'],
        '14': ['h','s','s','s','s','s','h','h','h','h'],
        '15': ['h','s','s','s','s','s','h','h','h','h'],
        '16': ['h','s','s','s','s','s','h','h','h','h'],
        '17': ['s','s','s','s','s','s','s','s','s','s'],
        '18': ['s','s','s','s','s','s','s','s','s','s'],
        '19': ['s','s','s','s','s','s','s','s','s','s'],
        '20': ['s','s','s','s','s','s','s','s','s','s'],
        '21': ['s','s','s','s','s','s','s','s','s','s']
    };

    tablePairs = {
        '2': ['p','p','p','p','p','p','p','p','p','p'],
        '4': ['h','p','p','p','p','p','p','h','h','h'],
        '6': ['h','p','p','p','p','p','p','h','h','h'],
        '8': ['h','h','h','h','p','p','h','h','h','h'],
        '10': ['h','d','d','d','d','d','d','d','d','h'],
        '12': ['h','p','p','p','p','p','h','h','h','h'],
        '14': ['h','p','p','p','p','p','p','h','h','h'],
        '16': ['p','p','p','p','p','p','p','p','p','p'],
        '18': ['s','p','p','p','p','p','s','p','p','s'],
        '20': ['s','s','s','s','s','s','s','s','s','s']
    }

    constructor() {
        
    }

    getPlayerAction(playerHand: Hand, dealerUpCard: Card) {
        let action: string;
        let index = dealerUpCard.value - 1;

        if (playerHand.splitAllowed) {
            action = this.tablePairs[playerHand.count][index];
        } else if (playerHand.hasAce) { 
            action = this.tableSoft[playerHand.count][index];
        } else {
            action = this.tableHard[playerHand.count][index];
        }

        // Sometimes, soft table says double, but we have more than 2 cards.
        // In that case, double is not allowed. Hit instead.
        if (action === 'd' && !playerHand.doubleAllowed) {
            action = 'h';
        }

        return action;
    }
}