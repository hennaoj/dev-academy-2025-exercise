describe('Electricity app tests', () => {
  it('Daily infromation can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Daily Electricity Information');
    cy.contains('2024-10-01');
  })

  it('Day view can be opened and closed', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Daily Electricity Information');
    cy.contains('2024-10-01').click();
    cy.contains('Electricity Statistics of 2024-10-01');
    cy.contains('Back to daily table').click();
    cy.contains('Daily Electricity Information');
  })
})
