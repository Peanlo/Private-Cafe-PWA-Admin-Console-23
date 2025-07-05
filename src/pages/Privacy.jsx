import React from 'react';
import { motion } from 'framer-motion';
import { useBusiness } from '../contexts/BusinessContext';

const Privacy = () => {
  const { businessInfo } = useBusiness();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <p className="text-amber-800 font-medium">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-amber-700 mt-2">
              This Privacy Policy describes how {businessInfo.name} collects, uses, and protects your personal information.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Contact preferences and communication history</li>
              <li>Order history and preferences</li>
              <li>Technical information about your device and browser</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and improve our services</li>
              <li>To process orders and handle customer inquiries</li>
              <li>To send promotional materials and updates (with your consent)</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To trusted service providers who assist in operating our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze site usage and improve functionality</li>
              <li>Provide personalized content and advertisements</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can control cookies through your browser settings, but disabling them may affect site functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not intended for children under 13. We do not knowingly collect personal information 
              from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700"><strong>Company:</strong> {businessInfo.company}</p>
              <p className="text-gray-700"><strong>Email:</strong> {businessInfo.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {businessInfo.phone}</p>
              <p className="text-gray-700"><strong>Website:</strong> {businessInfo.website}</p>
            </div>
          </section>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <p className="text-red-800 font-medium">
              <strong>Important Notice:</strong> This application is designed for private/internal use only. 
              It is not indexed by search engines and is not intended for public access.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;