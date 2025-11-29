"use client";

import { useEffect } from "react";

export default function PatientPortal() {
  useEffect(() => {
    function getQueryParams() {
      const qs = window.location.href
        .substr(window.location.href.indexOf("?"))
        .split("+")
        .join(" ");

      const params = {};
      const re = /[?&]?([^=]+)=([^&]*)/g;
      let tokens;

      while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }

      return params;
    }

    function buildQueryString(params) {
      const queryParts = [];

      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          queryParts.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        }
      }

      return queryParts.length > 0 ? "&" + queryParts.join("&") : "";
    }

    // Get URL parameters from current page
    const params = getQueryParams();

    // Build full query string for iframe
    const additionalParams = buildQueryString(params);

    // Create iframe dynamically
    const iframeDiv = document.getElementById("wibbi-iframe");

    if (iframeDiv) {
      iframeDiv.innerHTML =
        '<iframe allowFullscreen src="https://patient-portal-v2.wibbi.com/?exitIframe=1' +
        additionalParams +
        '" style="width:100%;height:920px;border:none;"></iframe>';
    }
  }, []);

  return <div id="wibbi-iframe"></div>;
}
