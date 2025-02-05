import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Wrench, Flame, Hammer, Zap, BrainCircuit as Circuit, Sofa, PenTool as Tool, Car, Palette } from 'lucide-react';

const courses = [
  {
    id: 'voc-1',
    title: 'Plumbing-Pipe Fitting',
    description: 'Learn professional plumbing techniques and pipe system installation.',
    icon: Wrench,
    duration: '6 months'
  },
  {
    id: 'voc-2',
    title: 'Welding & Fabrications',
    description: 'Master various welding techniques and metal fabrication.',
    icon: Flame,
    duration: '6 months'
  },
  {
    id: 'voc-3',
    title: 'Metal Folding Technology',
    description: 'Learn precision metal folding and forming techniques.',
    icon: Hammer,
    duration: '3 months'
  },
  {
    id: 'voc-4',
    title: 'Electrical Installations & Maintenance',
    description: 'Install and maintain electrical systems safely and efficiently.',
    icon: Zap,
    duration: '6 months'
  },
  {
    id: 'voc-5',
    title: 'Integrated Circuits',
    description: 'Design and build electronic circuits and systems.',
    icon: Circuit,
    duration: '6 months'
  },
  {
    id: 'voc-6',
    title: 'Exotic Furniture',
    description: 'Create unique, high-quality furniture pieces.',
    icon: Sofa,
    duration: '6 months'
  },
  {
    id: 'voc-7',
    title: 'Electronics & Related Equipment Maintenance',
    description: 'Maintain and repair various electronic equipment.',
    icon: Tool,
    duration: '6 months'
  },
  {
    id: 'voc-8',
    title: 'Automobile Maintenance (Mechanical)',
    description: 'Service and repair various types of vehicles.',
    icon: Car,
    duration: '6 months'
  },
  {
    id: 'voc-9',
    title: 'Visual Arts',
    description: 'Develop artistic skills and creative techniques.',
    icon: Palette,
    duration: '3 months'
  }
];

export default function VocationalStudies() {
  return (
    <>
      <Helmet>
        <title>Vocational Studies Courses | FolioTech Institute</title>
        <meta name="description" content="Hands-on training in essential trades, preparing students for real-world careers in various industries." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Vocational Studies Courses
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hands-on training in essential trades, preparing students for real-world careers in various industries.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Duration: {course.duration}
                      </span>
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                        onClick={() => console.log(`Learn more about ${course.title}`)}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              onClick={() => console.log('Register for a course')}
            >
              Register for a Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}