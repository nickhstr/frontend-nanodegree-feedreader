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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have non-empty URLs', function() {
            allFeeds.forEach(function(feed) {
                // Checks to confirm the feed's url is defined
                expect(feed.url).toBeDefined();
                // Checks to confirm the URL is not empty
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non-empty names', function() {
            allFeeds.forEach(function(feed) {
                // Checks to confirm the feed's name is defined
                expect(feed.name).toBeDefined();
                // Checks to confirm the feed's name is not empty
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        var body = $('body'),
            menuIcon = $('.menu-icon-link');
        
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            // Checks to confirm the body element has the menu-hidden class
            expect(body.hasClass('menu-hidden')).toEqual(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
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

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         // Use beforeEach for async
         beforeEach(function(done) {
            // Call loadFeed with the first feed and the done callback
            loadFeed(0, done);
         });

         it('have at least one entry', function(done) {
            // Checks to confirm the feed has at least one entry, after the async request is done
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
         });
     });
    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedHtml;

        beforeEach(function(done) {
            // Had to change default timeout interval due to occasional long async requests
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
            // Call loadFeed with the second feed and the done callback
            loadFeed(1, done);
            // Save this feed's content
            feedHtml = $('.feed').html();
        });

        it('changes the feed content', function(done) {
            // Call loadFeed with the first feed (to change the feed) and the done callback
            loadFeed(0, done);
            // After loadFeed is finished, check to confirm this feed's content is different from the earlier feed's content
            expect($('.feed').html()).not.toEqual(feedHtml);
        });
    });
}());
