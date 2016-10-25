"use strict";

class Player {

    constructor() {
        this.playerElement = $('player');
    }
    /**
     * @returns true if player is visible, so this means as 'opened', otherwise - catch error and return false.
     */
    isOpened() {
        let EC = protractor.ExpectedConditions;

        // Since ExpectedCondition return function, we should call - " () " it to get true/false
        // This is non-standart usage of ExpectedConditions.
        return EC.visibilityOf(this.playerElement.$('.player-controls')) () ;

        // Same code without ExpectedConditions
        // return this.playerElement.$('.player-controls').isDisplayed()
        //     .then(undefined, err => false); 
    }

}

module.exports = Player;