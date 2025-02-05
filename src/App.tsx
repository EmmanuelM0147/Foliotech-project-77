import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Programs } from './components/Programs';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { AdmissionProcess } from './components/AdmissionProcess';
import { NewsAndEvents } from './components/NewsAndEvents';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { AuthProvider } from './components/auth/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import { SignInForm } from './components/auth/SignInForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { ApplicationForm } from './components/application/ApplicationForm';
import { useAuth } from './components/auth/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function AppContent() {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
  const [currentHash, setCurrentHash] = React.useState(window.location.hash || '#home');
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');
  const [showApplicationModal, setShowApplicationModal] = React.useState(false);

  useEffect(() => {
    console.log('App mounted');
    console.log('Current path:', currentPath);
    console.log('Current hash:', currentHash);

    const handleNavigation = () => {
      console.log('Navigation occurred');
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash || '#home');
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const handleApplyClick = () => {
    console.log('Apply clicked, user:', user);
    if (!user) {
      setShowAuthModal(true);
      setAuthMode('signup');
    } else {
      setShowApplicationModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navigation 
        onSignInClick={() => {
          setShowAuthModal(true);
          setAuthMode('signin');
        }}
        onSignUpClick={() => {
          setShowAuthModal(true);
          setAuthMode('signup');
        }}
        user={user}
      />
      <ErrorBoundary>
        <div className="pt-16">
          {currentPath === '/' && (
            <>
              {currentHash === '#about' ? (
                <About />
              ) : (
                <>
                  <Hero onApplyClick={handleApplyClick} />
                  <Programs />
                  <Stats />
                  <Testimonials />
                  <AdmissionProcess onApplyClick={handleApplyClick} />
                  <NewsAndEvents />
                  <Contact />
                </>
              )}
            </>
          )}
        </div>
      </ErrorBoundary>
      <Footer />

      {/* Auth Modals */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                ×
              </button>
            </div>
            {authMode === 'signin' ? (
              <>
                <SignInForm />
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign up
                  </button>
                </p>
              </>
            ) : (
              <>
                <SignUpForm />
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Student Application</h2>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                ×
              </button>
            </div>
            <ApplicationForm />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;