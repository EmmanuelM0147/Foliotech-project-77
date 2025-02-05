import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              {/* Logo from Navigation */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 50 50"
              >
                <polygon points="10,35 20,10 35,20 30,40" fill="#6C63FF" />
                <polygon points="25,20 30,5 40,15 35,35" fill="#4A90E2" />
                <polygon points="10,40 15,25 25,30 20,45" fill="#F06292" />
              </svg>
              <span className="ml-2 text-xl font-bold text-white">FolioTech Institute</span>
            </div>
            <p className="mt-4 text-gray-400">
              Pursuing Excellence, with Passion and Integrity
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Programs', 'Admissions', 'Student Life', 'Research', 'Careers'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Student Portal', 'Library', 'Academic Calendar', 'Support', 'FAQs'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook', url: 'https://web.facebook.com/FolioTechInstitute/' },
                { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/folahan-olumide-a2a93829/' },
                { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/folio_techinstitute/?hl=en' }
              ].map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FolioTech Institute. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
