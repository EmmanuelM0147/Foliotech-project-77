import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Monitor, Network, Globe, File as Mobile, LampDesk as Desktop, Radio, Bone as Drone, Cpu, Notebook as Robot, BookOpen } from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

const courses = [
  {
    id: 'comp-1',
    title: 'Computer Appreciation',
    description: 'Master the fundamentals of computing and essential software applications.',
    icon: Monitor,
    duration: '3 months'
  },
  {
    id: 'comp-2',
    title: 'Computer Graphics',
    description: 'Learn digital design principles and industry-standard graphic design tools.',
    icon: BookOpen,
    duration: '6 months'
  },
  {
    id: 'comp-3',
    title: 'Networking',
    description: 'Understand computer networks, protocols, and network security fundamentals.',
    icon: Network,
    duration: '6 months'
  },
  {
    id: 'comp-4',
    title: 'Web Development',
    description: 'Build modern, responsive websites using latest web technologies.',
    icon: Globe,
    duration: '6 months'
  },
  {
    id: 'comp-5',
    title: 'Mobile App Development',
    description: 'Create native and cross-platform mobile applications.',
    icon: Mobile,
    duration: '6 months'
  },
  {
    id: 'comp-6',
    title: 'Desktop Application Development',
    description: 'Develop powerful desktop applications using modern frameworks.',
    icon: Desktop,
    duration: '6 months'
  },
  {
    id: 'comp-7',
    title: 'Radio/Router Configuration',
    description: 'Configure and manage network infrastructure equipment.',
    icon: Radio,
    duration: '3 months'
  },
  {
    id: 'comp-8',
    title: 'Drone Technology',
    description: 'Learn drone operations, maintenance, and programming.',
    icon: Drone,
    duration: '3 months'
  },
  {
    id: 'comp-9',
    title: 'Remote Control Systems',
    description: 'Design and implement remote control and automation systems.',
    icon: Cpu,
    duration: '3 months'
  },
  {
    id: 'comp-10',
    title: 'Artificial Intelligence',
    description: 'Explore AI concepts, machine learning, and practical applications.',
    icon: Robot,
    duration: '6 months'
  }
];

export default function ComputerTechnology() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load courses'));
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading courses..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <>
      <Helmet>
        <title>Computer Technology Courses | FolioTech Institute</title>
        <meta name="description" content="Cutting-edge courses in computing, networking, and AI to prepare students for careers in the tech industry." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Computer Technology Courses
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Cutting-edge courses in computing, networking, and AI to prepare students for careers in the tech industry.
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