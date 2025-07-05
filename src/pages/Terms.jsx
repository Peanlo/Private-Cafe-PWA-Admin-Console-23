import React from 'react';
import { motion } from 'framer-motion';
import { useBusiness } from '../contexts/BusinessContext';

const Terms = () => {
  const { businessInfo } = useBusiness();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <p className="text-amber-800 font-medium">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-amber-700 mt-2">
              These Terms of Service govern your use of {businessInfo.name} services and applications.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using our services, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              {businessInfo.name} provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Online menu and information services</li>
              <li>Contact and communication services</li>
              <li>Progressive Web Application functionality</li>
              <li>Customer support and inquiries</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              Users are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Providing accurate and complete information</li>
              <li>Maintaining the security of their account credentials</li>
              <li>Using the service in compliance with applicable laws</li>
              <li>Respecting the intellectual property rights of others</li>
              <li>Not engaging in harmful, illegal, or disruptive activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use our service:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700">
              The service and its original content, features, and functionality are and will remain the exclusive 
              property of {businessInfo.company} and its licensors. The service is protected by copyright, 
              trademark, and other laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy Policy</h2>
            <p className="text-gray-700">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
              your information when you use our service. By using our service, you agree to the collection 
              and use of information in accordance with our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability</h2>
            <p className="text-gray-700">
              We strive to provide continuous service availability but cannot guarantee uninterrupted access. 
              We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              In no event shall {businessInfo.company}, nor its directors, employees, partners, agents, 
              suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
              or punitive damages arising out of your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer</h2>
            <p className="text-gray-700">
              The information on this service is provided on an "as is" basis. To the fullest extent permitted 
              by law, this company excludes all representations, warranties, conditions, and terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
              {businessInfo.company} operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, 
              we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
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
              <strong>Private Access Notice:</strong> This application is designed for private/internal use only. 
              Access is restricted and not intended for general public use.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;