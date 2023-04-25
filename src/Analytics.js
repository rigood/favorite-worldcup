import { useEffect } from "react";
import ReactGA from "react-ga";

const Analytics = () => {
  const pathName = window.location.pathname;
  const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;

  useEffect(() => {
    ReactGA.initialize(gaTrackingId);
    ReactGA.set({ page: pathName });
    ReactGA.pageview(pathName);
  }, [pathName, gaTrackingId]);
  return <></>;
};

export default Analytics;
