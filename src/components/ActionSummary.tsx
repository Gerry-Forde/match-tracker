// ActionSummary.tsx
import React from 'react';

interface Action {
  player: string;
  type: string;
  time: string;
}

interface ActionSummaryProps {
  actions: Action[];
  onClose: () => void; // Function to close the summary
}

const ActionSummary: React.FC<ActionSummaryProps> = ({ actions, onClose }) => {
    console.log(actions)
    return (
    <div className="summary-container">
      <h2>Player Actions Summary</h2>
      <button className="close-button" onClick={onClose}>Close</button>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>
            {action.player} - {action.type} at {action.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionSummary;