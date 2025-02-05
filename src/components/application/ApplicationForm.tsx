import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../auth/AuthContext';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AlertCircle } from 'lucide-react';

const applicationSchema = z.object({
  personalInfo: z.object({
    fullName: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
    email: z.string().email('Invalid email address'),
    phone: z.string()
      .regex(/^\+[1-9]\d{1,14}$/, 'Phone number must be in E.164 format'),
    dateOfBirth: z.string()
      .refine((date) => {
        const age = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        return age >= 16;
      }, 'You must be at least 16 years old'),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
    address: z.string().min(10, 'Please provide a complete address'),
  }),
  academicInfo: z.object({
    course: z.string().min(1, 'Please select a course'),
    education: z.array(z.object({
      institution: z.string().min(2, 'Institution name is required'),
      degree: z.string().min(2, 'Degree/Certificate is required'),
      graduationYear: z.string().regex(/^\d{4}$/, 'Invalid year'),
    })).min(1, 'At least one education entry is required'),
  }),
  documentation: z.object({
    nationalId: z.string().min(1, 'National ID is required'),
    comments: z.string().max(500, 'Comments must not exceed 500 characters').optional(),
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const courses = [
  { id: 'se', name: 'Software Engineering' },
  { id: 'ds', name: 'Data Science' },
  { id: 'ai', name: 'Artificial Intelligence' },
  { id: 'cs', name: 'Cyber Security' },
];

export function ApplicationForm() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      personalInfo: {
        fullName: user?.displayName || '',
        email: user?.email || '',
      },
      academicInfo: {
        education: [{}],
      },
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      setError('');
      await addDoc(collection(db, 'applications'), {
        ...data,
        userId: user?.uid,
        status: 'pending',
        submittedAt: new Date(),
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
        <h3 className="text-lg font-medium">Application Submitted Successfully!</h3>
        <p className="mt-2">We will review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register('personalInfo.fullName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.personalInfo?.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.personalInfo.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('personalInfo.email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.personalInfo?.email && (
              <p className="mt-1 text-sm text-red-600">{errors.personalInfo.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register('personalInfo.phone')}
              placeholder="+234..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.personalInfo?.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.personalInfo.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register('personalInfo.dateOfBirth')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.personalInfo?.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.personalInfo.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register('personalInfo.gender')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
            {errors.personalInfo?.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.personalInfo.gender.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              {...register('personalInfo.address')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.personalInfo?.address && (
              <p className="mt-1 text-sm text-red-600">{errors.personalInfo.address.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Course Selection</label>
          <select
            {...register('academicInfo.course')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.academicInfo?.course && (
            <p className="mt-1 text-sm text-red-600">{errors.academicInfo.course.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education History</label>
          {watch('academicInfo.education')?.map((_, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
              <div>
                <input
                  {...register(`academicInfo.education.${index}.institution`)}
                  placeholder="Institution"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  {...register(`academicInfo.education.${index}.degree`)}
                  placeholder="Degree/Certificate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  {...register(`academicInfo.education.${index}.graduationYear`)}
                  placeholder="Graduation Year"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Documentation</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">National ID</label>
          <input
            type="text"
            {...register('documentation.nationalId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.documentation?.nationalId && (
            <p className="mt-1 text-sm text-red-600">{errors.documentation.nationalId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
          <textarea
            {...register('documentation.comments')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.documentation?.comments && (
            <p className="mt-1 text-sm text-red-600">{errors.documentation.comments.message}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}