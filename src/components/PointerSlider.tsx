import { RefObject, SetStateAction, useRef, useState } from "react"; 
import styles from "./PointerSlider.module.css";
import type { PointerEvent, Dispatch } from "react";

const MIN_VALUE = 0;
const MAX_VALUE = 200;

export default function PointerSlider() {
  const thumbLeftRef = useRef<HTMLDivElement>(null);
  const thumbRightRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lowerValue, setLowerValue] = useState(MIN_VALUE);
  const [upperValue, setUpperValue] = useState(MAX_VALUE);

  const onPointerDown = (thumbRef: RefObject<HTMLDivElement>, maxValue: number, minValue: number, setter: Dispatch<SetStateAction<number>>) => (e: PointerEvent<HTMLDivElement>) => {
    thumbRef.current?.setPointerCapture(e.pointerId);

    if (thumbRef.current) {
      thumbRef.current.onpointermove = function(evt) {
        if (thumbRef.current && trackRef.current) {
          const rect = trackRef.current.getBoundingClientRect();
          const trackFraction = (evt.clientX - rect.left) / rect.width;
          const trackPercentage = trackFraction * 100;
          const trackValue = trackFraction * MAX_VALUE;

          if (trackValue > maxValue) {
            setter(maxValue);
          } else if (trackValue < minValue) {
            setter(minValue)
          } else {
            thumbRef.current.style.left = trackPercentage + '%';
            setter(trackValue);
          }
        }
      }

      thumbRef.current.onpointerup = function(evt) {
        if (thumbRef.current) {
          thumbRef.current.onpointermove = null;
          thumbRef.current.onpointerup = null;
        }
        // ...also process the "drag end" if needed
      };
    }
  }

  const onPointerDownMin = onPointerDown(thumbLeftRef, upperValue, MIN_VALUE, setLowerValue);
  const onPointerDownMax = onPointerDown(thumbRightRef, MAX_VALUE, lowerValue, setUpperValue);

  return (
    <div>
      <div className={styles.track} ref={trackRef}>
        <div
          className={styles.thumbLeft}
          ref={thumbLeftRef}
          onPointerDown={onPointerDownMin}
        />
        <div
          className={styles.thumbRight}
          ref={thumbRightRef}
          onPointerDown={onPointerDownMax}
        />
      </div>
      <p>{lowerValue}</p>
      <p>{upperValue}</p>
    </div>
  )
}