import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Reset scroll position immediately before browser paint
    // This ensures the scroll happens synchronously with route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also reset scroll on document elements to handle all scroll containers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
