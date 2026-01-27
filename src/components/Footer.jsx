import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="py-12 border-t border-gray-200">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <p className="text-gray-600 text-sm">© 2026 Tejas Bhise. All rights reserved.</p>
      </div>
      <div className="flex gap-6">
        <a href="https://github.com/tejasbhise" className="text-gray-600 hover:text-black transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/tejasbhise" className="text-gray-600 hover:text-black transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:tejasbhise1013@gmail.com" className="text-gray-600 hover:text-black transition-colors">
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
