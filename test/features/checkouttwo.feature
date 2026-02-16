@smoke
Feature: Check Out Page Two Functionality
  As a user
  I want to checkout my Cart
  So that I can complete my purchase

  Background:
    Given I am in the checkout page one with added products

@positive
 Scenario: Validate all products are complete in the transaction summary
    When I click the Continue button
    Then I should see "Sauce Labs Onesie" in the overview page
    Then I should see "Sauce Labs Bike Light" in the overview page
    Then I should see "Sauce Labs Bolt T-Shirt" in the overview page
    Then I should see "Sauce Labs Backpack" in the overview page
    Then I should see "Sauce Labs Fleece Jacket" in the overview page

@positive
  Scenario: Clicking the Cancel button should navigate back to products page
    When I click the Continue button
    And I click the Cancel button of the order summary page
    Then I should be on the products page

@positive
  Scenario: Clicking the Finish button should navigate to the checkout complete page
    When I click the Continue button
    And I click the Finish button
    Then I should be on the checkout complete page



