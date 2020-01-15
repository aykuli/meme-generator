import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <img
        src="http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png"
        alt="Problem?"
        width="100"
        height="100"
        className="header__img"
      />
      <h1 className="header__title">Meme Generator</h1>
    </header>
  );
}
