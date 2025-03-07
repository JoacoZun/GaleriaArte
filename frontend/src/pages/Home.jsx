import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../App.css';
import fetchWithAuth from '../helpers/fetchHelper';

const Home = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/artworks`);
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Función auxiliar para determinar la URL correcta de la imagen
  const getImageUrl = (product) => {
    if (!product.img_url) return '';
    
    // Verifica si la imagen es externa (por el campo isExternalImage o por el formato de la URL)
    const isExternal = product.isExternalImage || 
                      product.img_url.startsWith('http://') || 
                      product.img_url.startsWith('https://');
    
    return isExternal ? product.img_url : `${import.meta.env.VITE_API_URL}/${product.img_url}`;
  };

  return (
    <div className="home">
      <h1>Bienvenido a la Galería de Arte</h1>
      <div className="gallery-grid">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.nombre}
              author={product.autor}
              price={product.precio}
              img_url={getImageUrl(product)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;