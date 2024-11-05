import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
import Field from './components/Field';
import PlayerModal from './components/PlayerModal';

export interface PlayerActionCounts {
  goal: number;
  assist: number;
  foul: number;
}

interface PlayerData {
  [playerName: string]: {
    actions: { type: keyof PlayerActionCounts; time: string }[];
    actionCounts: PlayerActionCounts;
  };
}

const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7'];

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  
  const [players, setPlayers] = useState<PlayerData>(
    playerNames.reduce((acc, player) => {
      acc[player] = { actions: [], actionCounts: { goal: 0, assist: 0, foul: 0 } };
      return acc;
    }, {} as PlayerData)
  );

  const openModal = (player: string) => setSelectedPlayer(player);
  const closeModal = () => setSelectedPlayer(null);

  const handleRecordAction = (player: string, actionType: keyof PlayerActionCounts) => {
    const actionTime = formatTime(elapsedTime);
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [player]: {
        ...prevPlayers[player],
        actions: [...prevPlayers[player].actions, { type: actionType, time: actionTime }],
        actionCounts: {
          ...prevPlayers[player].actionCounts,
          [actionType]: prevPlayers[player].actionCounts[actionType] + 1,
        },
      },
    }));
    setSelectedPlayer(null); // Close the modal after recording
  };

  // Timer states
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds

  // Start/Stop the timer
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000); // Increment every second

      // Clear the interval when isRunning changes or on component unmount
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  // Format elapsed time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Toggle timer on Start/Stop button click
  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div>
      <h1>Soccer Match Tracker</h1>

      {/* Match Clock */}
      <div className="match-clock">
        Match Time: {formatTime(elapsedTime)}
      </div>
      <button className="start-stop-button" onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>

      {/* Display players and action counts */}
      <div style={{ marginTop: '20px' }}>
        {Object.keys(players).map((player) => (
          <div key={player} className="player-card">
            <h3 className="player-name" onClick={() => openModal(player)}>{player}</h3>
            <p>Goals: {players[player].actionCounts.goal}</p>
            <p>Assists: {players[player].actionCounts.assist}</p>
            <p>Fouls: {players[player].actionCounts.foul}</p>
          </div>
        ))}
      </div>

      {/* Player Modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          onClose={closeModal}
          onRecordAction={(actionType) => handleRecordAction(selectedPlayer, actionType)}
        />
      )}
    </div>
  );
};

export default App;
