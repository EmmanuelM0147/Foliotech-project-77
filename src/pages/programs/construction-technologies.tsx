import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hammer, Blocks, Construction, Grid, Box, Paintbrush } from 'lucide-react';

const courses = [
  {
    id: 'const-1',
    title: 'Carpentry',
    description: 'Learn woodworking techniques and furniture construction.',
    icon: Hammer,
    duration: '6 months'
  },
  {
    id: 'const-2',
    title: 'Block-Laying and Concrete Works',
    description: 'Master the fundamentals of construction and concrete work.',
    icon: Blocks,
    duration: '6 months'
  },
  {
    id: 'const-3',
    title: 'Steel Fabrication',
    description: 'Learn metal fabrication and welding techniques.',
    icon: Construction,
    duration: '6 months'
  },
  {
    id: 'const-4',
    title: 'Tiling',
    description: 'Master the art of tile installation and design.',
    icon: Grid,
    duration: '3 months'
  },
  {
    id: 'const-5',
    title: 'Aluminium Works',
    description: 'Learn aluminum fabrication and installation.',
    icon: Box,
    duration: '3 months'
  },
  {
    id: 'const-6',
    title: 'POP (Plaster of Paris) Design',
    description: 'Create decorative ceiling and wall designs.',
    icon: Construction,
    duration: '3 months'
  },
  {
    id: 'const-7',
    title: 'Painting and Decorating',
    description: 'Learn professional painting and finishing techniques.',
    icon: Paintbrush,
    duration: '3 months'
  }
];

export default function ConstructionTechnologies() {
  return (
    <>
      <Helmet>
        <title>Construction Technologies Courses | FolioTech Institute</title>
        <meta name="description" content="Practical training in construction trades, helping students build a solid career in the industry." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Construction Technologies Courses
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Practical training in construction trades, helping students build a solid career in the industry.
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