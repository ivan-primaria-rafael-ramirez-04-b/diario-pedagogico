
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Diario Pedagógico Digital 32FIZ0091U</p>
        <p>Un proyecto de la Secretaría de Educación del Estado de Zacatecas (SEDUZAC)</p>
      </div>
    </footer>
  );
};

export default Footer;
