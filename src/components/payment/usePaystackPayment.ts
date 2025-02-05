import { useCallback } from 'react';
import { PaystackPop } from '@paystack/inline-js';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../auth/AuthContext';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxx';

interface PaystackConfig {
  email: string;
  amount: number;
  name: string;
  phone: string;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
}

export function usePaystackPayment() {
  const { user } = useAuth();

  const handleSuccess = async (response: any) => {
    try {
      // Store transaction details in Firestore
      await addDoc(collection(db, 'transactions'), {
        userId: user?.uid,
        reference: response.reference,
        amount: response.amount / 100, // Convert back from kobo
        status: 'success',
        metadata: response.metadata,
        createdAt: new Date(),
      });

      // Clear stored payment details
      sessionStorage.removeItem('paymentDetails');

      // Redirect to success page or show success message
      // You can implement this based on your needs
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  };

  const handleClose = () => {
    console.log('Payment modal closed');
  };

  return useCallback((config: PaystackConfig) => {
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: config.email,
      amount: config.amount,
      currency: 'NGN',
      ref: `FTI_${Math.floor(Math.random() * 1000000000)}`,
      firstname: config.name.split(' ')[0],
      lastname: config.name.split(' ').slice(1).join(' '),
      phone: config.phone,
      metadata: config.metadata,
      callback: handleSuccess,
      onClose: handleClose,
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
    });

    handler.openIframe();
  }, [user]);
}