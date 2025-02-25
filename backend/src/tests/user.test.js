const request = require('supertest');
const app = require('../app'); 
const { pool, initializeDB } = require('../config/db'); 

describe('Rutas de la API de Usuarios', () => {
  let token;

  beforeAll(async () => {
    // Asegurar que la base de datos está inicializada
    await initializeDB(pool);

    // Limpieza de la tabla users antes de cada prueba
    await pool.query('DELETE FROM users WHERE email IN ($1, $2)', ['usuario@prueba.com', 'nuevo@prueba.com']);

    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'usuario@prueba.com',
        password: '123456',
        nombre: 'Juan',
        apellido: 'Pérez'
      });

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    // Cerrar conexión con la base de datos después de las pruebas
    await pool.end();
  });

  it('Debería devolver un token de acceso si las credenciales son correctas', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'usuario@prueba.com',
        password: '123456'
      });

    console.log('Respuesta al iniciar sesión:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  it('Debería devolver un error si las credenciales son incorrectas', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'usuario@prueba.com',
        password: 'wrongpassword'
      });

    console.log('Respuesta a credenciales incorrectas:', response.body);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Credenciales incorrectas');
  });

  it('Debería registrar un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'nuevo@prueba.com',
        password: '123456',
        nombre: 'Carlos',
        apellido: 'Lopez'
      });

    console.log('Respuesta al registrar usuario:', response.body);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario registrado con éxito');
  });

  it('Debería devolver un error si el correo ya está registrado', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'usuario@prueba.com',
        password: '123456',
        nombre: 'Juan',
        apellido: 'Pérez'
      });

    console.log('Respuesta a usuario duplicado:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('El correo ya está registrado');
  });

  it('Debería devolver un estado 200 OK', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    console.log('Respuesta al obtener usuario:', response.body);

    expect(response.status).toBe(200);
  });

  it('Debería devolver datos del usuario', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    console.log('Respuesta con datos del usuario:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
  });
});
