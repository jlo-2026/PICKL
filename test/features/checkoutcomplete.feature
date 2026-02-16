@smoke
Feature: Check Out Complete Functionality
  As a user
  I want to receive a confirmation message after completing my purchase
  So that I can be assured that my order has been processed

  Background:
    Given I am in the order summary page

 @positive
 Scenario: Validate all products are complete in the transaction summary
    When I click the Finish button
    Then I should see a confirmation message "Thank you for your order!"
    And I should see an order complete message "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    And I should see the Pony Express image
    And I should see a Back Home button
    And I should see a page title "Checkout: Complete!"
    And The cart badge count should be empty

@positive
Scenario: Validate the user can navigate back to the home page after completing the purchase
    When I click the Finish button
    And I click the Back Home button
    Then I should be on the products page




