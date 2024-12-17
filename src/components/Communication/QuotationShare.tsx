import React, { useState } from 'react';
import { Quotation } from '../../types/pricing';
import { Mail, Share2, WhatsApp } from 'lucide-react';

interface QuotationShareProps {
  quotation: Quotation;
  pdfUrl: string;
}

const QuotationShare: React.FC<QuotationShareProps> = ({ quotation, pdfUrl }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailShare = async () => {
    // Implement email sending logic
    console.log('Sending email with quotation:', { email, pdfUrl });
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello! Here's your quotation for the renovation project. You can view it here: ${pdfUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Share Quotation</h2>

        {/* Email Sharing */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleEmailShare}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send via Email
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <WhatsApp className="w-5 h-5 mr-2" />
              Share via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationShare;