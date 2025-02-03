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

  it('Table can be sorted by date', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Daily Electricity Information');
    cy.contains('2024-10-01');
    cy.get('th.dateCell').eq(0).contains('2024-10-01');
    cy.contains('Date (YYYY-MM-DD)').click();
    cy.get('th.dateCell').eq(0).contains('2020-12-31');
    cy.contains('Date (YYYY-MM-DD)').click();
    cy.get('th.dateCell').eq(0).contains('2024-10-01');
  })

  it('Table can be sorted by production', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Daily Electricity Information');
    cy.contains('2024-10-01');
    cy.get('th.productionCell').eq(0).contains('719.3');
    cy.contains('Production (GWh)').click();
    cy.get('th.productionCell').eq(0).contains('14.0');
  })
})
