import React from 'react';

import PlayerPosition from './PlayerPosition';

import './Field.css';



interface FieldProps {

  onPlayerClick: (player: string) => void;

  playerActions: { [key: string]: { goal: number; assist: number; foul: number } };

}



const Field: React.FC<FieldProps> = ({ onPlayerClick, playerActions }) => {

  const players = [

    { id: '1', name: 'Player 1', top: '10%', left: '35%' },

    { id: '2', name: 'Player 2', top: '20%', left: '5%' },

    { id: '3', name: 'Player 3', top: '20%', left: '35%' },

    { id: '4', name: 'Player 4', top: '20%', left: '65%' },

    { id: '5', name: 'Player 5', top: '30%', left: '5%' },

    { id: '6', name: 'Player 6', top: '30%', left: '35%' },

    { id: '7', name: 'Player 7', top: '30%', left: '65%' },

  ];



  return (

    <div className="field">

      {players.map((player) => (

        <PlayerPosition

          key={player.id}

          player={player}

          onClick={() => onPlayerClick(player.name)}

          actions={playerActions[player.name]}

        />

      ))}

    </div>

  );

};



export default Field;