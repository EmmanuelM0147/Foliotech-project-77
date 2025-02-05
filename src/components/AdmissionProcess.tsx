import React from 'react';
import { ClipboardCheck, FileText, Users, Calendar, CheckCircle } from 'lucide-react';
import type { AdmissionStep } from '../types';

interface AdmissionProcessProps {
  onApplyClick: () => void;
}

const steps: AdmissionStep[] = [
  {
    id: 1,
    title: 'Submit Application',
    description: 'Complete the online application form with your personal and academic information.',
    icon: FileText
  },
  {
    id: 2,
    title: 'Document Review',
    description: 'Our admissions team will review your academic records and supporting documents.',
    icon: ClipboardCheck
  },
  {
    id: 3,
    title: 'Interview',
    description: 'Selected candidates will be invited for a personal or virtual interview.',
    icon: Users
  },
  {
    id: 4,
    title: 'Decision & Enrollment',
    description: 'Successful candidates will receive an offer letter and enrollment instructions.',
    icon: CheckCircle
  }
];

export function AdmissionProcess({ onApplyClick }: AdmissionProcessProps) {
  return (
    <section id="admissions" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Admission Process
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Your journey to excellence starts here
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200" />

            {/* Steps */}
            <div className="space-y-16">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 mx-auto md:mx-0 bg-blue-600 rounded-full flex items-center justify-center z-10">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className={`flex-1 mt-4 md:mt-0 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onApplyClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Apply Now
            <Calendar className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}