import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => alert("err", err));
  });

  return (
    <div>
      LandingPage
      <button>로그아웃</button>
    </div>
  );
}

export default LandingPage;
