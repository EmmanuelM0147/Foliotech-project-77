import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Briefcase, Building, ArrowRight } from 'lucide-react';
import type { Course } from '../types';

const courses: Course[] = [
  {
    id: '1',
    title: 'Computer Technology',
    description: 'Master modern computer technology practices and principles with hands-on projects.',
    duration: '3 years',
    level: "Advanced Diploma",
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: '2',
    title: 'Vocational Studies',
    description: 'Hands-on training for practical skills, preparing individuals for career-focused industries.',
    duration: '3 years',
    level: "Advanced Diploma",
    image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604'
  },
  {
    id: '3',
    title: 'Construction Technologies',
    description: 'Construction Technologies enhance efficiency and safety in construction through innovative digital solutions.',
    duration: '3 years',
    level: "Advanced Diploma",
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  }
];

const programIcons = {
  'Computer Technology': Code,
  'Vocational Studies': Briefcase,
  'Construction Technologies': Building
};

const getUrlSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-');
};

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Featured Programs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Choose from our industry-aligned programs designed to launch your career
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const Icon = programIcons[course.title as keyof typeof programIcons];
            const programUrl = `/programs/${getUrlSlug(course.title)}`;

            return (
              <div
                key={course.id}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 bg-white dark:bg-gray-900"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={course.image}
                    alt={course.title}
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {course.level}
                    </p>
                    <div className="mt-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Duration: {course.duration}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={programUrl}
                    className="mt-4 w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex items-center justify-center"
                    aria-label={`View ${course.title} program details`}
                  >
                    View Program
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}