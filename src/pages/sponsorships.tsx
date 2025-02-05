import React from 'react';
import { Shield, Award, Trophy, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tiers = [
  {
    name: 'Bronze Partner',
    price: '₦500,000',
    icon: Shield,
    features: [
      'Recognition in annual report',
      'Social media mentions',
      'Invitation to partner events',
      'Scholars Initiative: 6-month introductory course sponsorship for one individual'
    ]
  },
  {
    name: 'Silver Partner',
    price: '₦1,000,000',
    icon: Award,
    features: [
      'All Bronze benefits',
      'Featured in newsletters',
      'Campus recruitment priority',
      'Sponsored content opportunities',
      'Learning Fellowship: 1-year course sponsorship for one individual with access to mentorship'
    ]
  },
  {
    name: 'Gold Partner',
    price: '₦2,000,000',
    icon: Trophy,
    features: [
      'All Silver benefits',
      'Named scholarship program',
      'Industry talk opportunities',
      'Exclusive networking events',
      'Scholars Program: 1-year course sponsorship for two individuals with career networking support'
    ]
  },
  {
    name: 'Platinum Partner',
    price: '₦5,000,000',
    icon: Star,
    features: [
      'All Gold benefits',
      'Innovation lab naming rights',
      'Board membership opportunity',
      'Strategic partnership status',
      'Elite Future Leaders Sponsorship: 2-year course sponsorship for two individuals & 1-year sponsorship for one individual with internship opportunities'
    ]
  }
];

export function Sponsorships() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/partnership-inquiry');
  };

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header role="banner" className="pt-16 pb-8 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl" id="page-title">
              Support Through Sponsorship
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Partner with FolioTech Institute to shape the future of technology education in Nigeria. Your support empowers the next generation of tech leaders.
            </p>
          </div>
        </header>

        <main id="main-content" role="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section aria-labelledby="sponsorship-tiers-title">
            <h2 id="sponsorship-tiers-title" className="sr-only">Sponsorship Tiers</h2>
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
              {tiers.map((tier, index) => {
                const Icon = tier.icon;
                const headingId = `tier-${index}-heading`;
                const listId = `tier-${index}-features`;
                
                return (
                  <div
                    key={tier.name}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col"
                    role="region"
                    aria-labelledby={headingId}
                  >
                    <div className="flex-1">
                      <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-xl" aria-hidden="true">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 id={headingId} className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                        {tier.name}
                      </h3>
                      <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400" aria-label={`Price: ${tier.price}`}>
                        {tier.price}
                      </p>
                      <ul
                        id={listId}
                        className="mt-6 space-y-4"
                        aria-label={`Benefits included in ${tier.name} tier`}
                      >
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0" aria-hidden="true">
                              <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <button
                        onClick={handleContactClick}
                        type="button"
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-describedby={headingId}
                      >
                        <span>Become a {tier.name}</span>
                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            aria-labelledby="custom-partnership-title"
            className="mt-16 bg-blue-50 dark:bg-blue-900/50 rounded-2xl p-8 lg:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2
                id="custom-partnership-title"
                className="text-3xl font-bold text-gray-900 dark:text-white"
              >
                Custom Partnership Opportunities
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Looking for a unique way to support our mission? We'd love to discuss custom partnership opportunities that align with your organization's goals.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Contact our partnership team to discuss custom opportunities"
                >
                  <span>Contact Our Partnership Team</span>
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Sponsorships;