import { useEffect, useState } from "react";

export default function useSlider(
  length,
  step = 1,
  autoPlay = true,
  delay = 10000,
  responsive = { mobile: 2, tablet: 4, desktop: 5 }
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visiblecount, setVisiblecount] = useState(1);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 767) {
        setVisiblecount(responsive.mobile);
      } else if (window.innerWidth <= 1024) {
        setVisiblecount(responsive.tablet);
      } else {
        setVisiblecount(responsive.desktop);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [responsive]);

  useEffect(() => {
    if (!autoPlay || length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + step) % length);
    }, delay);
    return () => clearInterval(interval);
  }, [length, delay, step, autoPlay]);

  const nextIndex = () => {
    setCurrentIndex((prev) => (prev + step) % length);
  };

  const prevIndex = () => {
    setCurrentIndex((prev) => (prev - step + length) % length);
  };

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      nextIndex();
    }
    if (touchEndX - touchStartX > 50) {
      prevIndex();
    }
  };

  const goTo = (index) => setCurrentIndex(index);

  return {
    currentIndex,
    nextIndex,
    prevIndex,
    goTo,
    visiblecount,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
