"use strict";

class Track {
    /**
     * Usually initializing of this element will be called from function `tracks` in BasePage.
     * @param {ElementFinder} webelement that will be used as base for this element.
     */
    constructor (trackElement) {
        this.trackElement = trackElement;

        this.playButton = this.trackElement.$('.btn--play');
    }

    /**
     * NOTICE! this function returns ALL text for track element.
     * TODO: create separate functions for different parts of text.
     * @returns {Promise} Promise object that will be resolved to text of this track
     */
    getTrackInfo() {
        return this.trackElement.getText().then(text=> text.toLowerCase());
    }

    /**
     * Begin playback of this track
     */
    play() {
        this.playButton.click();
        browser.sleep(3000);
    }

    /**
     * Opens details page for publisher of this track
     */
    openArtistDetails() {
        this.trackElement.$('a.track-card__username').click();
        browser.sleep(3000);
    }

}

module.exports = Track;