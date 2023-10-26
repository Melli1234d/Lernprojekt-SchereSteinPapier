import './ButtonItem.css';
import React from "react";

//Objekt mit Elementen/Variablen
//Das Item enthält ein Icon und ein Titel
function ButtonItem({icon, title, onPress, handleClick}) {

    return (
        <button onClick={() => onPress()} className="container-buttons">
            <div className="Ausrichtung_column">
                <div className="icon">{icon}</div>
                <div className="icon-title">{title}</div>
            </div>
        </button>
    );
}

export default ButtonItem;