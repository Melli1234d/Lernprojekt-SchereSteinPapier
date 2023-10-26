import './App.css';
import ButtonItem from './components/ButtonItem/ButtonItem';
import {FaRegHandScissors, FaRegHandRock, FaRegHandPaper} from "react-icons/fa";
import ComputerButton from './components/ComputerButton/ComputerButton';
import React, {useState, useEffect} from 'react';

function App() {
    const [computerButton, setComputerButton] = useState(undefined);
    const [count, setCount] = useState(0);
    const [won, setWon] = useState(0);
    const [lose, setLose] = useState(0);
    const [draw, setDraw] = useState(0);
    const [gameResult, setGameResult] = useState("");
    const [userButton, setUserButton] = useState(undefined);

    // Funktion die den Count wieder auf Null stellt, wenn man auf den Reset Button drückt
    const handleReset = () => {
        setGameResult(undefined);
        setWon(0);
        setDraw(0);
        setLose(0);
        setComputerButton(undefined);
        setCount(0);
    }
    // Funktion die bei jedem Klick + eins machen soll (Anzahl der Spiele)
    const handleAmountGames = () => {
        setCount(count + 1);
    }
    //Funktion wie oft gewonnen
    const handleAmountWin = () => {
        setWon(won + 1);
    }
    //Funkton wie oft verloren
    const handleAmountLose = () => {
        setLose(lose + 1);
    }
    //Funktion wie oft unentschieden
    const handleAmountDraw = () => {
        setDraw(draw + 1);
    }
    //bei jedem mal wenn es sich ändert aktualisiert und speichert der Spielstand
    useEffect(() => {
        if (userButton) {
            scoreJudgement()
        }
    }, [userButton]);

    //Variable Buttons, die in einem Array alle einzelnen Inhalte und alle Items beinhaltet (Schere Stein Papier mit jeweils einem Icon und einem Titel)
    //Button die der Spieler drückt
    const buttons = [
        {
            id: 'e1',
            icon: <FaRegHandScissors className="icon"/>,
            title: 'Schere'
        },
        {
            id: 'e2',
            icon: <FaRegHandRock className="icon"/>,
            title: 'Stein'
        },
        {
            id: 'e3',
            icon: <FaRegHandPaper className="icon"/>,
            title: 'Papier'
        },
    ];

    //Buttons, die der Computer spielt
    const computerbuttons = [
        {
            title: "Schere",
            icon: <FaRegHandScissors className="icon"/>
        },
        {
            title: "Stein",
            icon: <FaRegHandRock className="icon"/>
        },
        {
            title: "Papier",
            icon: <FaRegHandPaper className="icon"/>
        }
    ];

    //Funktion, die den Computer Button Random ausgeben soll
    const randomComputerButtons = e => {
        const index = Math.floor(Math.random() * computerbuttons.length)

        setComputerButton(computerbuttons[index]);
        return computerbuttons[index].title //der Titel des Computer Buttons soll wiedergegeben werden, nicht die Position
    };

    // HERAUSFINDEN, WANN GEWONNEN/VERLOREN/UNENTSCHIEDEN

    //Gewinn Bedingung/wann man gewinnt
    const winCondition = {
        Papier: 'Stein',
        Stein: 'Schere',
        Schere: 'Papier',
    };
    function buttonClicked() {
        let userButtonTitle = buttons.title //User
        let computerButtonTitle = randomComputerButtons() //Computer Button beim draufklick random angezeigt
        handleAmountGames(); //macht +1 bei Gesamt Spiele
        
    }

    function scoreJudgement() {
        console.log("User:", userButton?.title, "Computer", computerButton?.title,
            winCondition[userButton?.title]);
        if (userButton?.title === computerButton?.title) { //wenn User Button gleich ist mit Computer Button ist der Spielstand Unentschieden
            handleAmountDraw();
            setGameResult(" Das Spiel ist unentschieden"); //es wird +1 eins bei Unentschieden gemacht
        }
        //Beispiel: ich drücke Schere, er prüft bei WinCondition bei Schere was da steht,(Papier) wenn es das selbe ist wie das, was Random ausgegeben wird(Papier), hat man gewonnen
        else if (winCondition[userButton?.title] === computerButton?.title) { //wenn der User Button bei der winCondition gleich ist mit dem Computer Button hat man gewonnen
            handleAmountWin();
            setGameResult("Du hast gewonnen"); //es wird +1 bei Spieler gemacht
        } else { //wenn die ersten Beiden nicht stimmen dann hat man verloren
            handleAmountLose();
            setGameResult("Du hast verloren");  //es wird +1 beim Computer gemacht
        }
    }


//ButtonItem ist das jeweilige Item, was dann das icon und den titel von der Button Variable/ Array enthält.
    return (
        <div className="App">
            <header className="App-header">

            <div className="div-untereinander">
                <div className="spielrunden"> Spielrunden:<div className="count"> {count}</div> </div>
                <div className="p-Ausrichtung">
                    <div className="du"> Du</div>
                    <div className="punktestand-win"> {won}</div>
                    <div className="trennstrich">-</div>
                    <div className="punktestand-lose">{lose}</div>
                    <div className="computer">Computer</div>
                    <div className="unentschieden">| unentschieden</div>
                    <div className="punktestand-draw">{draw}</div>
                </div>

             </div>
                <p>
                    Was wählst du?
                </p>
                <div className="Button-Ausrichtung">
                    {buttons.map((button) =>
                        <ButtonItem
                            onPress={() => {
                                setUserButton(button); //speichert den User Button
                                buttonClicked()
                            }}
                            title={button.title}
                            icon={button.icon}
                        />
                    )}</div>
                <ComputerButton computerButton={computerButton}/>

                <p className="ergebnis">{gameResult}</p>
                <button className="resetbutton" onClick={handleReset}> Reset</button>
            </header>
        </div>
    );
}

export default App;