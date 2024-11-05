import React from 'react';
import Modal from 'react-modal';

interface PlayerActionCounts {
  goal: number;
  assist: number;
  foul: number;
}

interface PlayerModalProps {
  player: string | null;
  onClose: () => void;
  onRecordAction: (actionType: 'goal' | 'assist' | 'foul') => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose, onRecordAction }) => {
  if (!player) return null;

  const playerActions = [
    { name: 'Goal', key: 'goal' },
    { name: 'Assist', key: 'assist' },
    { name: 'Foul', key: 'foul' },
  ];

  const handleActionClick = (actionType: keyof PlayerActionCounts) => {
    onRecordAction(actionType);
    onClose(); // Close the modal after recording the action
  };

  return (
    <Modal isOpen={!!player} onRequestClose={onClose} contentLabel="Player Actions">
      <h2>Actions for {player}</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {playerActions.map((action) => (
          <button
            key={action.key as string}
            onClick={() => handleActionClick(action.key as keyof PlayerActionCounts)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            {action.name}
          </button>
        ))}
      </div>
      {/* <button onClick={onClose} style={{ marginTop: '20px' }}>Close</button> */}
    </Modal>
  );
};

export default PlayerModal;