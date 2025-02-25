const { addSwaggerPath } = require('../swaggerConfig');

addSwaggerPath({
  path: '/api/artworks/',
  method: 'get',
  config: {
    summary: 'Obtiene obras de arte',
    tags: ['Art'],
    responses: {
      200: {
        description: 'Lista de obras de arte',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/Artwork' },
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
});

addSwaggerPath({
  path: '/api/artworks/{id}',
  method: 'get',
  config: {
    summary: 'Obtiene una obra de arte a partir de un ID',
    tags: ['Art'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'La ID de la obra de arte',
        schema: { $ref: '#/components/schemas/Artwork/properties/id' },
      },
    ],
    responses: {
      200: {
        description: 'Obra de arte',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Artwork' },
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
