import { useResponsive, configResponsive } from "ahooks";

configResponsive({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  ["2xl"]: 1536,
});

export const useIsMobile = () => {
  const responsive = useResponsive();
  return responsive["lg"] === false;
};
