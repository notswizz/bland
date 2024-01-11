// This is your API handler file

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, task, firstSentence } = req.body;

    const options = {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: task,
        from: '+14048827923',
        reduce_latency: true,
        voice_id: 5,
        wait_for_greeting: true,
        first_sentence: firstSentence, // This will take the value from the request
        record: true
      })
    };

    try {
      const apiResponse = await fetch('https://api.callbland.com/v1/calls', options);
      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }
      const data = await apiResponse.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error making the call:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
