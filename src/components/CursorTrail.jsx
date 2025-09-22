'use client';

import { useEffect } from 'react';

const CursorTrail = () => {
  useEffect(() => {
    const createTrail = (e) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 500);
    };

    document.addEventListener('mousemove', createTrail);

    return () => {
      document.removeEventListener('mousemove', createTrail);
    };
  }, []);

  return null;
};

export default CursorTrail;
