/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // Checks if allFeeds is defined
            expect(allFeeds).toBeDefined();
            // Checks to confirm allFeeds is not empty
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        it('have non-empty URLs', function() {
            allFeeds.forEach(function(feed) {
                // Checks to confirm the feed's url is defined
                expect(feed.url).toBeDefined();
                // Checks to confirm the URL is not empty
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        it('have non-empty names', function() {
            allFeeds.forEach(function(feed) {
                // Checks to confirm the feed's name is defined
                expect(feed.name).toBeDefined();
                // Checks to confirm the feed's name is not empty
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    describe('The menu', function(){
        var body = $('body'),
            menuIcon = $('.menu-icon-link');
        
        it('is hidden by default', function() {
            // Checks to confirm the body element has the menu-hidden class
            expect(body.hasClass('menu-hidden')).toEqual(true);
        });

        it('changes visibility', function() {
            // Simulate a click event
            menuIcon.click();
            // Checks to confirm the body element does not have the menu-hidden class
            expect(body.hasClass('menu-hidden')).toEqual(false);
            // Simulate a click event
            menuIcon.click();
            // Checks to confirm the body element does have the menu-hidden class
            expect(body.hasClass('menu-hidden')).toEqual(true);
        });
    });


    describe('Initial Entries', function() {
         // Use beforeEach for async
         beforeEach(function(done) {
            // Had to change default timeout interval due to occasional long async requests
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
            // Call loadFeed with the first feed and the done callback
            loadFeed(0, function() {
                done();
            });
         });

         it('have at least one entry', function() {
            // Checks to confirm the feed has at least one entry, after the async request is done
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });
     });

    describe('New Feed Selection', function() {
        var feedHtml;

        beforeEach(function(done) {
            // Had to change default timeout interval due to occasional long async requests
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
            // Call loadFeed with the second feed and the done callback
            loadFeed(1, function(){
                done();
            });
            // Save this feed's content
            feedHtml = $('.feed').html();
        });

        it('changes the feed content', function(done) {
            // Call loadFeed with the first feed (to change the feed) and the done callback
            loadFeed(0, function() {
                done();
            });
            // After loadFeed is finished, check to confirm this feed's content is different from the earlier feed's content
            expect($('.feed').html()).not.toEqual(feedHtml);
        });
    });
}());
