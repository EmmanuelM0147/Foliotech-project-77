import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, AlertCircle } from 'lucide-react';
import { auth } from '../../lib/firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';

const phoneSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +234...)'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

interface PhoneSignInProps {
  onSuccess: () => void;
}

export function PhoneSignIn({ onSuccess }: PhoneSignInProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        },
      });
    }
  };

  const handlePhoneSubmit = async (data: PhoneFormData) => {
    try {
      setError('');
      setIsSubmitting(true);
      setupRecaptcha();
      
      const confirmation = await signInWithPhoneNumber(
        auth,
        data.phone,
        window.recaptchaVerifier
      );
      
      setVerificationId(confirmation);
      setStep('otp');
    } catch (err) {
      setError(getPhoneAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPSubmit = async (data: OTPFormData) => {
    if (!verificationId) {
      setError('Verification session expired. Please try again.');
      return;
    }

    try {
      setError('');
      setIsSubmitting(true);
      await verificationId.confirm(data.otp);
      onSuccess();
    } catch (err) {
      setError(getPhoneAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <input
                {...phoneForm.register('phone')}
                type="tel"
                id="phone"
                placeholder="+234..."
                className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {phoneForm.formState.errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {phoneForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div id="recaptcha-container"></div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? 'Sending Code...' : 'Send Verification Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Verification Code
            </label>
            <input
              {...otpForm.register('otp')}
              type="text"
              id="otp"
              maxLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {otpForm.formState.errors.otp && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {otpForm.formState.errors.otp.message}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function getPhoneAuthErrorMessage(error: any): string {
  const errorCode = error.code;
  switch (errorCode) {
    case 'auth/invalid-phone-number':
      return 'Invalid phone number format';
    case 'auth/code-expired':
      return 'Verification code has expired';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    case 'auth/quota-exceeded':
      return 'SMS quota exceeded. Please try again later';
    default:
      return 'An error occurred. Please try again';
  }
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}