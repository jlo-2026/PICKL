@smoke
Feature: Login Functionality
  As a user
  I want to login to the application
  So that I can access secure pages

  Background:
    Given I am on the login page

  @positive
  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see the inventory page
    And I should see the "Products" heading

  @negative
  Scenario: Failed login with invalid username
    When I enter username "invaliduser"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  @negative
  Scenario: Failed login with invalid password
    When I enter username "standard_user"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  @negative
  Scenario: Failed login with empty credentials
    When I click the login button
    Then I should see an error message "Epic sadface: Username is required"
    And I should remain on the login page

  @negative
  Scenario: Failed login with empty password
    When I enter username "standard_user"
    When I click the login button
    Then I should see an error message "Epic sadface: Password is required"
    And I should remain on the login page

  @negative
  Scenario: Failed login with special characters in username
    When I enter username "user@123!"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  @negative
  Scenario: Failed login with locked out account
    When I enter username "locked_out_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."






  # @fail @skip
  # Scenario: Intentional failing test for demonstration
  #   When I enter username "tomsmith"
  #   And I enter password "SuperSecretPassword!"
  #   And I click the login button
  #   Then I should see a success message "This message will never appear"
  #   And I should remain on the login page
