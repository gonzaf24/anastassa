/* eslint-disable jsx-a11y/img-redundant-alt */
'use client';

import { Carousel as CarouselUI } from 'react-responsive-carousel';

import styles from './carousel.module.css';

import { CarouselProps } from '@/app/lib/definitions';

export default function Carousel({ photos }: CarouselProps) {
  if (!photos) {
    return null;
  }

  return (
    <div className="h-full w-full [&_.carousel-root]:h-full [&_.carousel]:h-full [&_.slider-wrapper]:h-full [&_.slider]:h-full [&_.slide]:h-full [&_.slide]:flex [&_.slide]:items-center [&_.slide]:justify-center">
      <CarouselUI
        //autoFocus={true}
        className={styles.Carousel}
        emulateTouch={true}
        infiniteLoop={true}
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button className={styles.NextArrow} title={label} type="button" onClick={onClickHandler}>
              <img alt="Next" src="/right-arrow.svg" />
            </button>
          )
        }
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button className={styles.PrevArrow} title={label} type="button" onClick={onClickHandler}>
              <img alt="Previous" src="/left-arrow.svg" />
            </button>
          )
        }
        showIndicators={photos.length > 1}
        showStatus={false}
        showThumbs={false}
      >
        {photos?.map((image, index) => (
          <div key={index} className="flex items-center justify-center bg-gray-50 h-full w-full">
            <img alt="Detalle prenda" className="h-full w-full object-contain max-h-none" src={image} />
          </div>
        ))}
      </CarouselUI>
    </div>
  );
}
