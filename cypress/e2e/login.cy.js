describe('PolyFinder Login Test', () => {
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit('https://ambitious-wave-0b9c2fc1e.5.azurestaticapps.net/login'); // Replace with your app's URL
    });
  
    it('should display the login form', () => {
      // Verify that the login form is displayed
      cy.get('h2').contains('Login to PolyFinder'); // Check the form header
      cy.get('input[name="email"]').should('exist'); // Check for the email input
      cy.get('input[name="password"]').should('exist'); // Check for the password input
      cy.get('button[type="submit"]').contains('Login'); // Check for the login button
    });
  
    it('should show error for invalid credentials', () => {
      // Enter invalid credentials
      cy.get('input[name="email"]').type('invaliduser@calpoly.edu');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      // Verify error message
      cy.get('p').contains('User not Found').should('be.visible');
    });
  
    it('should login successfully with valid credentials', () => {
      // Enter valid credentials
      cy.get('input[name="email"]').type('test1@calpoly.edu'); 
      cy.get('input[name="password"]').type('password'); 
      cy.get('button[type="submit"]').click();
  
      // Verify success message
      cy.get('p').contains('Login Successful. Redirecting...').should('be.visible');
  
      // Verify redirection to home page
      cy.url().should('include', '/home');
    });
  
    it('should redirect to signup page', () => {
      // Click the signup button
      cy.get('button').contains('Signup').click();
  
      // Verify redirection to signup page
      cy.url().should('include', '/signup');
    });
  });
  