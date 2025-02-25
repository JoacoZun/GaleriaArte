const { addSwaggerPath } = require('../swaggerConfig');

addSwaggerPath({
  path: '/api/orders/',
  method: 'get',
  config: {
    summary: 'Obtiene lista de órdenes de compra del usuario',
    tags: ['Order'],
    responses: {
      201: {
        description: 'Lista de órdenes',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                data: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Order' },
                },
              },
            },
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
  path: '/api/orders/{id}',
  method: 'get',
  config: {
    summary: 'Obtiene una orden de compra del usuario',
    tags: ['Order'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'La ID de la orden de compra',
        schema: { $ref: '#/components/schemas/Orden/properties/id' },
      },
    ],
    responses: {
      200: {
        description: 'Orden de compra',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Order' },
          },
        },
      },
      401: {
        description: 'Usuario no autenticado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      403: {
        description: 'Sin autorización',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
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
        description: 'Error al obtener la orden',
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
  path: '/api/orders/',
  method: 'post',
  config: {
    summary: 'Crea una orden de compra',
    tags: ['Order'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              direccion: {
                $ref: '#/components/schemas/Order/properties/direccion',
              },
              precio_total: {
                $ref: '#/components/schemas/Order/properties/precio_total',
              },
              obras_id: {
                $ref: '#/components/schemas/Order/properties/obras_id',
              },
            },
            required: ['direccion', 'precio_total', 'obras_id'],
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Orden creada correctamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                data: { $ref: '#/components/schemas/Order' },
              },
            },
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
  path: '/api/orders/{id}',
  method: 'patch',
  config: {
    summary: 'Cancela una orden de compra del usuario',
    tags: ['Order'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'La ID de la orden de compra',
        schema: { $ref: '#/components/schemas/Order/properties/id' },
      },
    ],
    responses: {
      200: {
        description: 'Orden cancelada correctamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                data: { $ref: '#/components/schemas/Order' },
              },
            },
          },
        },
      },
      401: {
        description: 'Usuario no autenticado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      403: {
        description: 'Sin autorización',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
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
        description: 'Error al cancelar la orden',
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
