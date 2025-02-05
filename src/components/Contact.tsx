import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Have questions? We're here to help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Email</p>
                    <a href="mailto:admissions@foliotech.edu" className="text-gray-600 hover:text-blue-600">
                      info@foliotechinstitute.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Phone</p>
                    <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-600">
                      +234-708-861-6350
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Address</p>
                    <p className="text-gray-600">
                      11, Sunmonu Animashaun St,<br />
                      Zina Estate, Addo Rd, Aja, Lagos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}