const { addSwaggerPath } = require('../swaggerConfig');

addSwaggerPath({
  path: '/api/users/register',
  method: 'post',
  config: {
    summary: 'Registra un usuario',
    tags: ['User'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password', 'nombre', 'apellido'],
            properties: {
              email: { $ref: '#/components/schemas/User/properties/email' },
              password: {
                $ref: '#/components/schemas/User/properties/password',
              },
              nombre: { $ref: '#/components/schemas/User/properties/nombre' },
              apellido: {
                $ref: '#/components/schemas/User/properties/apellido',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Usuario registrado con éxito',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Usuario registrado con éxito',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Error en el request',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      500: {
        description: 'Error del servidor',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
});

addSwaggerPath({
  path: '/api/users/login',
  method: 'post',
  config: {
    summary: 'Ingresa a un usuario',
    tags: ['User'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: { $ref: '#/components/schemas/User/properties/email' },
              password: {
                $ref: '#/components/schemas/User/properties/password',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Inicio de sesión exitoso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: { type: 'string' },
                message: { type: 'string' },
                nombre: { $ref: '#/components/schemas/User/properties/nombre' },
                apellido: {
                  $ref: '#/components/schemas/User/properties/apellido',
                },
                email: { $ref: '#/components/schemas/User/properties/email' },
                rol: { $ref: '#/components/schemas/User/properties/rol' },
              },
            },
          },
        },
      },
      400: {
        description: 'Credenciales incorrectas',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      500: {
        description: 'Error del servidor',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
});

addSwaggerPath({
  path: '/api/users/me',
  method: 'get',
  config: {
    summary: 'Obtiene información del usuario logueado',
    tags: ['User'],
    responses: {
      200: {
        description: 'GET exitoso',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' },
          },
        },
      },
      404: {
        description: 'Usuario no encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      500: {
        description: 'Error del servidor',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  requiresAuth: true,
});

addSwaggerPath({
  path: '/api/users/me',
  method: 'put',
  config: {
    summary: 'Actualiza información del usuario logueado',
    tags: ['User'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['nombre', 'apellido', 'telefono', 'direccion'],
            properties: {
              nombre: { $ref: '#/components/schemas/User/properties/nombre' },
              apellido: {
                $ref: '#/components/schemas/User/properties/apellido',
              },
              telefono: {
                $ref: '#/components/schemas/User/properties/telefono',
              },
              direccion: {
                $ref: '#/components/schemas/User/properties/direccion',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Actualización exitosa',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' },
          },
        },
      },
      404: {
        description: 'Usuario no encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      500: {
        description: 'Error del servidor',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  requiresAuth: true,
});
