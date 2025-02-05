import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/LoadingSpinner';
import App from '../App';

// Lazy-loaded components with proper error handling
const Programs = lazy(() => import('../pages/programs').catch(() => ({ default: () => <div>Failed to load Programs</div> })));
const ProgramDetail = lazy(() => import('../pages/programs/[id]').catch(() => ({ default: () => <div>Failed to load Program Detail</div> })));
const CourseDetail = lazy(() => import('../pages/programs/[programId]/courses/[courseId]').catch(() => ({ default: () => <div>Failed to load Course Detail</div> })));
const Sponsorships = lazy(() => import('../pages/sponsorships').catch(() => ({ default: () => <div>Failed to load Sponsorships</div> })));
const PartnershipInquiry = lazy(() => import('../pages/partnership-inquiry').catch(() => ({ default: () => <div>Failed to load Partnership Inquiry</div> })));
const Give = lazy(() => import('../pages/give').catch(() => ({ default: () => <div>Failed to load Give page</div> })));
const ComputerTechnology = lazy(() => import('../pages/programs/computer-technology').catch(() => ({ default: () => <div>Failed to load Computer Technology</div> })));
const VocationalStudies = lazy(() => import('../pages/programs/vocational-studies').catch(() => ({ default: () => <div>Failed to load Vocational Studies</div> })));
const ConstructionTechnologies = lazy(() => import('../pages/programs/construction-technologies').catch(() => ({ default: () => <div>Failed to load Construction Technologies</div> })));

// Wrap Suspense component with proper fallback
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/programs',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <Programs />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/programs/computer-technology',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <ComputerTechnology />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/programs/vocational-studies',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <VocationalStudies />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/programs/construction-technologies',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <ConstructionTechnologies />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/programs/:id',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <ProgramDetail />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/programs/:programId/courses/:courseId',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <CourseDetail />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/sponsorships',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <Sponsorships />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/partnership-inquiry',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <PartnershipInquiry />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/give',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <Give />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}