import { FormEvent, useState } from 'react'
import Slider from './components/Slider'
import './App.css'
import PointerSlider from './components/PointerSlider';

function App() {
  const min = 0;
  const max = 100;
  const gap = 10;
  const [lower, setLower] = useState(20);
  const [upper, setUpper] = useState(80);

  const onLowerChange = (e: FormEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value + gap < upper) {
      setLower(+e.currentTarget.value);
    } else {
      e.preventDefault();
    }
  }

  const onUpperChange = (e: FormEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value - gap > lower) {
      setUpper(+e.currentTarget.value);
    } else {
      e.preventDefault();
    }
  }

  const onCentreChange = (e: FormEvent<HTMLInputElement>) => {
    const val = +e.currentTarget.value;
    const diff = upper - lower;
    const newLowerVal = val - diff/2;
    const newUpperVal = val + diff/2;

    if (newLowerVal < min || newUpperVal > max) {
      e.preventDefault();
    } else {
      setLower(val - diff/2);
      setUpper(val + diff/2);
    }
  }

  return (
    <div>
      <h1>Sliders</h1>
      <h2>Range</h2>
      <Slider
        lowerValue={lower}
        upperValue={upper}
        min={min}
        max={max}
        onLowerChange={onLowerChange}
        onUpperChange={onUpperChange}
        onCentreChange={onCentreChange}
      />
      <p>Lower: {lower}</p>
      <p>Upper: {upper}</p>
      <h2>Pointer Events</h2>
      <div style={{ padding: '50px'}}>
        <PointerSlider />
      </div>
    </div>
  )
}

export default App
