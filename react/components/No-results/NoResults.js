import React from "react";
import { useCssHandles } from "vtex.css-handles";
import "./index.css";

const CSS_HANDLES = ["containerNoResults", "noResult"];

const NoResults = () => {
  const { handles } = useCssHandles(CSS_HANDLES);
  return (
    <div className={handles.containerNoResults}>
      <div className={handles.noResult} />
    </div>
  );
};

export default NoResults;
