const request = require('supertest');
const { app, livres } = require('./app');

describe('API /emprunter/:titre', () => {
  beforeEach(() => {
    // Remettre les statuts par défaut avant chaque test
    livres["vampyria"].statut = "disponible";
    livres["shadowhunter"].statut = "disponible"; // disponible pour pouvoir emprunter dans test
  });

  it('devrait emprunter un livre disponible', async () => {
    const res = await request(app).post('/emprunter/shadowhunter');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Livre "shadowhunter" emprunté avec succès');
    expect(livres["shadowhunter"].statut).toBe("pas disponible");
  });

  it('devrait retourner une erreur si le livre est déjà emprunté', async () => {
    livres["shadowhunter"].statut = "pas disponible"; // livre déjà emprunté

    const res = await request(app).post('/emprunter/shadowhunter');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Livre déjà emprunté');
  });

  it('devrait retourner une erreur si le livre n\'existe pas', async () => {
    const res = await request(app).post('/emprunter/livreInexistant');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Livre non trouvé');
  });

  it('devrait gérer la casse des titres', async () => {
    const res = await request(app).post('/emprunter/Dracula');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Livre "Dracula" emprunté avec succès');
    expect(livres["Dracula"].statut).toBe("pas disponible");
  });
});
