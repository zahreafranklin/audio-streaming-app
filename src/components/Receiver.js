import React, {useRef, useEffect } from 'react';

const Receiver = () => {
    const audioRef = useRef();

    useEffect(() => {

    }, []);

  return (
    <div>
        <h2>Receiver</h2>
        <audio ref={audioRef} autoPlay />
        </div>
  );
}

export default Receiver;