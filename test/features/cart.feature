@smoke
Feature: Cart Page Functionality
  As a user
  I want to login to the application
  So that I can add products and view list of products added to the cart

  Background:
    Given I have added products to my cart

@positive
  Scenario: Clicking the cart icon should navigate to the cart page
    When I click the cart icon
    Then I should be on the cart page
    Then I should see in my cart the product "Sauce Labs Onesie"
    Then I should see in my cart the product "Sauce Labs Bike Light"
    Then I should see in my cart the product "Sauce Labs Bolt T-Shirt"
    Then I should see in my cart the product "Sauce Labs Backpack"
    Then I should see in my cart the product "Sauce Labs Fleece Jacket"

@positive
  Scenario: Removing a single product from the cart should update the cart badge count and remove the product
    When I click the cart icon
    And I remove the product "Sauce Labs Onesie" from the cart
      Then I should not see in my cart the product "Sauce Labs Onesie"
      Then the cart badge count should be updated to "4"

@positive
  Scenario: Removing multiple products from the cart should update the cart badge count and remove the products
    When I click the cart icon
    And I remove the product "Sauce Labs Bike Light" from the cart
      Then I should not see in my cart the product "Sauce Labs Bike Light"
      Then the cart badge count should be updated to "4"
    And I remove the product "Sauce Labs Bolt T-Shirt" from the cart
      Then I should not see in my cart the product "Sauce Labs Bolt T-Shirt"
      Then the cart badge count should be updated to "3"

   @positive
   Scenario: Removing all products from the cart should update the cart badge count and remove the products
    When I click the cart icon
    And I remove the product "Sauce Labs Bike Light" from the cart
      Then I should not see in my cart the product "Sauce Labs Bike Light"
      Then the cart badge count should be updated to "4"
    And I remove the product "Sauce Labs Bolt T-Shirt" from the cart
      Then I should not see in my cart the product "Sauce Labs Bolt T-Shirt"
      Then the cart badge count should be updated to "3"
    And I remove the product "Sauce Labs Backpack" from the cart
        Then I should not see in my cart the product "Sauce Labs Backpack"
        Then the cart badge count should be updated to "2"
    And I remove the product "Sauce Labs Fleece Jacket" from the cart
        Then I should not see in my cart the product "Sauce Labs Fleece Jacket"
        Then the cart badge count should be updated to "1"
    And I remove the product "Sauce Labs Onesie" from the cart
        Then I should not see in my cart the product "Sauce Labs Onesie"
        Then the cart badge count should be updated to ""


@positive
 Scenario: Clicking Continue Shopping button should navigate back to products page
  When I click the cart icon
  And I click the Continue Shopping button
  Then I should be on the products page


@positive
 Scenario: Checkout button should navigate to checkout page
  When I click the cart icon
  And I click the Checkout button
  Then I should be on the checkout page





