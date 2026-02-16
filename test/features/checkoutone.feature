@smoke
Feature: Check Out Page One Functionality
  As a user
  I want to checkout my Cart
  So that I can complete my purchase

Background:
    Given I am in the cart page with added products
    And I click the Checkout button

@positive
  Scenario: Providing valid information should navigate to checkout page two
    When I enter the first name "John"
    And I enter the last name "Doe"
    And I enter the zip code "12345"
    And I click the Continue button
    Then I should be on the checkout page two

@negative
  Scenario: Leaving firstname field blank should show error
    When I enter the last name "Doe"
    And I enter the zip code "12345"
    And I click the Continue button
    Then I should see an error message in the checkout page "Error: First Name is required"

@negative
  Scenario: Leaving lastname field blank should show error
    When I enter the first name "Harry James"
    And I enter the zip code "1205A"
    And I click the Continue button
    Then I should see an error message in the checkout page "Error: Last Name is required"

@negative
  Scenario: Leaving zip code field blank should show error
    When I enter the first name "Harry James"
    And I enter the last name "Potter"
    And I click the Continue button
    Then I should see an error message in the checkout page "Error: Postal Code is required"


@positive
Scenario: Clicking Cancel button should navigate back to cart page
  When I click the Cancel button
  Then I should be on the cart page




