import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
// import Field from './components/Field';
import PlayerModal from './components/PlayerModal';
// import ActionSummary from './components/ActionSummary'; // Import the new component

export interface PlayerActionCounts {
  goal: number;
  assist: number;
  foul: number;
}

interface Action {
  type: keyof PlayerActionCounts;
  time: string;
  player: string; // Add player property here
}

interface PlayerData {
  [playerName: string]: {
    actions: Action[]; // Use the Action interface here
    actionCounts: PlayerActionCounts;
  };
}

const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7'];

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  
  const [players, setPlayers] = useState<PlayerData>(
    playerNames.reduce((acc, player) => {
      acc[player] = { actions: [], actionCounts: { goal: 0, assist: 0, foul: 0 } };
      return acc;
    }, {} as PlayerData)
  );

  const getAllActions = () => {
    const allActions: { type: keyof PlayerActionCounts; time: string }[] = [];
    Object.keys(players).forEach((player) => {
        allActions.push(...players[player].actions);
    });
    return allActions;
  };

  // State for storing all actions
  const [allActions, setAllActions] = useState<Action[]>([]);

  const sortedActions = allActions.sort((a, b) => {
    const timeA = a.time.split(':').reduce((acc, time) => (60 * acc) + parseInt(time, 10), 0);
    const timeB = b.time.split(':').reduce((acc, time) => (60 * acc) + parseInt(time, 10), 0);
    return timeA - timeB;
  });

  // const allActions: { player: string; type: string; time: string }[] = []; // Store all actions for summary

  const openModal = (player: string) => setSelectedPlayer(player);
  const closeModal = () => setSelectedPlayer(null);

  const handleRecordAction = (player: string, actionType: keyof PlayerActionCounts) => {
    const actionTime = formatTime(elapsedTime);
    const newAction: Action = { type: actionType, time: actionTime, player: player }; // Create action with player
  
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [player]: {
        ...prevPlayers[player],
        actions: [...prevPlayers[player].actions, newAction],
        actionCounts: {
          ...prevPlayers[player].actionCounts,
          [actionType]: prevPlayers[player].actionCounts[actionType] + 1,
        },
      },
    }));
    
    // Add the new action to allActions
    setAllActions((prevActions) => [...prevActions, newAction]);
  
    setSelectedPlayer(null); // Close the modal after recording
  };
  

  const showActionSummary = () => setShowSummary(true); // Show the action summary
  const closeActionSummary = () => setShowSummary(false); // Close the summary

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
      {!showSummary ? (
        <div className="app-container">
          <h1 className="app-title">Gaelic Match Tracker</h1>
          
          <div  className="match-clock-container">
            <div className="match-clock">
              Match Time: {formatTime(elapsedTime)}
            </div>
            <button className="start-stop-button" onClick={handleStartStop}>
              {isRunning ? 'Stop' : 'Start'}
            </button>
          </div>

          <div className="player-container">
            {Object.keys(players).map((player) => (
              <div key={player} className="player-card">
                <button className="player-name" onClick={() => openModal(player)}>
                  {player}
                </button>
                <p>G: {players[player].actionCounts.goal} | A: {players[player].actionCounts.assist} | F: {players[player].actionCounts.foul}</p>
              </div>
            ))}
          </div>

          {selectedPlayer && (
            <PlayerModal
              player={selectedPlayer}
              onClose={closeModal}
              onRecordAction={(actionType) => handleRecordAction(selectedPlayer, actionType)}
            />
          )}

          {/* Button to show action summary */}
          <button onClick={() => setShowSummary(true)} className="show-summary-button">
            Show Action Summary
          </button>
        </div>
      ) : (
        <div className="app-container">
          <h1 className="app-title">Gaelic Match Tracker</h1>
          <h2>Action Summary</h2>
          <ul>
            {sortedActions.length > 0 ? (
              sortedActions.map((action, index) => (
                <li key={index}>
                  {action.player} - {action.type} at {action.time}
                </li>
              ))
            ) : (
              <li>No actions recorded</li>
            )}
          </ul>
          <button onClick={() => setShowSummary(false)} className="back-button">
            Back to Main Screen
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
