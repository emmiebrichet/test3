describe('Test du formulaire d\'emprunt de livre', () => {
  const baseUrl = 'http://localhost:3000';

  it("Emprunter un livre déjà emprunté et recevoir un 400 avec message d'erreur", () => {
    const livre = 'shadowhunter';

    cy.intercept('POST', `/emprunter/${livre}`).as('postEmprunt');

    cy.visit(baseUrl);

    cy.get('#titre-livre')
      .should('exist')
      .clear()
      .type(livre)
      .should('have.value', livre);

    cy.get('button[type=submit]').click();

    // Ici on attend un status 400 (livre déjà emprunté)
    cy.wait('@postEmprunt').its('response.statusCode').should('eq', 400);

    // On vérifie que le message d'erreur s'affiche (sans titre dans le message)
    cy.get('#message')
      .should('exist')
      .and('contain.text', 'Livre déjà emprunté');
  });
});

describe("Test du formulaire d'emprunt de livre", () => {
  const baseUrl = "http://localhost:3000";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("Emprunter un livre disponible doit réussir et afficher un message vert", () => {
    const livre = "vampyria";

    cy.intercept("POST", `/emprunter/${livre}`).as("postEmprunt");

    // Saisie du titre
    cy.get("#titre-livre")
      .should("exist")
      .clear()
      .type(livre)
      .should("have.value", livre);

    // Soumission du formulaire
    cy.get("button[type=submit]").click();

    // Vérifier la requête POST et son code 200
    cy.wait("@postEmprunt").its("response.statusCode").should("eq", 200);

    // Vérifier le message affiché en vert
    cy.get("#message")
      .should("exist")
      .and("contain.text", `Livre "${livre}" emprunté avec succès`)
      .and("have.css", "color")
      .and("match", /rgb\(0, 128, 0\)|green/); // vert
  });

  it("Emprunter un livre déjà emprunté doit échouer avec un message rouge", () => {
    const livre = "shadowhunter";

    cy.intercept("POST", `/emprunter/${livre}`).as("postEmprunt");

    // Saisie du titre
    cy.get("#titre-livre")
      .should("exist")
      .clear()
      .type(livre)
      .should("have.value", livre);

    // Soumission du formulaire
    cy.get("button[type=submit]").click();

    // Vérifier la requête POST et son code 400
    cy.wait("@postEmprunt").its("response.statusCode").should("eq", 400);

    // Vérifier le message affiché en rouge
    cy.get("#message")
      .should("exist")
      .and("contain.text", "Livre déjà emprunté")
      .and("have.css", "color")
      .and("match", /rgb\(255, 0, 0\)|red/); // rouge
  });

  it("Emprunter un livre non existant doit retourner 404 avec message rouge", () => {
    const livre = "livre-inconnu";

    cy.intercept("POST", `/emprunter/${livre}`).as("postEmprunt");

    // Saisie du titre
    cy.get("#titre-livre")
      .should("exist")
      .clear()
      .type(livre)
      .should("have.value", livre);

    // Soumission du formulaire
    cy.get("button[type=submit]").click();

    // Vérifier la requête POST et son code 404
    cy.wait("@postEmprunt").its("response.statusCode").should("eq", 404);

    // Vérifier le message affiché en rouge
    cy.get("#message")
      .should("exist")
      .and("contain.text", "Livre non trouvé")
      .and("have.css", "color")
      .and("match", /rgb\(255, 0, 0\)|red/); // rouge
  });
});
