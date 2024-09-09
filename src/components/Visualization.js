import React, { useEffect, useRef } from "react";

const Visualization = ({ audioContext, source }) => {
  const canvasRef = useRef(); // Reference to the canvas element
  const analyserRef = useRef(); // Reference to the analyserNode for visualizing audio data

  useEffect(() => {
    if (audioContext && source) {
      const analyser = audioContext.createAnalyser(); // Create an analyser node to get frequency data
      source.connect(analyser); // Connect the audio source to the analyser
      analyser.fftSize = 2048; // Set the FFT size for the analyser
      analyserRef.current = analyser; // Store the analyser in a ref to use later

      const canvas = canvasRef.current; // Get the canvas element from the ref
      const canvasCtx = canvas.getContext("2d"); // Get the 2D drawing context for the canvas

      const draw = () => {
        const bufferLength = analyser.frequencyBinCount; // Get the number of data points for the frequency domain
        const dataArray = new Uint8Array(bufferLength); // Create a typed array to hold the frequency data
        analyser.getByteTimeDomainData(dataArray); // Get the current frequency data from the analyser

        // Clear the canvas before drawing
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        // Begin drawing the waveform
        canvasCtx.beginPath();
        const sliceWidth = (canvas.width * 1.0) / bufferLength; // Calculate the width of each slice of the waveform
        let x = 0; // Start drawing from the left side of the canvas
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0; // Normalize the data point value
          const y = (v * canvas.height) / 2; // Calculate the y-coordinate of the data point

          if (i === 0) {
            canvasCtx.moveTo(x, y); // Start the path at the first point
          } else {
            canvasCtx.lineTo(x, y); // Draw a line to the next data point
          }
          x += sliceWidth; // Increment the x-coordinate for the next data point
        }
        canvasCtx.lineTo(canvas.width, canvas.height / 2); // Draw a line to the center of the canvas
        canvasCtx.strokeStyle = "#ff0000"; // Set the color for the waveform
        canvasCtx.lineWidth = 2; 
        canvasCtx.stroke(); // Draw the waveform

        requestAnimationFrame(draw); // Schedule the next frame
      };
      draw(); // Start the drawing loop
    }
  }, [audioContext, source]); // Re-run effect if audioContext or source changes

  return(
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  {/* Canvas for drawing the wave */}
  <canvas ref={canvasRef} width={800} height={400} />
</div>
  );
};

export default Visualization; // Export the component for use in other parts of the app
