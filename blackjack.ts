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
    public totalBetAmount: number;


    constructor(decksPerShoe: number, player: Player) {
        this.decksPerShoe = decksPerShoe;
        this.player = player;
        this.totalBetAmount = 0;
    }

    private handleSplits() {
        while (true) {
            // Assume no splits.
            let noSplits: boolean = true;

            this.player.hands.forEach(hand => {
                if (this.player.strategy.getPlayerAction(hand, this.dealerHand.cards[0]) === 'p') {
                    noSplits = false;
                    // Player Splits. Create a new hand.
                    //console.log('Player Splits');
                    let newHand = new Hand(this.player.betSize);
                    this.totalBetAmount += this.player.betSize;

                    newHand.addCard(hand.removeCard());
                    newHand.addCard(this.shoe.cards.pop());

                    hand.addCard(this.shoe.cards.pop());
                    this.player.hands.push(newHand);

                    //console.log('New Hands:')
                    this.player.hands.forEach(h => {
                        //console.log(`\t${h.toString()}`)
                    });
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

        while (this.shoe.cards.length > 40) {
            //console.log('-----------------');
            this.dealerHand = new Hand();
            this.player.hands = []; // clear out existing hands if any;
            this.player.hands.push(new Hand(this.player.betSize));
            this.totalBetAmount += this.player.betSize;

            this.player.hands[0].addCard(this.shoe.cards.pop());
            this.dealerHand.addCard(this.shoe.cards.pop());
            this.player.hands[0].addCard(this.shoe.cards.pop());
            this.dealerHand.addCard(this.shoe.cards.pop());

            //console.log(`${this.player.hands[0].cards[0].rankString} ${this.player.hands[0].cards[1].rankString} vs. Dealer ${this.dealerHand.cards[0].rankString}`)

            // Check for blackjacks.
            if (this.player.hands[0].hasBlackJack && this.dealerHand.hasBlackJack) {
                // both dealer and player have blackjack.  Push, and move to next hand.
                // Never take even money.
                //console.log('Two blackjacks. Push.');
                continue;
            } else if (this.dealerHand.hasBlackJack) {
                // dealer blackjack only.                
                this.player.bank -= this.player.hands[0].betSize;
                //console.log('Dealer Blackjack.');
                continue;
            } else if (this.player.hands[0].hasBlackJack) {
                // player blackjack only
                this.player.bank += this.player.hands[0].betSize * 1.5;
                //console.log('Player BlackJack.');
                continue;
            }

            this.handleSplits();

            // Check for player blackjacks after splitting.
            for (let i = 0; i < this.player.hands.length; i++) {
                if (this.player.hands[i].hasBlackJack) {
                    this.player.bank += this.player.hands[i].betSize * 1.5;
                    //console.log(`Player blackjack after splitting.`);
                    // remove the hand that just got blackjack.
                    this.player.hands.splice(i, 1);
                }
            }

            for (let i = 0; i < this.player.hands.length; i++) {
                let action = this.player.strategy.getPlayerAction(this.player.hands[i], this.dealerHand.cards[0]);
                //console.log(`Action on hand ${i}: ${action}`);
                while (action !== 's') {
                    this.player.hands[i].addCard(this.shoe.cards.pop());
                    //console.log(`Player hand ${i}: ${this.player.hands[i].toString()}`);
                    if (action === 'd') {
                        // Double the bet and break because player only gets one card on double.
                        this.player.hands[i].doubleBet();
                        this.totalBetAmount += this.player.betSize;
                        break;
                    }

                    if (this.player.hands[i].busted) {
                        break;
                    }

                    action = this.player.strategy.getPlayerAction(this.player.hands[i], this.dealerHand.cards[0]);
                    //console.log(`Action on hand ${i}: ${action}`)
                }
            }

            //console.log(`Dealers Hand: ${this.dealerHand.toString()}`);
            while (this.dealerHand.finalCount < 17 || (this.dealerHand.count === 7 && this.dealerHand.finalCount === 17)) {
                let newDealerCard = this.shoe.cards.pop();
                this.dealerHand.addCard(newDealerCard);
                //console.log(`Dealer hits: ${this.dealerHand.toString()}`);
            }

            for (let i = 0; i < this.player.hands.length; i++) {
                if (this.player.hands[i].busted) {
                    this.player.bank -= this.player.hands[i].betSize;
                    //console.log(`Player hand ${i} busts.`);
                } else if (this.dealerHand.busted) {
                    this.player.bank += this.player.hands[i].betSize;
                    //console.log('Dealer busts')
                } else if (this.dealerHand.finalCount > this.player.hands[i].finalCount) {
                    this.player.bank -= this.player.hands[i].betSize;
                    //console.log(`LOST`);
                } else if (this.dealerHand.finalCount < this.player.hands[i].finalCount) {
                    this.player.bank += this.player.hands[i].betSize;
                    //console.log(`WIN`);
                } else {
                    //console.log('PUSH');
                }
            }
            //console.log(`Bank: ${this.player.bank}`);
        }
    }
}