import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const Analytics = () => {
  const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
  const [init, setInit] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(gaTrackingId);
      setInit(true);
    }
  }, [gaTrackingId]);

  useEffect(() => {
    if (init) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [init, location]);

  return <></>;
};

export default Analytics;
