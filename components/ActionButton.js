// ActionButton.js
export default function ActionButton({ text, onClick, color }) {
    return (
      <button
        onClick={onClick}
        className={`flex-1 bg-${color}-600 text-white p-4 rounded-md hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-opacity-50`}
      >
        {text}
      </button>
    );
  }
  