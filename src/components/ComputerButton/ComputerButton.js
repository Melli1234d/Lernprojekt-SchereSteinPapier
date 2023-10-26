import React, {useEffect, useState} from "react";
import "./ComputerButton.css";

import ReactDOM from "react-dom";

function ComputerButtons({computerButton}) {

    const [currentButton, setCurrentButton] = useState(computerButton);

    //use Effekt= wenn state sich ändert, wenn [] macht er nur 1x, wenn man was reinschreibt macht er es bei jedem mal wenn sich was ändert
    useEffect(() => {
        setCurrentButton(computerButton) // Update the document title using the browser API
    }, [computerButton]); //macht es jedes mal

    return (
        <div>
            <div className="container-buttons">
                <div className="Computer">
                    <p className="p">Der Computer spielt: {currentButton?.title}</p>
                    <div className="currenticon">{currentButton?.icon}</div>
                    <div className="currenttitle">{currentButton?.title}</div>

                </div>

            </div>
        </div>
    );
}

const rootElement =
    document.getElementById("root");
ReactDOM.render(<ComputerButtons/>, rootElement);


export default ComputerButtons;