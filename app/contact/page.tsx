'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Send, User, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';

export default function Contact() {
  const [showMascot, setShowMascot] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowMascot(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter a message');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <PixelButton 
          onClick={() => router.push('/')}
          variant="secondary"
          className="p-2"
        >
          <ArrowLeft size={20} />
        </PixelButton>
        
        <h1 className="text-4xl font-bold text-slate-800 pixel-font">
          Get In Touch
        </h1>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-800 pixel-font mb-4">
                Let's build something amazing together! 🚀
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Whether you have a project idea, want to collaborate, or just 
                want to say hello, I'd love to hear from you. Drop me a message 
                and I'll get back to you as soon as possible!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200"
              >
                <div className="p-2 bg-blue-400 text-white rounded">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Email</h3>
                  <p className="text-slate-600">matteo.gisler05@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200"
              >
                <div className="p-2 bg-green-400 text-white rounded">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Response Time</h3>
                  <p className="text-slate-600">Usually within 24 hours</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 pixel-font">Find me elsewhere:</h3>
              <div className="flex gap-4">
                {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded border-2 border-slate-300 hover:bg-slate-300 transition-colors pixel-font text-sm"
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-bold text-slate-800 mb-2 pixel-font">
                  <User size={16} className="inline mr-2" />
                  Your Name
                </label>
                <motion.input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full p-4 border-2 rounded-lg transition-all duration-300 ${
                    focusedField === 'name' 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-slate-300 bg-white'
                  }`}
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
                {focusedField === 'name' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex gap-1"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-bold text-slate-800 mb-2 pixel-font">
                  <Mail size={16} className="inline mr-2" />
                  Your Email
                </label>
                <motion.input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full p-4 border-2 rounded-lg transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-slate-300 bg-white'
                  }`}
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
                {focusedField === 'email' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex gap-1"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-bold text-slate-800 mb-2 pixel-font">
                  <MessageCircle size={16} className="inline mr-2" />
                  Your Message
                </label>
                <motion.textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.02 }}
                  rows={5}
                  className={`w-full p-4 border-2 rounded-lg transition-all duration-300 resize-none ${
                    focusedField === 'message' 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-slate-300 bg-white'
                  }`}
                  placeholder="Tell me about your project or just say hello!"
                  required
                  disabled={isSubmitting}
                />
                {focusedField === 'message' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex gap-1"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <PixelButton
                  className={`w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  onClick={() => {
                    if (isSubmitting) return; // Prevent click when submitting
                    const form = document.querySelector('form');
                    if (form) {
                      const event = new Event('submit', { bubbles: true, cancelable: true });
                      form.dispatchEvent(event);
                    }
                  }}
                >
                  <motion.div
                    animate={isSubmitting ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.div>
                </PixelButton>
              </motion.div>
            </form>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-green-100 border-2 border-green-300 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <div>
                    <p className="text-green-800 font-bold pixel-font">
                      Message sent successfully! 🎉
                    </p>
                    <p className="text-green-600 text-sm">
                      I'll get back to you soon!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-red-100 border-2 border-red-300 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-600" size={24} />
                  <div>
                    <p className="text-red-800 font-bold pixel-font">
                      Oops! Something went wrong
                    </p>
                    <p className="text-red-600 text-sm">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mascot */}
      {showMascot && (
        <Mascot
          pose="speak"
          position="side"
          message="Send me a message—let's catch up soon!"
        />
      )}
    </div>
  );
}