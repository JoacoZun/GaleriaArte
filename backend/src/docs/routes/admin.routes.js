const { addSwaggerPath } = require('../swaggerConfig');

// Usuarios

addSwaggerPath({
  path: '/admin/users/',
  method: 'get',
  config: {
    summary: 'Obtiene una lista de todos los usuarios',
    tags: ['Admin'],
    responses: {
      200: {
        description: 'Lista de usuarios',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },
      500: {
        description: 'Server error',
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
  path: '/admin/users/{id}',
  method: 'get',
  config: {
    summary: 'Obtiene un usuario por ID',
    tags: ['Admin'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      200: {
        description: 'Usuario',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' },
          },
        },
      },
      404: {
        description: 'Usuario no encontrado',
      },
      500: {
        description: 'Error al obtener el usuario',
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
  path: '/admin/users/{id}',
  method: 'put',
  config: {
    summary: 'Actualiza usuario por su ID',
    tags: ['Admin'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/User/properties/id' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { $ref: '#/components/schemas/User/properties/email' },
              rol: { $ref: '#/components/schemas/User/properties/rol' },
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
        description: 'Usuario actualizado',
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
        description: 'Error al actualizar el usuario',
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
  path: '/admin/users/{id}',
  method: 'delete',
  config: {
    summary: 'Elimina un usuario por su ID',
    tags: ['Admin'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/User/properties/id' },
      },
    ],
    responses: {
      200: {
        description: 'Usuario eliminado',
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
        description: 'Error al eliminar el usuario',
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

// Obras de arte

addSwaggerPath({
  path: '/admin/artworks',
  method: 'get',
  config: {
    summary: 'Obtiene una lista de obras de arte',
    tags: ['Admin'],
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
        description: 'Error al obtener la lista',
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
  path: '/admin/artworks',
  method: 'post',
  config: {
    summary: 'Agrega una obra de arte',
    tags: ['Admin'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              estado: {
                $ref: '#/components/schemas/Artwork/properties/estado',
              },
              nombre: {
                $ref: '#/components/schemas/Artwork/properties/nombre',
              },
              autor: { $ref: '#/components/schemas/Artwork/properties/autor' },
              precio: {
                $ref: '#/components/schemas/Artwork/properties/precio',
              },
              img_url: {
                $ref: '#/components/schemas/Artwork/properties/img_url',
              },
              descripcion: {
                $ref: '#/components/schemas/Artwork/properties/descripcion',
              },
              categoria: {
                $ref: '#/components/schemas/Artwork/properties/categoria',
              },
              tecnica: {
                $ref: '#/components/schemas/Artwork/properties/tecnica',
              },
              alto: { $ref: '#/components/schemas/Artwork/properties/alto' },
              ancho: { $ref: '#/components/schemas/Artwork/properties/ancho' },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Obra de arte agregada',
        content: {
          'application/json': {
            schema: {
              message: { type: 'string' },
              data: { $ref: '#/components/schemas/Artwork' },
            },
          },
        },
      },
      500: {
        description: 'Error al agregar la obra',
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
  path: '/admin/artworks/{id}',
  method: 'put',
  config: {
    summary: 'Actualiza obra de arte por su ID',
    tags: ['Admin'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/Artworkd/properties/id' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              estado: {
                $ref: '#/components/schemas/Artwork/properties/estado',
              },
              nombre: {
                $ref: '#/components/schemas/Artwork/properties/nombre',
              },
              autor: { $ref: '#/components/schemas/Artwork/properties/autor' },
              precio: {
                $ref: '#/components/schemas/Artwork/properties/precio',
              },
              img_url: {
                $ref: '#/components/schemas/Artwork/properties/img_url',
              },
              descripcion: {
                $ref: '#/components/schemas/Artwork/properties/descripcion',
              },
              categoria: {
                $ref: '#/components/schemas/Artwork/properties/categoria',
              },
              tecnica: {
                $ref: '#/components/schemas/Artwork/properties/tecnica',
              },
              alto: { $ref: '#/components/schemas/Artwork/properties/alto' },
              ancho: { $ref: '#/components/schemas/Artwork/properties/ancho' },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Usuario actualizado',
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
        description: 'Error al actualizar el usuario',
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
  path: '/admin/artworks/{id}',
  method: 'delete',
  config: {
    summary: 'Elimina obra de arte por su ID',
    tags: ['Admin'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/Artwork/properties/id' },
      },
    ],
    responses: {
      200: {
        description: 'Obra de arte eliminada',
        content: {
          'application/json': {
            schema: {
              message: { type: 'string' },
              data: { $ref: '#/components/schemas/Artwork' },
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

// Órdenes

addSwaggerPath({
  path: '/admin/orders',
  method: 'get',
  config: {
    summary: 'Obtiene lista de órdenes de compra',
    tags: ['Admin'],
    responses: {
      200: {
        description: 'Lista de órdenes',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { data: { $ref: '#/components/schemas/Order' } },
            },
          },
        },
      },
      500: {
        description: 'Error al obtener la lista',
        content: {
          'application/json': {
            schema: { data: { $ref: '#/components/schemas/Error' } },
          },
        },
      },
    },
  },
  requiresAuth: true,
});

addSwaggerPath({
  path: '/admin/orders/{id}',
  method: 'get',
  config: {
    summary: 'Obtiene orden por su ID',
    tags: ['Admin'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/Order/properties/id' },
      },
    ],
    responses: {
      200: {
        description: 'Detalles de la orden',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Order' },
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
  path: '/admin/orders/{id}',
  method: 'put',
  config: {
    summary: 'Actualiza orden por su ID',
    tags: ['Admin'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/Order/properties/id' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              estado: { $ref: '#/components/schemas/Order/properties/status' },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Orden actualizada',
        content: {
          'application/json': {
            schema: {
              message: { type: 'string' },
              data: { $ref: '#/components/schemas/Order' },
            },
          },
        },
      },
      500: {
        description: 'Error al actualizar la orden',
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
