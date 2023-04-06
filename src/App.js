import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import "./styles/style.css";

const App = () => {

  const HoverButton = ({ children }) => {

    const elRef = useRef(null);
    const hoverRef = useRef(false);
    let x, y, width, height;

    const calculatePosition = () => {
      gsap.set(elRef.current, {
        x: 0,
        y: 0,
        scale: 1
      });
      const box = elRef.current.getBoundingClientRect();
      x = box.left + (box.width * 0.5);
      y = box.top + (box.height * 0.5);
      width = box.width;
      height = box.height;
    };


    const onMouseMove = (e) => {
      let hover = false;
      let hoverArea = (hoverRef.current ? 0.7 : 0.5);
      let posX = e.clientX - x;
      let posY = e.clientY - y;
      let distance = Math.sqrt( posX*posX + posY*posY );
      if (distance < (width * hoverArea)) {
        hover = true;
        if (!hoverRef.current) {
          hoverRef.current = true;
        }
        onMouseHover(e.clientX, e.clientY);
      }

      if(!hover && hoverRef.current) {
        onMouseLeave();
        hoverRef.current = false;
      }
    };


    useEffect(() => {
      calculatePosition();
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', calculatePosition);
      };
    }, [calculatePosition, onMouseMove]);



    const onMouseHover = (posX, posY) => {
      gsap.to(elRef.current,  {
        x: (posX - x) * 0.4,
        y: (posY - y) * 0.4,
        scale: 1.15,
        ease: 'power2.out',
        duration: 0.4
      });

      elRef.current.style.zIndex = 10;
    };


    const onMouseLeave = () => {
      gsap.to(elRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        ease: 'elastic.out(1.2, 0.4)',
        duration: 0.7
      });

      elRef.current.style.zIndex = 1;
    };


    return (
        <button ref={elRef}>
          {children}
        </button>
    );
  };



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