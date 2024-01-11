import { useState, useEffect } from 'react';
import CallForm from '../components/CallForm';
import ActionButton from '../components/ActionButton';
import CallTable from '../components/CallTable';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [task, setTask] = useState('');
  const [firstSentence, setFirstSentence] = useState(''); // New state for first sentence
  const [call_id, setCallId] = useState(null);
  const [calls, setCalls] = useState([]);
  const [callFailed, setCallFailed] = useState(false);
  const [callErrorMessage, setCallErrorMessage] = useState('');

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const response = await fetch('/api/get-calls');
      const data = await response.json();
      if (data && Array.isArray(data.calls)) {
        setCalls(data.calls);
      } else {
        console.error('Invalid data format:', data);
        setCalls([]);
      }
    } catch (error) {
      console.error('Error fetching calls:', error);
    }
  };

 const handleStartCall = async (phoneNumber, task, firstSentence) => {
    // Updated to include firstSentence
    setCallFailed(false);
    setCallErrorMessage('');

    try {
      const response = await fetch('/api/start-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber, 
          task,
          firstSentence, // Include first sentence in the request
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Call failed');
      }

      const data = await response.json();

      if (data && data.call_id) {
        setCallId(data.call_id);
        console.log('Call started, ID:', data.call_id);
        // Here you can add any additional logic needed after starting the call
      } else {
        setCallFailed(true);
        setCallErrorMessage('No call_id received or call failed to start.');
      }
    } catch (error) {
      console.error('Error making the call:', error);
      setCallFailed(true);
      setCallErrorMessage(error.message);
    }
  };

  const handleEndCall = async () => {
    try {
      const response = await fetch('/api/end-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ call_id }),
      });
      const data = await response.json();
      console.log(data);
      setCallId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 space-y-6">
      {callFailed && <ErrorMessage message="Call failed. Please try again later." />}
      <CallForm 
        onCallStart={handleStartCall} 
        phoneNumber={phoneNumber} 
        setPhoneNumber={setPhoneNumber} 
        task={task} 
        setTask={setTask}
        firstSentence={firstSentence} // Pass first sentence to CallForm
        setFirstSentence={setFirstSentence} // Pass setter function to CallForm
      />
      {call_id && (
        <div className="flex space-x-4 w-full max-w-lg">
          <ActionButton text="End Call" onClick={handleEndCall} color="red" />
          {callFailed && <ErrorMessage message={`Call failed: ${callErrorMessage}`} />}
        </div>
      )}
      <CallTable calls={calls} />
    </div>
  );
}
