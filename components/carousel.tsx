/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";

import { Carousel as CarouselUI } from "react-responsive-carousel";

import styles from "./carousel.module.css";

import { CarouselProps } from "@/app/definitions";

export default function Carousel({ photos }: CarouselProps) {
  if (!photos) {
    return null;
  }

  return (
    <CarouselUI
      //autoFocus={true}
      className={styles.Carousel}
      emulateTouch={true}
      infiniteLoop={true}
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            className={styles.NextArrow}
            title={label}
            type="button"
            onClick={onClickHandler}
          >
            <img alt="Next" src="/right-arrow.svg" />
          </button>
        )
      }
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            className={styles.PrevArrow}
            title={label}
            type="button"
            onClick={onClickHandler}
          >
            <img alt="Previous" src="/left-arrow.svg" />
          </button>
        )
      }
      showIndicators={photos.length > 1}
      showStatus={false}
      showThumbs={false}
    >
      {photos?.map((image, index) => (
        <div key={index}>
          <img
            alt="photo of the place that is being described"
            className="h-[65dvh]  overflow-hidden rounded-t-lg border-none border-opacity-10 object-cover shadow-inner shadow-slate-700 focus-within:outline-none"
            src={image}
          />
        </div>
      ))}
    </CarouselUI>
  );
}
