import { useMediaQuery } from "@mantine/hooks";

const Screens = () => {
  const isMobile = useMediaQuery("(max-width: 48em)"); // ~768px
  const isTablet = useMediaQuery("(min-width: 48.01em) and (max-width: 64em)"); // ~768px - 1024px
  const isDesktop = useMediaQuery("(min-width: 64.01em)"); // 1024px+

  const isSmallMobile = useMediaQuery("(max-width: 30em)"); // ~480px
  const isLargeDesktop = useMediaQuery("(min-width: 90em)"); // ~1440px+

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};

export default Screens;