import { useEffect } from 'react';

function handleScroll(element, handler) {
  const scrollPosition = document.documentElement.scrollTop + document.documentElement.offsetHeight;
  const elementBottomPosition = element.offsetTop + element.offsetHeight;

  if (scrollPosition + 200 < elementBottomPosition) {
    return;
  }
  handler();
}

function useOnScrollToBottom(ref, handler) {
  useEffect(() => {
    const eventListener = () => handleScroll(ref.current, handler);
    if (ref.current) {
      document.addEventListener('scroll', eventListener);
    }
    return () => document.removeEventListener('scroll', eventListener);
  }, [ref, handler]);
}

export default useOnScrollToBottom;
