@smoke
Feature: Products Page Functionality
  As a user
  I want to login to the application
  So that I can add or remove products from the cart

  Background:
    Given I am logged in as a standard user

  @positive
  Scenario: Add single product to cart
    When I add to the cart "Sauce Labs Onesie"
      Then I should see the cart icon with a badge showing "1"
      Then I should see the Remove button for "Sauce Labs Onesie"

  @positive
  Scenario: Add multiple products to cart
    When I add to the cart "Sauce Labs Bike Light"
      Then I should see the cart icon with a badge showing "1"
      Then I should see the Remove button for "Sauce Labs Bike Light"
    And I add to the cart "Sauce Labs Bolt T-Shirt"
      Then I should see the cart icon with a badge showing "2"
      Then I should see the Remove button for "Sauce Labs Bolt T-Shirt"
    And I add to the cart "Sauce Labs Backpack"
      Then I should see the cart icon with a badge showing "3"
      Then I should see the Remove button for "Sauce Labs Backpack"
    And I add to the cart "Sauce Labs Fleece Jacket"
      Then I should see the cart icon with a badge showing "4"
      Then I should see the Remove button for "Sauce Labs Fleece Jacket"
    And I add to the cart "Sauce Labs Onesie"
      Then I should see the cart icon with a badge showing "5"
      Then I should see the Remove button for "Sauce Labs Onesie"

  @positive
  Scenario: Remove single product from cart
    When I add to the cart "Sauce Labs Fleece Jacket"
      Then I should see the cart icon with a badge showing "1"
      Then I should see the Remove button for "Sauce Labs Fleece Jacket"
   And I remove from the cart "Sauce Labs Fleece Jacket"
      Then I should see the cart icon with a badge showing ""
      Then I should see the Add to Cart button for "Sauce Labs Fleece Jacket"

  @positive
  Scenario: Remove multiple products from cart
    When I add to the cart "Sauce Labs Bike Light"
      Then I should see the cart icon with a badge showing "1"
      Then I should see the Remove button for "Sauce Labs Bike Light"
    And I add to the cart "Sauce Labs Bolt T-Shirt"
      Then I should see the cart icon with a badge showing "2"
      Then I should see the Remove button for "Sauce Labs Bolt T-Shirt"
    And I add to the cart "Sauce Labs Backpack"
      Then I should see the cart icon with a badge showing "3"
      Then I should see the Remove button for "Sauce Labs Backpack"
    And I remove from the cart "Sauce Labs Bike Light"
      Then I should see the cart icon with a badge showing "2"
      Then I should see the Add to Cart button for "Sauce Labs Bike Light"
    And I remove from the cart "Sauce Labs Bolt T-Shirt"
      Then I should see the cart icon with a badge showing "1"
      Then I should see the Add to Cart button for "Sauce Labs Bolt T-Shirt"

  @positive
  Scenario: Remove all products from cart
     When I add to the cart "Sauce Labs Bike Light"
      And I add to the cart "Sauce Labs Bolt T-Shirt"
      And I add to the cart "Sauce Labs Backpack"
      And I add to the cart "Sauce Labs Fleece Jacket"
      And I add to the cart "Sauce Labs Onesie"
      Then I should see the cart icon with a badge showing "5"
    And I remove from the cart "Sauce Labs Bike Light"
      Then I should see the cart icon with a badge showing "4"
      Then I should see the Add to Cart button for "Sauce Labs Bike Light"
    And I remove from the cart "Sauce Labs Bolt T-Shirt"
      Then I should see the cart icon with a badge showing "3"
      Then I should see the Add to Cart button for "Sauce Labs Bolt T-Shirt"
    And I remove from the cart "Sauce Labs Backpack"
      Then I should see the cart icon with a badge showing "2"
      Then I should see the Add to Cart button for "Sauce Labs Backpack"
    And I remove from the cart "Sauce Labs Fleece Jacket"
      Then I should see the cart icon with a badge showing "1"
      Then I should see the Add to Cart button for "Sauce Labs Fleece Jacket"
    And I remove from the cart "Sauce Labs Onesie"
      Then I should see the cart icon with a badge showing ""
      Then I should see the Add to Cart button for "Sauce Labs Onesie"
