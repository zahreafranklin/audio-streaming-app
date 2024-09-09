// App.js
import React, { useEffect, useRef, useState } from "react";
import Sender from "./components/Sender";// Import the Sender component
import Visualization from "./components/Visualization"; // Import the Visualization component

const App = () => {
  // State to manage the audio context and source
  const [audioContext, setAudioContext] = useState(null); // Holds the audio context instance
  const [source, setSource] = useState(null); // Holds the audio source for visualization

  const audioElementRef = useRef(); // Reference to the audio element for audio input

  useEffect(() => {
    // Initialize audio context and connect source when component mounts
    const initializeAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Get audio input from user's microphone
        audioElementRef.current.srcObject = stream; // Set audio stream as the source for the audio element
        const context = new (window.AudioContext || window.webkitAudioContext)(); // Create a new audio context (handle browser compatibility)
        setAudioContext(context); // Store the audio context in state
        const mediaSource = context.createMediaStreamSource(stream); // Create a media stream source from the audio stream
        setSource(mediaSource); // Store the media stream source in state
      } catch (error) {
        console.error("Error accessing microphone:", error); // Handle any errors in accessing microphone
      }
    };

    initializeAudio(); // Call the function to initialize audio input
  }, []); // Run effect only once when component mounts

  return (
    <div>
      <h1> <center>
      Microphone Visualizer
        </center></h1>
      {/* Audio element to play the user's audio stream */}
      <audio ref={audioElementRef} autoPlay muted /> {/* Ref to audio element, autoplay enabled, and muted to avoid feedback */}
      
      {/* Render the Sender component */}
      <Sender />

      {/* Render the Visualization component only when audioContext and source are available */}
      {audioContext && source && (
        <Visualization audioContext={audioContext} source={source} />
      )}
    </div>
  );
};

export default App; // Export the App component for use as the root component
