import * as React from "react";

const initialGame = {
    name: "",
    players: [],
    scores: [],
    running: false,
    winner: "",
};

const defaultState = {
    game: {
        current: {},
        new: () => {},
        save: () => {},
        store: () => {},
    },
    player: {
        list: [],
        new: () => {},
        delete: () => {},
    },
    history: [],
};

const SiteContext = React.createContext(defaultState);

const SiteProvider = (props) => {
    const [currentGame, setCurrentGame] = React.useState(null);
    const [playerList, setPlayerList] = React.useState(null);
    const [history, setHistory] = React.useState(null);

    const hasLocalStorage = typeof localStorage !== "undefined" ? true : false;

    const addScore = (player, points) => {
        let outcome = "added";

        for (var i = 0; i <= currentGame.scores.length - 1; i++) {
            let current = currentGame.scores[i];

            if (current.player === player) {
                let _neededToWin = parseInt(current.neededToWin);
                let _score = parseInt(current.score);
                let _points = parseInt(points);

                if (_neededToWin > _points) {
                    // make sure we do not go over our winning points
                    current.score = _score + _points;
                    current.neededToWin = _neededToWin - _points;
                } else if (_neededToWin === _points) {
                    outcome = "won";
                } else {
                    outcome = "bust";
                }
            }
        }

        return outcome;
    };

    const winGame = (player) => {
        setCurrentGame(prevState => ({...prevState, winner: player, running: false}))
    }

    const newGameHandler = (data) => {
        if (currentGame.running) {
            saveGameHandler();
            storeGameHandler();
        }

        const newGame = initialGame;

        newGame.players = data.players;
        newGame.scores = newGame.players.map((player) => {
            return {
                player: player,
                score: 0,
                neededToWin: 21,
            };
        });

        setCurrentGame(newGame);
    };

    const saveGameHandler = () => {
        if (!hasLocalStorage) return;

        localStorage.setItem("game", JSON.stringify(currentGame));
        // saves the current game
    };

    const storeGameHandler = () => {
        // moves the current game to history
        setHistory((prevState) => [...prevState, currentGame]);
    };

    const newPlayerHandler = (name) => {
        setPlayerList((prevState) => [...prevState, name]);
    };

    const deletePlayerHandler = (name) => {
        

    };

    /** Local Storage Saving */
    React.useEffect(() => {
        if (typeof localStorage === "undefined") return () => {};
        if(!history) return () => {};
        console.log('saving history to storage');
        localStorage.setItem("history", JSON.stringify(history));
        return () => {};
    }, [history]);

    React.useEffect(() => {
        if (typeof localStorage === "undefined") return () => {};
        if(!playerList) return () => {};
        console.log('saving player to storage')
        localStorage.setItem("players", JSON.stringify(playerList));
        return () => {};
    }, [playerList]);

    React.useEffect(() => {
        if (typeof localStorage === "undefined") return () => {};
        if(!currentGame) return () => {};
        console.log('saving game to storage');
        localStorage.setItem("game", JSON.stringify(currentGame));
        return () => {};
    }, [currentGame]);

    React.useEffect(() => {
        try {
            const _game = localStorage.getItem('game');
            const _playerList = localStorage.getItem('players');
            const _history = localStorage.getItem('history');
    
            setCurrentGame(JSON.parse(_game));
            setPlayerList(JSON.parse(_playerList));
            setHistory(JSON.parse(_history));
        }catch(e) {
            console.log(e);
        }
       

    }, [])

    return (
        <SiteContext.Provider
            value={{
                game: {
                    current: currentGame,
                    new: newGameHandler,
                    save: saveGameHandler,
                    store: storeGameHandler,
                    win: winGame,
                    addScore: addScore,
                },
                player: {
                    list: playerList,
                    new: newPlayerHandler,
                    delete: deletePlayerHandler,
                },
                history: history,
            }}
        >
            {props.children}
        </SiteContext.Provider>
    );
};

export default SiteContext;

export { SiteProvider };
