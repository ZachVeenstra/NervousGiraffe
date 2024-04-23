Feature: Authentication

    Scenario: Logging In
        When I click the login button on the navbar
        When I type in my email "zach@nervousgiraffe.com"
        When I type in my password "123456"
        When I click the login button
        Then I should be on the home page
