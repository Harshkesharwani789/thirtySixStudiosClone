import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);

  // Use GSAP for animation control
  useGSAP(() => {
    // Animate the index state
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex(Math.round(index)); // Update the index state on every frame
      },
    });

    // Animate canvas fade-in effect
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  });

  useEffect(() => {
    // Adjust canvas size based on device pixel ratio
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = canvasImages[index];

    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;

      // Ensure image is drawn with correct scaling
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [index]); // Redraw image when index changes

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.7}px`,
        height: `${size * 1.7}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
