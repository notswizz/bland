// CallForm.js
import { useState } from 'react';

export default function CallForm({ onCallStart }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [task, setTask] = useState('');
  const [firstSentence, setFirstSentence] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCallStart(phoneNumber, task, firstSentence);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Task"
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            value={firstSentence}
            onChange={(e) => setFirstSentence(e.target.value)}
            placeholder="First Sentence"
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Start Call
        </button>
      </form>
    </div>
  );
}
