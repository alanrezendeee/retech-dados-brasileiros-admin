'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  { label: 'Playground', href: '/playground' },
  { label: 'APIs', href: '/#apis' },
  { label: 'Preços', href: '/precos' },
  { label: 'Docs', href: '/painel/docs' },
  { label: 'Status', href: '/status' },
  { label: 'Sobre', href: '/sobre' },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo-retechhub.svg"
            alt="RetechHub"
            width={36}
            height={36}
          />
          <span className="text-white font-bold text-lg tracking-tight">
            Retech<span style={{ color: '#00e676' }}>Hub</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-white px-3 py-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/painel/login"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/painel/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: '#00e676',
              color: '#0a0a0a',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#00c853')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#00e676')
            }
          >
            Começar Grátis
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f0f0f] border-t border-white/[0.06] px-4 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-white/70 hover:text-white py-2 px-3 rounded-md hover:bg-white/[0.06] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <Link
              href="/painel/login"
              className="text-sm text-white/60 py-2 px-3 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/painel/register"
              className="text-sm font-semibold text-center py-2.5 rounded-lg"
              style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
