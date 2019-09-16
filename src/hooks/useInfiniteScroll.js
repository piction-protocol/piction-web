import { useEffect } from 'react';

function handleScroll(element, handler) {
  const scrollPosition = document.documentElement.scrollTop + document.documentElement.offsetHeight;
  const elementBottomPosition = element.offsetTop + element.offsetHeight;

  if (scrollPosition < elementBottomPosition) {
    return;
  }
  handler();
}

function useInfiniteScroll(ref, handler) {
  useEffect(() => {
    const eventListener = () => handleScroll(ref.current, handler);

    document.addEventListener('scroll', eventListener);
    return () => document.removeEventListener('scroll', eventListener);
  }, [ref, handler]);
}

export default useInfiniteScroll;
