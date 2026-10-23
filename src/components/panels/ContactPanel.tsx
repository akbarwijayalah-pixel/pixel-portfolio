'use client';

import React, { useState } from 'react';
import { Mail, GitFork, Link as LinkIcon, Camera, Copy, Check, ExternalLink } from 'lucide-react';
import { contacts } from '@/data/contacts';

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const emailContact = contacts.find((c) => c.id === 'email');

  const handleCopyEmail = async () => {
    if (!emailContact) return;
    try {
      await navigator.clipboard.writeText(emailContact.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.open(emailContact.href);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const email = emailContact?.value || 'akbarwijayalah@gmail.com';
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const getContactIcon = (id: string) => {
    switch (id) {
      case 'email':
        return <Mail size={22} className="text-red-400" />;
      case 'github':
        return <GitFork size={22} className="text-purple-400" />;
      case 'linkedin':
        return <LinkIcon size={22} className="text-blue-400" />;
      case 'instagram':
        return <Camera size={22} className="text-pink-400" />;
      default:
        return <Mail size={22} />;
    }
  };

  return (
    <div className="contact-panel">
      {/* Contact Hub Theme Header */}
      <div className="contact-header">
        <div className="pokemon-center-badge">
          <span className="pokeball-icon">📡</span>
          <span>CONTACT HUB — CONNECT WITH AKBAR</span>
        </div>
        <h3>Get In Touch with Akbar</h3>
        <p className="contact-subtitle">
          Ready to connect! Feel free to reach out for internship opportunities (PKL),
          collaborations, or inquiries.
        </p>
      </div>

      {/* 4 Interactive Contact Cards */}
      <div className="contact-links-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className={`contact-card contact-card-${contact.id}`}>
            <div className="contact-card-header">
              <div className="contact-card-icon">{getContactIcon(contact.id)}</div>
              <span className="contact-platform">{contact.platform}</span>
            </div>

            <div className="contact-card-info">
              <span className="contact-label">{contact.label}</span>
              <a
                href={contact.href}
                target={contact.isExternal ? '_blank' : undefined}
                rel={contact.isExternal ? 'noopener noreferrer' : undefined}
                className="contact-value contact-link"
                title={`Open ${contact.platform}`}
              >
                <span>{contact.displayValue}</span>
                {contact.isExternal && <ExternalLink size={13} className="inline-icon" />}
              </a>
            </div>

            <div className="contact-card-actions">
              {contact.id === 'email' ? (
                <button
                  type="button"
                  className={`copy-btn ${copied ? 'copy-success' : ''}`}
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} /> <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> <span>Copy</span>
                    </>
                  )}
                </button>
              ) : (
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-btn"
                  title={`Visit ${contact.platform}`}
                >
                  Visit <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Direct Message Form */}
      <div className="contact-form-section">
        <div className="form-title-bar">
          <Mail size={16} />
          <h4>Send a Direct Message</h4>
        </div>
        <p className="form-note">
          Your email application will open with your message addressed directly to{' '}
          <strong>akbarwijayalah@gmail.com</strong>.
        </p>
        <form className="contact-form" onSubmit={handleFormSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe / Recruiter"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Your Email</label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Hi Akbar, I would like to discuss an internship / collaboration opportunity..."
              rows={4}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            <Mail size={16} /> Open in Email App
          </button>
        </form>
      </div>
    </div>
  );
}
