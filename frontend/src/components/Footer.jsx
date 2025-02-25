import React from 'react';
import './Footer.css'; 
import { FaGithub } from 'react-icons/fa'; // Importando icono de GitHub

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>NOSOTROS</h3>
        <ul>
          <li>
            <a href="https://github.com/DaniJGP" target="_blank" rel="noopener noreferrer">
              <FaGithub /> Daniela Guardia
            </a>
          </li>
          <li>
            <a href="https://github.com/JEGA2012" target="_blank" rel="noopener noreferrer">
              <FaGithub /> Jorge Gonzalez
            </a>
          </li>
          <li>
            <a href="https://joacozun.github.io/" target="_blank" rel="noopener noreferrer">
            <FaGithub /> Joaquín Zúñiga
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>TÉRMINOS Y CONDICIONES</h3>
        <ul>
          <li><a href="/terms">Condiciones Generales</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>CONTACTO</h3>
        <p>Info: info@example.com</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
