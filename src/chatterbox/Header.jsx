import React from "react";

function Header({checked, handleMode}) {
  return (
    <header>
      <h1>Chatterbox</h1>
      <div className="toggle-switch">
        <input type="checkbox" id="toggle-dark-mode" onChange={() => handleMode(!checked)}checked={checked} />
        <label htmlFor="toggle-dark-mode"></label>
      </div>
    </header>
  );
}

export default Header;
