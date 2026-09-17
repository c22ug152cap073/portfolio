import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect hover context
      const target = e.target;
      const closest = (sel) => target.closest(sel);

      if (closest('[data-cursor="explore"]') || closest('.project-planet')) {
        setLabel('EXPLORE');
        setIsHovering(true);
      } else if (closest('[data-cursor="tech"]') || closest('.train-carriage') || closest('.skill-chip')) {
        setLabel('TECH');
        setIsHovering(true);
      } else if (closest('[data-cursor="view"]') || closest('.cert-orbit-item')) {
        setLabel('VIEW');
        setIsHovering(true);
      } else if (closest('[data-cursor="journey"]') || closest('.timeline-node-wrap')) {
        setLabel('JOURNEY');
        setIsHovering(true);
      } else if (closest('button') || closest('a') || closest('[role="button"]')) {
        setLabel('');
        setIsHovering(true);
      } else {
        setLabel('');
        setIsHovering(false);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    // Smooth ring follow animation
    const animate = () => {
      if (dotRef.current && ringRef.current) {
        const { x, y } = posRef.current;

        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

        // Lerp ring position
        ringPos.current.x += (x - ringPos.current.x) * 0.12;
        ringPos.current.y += (y - ringPos.current.y) * 0.12;

        const size = isHovering ? 52 : 32;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? 'visible' : ''}`}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'expanded' : ''} ${isVisible ? 'visible' : ''}`}
        aria-hidden="true"
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
};
