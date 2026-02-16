@smoke
Feature: Side Menu Functionality
  As a user
  I want to access the side menu options
  So that I can navigate the application

  Background:
    Given I am logged in as a standard user

@positive
 Scenario: Clicking About link should navigate to the Sauce Labs website
    When I click the side menu button
    And I click the About link
    Then I should be on the Sauce Labs website

@positive
Scenario: Clicking All Items link should navigate to the products page
    When I click the cart icon
    And I click the side menu button
    And I click the All Items link
    Then I should be on the products page

@positive
Scenario: Clicking the Reset App State link shall reset the Cart badge count    When I click the Finish button
    When I add to the cart "Sauce Labs Onesie"
    And I add to the cart "Sauce Labs Bike Light"
      Then I should see the cart icon with a badge showing "2"
    And I click the side menu button
    And I click the Reset App State link
    And I should see the cart icon with a badge showing ""

@positive
Scenario: Clicking the Logout link should navigate back to the login page
    When I click the side menu button
    And I click the Logout link
    Then I should be on the login page





