import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <main className="min-h-screen w-full bg-[#050A15] text-slate-50 overflow-x-hidden selection:bg-violet-500/30">
      {children}
    </main>
  );
};

export default PageWrapper;
