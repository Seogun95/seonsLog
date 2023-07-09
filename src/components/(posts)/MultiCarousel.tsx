'use client';

import 'react-multi-carousel/lib/styles.css';

import Carousel from 'react-multi-carousel';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 434 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 434, min: 0 },
    items: 1,
  },
};

export default function MultiCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      showDots
      infinite
      centerMode
      autoPlay
      autoPlaySpeed={1000}
      keyBoardControl={true}
      transitionDuration={1500}
      containerClass="carousel-container"
      itemClass="m-2"
    >
      {children}
    </Carousel>
  );
}
