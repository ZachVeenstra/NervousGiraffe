Feature: Create Artist

    Scenario: Creating an Artist
        When I visit the artists page
        When I click the create artwork button
        Then A modal, titled "Create Artwork" should appear