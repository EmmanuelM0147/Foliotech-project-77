import React, { useState, useEffect, useRef } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { NavItem } from "../types";
import { User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ThemeToggle } from "./ThemeProvider";

const navItems: NavItem[] = [
  { title: "Programs", href: "#programs" },
  { title: "About", href: "#about" },
  { title: "Admissions", href: "#admissions" },
  {
    title: "Support",
    href: "#",
    children: [
      { title: "Sponsorships", href: "/sponsorships" },
      { title: "Give", href: "/give" }
    ]
  },
  { title: "Contact", href: "#contact" },
];

interface NavigationProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
  user: User | null;
}

export function Navigation({ onSignInClick, onSignUpClick, user }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollListenerRef = useRef<number>();

  useEffect(() => {
    try {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      // Use requestAnimationFrame for smooth scroll handling
      const onScroll = () => {
        if (scrollListenerRef.current) {
          cancelAnimationFrame(scrollListenerRef.current);
        }
        scrollListenerRef.current = requestAnimationFrame(handleScroll);
      };

      window.addEventListener("scroll", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
        if (scrollListenerRef.current) {
          cancelAnimationFrame(scrollListenerRef.current);
        }
      };
    } catch (error) {
      console.error('Error setting up scroll listener:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    } catch (error) {
      console.error('Error setting up click outside listener:', error);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only prevent default for hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container-fluid">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 50 50"
              >
                <polygon points="10,35 20,10 35,20 30,40" fill="#6C63FF" />
                <polygon points="25,20 30,5 40,15 35,35" fill="#4A90E2" />
                <polygon points="10,40 15,25 25,30 20,45" fill="#F06292" />
              </svg>
              <span className="ml-2 text-fluid-lg font-bold text-gray-900 dark:text-white">
                FolioTech
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                ref={item.children ? dropdownRef : null}
              >
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                      className="flex items-center text-fluid-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md font-medium"
                      aria-expanded={activeDropdown === item.title}
                      aria-haspopup="true"
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === item.title && (
                      <div
                        className="absolute top-full left-0 w-48 py-2 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            onClick={(e) => handleNavClick(e, child.href)}
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-fluid-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md font-medium"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-fluid-base text-gray-700 dark:text-gray-300">
                  {user.displayName}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
                  aria-label="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onSignInClick}
                  className="text-fluid-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-md font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignUpClick}
                  className="text-fluid-base bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col pt-20 pb-6 px-4">
          <div className="flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                      className="flex items-center justify-between w-full px-4 py-3 text-fluid-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                      aria-expanded={activeDropdown === item.title}
                    >
                      {item.title}
                      <ChevronDown className={`h-5 w-5 transform transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.title && (
                      <div className="pl-6">
                        {item.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.href}
                            onClick={(e) => handleNavClick(e, child.href)}
                            className="block px-4 py-3 text-fluid-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block px-4 py-3 text-fluid-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-auto space-y-4 px-4">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-fluid-base text-gray-700 dark:text-gray-300">
                    {user.displayName}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => {
                    onSignInClick();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 text-fluid-base text-center font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onSignUpClick();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 text-fluid-base text-center font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}