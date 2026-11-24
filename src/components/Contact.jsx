import React, { useState } from 'react';
import { Mail, Download, Copy, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { StarburstSticker, SmileySticker } from './Stickers';
import { EMAIL, LINKEDIN_URL, BEHANCE_URL, CV_PATH, WHATSAPP_URL, WEB3FORMS_KEY } from '../config';

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function BehanceIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.085 0-6.625-2.825-6.625-6.643 0-4.041 2.766-6.857 6.666-6.857 4.143 0 6.009 3.008 5.766 6.814h-9.576c.071 2.313 1.651 3.936 3.992 3.936 1.764 0 2.809-.785 3.328-1.75h1.55zm-8.898-5.308h6.732c-.085-2.18-1.353-3.692-3.32-3.692-2.128 0-3.256 1.543-3.412 3.692zm-8.828 7.308h-6v-14h6.059c3.082 0 5.441 1.394 5.441 4.417 0 1.637-.88 2.894-2.146 3.55 1.725.688 2.646 2.197 2.646 4.073 0 3.235-2.583 4.96-6 4.96zm-3.529-8.471h3.333c1.684 0 2.696-.803 2.696-2.261 0-1.393-.976-2.19-2.585-2.19h-3.444v4.451zm0 6.393h3.582c1.792 0 3.018-.897 3.018-2.523 0-1.684-1.294-2.529-3.095-2.529h-3.505v5.052z" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.196 8.196 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.17 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32" />
    </svg>
  );
}

