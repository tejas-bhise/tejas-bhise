import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      {/* Minimal gradient accent - top right only */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 via-purple-50 to-transparent opacity-60 blur-3xl" />
    </div>
  );
};

export default AnimatedBackground;
