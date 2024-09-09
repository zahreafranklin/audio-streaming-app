// Sender.js
import React, { useEffect, useRef, useState } from "react"; // Import React and necessary hooks

const Sender = () => {
  // State to toggle the audio filter on or off
  const [filterEnabled, setFilterEnabled] = useState(false); // State to control the filter's state (on or off)

  // Refs to hold references to audio context, gain node, filter node, and audio element
  const audioRef = useRef(); // Reference to the audio HTML element
  const audioContextRef = useRef(); // Reference to the AudioContext for audio manipulation
  const gainNodeRef = useRef(); // Reference to the GainNode for controlling volume
  const filterNodeRef = useRef(); // Reference to the BiquadFilterNode for frequency filtering

  useEffect(() => {
    // useEffect hook to initialize the audio stream and setup audio context when the component mounts
    async function startStream() {
      try {
        // Request permission and access to the user's microphone
        const localStream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Get the user's audio stream
        audioRef.current.srcObject = localStream; // Set the audio stream as the source for the audio element

        // Create a new AudioContext for manipulating audio
        audioContextRef.current = new AudioContext(); // Initialize an audio context
        const source = audioContextRef.current.createMediaStreamSource(localStream); // Create a media stream source from the user's audio

        // Create Gain Node to control the volume
        gainNodeRef.current = audioContextRef.current.createGain(); // Initialize a gain node to control audio volume
        gainNodeRef.current.gain.value = 0.75; // Set the initial gain value to 0.75 (reduce volume to 75%)

        // Create Biquad Filter Node to manipulate frequencies
        filterNodeRef.current = audioContextRef.current.createBiquadFilter(); // Initialize a biquad filter node for frequency filtering
        filterNodeRef.current.type = "lowshelf"; // Set the filter type to 'lowshelf' (boost or cut low frequencies)
        filterNodeRef.current.frequency.value = 200; // Set the filter's frequency cutoff to 200 Hz

        // Connect audio nodes together in the audio processing graph
        // Connect the media source -> gain node -> filter node -> destination (output)
        source.connect(gainNodeRef.current).connect(filterNodeRef.current).connect(audioContextRef.current.destination);
      } catch (error) {
        console.error("Error accessing audio input:", error); // Handle any errors accessing the user's microphone
      }
    }

    startStream(); // Start the audio stream when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to toggle the audio filter on and off
  const toggleFilter = () => {
    setFilterEnabled(!filterEnabled); // Toggle the filterEnabled state between true and false
    if (filterNodeRef.current) { // Check if filter node exists
      filterNodeRef.current.frequency.value = filterEnabled ? 0 : 200; // Disable filter by setting frequency to 0 or enable it by setting to 200 Hz
    }
  };

  return (
    <div>
      <h2> <center>Sender</center></h2>
      {/* Audio element to play the user's audio stream */}
      <audio ref={audioRef} autoPlay muted /> {/* Ref to audio element, autoplay enabled, and muted to avoid feedback */}
     
      {/* Button to toggle the filter on and off */}
      <center>
      <button onClick={toggleFilter}>
        {filterEnabled ? "Disable Filter" : "Enable Filter"} {/* Button text changes based on filter state */}
      </button>
      </center>
    </div>
  );
};

export default Sender; // Export the Sender component for use in other parts of the app
