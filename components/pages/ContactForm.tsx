'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contatti');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    oggetto: '',
    messaggio: '',
    privacy: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission - in production connect to API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '48px 0' }}>
        <p style={{ fontSize: '28px', fontWeight: 500, color: '#000', marginBottom: '12px' }}>
          {locale === 'it' ? 'Grazie.' : 'Thank you.'}
        </p>
        <p style={{ fontSize: '15px', color: '#888888' }}>
          {locale === 'it'
            ? 'Il tuo messaggio è stato inviato. Ti risponderemo presto.'
            : 'Your message has been sent. We will reply soon.'}
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #000',
    padding: '12px 0',
    fontSize: '16px',
    color: '#000',
    outline: 'none',
    transition: 'border-bottom-width 150ms ease',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#888888',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {[
        { name: 'nome', label: t('nome'), type: 'text', required: true },
        { name: 'email', label: t('email'), type: 'email', required: true },
        { name: 'telefono', label: t('telefono'), type: 'tel', required: false },
        { name: 'oggetto', label: t('oggetto'), type: 'text', required: true },
      ].map(field => (
        <div key={field.name}>
          <label style={labelStyle}>{field.label}</label>
          <input
            type={field.type}
            required={field.required}
            value={formData[field.name as keyof typeof formData] as string}
            onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderBottomWidth = '2px'; }}
            onBlur={(e) => { e.currentTarget.style.borderBottomWidth = '1px'; }}
          />
        </div>
      ))}

      <div>
        <label style={labelStyle}>{t('messaggio')}</label>
        <textarea
          required
          rows={6}
          value={formData.messaggio}
          onChange={e => setFormData(prev => ({ ...prev, messaggio: e.target.value }))}
          style={{ ...inputStyle, resize: 'none' }}
          onFocus={(e) => { e.currentTarget.style.borderBottomWidth = '2px'; }}
          onBlur={(e) => { e.currentTarget.style.borderBottomWidth = '1px'; }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <input
          type="checkbox"
          id="privacy"
          required
          checked={formData.privacy}
          onChange={e => setFormData(prev => ({ ...prev, privacy: e.target.checked }))}
          style={{ marginTop: '4px', accentColor: '#000' }}
        />
        <label htmlFor="privacy" style={{ fontSize: '13px', color: '#888888', lineHeight: 1.5 }}>
          {t('privacy')}{' '}
          <a
            href={`/${locale}/privacy`}
            style={{ color: '#000', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        style={{
          border: '1px solid #000',
          background: '#fff',
          color: '#000',
          fontSize: '14px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          padding: '16px 32px',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          transition: 'background 150ms ease, color 150ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#000';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#fff';
          e.currentTarget.style.color = '#000';
        }}
      >
        {t('invia')}
      </button>
    </form>
  );
}
