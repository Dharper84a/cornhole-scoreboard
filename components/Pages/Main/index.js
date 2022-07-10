import * as React from "react";
import useLocalStorageState from "use-local-storage-state";

import NewGameForm from "../../NewGameForm";
import Form from "../../Form";
import GameHistory from "../../GameHistory";
import Players from "../../Players";
import Scores from "../../Scores";

import * as Styles from "./styles";

export const MainPage = () => {
    const [gameHistory, setGameHistory] = useLocalStorageState('gameHistory', {
        ssr: true
    });
    

    const [confirmedNewGame, setConfirmedNewGame] = React.useState(false);
    const [showNewGameForm, setShowNewGameForm] = React.useState(false);

    const startNewGame = () => {
        if(confirmedNewGame) {
            // save current game data and mark as not completed
            // start a new game
            setShowNewGameForm(true);
        }

        setConfirmedNewGame(!confirmedNewGame);
    }

    return (
        <Styles.Container>
            <Styles.Content>
                <header>
                    <h1>Game #1234567890</h1>
                    <button onClick={startNewGame} disabled={showNewGameForm}>
                        {!confirmedNewGame ? (
                            `New Game`
                        ) : (
                            `Confirm New Game?`
                        )}
                        </button>
                </header>
                {showNewGameForm &&
                <NewGameForm />
                }
            </Styles.Content>
        </Styles.Container>
    );
};

export default MainPage;
