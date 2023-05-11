import { CSSProperties, FormEvent, useMemo } from 'react';
import styles from './Slider.module.css';

type Props = {
  lowerValue: number,
  upperValue: number,
  min: number,
  max: number,
  onLowerChange: (e: FormEvent<HTMLInputElement>) => void,
  onUpperChange: (e: FormEvent<HTMLInputElement>) => void,
  onCentreChange: (e: FormEvent<HTMLInputElement>) => void,
};

export default function Slider({ lowerValue, upperValue, min, max, onLowerChange, onUpperChange, onCentreChange }: Props) {
  const trackFillStyle: CSSProperties = useMemo(() => {
    const percent1 = (lowerValue / max) * 100;
    const percent2 = (upperValue / max) * 100;

    return {
      background: `linear-gradient(to right, transparent ${percent1}%, #04aa6d ${percent1}%, #04aa6d ${percent2}%, transparent ${percent2}%)`,
    }
  }, [lowerValue, upperValue, max]);
  
  return (
    <div className={styles.container}>
      <div className={styles.track} style={trackFillStyle} />
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        value={lowerValue}
        id="lower"
        onInput={onLowerChange}
      />
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        value={upperValue}
        id="upper"
        onInput={onUpperChange}
      />
      <input
        className={styles.slider}
        type="range"
        value={lowerValue + ((upperValue - lowerValue) / 2)}
        id="centre"
        onInput={onCentreChange}
      />
    </div>
  )
}
