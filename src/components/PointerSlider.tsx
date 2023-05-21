import { RefObject, SetStateAction, useEffect, useRef, useState } from "react"; 
import styles from "./PointerSlider.module.css";
import type { PointerEvent, Dispatch } from "react";

const MIN_VALUE = 0;
const MAX_VALUE = 200;

export default function PointerSlider() {
  const thumbLeftRef = useRef<HTMLDivElement>(null);
  const thumbRightRef = useRef<HTMLDivElement>(null);
  const thumbCentreRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lowerValue, setLowerValue] = useState(MIN_VALUE);
  const [upperValue, setUpperValue] = useState(MAX_VALUE);

  const onPointerDownMin = (e: PointerEvent<HTMLDivElement>) => {
    thumbLeftRef.current?.setPointerCapture(e.pointerId);

    if (thumbLeftRef.current) {
      thumbLeftRef.current.onpointermove = function(evt) {
        if (thumbLeftRef.current && trackRef.current) {
          const trackRect = trackRef.current.getBoundingClientRect();
          const trackValue = (evt.clientX - trackRect.left) / trackRect.width * MAX_VALUE;

          if (trackValue > upperValue) {
            setLowerValue(upperValue);
          } else if (trackValue < MIN_VALUE) {
            setLowerValue(MIN_VALUE);
          } else {
            setLowerValue(trackValue);
          }
        }
      }

      thumbLeftRef.current.onpointerup = function(evt) {
        if (thumbLeftRef.current) {
          thumbLeftRef.current.onpointermove = null;
          thumbLeftRef.current.onpointerup = null;
        }
        // ...also process the "drag end" if needed
      };
    }
  }

  const onPointerDownMax = (e: PointerEvent<HTMLDivElement>) => {
    thumbRightRef.current?.setPointerCapture(e.pointerId);

    if (thumbRightRef.current) {
      thumbRightRef.current.onpointermove = function(evt) {
        if (thumbRightRef.current && trackRef.current) {
          const trackRect = trackRef.current.getBoundingClientRect();
          const trackValue = (evt.clientX - trackRect.left) / trackRect.width * MAX_VALUE;

          if (trackValue > MAX_VALUE) {
            setUpperValue(MAX_VALUE);
          } else if (trackValue < lowerValue) {
            setUpperValue(lowerValue);
          } else {
            setUpperValue(trackValue);
          }
        }
      }

      thumbRightRef.current.onpointerup = function(evt) {
        if (thumbRightRef.current) {
          thumbRightRef.current.onpointermove = null;
          thumbRightRef.current.onpointerup = null;
        }
        // ...also process the "drag end" if needed
      };
    }
  }

  const onPointerDownCentre = (e: PointerEvent<HTMLDivElement>) => {
    thumbCentreRef.current?.setPointerCapture(e.pointerId);

    if (thumbCentreRef.current) {
      thumbCentreRef.current.onpointermove = function(evt) {
        if (thumbCentreRef.current && trackRef.current) {
          const trackRect = trackRef.current.getBoundingClientRect();
          const trackValue = (evt.clientX - trackRect.left) / trackRect.width * MAX_VALUE;

          const diff = upperValue - lowerValue;
          const newLowerVal = trackValue - diff/2;
          const newUpperVal = trackValue + diff/2;

          if (newLowerVal < MIN_VALUE) {
            // do nothing
          } else if (newUpperVal > MAX_VALUE) {
            // do nothing
          } else {
            setLowerValue(newLowerVal);
            setUpperValue(newUpperVal);
          }
        }
      }

      thumbCentreRef.current.onpointerup = function(evt) {
        if (thumbCentreRef.current) {
          thumbCentreRef.current.onpointermove = null;
          thumbCentreRef.current.onpointerup = null;
        }
        // ...also process the "drag end" if needed
      };
    }
  }

  useEffect(() => {
    if (thumbCentreRef.current && thumbLeftRef.current && thumbRightRef.current) {
      thumbCentreRef.current.style.left = (upperValue - ((upperValue - lowerValue) / 2)) / MAX_VALUE * 100 + '%';
      thumbLeftRef.current.style.left = lowerValue / MAX_VALUE * 100 + '%';
      thumbRightRef.current.style.left = upperValue / MAX_VALUE * 100 + '%';
    }
  }, [lowerValue, upperValue]);

  return (
    <div>
      <div className={styles.track} ref={trackRef}>
        <div
          className={styles.thumbLeft}
          ref={thumbLeftRef}
          onPointerDown={onPointerDownMin}
        />
        <div
          className={styles.thumbCentre}
          ref={thumbCentreRef}
          onPointerDown={onPointerDownCentre}
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