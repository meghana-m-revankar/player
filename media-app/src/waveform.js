import React, { useEffect, useRef, useState, forwardRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = forwardRef(({ audioFile }, ref) => {
  const waveformRef = useRef(null);
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (waveformRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ddd',
        progressColor: '#ff5500',
        cursorColor: '#ff5500',
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 80,
        normalize: true,
        partialRender: true
      });

      setWavesurfer(ws);
    }
  }, []);

  useEffect(() => {
    if (wavesurfer && audioFile) {
      wavesurfer.load(audioFile);
      wavesurfer.on('ready', () => {
        wavesurfer.play();
      });

      wavesurfer.on('error', (e) => {
        console.warn(e);
      });
    }
  }, [wavesurfer, audioFile]);

  // Pause the waveform when the audio is paused
  useEffect(() => {
    const handleAudioPause = () => {
      if (wavesurfer && wavesurfer.isPlaying()) {
        wavesurfer.pause();
      }
    };

    const audioElement = ref.current;

    if (audioElement) {
      audioElement.addEventListener('pause', handleAudioPause);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('pause', handleAudioPause);
      }
    };
  }, [wavesurfer, ref]);

  // Forward the ref to the underlying DOM element
  useEffect(() => {
    if (ref) {
      ref.current = waveformRef.current;
    }
  }, [ref]);

  return <div ref={waveformRef} id="waveform" className="waveform-container" />;
});

export default Waveform;
