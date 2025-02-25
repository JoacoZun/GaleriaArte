import React from 'react';
import ProductCard from '../components/ProductCard';
import '../App.css';

const Gallery = () => {
  const products = [
    { id: 1, title: "Obra 1", author: "Autor 1", price: "$100", image: "/images/obra1.jpg" },
    { id: 2, title: "Obra 2", author: "Autor 2", price: "$200", image: "/images/obra2.jpg" },
    { id: 3, title: "Obra 3", author: "Autor 3", price: "$300", image: "/images/obra3.jpg" },
  ];

  return (
    <div className="gallery">
      <h1>Galería de Arte</h1>
      <div className="gallery-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            author={product.author}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
