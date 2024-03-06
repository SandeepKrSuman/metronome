import { useRef, useState } from "react";
import { FaPlus, FaMinus, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setPlaying] = useState(false);
  const timerRef = useRef(null);
  const tickSound = new Audio("/tick_sound.wav");

  const startMetronome = () => {
    const interval = (60 / bpm) * 1000;
    timerRef.current = setInterval(() => {
      tickSound.play();
    }, interval);
    setPlaying(true);
  };

  const stopMetronome = () => {
    clearInterval(timerRef.current);
    setPlaying(false);
  };

  const handleBpmChange = (trigger, val) => {
    if (trigger === "plus") {
      setBpm((prev) => (prev < 280 ? prev + 1 : 280));
    } else if (trigger === "minus") {
      setBpm((prev) => (prev > 20 ? prev - 1 : 20));
    } else if (trigger === "slide") {
      setBpm(val);
    }

    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  return (
    <div className="container">
      <div className="bpm-play">
        <h1>{bpm}</h1>
      </div>
      <div className="slider-container">
        <button
          onClick={() => {
            handleBpmChange("minus");
          }}
        >
          <FaMinus />
        </button>
        <input
          className="slider"
          value={bpm}
          onChange={(e) => {
            handleBpmChange("slide", parseInt(e.target.value));
          }}
          type="range"
          min={20}
          max={280}
        />
        <button
          onClick={() => {
            handleBpmChange("plus");
          }}
        >
          <FaPlus />
        </button>
      </div>
      <button
        className="play-pause"
        onClick={isPlaying ? stopMetronome : startMetronome}
      >
        {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
    </div>
  );
}
