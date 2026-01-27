import React from 'react';

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12">
    {subtitle && <p className="text-indigo-400 font-mono text-xs mb-3 uppercase tracking-[0.3em] font-medium">{subtitle}</p>}
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{children}</h2>
  </div>
);

export default SectionHeading;
