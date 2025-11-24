import React from 'react';
import '../css/burger.css';

const Burger = ({ isOpen, onClick }) => {
  return (
    <div
      className={`burger ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      role="button"
      aria-label="Toggle menu"
      tabIndex={0}
    >
      <div className="burger-line"></div>
      <div className="burger-line"></div>
      <div className="burger-line"></div>
    </div>
  );
};

export default Burger;