export default function Contact() {
  const [cardRef, cardInView] = useInView({ threshold: 0.15 });
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'Mobile app',
    message: '',
    botcheck: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Only render the form card if a valid key is provided
  const hasFormKey = Boolean(
    WEB3FORMS_KEY &&
    WEB3FORMS_KEY.trim() !== '' &&
    WEB3FORMS_KEY !== 'PASTE_KEY_HERE'
  );

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New portfolio message',
          from_name: 'Portfolio Contact Form',
          name: formData.name.trim(),
          email: formData.email.trim(),
          project_type: formData.project_type,
          message: formData.message.trim(),
          botcheck: formData.botcheck ? 'true' : '',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          project_type: 'Mobile app',
          message: '',
          botcheck: false,
        });
      } else {
        setFormStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again or email me directly.');
      }
    } catch (err) {
      setFormStatus('error');
      setErrorMessage('Network error occurred. Please try again or email me directly.');
    }
  };

  return (
    <section
      id="contact"
      className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-[120px] relative overflow-x-clip"
      aria-label="Contact Section"
    >
      {/* Outer Wrapper */}
      <div className={`relative mx-auto pt-6 pb-2 transition-all ${hasFormKey ? 'max-w-5xl xl:max-w-6xl' : 'max-w-4xl'}`}>
        
        {/* Floating Sticker 1: Starburst (Top Right) */}
        <div
          className="absolute -top-4 right-1 sm:-top-5 sm:-right-4 lg:-right-6 z-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          <StarburstSticker />
        </div>

        {/* Floating Sticker 2: Smiley (Top Left) */}
        <div
          className="absolute -top-5 left-1 sm:-top-6 sm:-left-4 lg:-left-6 z-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          <SmileySticker />
        </div>

        {/* Big Yellow Card */}
        <div
          ref={cardRef}
          className={`relative bg-secondary border-3 border-stroke rounded-[28px] shadow-[8px_8px_0_#18181B] hover:shadow-[10px_10px_0_#18181B] hover:-translate-y-1 transition-all duration-300 p-8 sm:p-12 md:p-14 overflow-hidden ${
            cardInView ? 'reveal-heading' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'radial-gradient(rgba(24, 24, 27, 0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div className={hasFormKey ? 'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center text-center lg:text-left' : 'max-w-2xl mx-auto flex flex-col items-center text-center'}>
            
            {/* LEFT COLUMN: Content */}
            <div className={`flex flex-col w-full ${hasFormKey ? 'items-center lg:items-start' : 'items-center'}`}>
              
              {/* 1. Header Pill */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-card-bg text-stroke border-3 border-stroke rounded-full shadow-neo font-bold text-sm sm:text-base mb-6 select-none hover:-rotate-1 transition-transform">
                <span className="text-primary font-black">✦</span>
                <span>Contact</span>
              </div>

              {/* 2. Heading (Syne 800) */}
              <h2 className="font-heading font-extrabold text-stroke text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl tracking-tight mb-4 leading-tight">
                Let's build something great together.
              </h2>

              {/* 3. Subtitle */}
              <p className="font-body text-stroke/85 text-lg sm:text-xl font-medium mb-8">
                Have a project in mind? I'd love to hear about it.
              </p>

              {/* 4. TWO Main Buttons Only (height 52px, nowrap) */}
              <div
                className={`flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full ${
                  hasFormKey ? 'justify-center lg:justify-start' : 'justify-center'
                }`}
              >
                {/* Email me (blue) */}
                <a
                  href={`mailto:${EMAIL}?subject=Project%20inquiry%20from%20your%20portfolio`}
                  className="neo-btn contact-btn bg-primary text-white font-extrabold text-base hover:bg-[#254acc]"
                  aria-label="Email me"
                >
                  <Mail className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                  <span>Email me</span>
                </a>

                {/* WhatsApp (green #25D366, black text) */}
                {WHATSAPP_URL && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn contact-btn bg-[#25D366] text-[#18181B] font-extrabold text-base hover:bg-[#20ba5a]"
                    aria-label="WhatsApp (opens in a new tab)"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              {/* 5. One row of small secondary pills (height 40px, white, 3px border, small hard shadow) */}
              <div
                className={`flex flex-wrap items-center gap-2.5 sm:gap-3 mt-4 w-full ${
                  hasFormKey ? 'justify-center lg:justify-start' : 'justify-center'
                }`}
              >
                {/* LinkedIn ↗ */}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-pill-secondary"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn ↗</span>
                </a>

                {/* Behance ↗ */}
                <a
                  href={BEHANCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-pill-secondary"
                  aria-label="Behance profile (opens in a new tab)"
                >
                  <BehanceIcon className="w-4 h-4" />
                  <span>Behance ↗</span>
                </a>

                {/* Download CV */}
                <a
                  href={CV_PATH}
                  download="Mrwan-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-pill-secondary"
                  aria-label="Download CV as PDF (opens in a new tab)"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </div>

              {/* 6. One small line of text: email with small Copy button & reply note (no pill background, no extra border) */}
              <div
                className={`flex flex-col gap-1 mt-6 w-full ${
                  hasFormKey ? 'items-center lg:items-start' : 'items-center'
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-stroke select-none">
                  <span className="select-all">{EMAIL}</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 bg-card-bg hover:bg-page-bg text-stroke text-xs font-bold border-2 border-stroke rounded-md shadow-[2px_2px_0_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-1 select-none"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981] stroke-[3]" />
                        <span className="text-[#10B981] font-extrabold">Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-stroke/70 font-medium select-none">
                  Usually reply within 24 hours
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: The Form Card (Only rendered when WEB3FORMS_KEY is set and not PASTE_KEY_HERE) */}
            {hasFormKey && (
              <div className="w-full flex justify-center lg:justify-end">
                <div className="contact-form-card w-full max-w-md text-left select-none">
                  <h3 className="font-heading font-extrabold text-stroke text-2xl sm:text-3xl tracking-tight mb-5">
                    Tell me about your project
                  </h3>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Hidden Honeypot */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      checked={formData.botcheck}
                      onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                      className="hidden"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* 1. Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-stroke mb-1.5 font-heading">
                        Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                        }}
                        placeholder="Your name"
                        aria-required="true"
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                        className={`contact-form-input ${formErrors.name ? 'has-error' : ''}`}
                      />
                      {formErrors.name && (
                        <p id="contact-name-error" className="text-xs text-red-600 font-bold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-stroke mb-1.5 font-heading">
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        placeholder="Your email address"
                        aria-required="true"
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                        className={`contact-form-input ${formErrors.email ? 'has-error' : ''}`}
                      />
                      {formErrors.email && (
                        <p id="contact-email-error" className="text-xs text-red-600 font-bold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* 3. Project-type Select */}
                    <div>
                      <label htmlFor="contact-project-type" className="block text-xs font-bold uppercase tracking-wider text-stroke mb-1.5 font-heading">
                        Project Type
                      </label>
                      <div className="relative">
                        <select
                          id="contact-project-type"
                          name="project_type"
                          value={formData.project_type}
                          onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                          className="contact-form-input appearance-none cursor-pointer pr-10"
                        >
                          <option value="Mobile app">Mobile app</option>
                          <option value="Website">Website</option>
                          <option value="Design system">Design system</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stroke">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* 4. What do you need? Textarea */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-stroke mb-1.5 font-heading">
                        What do you need?
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                        }}
                        placeholder="Tell me about your goals, timeline, and scope..."
                        rows={4}
                        aria-required="true"
                        aria-invalid={Boolean(formErrors.message)}
                        aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                        className={`contact-form-textarea ${formErrors.message ? 'has-error' : ''}`}
                      />
                      {formErrors.message && (
                        <p id="contact-message-error" className="text-xs text-red-600 font-bold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Status Alerts (aria-live) */}
                    <div aria-live="polite">
                      {formStatus === 'error' && (
                        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-red-900 text-xs font-bold flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                            <span>{errorMessage || 'Something went wrong.'}</span>
                          </div>
                          <a
                            href={`mailto:${EMAIL}?subject=Project%20inquiry%20from%20your%20portfolio`}
                            className="text-primary underline hover:text-blue-800 ml-5 font-extrabold"
                          >
                            Email me instead ↗
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className={`w-full h-[48px] font-extrabold text-base rounded-xl border-3 border-stroke transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none ${
                        formStatus === 'success'
                          ? 'bg-[#FFD200] text-stroke shadow-[4px_4px_0_#18181B]'
                          : 'bg-primary text-white shadow-[4px_4px_0_#18181B] hover:shadow-[5px_5px_0_#18181B] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                      }`}
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : formStatus === 'success' ? (
                        <>
                          <Check className="w-5 h-5 stroke-[3]" />
                          <span>Message sent ✓</span>
                        </>
                      ) : (
                        <span>Send message 🚀</span>
                      )}
                    </button>

                    {/* Note under button */}
                    <p className="text-xs text-stroke/70 text-center mt-3 font-medium select-none">
                      Your details are only used to reply to you.
                    </p>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
