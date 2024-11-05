import React from 'react';



interface PlayerPositionProps {

  player: {

    id: string;

    name: string;

    top: string;

    left: string;

  };

  onClick: () => void;

  actions: { goal: number; assist: number; foul: number };

}



const PlayerPosition: React.FC<PlayerPositionProps> = ({ player, onClick, actions }) => {

  return (

    <div

      className="player"

      style={{ top: player.top, left: player.left }}

      onClick={onClick}

    >

      <div>{player.name}</div>

      <div style={{ fontSize: '0.8em' }}>

        G: {actions.goal} | A: {actions.assist} | F: {actions.foul}

      </div>

    </div>

  );

};



export default PlayerPosition;