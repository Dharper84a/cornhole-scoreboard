import * as React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import * as Styles from './styles';

import SiteContext from '../../include/context';
const NewGameForm = () => {
    const context = React.useContext(SiteContext);

    const [playerName, setPlayerName] = React.useState('');


    const playerNameChange = (e) => {
        setPlayerName(e.target.value);
    }
    
    const addPlayer = () => {
        context.player.new(playerName);
    }

    const removePlayer = (e) => {
        let _player = e.target.getAttribute('player');
        if(_player) {
            context.player.delete(_player);
        }
    }

    React.useEffect(() => {
        console.log(context.player.list);
    }, [])

    return (
        <Styles.Container>
            <p>Avaliable Players</p>
            <ul>
                {context.player.list.map((player, key) => {
                    return(<li key={key}>{player} <button onClick={removePlayer} player={player}>Remove</button></li>)
                })}
            </ul>
            <input type="text" value={playerName} onChange={playerNameChange} />
            <button onClick={addPlayer} disabled={playerName.length > 0 ? false : true}>Add Player</button>
        </Styles.Container>
    )
}

export default NewGameForm