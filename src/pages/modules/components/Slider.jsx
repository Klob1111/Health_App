import { useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../../App.jsx";
import { clamp } from "../../../utils.jsx";

const Slider = ({
  val,
  valChange,
  slidersteps,
  slidermaxlength,
  sliderwidth,
  bgcol,
  maincol,
  reversed = false,
}) => {
  //length and height of the knob is equal to the width of the slider
  const sliderRef = useRef(null);
  const [sliderlength, changeSliderLength] = useState(slidermaxlength);

  //turns a step into a pos
  const posFromStep = (step, totalsteps, length) => {
    const steplength = length / totalsteps;
    const newpos = step * steplength;
    return clamp(newpos, 0, length);
  };

  //turns a pos into a step
  const stepFromPos = (pos, totalsteps, length) => {
    const steplength = length / totalsteps;
    const possteps = pos / steplength; //how many steps the pos is
    return clamp(Math.round(possteps), 0, totalsteps);
  };

  const pos = posFromStep(val, slidersteps, sliderlength - sliderwidth);

  //change slider width variable when the actual width of the slider changes (window resize)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updatesliderlength = () => changeSliderLength(slider.clientWidth);

    const sliderobserve = new ResizeObserver(updatesliderlength);
    sliderobserve.observe(slider);

    updatesliderlength();

    return () => sliderobserve.disconnect();
  }, []);

  return (
    <div
      className='w-100 rounded-pill overflow-hidden position-relative'
      style={{
        maxWidth: slidermaxlength + "px",
        backgroundColor: bgcol,
        height: sliderwidth + "px",
      }}
      ref={sliderRef}
    >
      {/* slider knob */}
      <div
        className='h-100 position-absolute z-1 rounded-circle'
        style={{
          aspectRatio: "1 / 1",
          backgroundColor: "white",
          border: "4px solid " + maincol,
          left: pos + "px",
          cursor: "grab",
        }}
        onPointerDown={(event) => {
          const targ = event.currentTarget;

          targ.setPointerCapture(event.pointerId);
          targ.dataset.offset = event.clientX - pos;
        }}
        onPointerMove={(event) => {
          const targ = event.currentTarget;
          if (!targ.hasPointerCapture(event.pointerId)) return;

          const newval = stepFromPos(
            event.clientX - Number(targ.dataset.offset),
            slidersteps,
            sliderlength - sliderwidth,
          );

          valChange(newval);
        }}
      ></div>

      {/* bar fill */}
      <div
        className={
          "h-100 position-absolute start-0 " +
          (reversed ? "start-100" : "start-0")
        }
        style={{
          width:
            (reversed
              ? sliderlength - pos - sliderwidth / 2
              : pos + sliderwidth / 2) + "px",
          backgroundColor: maincol,
          transform: reversed ? "translateX(-100%)" : "",
        }}
      ></div>
    </div>
  );
};

export default Slider;
