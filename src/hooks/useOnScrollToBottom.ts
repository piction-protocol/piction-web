import { useEffect } from 'react';

interface UseOnScrollToBottomEventHandler {
  (): void
}

function handleScroll(element: HTMLElement | null, handler: UseOnScrollToBottomEventHandler) {
  if (!element) return;
  const scrollPosition = document.documentElement.scrollTop + document.documentElement.offsetHeight;
  const elementBottomPosition = element.offsetTop + element.offsetHeight;

  if (scrollPosition + 200 < elementBottomPosition) {
    return;
  }
  handler();
}

function useOnScrollToBottom(ref: React.RefObject<HTMLElement>, handler: UseOnScrollToBottomEventHandler) {
  useEffect(() => {
    const eventListener = () => handleScroll(ref.current, handler);
    if (ref.current) {
      document.addEventListener('scroll', eventListener);
    }
    return () => document.removeEventListener('scroll', eventListener);
  }, [ref, handler]);
}

export default useOnScrollToBottom;
