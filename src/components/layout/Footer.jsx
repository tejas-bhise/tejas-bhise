import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS, EMAIL_HREF } from '../../content/site';
import { RouteLink } from '../../lib/router';
import { scrollToTop, useLenis } from '../../lib/smoothScroll';
import Icon from '../ui/Icon';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lenis = useLenis();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-paper-50">
      <div className="shell pt-16 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Identity + contact */}
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{SITE_NAME}</p>
            <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink-500">Python Backend Engineer &amp; AI Developer</p>
            <a
              href={EMAIL_HREF}
              className="group mt-6 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[15px] font-medium text-ink transition-colors hover:border-signal hover:text-signal-600"
            >
              {EMAIL_HREF.replace('mailto:', '')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label mb-5 text-ink-400" aria-hidden="true">
              Pages
            </p>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.page}>
                  <RouteLink
                    to={item.page}
                    className="font-display text-xl font-medium tracking-[-0.015em] text-ink-500 transition-colors hover:text-ink"
                  >
                    {item.name}
                  </RouteLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label mb-5 text-ink-400" aria-hidden="true">
              Elsewhere
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="icon-btn"
                >
                  <Icon name={social.id} className="h-[18px] w-[18px]" />
                </a>
              ))}
              <button type="button" onClick={() => scrollToTop(lenis, false)} className="btn-ghost btn-sm ml-auto" aria-label="Back to top">
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                Top
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ink/10 py-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${currentYear} ${SITE_NAME}. All rights reserved.`}</p>
          <p className="label text-ink-400">Pune, India</p>
        </div>
      </div>

      {/* Full wordmark — sized to always fit the width, fully visible */}
      <div aria-hidden="true" data-inv-ignore className="pointer-events-none select-none">
        <p className="shell whitespace-nowrap pb-6 pt-2 text-center font-display text-[clamp(3rem,14.2vw,13rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink/[0.07]">
          {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
