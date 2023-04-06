import React, {useRef} from "react";
import gsap from "gsap";
import "./styles/style.css";

const App = () => {

  function HoverButton({ children }) {
    const elRef = useRef(null);
    const hoverRef = useRef(false);

    const calculatePosition = () => {
      gsap.set(elRef.current, {
        x: 0,
        y: 0,
        scale: 1,
      });

      const box = elRef.current.getBoundingClientRect();
      const x = box.left + box.width * 0.5;
      const y = box.top + box.height * 0.5;
      const width = box.width;
      const height = box.height;

      return { x, y, width, height };
    };


    const onMouseMove = (e) => {
      const hoverArea = hoverRef.current ? 0.7 : 0.5;
      const { x: elX, y: elY, width} = calculatePosition();
      const x = e.clientX - elX;
      const y = e.clientY - elY;
      const distance = Math.sqrt(x * x + y * y);

      if (distance < width * hoverArea) {
        hoverRef.current = true;
        if (!hoverRef.current) {
          hoverRef.current = true;
        }
        onHover(e.clientX, e.clientY);
      }
      else if (hoverRef.current) {
        onLeave();
        hoverRef.current = false;
      }
    };


    const onHover = (x, y) => {
      const { x: elX, y: elY } = calculatePosition();
      gsap.to(elRef.current, {
        x: (x - elX) * 0.4,
        y: (y - elY) * 0.4,
        scale: 1.15,
        ease: "power2.out",
        duration: 0.4,
      });

      elRef.current.style.zIndex = 10;
    };


    const onLeave = () => {
      gsap.to(elRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "elastic.out(1.2, 0.4)",
        duration: 0.7,
      });

      elRef.current.style.zIndex = 1;
    };

    return (
        <button ref={elRef} onMouseMove={onMouseMove}>
          {children}
        </button>
    );
  }


  return (
    <div className="App">
      <ul>
        <li>
          <HoverButton>🦊</HoverButton>
        </li>
        <li>
          <HoverButton>🐶</HoverButton>
        </li>
        <li>
          <HoverButton>🦄</HoverButton>
        </li>
      </ul>
    </div>
  );
}

export default App;