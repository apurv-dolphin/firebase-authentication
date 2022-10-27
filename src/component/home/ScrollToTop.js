import React, { useEffect, useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

export default function ScrollToTop() {
  const [topButton, setTopButtton] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setTopButtton(true);
      } else {
        setTopButtton(false);
      }
    });
  });

  return (
    <div>
      {topButton && (
        <>
          <Button
            ref={target}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className="scroll-btn"
            onClick={() => {
              setShow(false);
              scrollUp();
            }}
          >
            <div className="seticon">^</div>
          </Button>
          <Overlay target={target.current} show={show} placement="top">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                scroll to top
              </Tooltip>
            )}
          </Overlay>
        </>
      )}
    </div>
  );
}
