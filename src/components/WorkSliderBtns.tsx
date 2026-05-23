"use client";

import type { ReactElement } from "react";

import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

import { useSwiper } from "swiper/react";

type WorkSliderBtnsProps = {
  containerStyles: string;
  btnStyles: string;
  iconStyles?: string;
  ariaLabelPrev?: string;
  ariaLabelNext?: string;
};

const WorkSliderBtns = ({
  containerStyles,
  btnStyles,
  iconStyles = "text-xl",
  ariaLabelPrev = "Previous project",
  ariaLabelNext = "Next project",
}: WorkSliderBtnsProps): ReactElement => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button
        type="button"
        className={`${btnStyles} focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background`}
        onClick={() => swiper.slidePrev()}
        aria-label={ariaLabelPrev}
      >
        <PiCaretLeftBold className={iconStyles} />
      </button>

      <button
        type="button"
        className={`${btnStyles} focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background`}
        onClick={() => swiper.slideNext()}
        aria-label={ariaLabelNext}
      >
        <PiCaretRightBold className={iconStyles} />
      </button>
    </div>
  );
};

export default WorkSliderBtns;
