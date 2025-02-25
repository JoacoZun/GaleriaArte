// Datos temporales para probar frontend
const products = [
  {
    id: 1,
    nombre: "Reflejos del Alma",
    autor: "Sofía Morales",
    precio: 1200.00,
    img_url: "/images/obra1.jpg",
    descripcion: "Un vibrante cuadro abstracto que refleja emociones profundas.",
    categoria: "Pintura",
    tecnica: "Óleo sobre lienzo",
    alto: 80,
    ancho: 60
  },
  {
    id: 2,
    nombre: "Silencio Urbano",
    autor: "Javier López",
    precio: 900.00,
    img_url: "/images/obra2.jpg",
    descripcion: "Una escena nocturna de la ciudad con un estilo minimalista.",
    categoria: "Dibujo",
    tecnica: "Carboncillo sobre papel",
    alto: 50,
    ancho: 70
  },
  {
    id: 3,
    nombre: "Luz y Sombras",
    autor: "Carla Fernández",
    precio: 1500.00,
    img_url: "/images/obra3.jpg",
    descripcion: "Un retrato que juega con el contraste entre luz y sombras.",
    categoria: "Retrato",
    tecnica: "Óleo sobre madera",
    alto: 90,
    ancho: 70
  },
  {
    id: 4,
    nombre: "El Vuelo del Tiempo",
    autor: "Hugo Ramírez",
    precio: 750.00,
    img_url: "/images/obra4.jpg",
    descripcion: "Un dibujo que captura el movimiento del tiempo a través de relojes.",
    categoria: "Dibujo",
    tecnica: "Tinta sobre papel",
    alto: 40,
    ancho: 60
  },
  {
    id: 5,
    nombre: "Jardín de Sueños",
    autor: "Laura Gómez",
    precio: 1400.00,
    img_url: "/images/obra5.jpg",
    descripcion: "Un paisaje surrealista lleno de colores y formas oníricas.",
    categoria: "Pintura",
    tecnica: "Acrílico sobre lienzo",
    alto: 100,
    ancho: 120
  },
  {
    id: 6,
    nombre: "Memorias del Horizonte",
    autor: "Diego Torres",
    precio: 2500.00,
    img_url: "/images/obra6.jpg",
    descripcion: "Una fotografía de un paisaje que evoca tranquilidad y nostalgia.",
    categoria: "Fotografía",
    tecnica: "Impresión digital",
    alto: 60,
    ancho: 90
  },
  {
    id: 7,
    nombre: "Entre Líneas",
    autor: "Marta Sánchez",
    precio: 600.00,
    img_url: "/images/obra7.jpg",
    descripcion: "Un dibujo geométrico que juega con la perspectiva y las líneas.",
    categoria: "Dibujo",
    tecnica: "Grafito sobre papel",
    alto: 45,
    ancho: 65
  },
  {
    id: 8,
    nombre: "Ecos del Pasado",
    autor: "Roberto Castillo",
    precio: 1800.00,
    img_url: "/images/obra8.jpg",
    descripcion: "Un cuadro que combina elementos históricos y modernos.",
    categoria: "Pintura",
    tecnica: "Mixta sobre madera",
    alto: 85,
    ancho: 110
  },
  {
    id: 9,
    nombre: "Rostros del Alma",
    autor: "Isabel Ruiz",
    precio: 2000.00,
    img_url: "/images/obra9.jpg",
    descripcion: "Un retrato emocional que captura la esencia de su protagonista.",
    categoria: "Retrato",
    tecnica: "Pastel sobre papel",
    alto: 70,
    ancho: 50
  },
  {
    id: 10,
    nombre: "Sombras Fugaces",
    autor: "Andrés Vega",
    precio: 800.00,
    img_url: "/images/obra10.jpg",
    descripcion: "Un dibujo expresionista que retrata emociones efímeras.",
    categoria: "Dibujo",
    tecnica: "Acuarela y tinta sobre papel",
    alto: 50,
    ancho: 70
  }
];

// TODO: conectar al backend con fetch
export const getProductById = async (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProducts = async () => {
  return products;
}