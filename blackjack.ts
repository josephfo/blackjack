import { Shoe } from "./shoe";
import { Hand } from "./hand";
import { Suit } from "./suit";
import { Strategy } from "./strategy";
import { Player } from "./player";

export class BlackJack {
    private shoe: Shoe;
    private player: Player;
    private dealerHand: Hand;
    private decksPerShoe: number;

    constructor(decksPerShoe: number, player: Player) {
        this.decksPerShoe = decksPerShoe;
        this.player = player;
    }

    private handleSplits() {
        while (true) {
            // Assume no splits.
            let noSplits: boolean = true;

            this.player.hands.forEach(hand => {
                if (this.player.strategy.getPlayerAction(hand, this.dealerHand.cards[0]) === 'p') {
                    noSplits = false;
                    // Player Splits. Create a new hand.
                    //console.log('***** PLAYER SPLITS *****')
                    let newHand = new Hand(this.player.betSize);
                    newHand.addCard(this.shoe.cards.pop());
                    newHand.addCard(hand.removeCard());
                    hand.addCard(this.shoe.cards.pop());
                    this.player.hands.push(newHand);
                }
            });
            if (noSplits) {
                break;
            }
        }
    }

    playShoe() {
        this.shoe = new Shoe(this.decksPerShoe);
        this.shoe.shuffle();

        while (this.shoe.cards.length > 20) {
            this.dealerHand = new Hand();
            this.player.hands = []; // clear out existing hands if any;
            this.player.hands.push(new Hand(this.player.betSize));

            this.player.hands[0].addCard(this.shoe.cards.pop());
            this.dealerHand.addCard(this.shoe.cards.pop());
            this.player.hands[0].addCard(this.shoe.cards.pop());
            this.dealerHand.addCard(this.shoe.cards.pop());

            // Check for blackjacks.
            if (this.player.hands[0].hasBlackJack && this.dealerHand.hasBlackJack) {
                // both dealer and player have blackjack.  Push, and move to next hand.
                // Never take even money.
                //console.log('PUSH - two blackjacks.')
                //console.log(`Player: ${this.player.hands[0].toString()}  Dealer: ${this.dealerHand.toString()}`);
                continue;
            } else if (this.dealerHand.hasBlackJack) {
                // dealer blackjack only.                
                this.player.bank -= this.player.hands[0].betSize;
                //console.log(`Player: ${this.player.hands[0].toString()}  Dealer: ${this.dealerHand.toString()} -${this.player.hands[0].betSize}  ${this.player.bank}`);
                continue;
            } else if (this.player.hands[0].hasBlackJack) {
                // player blackjack only
                this.player.bank += this.player.hands[0].betSize * 1.5;
                //console.log(`Player: ${this.player.hands[0].toString()}  Dealer: ${this.dealerHand.toString()} -${this.player.hands[0].betSize * 1.5}  ${this.player.bank}`);
                continue;
            }

            this.handleSplits();

            // Check for player blackjacks after splitting.
            for (let i = 0; i < this.player.hands.length; i++) {
                if (this.player.hands[i].hasBlackJack) {
                    this.player.bank += this.player.hands[i].betSize * 1.5;
                    //console.log(`Player: ${this.player.hands[i].toString()}  Dealer: ${this.dealerHand.toString()} +${this.player.hands[i].betSize * 1.5}  ${this.player.bank}`);
                    // remove the hand that just got blackjack.
                    this.player.hands.splice(i, 1);
                }
            }

            for (let i = 0; i < this.player.hands.length; i++) {
                let action = this.player.strategy.getPlayerAction(this.player.hands[i], this.dealerHand.cards[0]);

                while (action !== 's') {
                    this.player.hands[i].addCard(this.shoe.cards.pop());
                    if (action === 'd') {
                        // Double the bet and break because player only gets one card on double.
                        this.player.hands[i].doubleBet();
                        break;
                    }

                    if (this.player.hands[i].busted) {
                        break;
                    }

                    action = this.player.strategy.getPlayerAction(this.player.hands[i], this.dealerHand.cards[0]);
                }
            }

            // TODO: Optimization - don't hit dealer if all player hands bust.
            // TODO: Add logic for dealer to hit on soft 17.
            // TODO: Handle ACE. 
            while (this.dealerHand.count < 17) {
                this.dealerHand.addCard(this.shoe.cards.pop());
            }

            for (let i = 0; i < this.player.hands.length; i++) {
                if (this.player.hands[i].busted) {
                    this.player.bank -= this.player.hands[i].betSize;
                    //console.log(`Player: ${this.player.hands[i].toString()}  Dealer: ${this.dealerHand.toString()} -${this.player.hands[i].betSize} ${this.player.bank}`);
                } else if (this.dealerHand.busted) {
                    this.player.bank += this.player.hands[i].betSize;
                    //console.log(`Player: ${this.player.hands[i].toString()}  Dealer: ${this.dealerHand.toString()} +${this.player.hands[i].betSize}  ${this.player.bank}`);
                } else if (this.dealerHand.trueCount() > this.player.hands[i].trueCount()) {
                    this.player.bank -= this.player.hands[i].betSize;
                    //console.log(`Player: ${this.player.hands[i].toString()}  Dealer: ${this.dealerHand.toString()} -${this.player.hands[i].betSize}  ${this.player.bank}`);
                } else if (this.dealerHand.trueCount() < this.player.hands[i].trueCount()) {
                    this.player.bank += this.player.hands[i].betSize;
                    //console.log(`Player: ${this.player.hands[i].toString()}  Dealer: ${this.dealerHand.toString()} +${this.player.hands[i].betSize} ${this.player.bank}`);
                } else {
                    //console.log(`Player: ${this.player.hands[i].toString()}  Dealer: ${this.dealerHand.toString()}  ${this.player.bank}`);
                }
            }
        }
    }
}