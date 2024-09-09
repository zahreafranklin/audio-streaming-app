# Documentation for Microphone Visualizer Audio Streaming App

## Overview
This React application enables audio streaming between two users and visualizes the sound waves in real time. This project uses the WebRTC API for peer-to-peer audio streaming and the Web Audio API to manipulate and visualize the audio data.

## Project Structure
Each file and it’s purpose is as follows:

### App.js
This is the main file of the application. Each component is rendered here.

### Sender.js 
This file handles the audio stream from the user’s microphone. It sends the sound to the receiver’s using WebRTC. 

### Receiver.js 
This file receives the audio stream from the sender and uses the user’s speakers to play the sound.

### Visualization.js 
This visualizes the audio data in the form of a sound wave using the waveform from the Canvas API and the Web Audio API. 

## App.js 
The purpose of this is to render the main components (Sender, Receiver, and Visualization) and manages the overall layout.

### Key Parts: 
* Rendering Components: renders the Sender, Receiver and Visualization components to provide an interface for both users to send and receive audio streams. 
* Styling and Layout: CSS was applied for layout and spacing.

## Sender.js: 
The purpose of this was to capture the user’s audio from their microphone and send it to the receiver using a WebRTC connection. 

### Key Parts:
* navigator.mediaDevices.getUserMedia : requests permission to access the user’s microphone and obtains the audio stream.
* RTCPeerConnection : creates a new WebRTC connection for peer-to-peer communication. 
* sendChannel.send(): sends the local audio stream to the receiver. 

## Receiver.js: 
The purpose of this is for the audio stream that is sent by the sender to be received and plays it through the user’s speaker.

### Key Parts: 
* RTCPeerConnection : create a WebRTC connection to receive the audio stream from the sender.
* pc.setRemoteDescription() : sets the remote description received from sender to establish a connection. 
* on track Event Handler: listens for the incoming audio track and sets it as the source for an <audio? element to play the audio. 

## Visualization.js: 
The purpose of this is to add a visualizer for the audio in the form of a real-time sound wave. 

### Key Parts: 
* useRef() : creates references to the canvas and the AnalyserNode.
* requestAnimationFrame(draw) : continuously calls the draw function to update the waveform. 
* canvas API : uses the Canvas API to create a waveform  


