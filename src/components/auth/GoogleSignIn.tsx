import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { AlertCircle } from 'lucide-react';

interface GoogleSignInProps {
  onSuccess: () => void;
}

export function GoogleSignIn({ onSuccess }: GoogleSignInProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err) {
      setError(getGoogleAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          className="h-5 w-5 mr-2"
        />
        {isLoading ? 'Signing in...' : 'Continue with Google'}
      </button>

      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        By continuing with Google, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

function getGoogleAuthErrorMessage(error: any): string {
  const errorCode = error.code;
  switch (errorCode) {
    case 'auth/popup-closed-by-user':
      return 'Sign in was cancelled';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email';
    default:
      return 'Failed to sign in with Google';
  }
}