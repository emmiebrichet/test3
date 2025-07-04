const request = require('supertest');
const { app, livres } = require('./app');

describe('POST /emprunter/:titre', () => {
  
  beforeEach(() => {
    // On remet le livre "vampyria" disponible avant chaque test
    livres["vampyria"].statut = "disponible";
  });

  it('doit permettre d\'emprunter un livre disponible', async () => {
    const res = await request(app).post('/emprunter/vampyria');

    // Le serveur doit répondre avec le statut 200 (OK)
    expect(res.statusCode).toBe(200);

    // Le message doit confirmer l’emprunt
    expect(res.body.message).toBe('Livre "vampyria" emprunté avec succès');

    // Le statut du livre dans l’objet doit être mis à jour
    expect(livres["vampyria"].statut).toBe("pas disponible");
  });
});
