import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { NAV_ITEMS } from '../content/site';

// Minimal path router for the three existing routes (/, /projects, /resume).
// Uses pushState so browser back/forward work, and real hrefs so links can be
// opened in new tabs and crawled.

const RouterContext = createContext(null);

const pageFromPath = (pathname) => {
  const path = pathname.replace(/\/+$/, '').replace(/^\//, '');
  if (path === 'projects') return 'projects';
  if (path === 'resume') return 'resume';
  return 'home';
};

export const pathFor = (page) => NAV_ITEMS.find((n) => n.page === page)?.path ?? '/';

export function RouterProvider({ children }) {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));

  // Normalise unknown paths to "/" just like the original implementation.
  useEffect(() => {
    const canonical = pathFor(page);
    if (window.location.pathname !== canonical) {
      window.history.replaceState({ page }, '', canonical + window.location.hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback(
    (next, hash = '') => {
      if (next === page) {
        if (hash) window.dispatchEvent(new CustomEvent('app:scrollto', { detail: hash.slice(1) }));
        else window.dispatchEvent(new CustomEvent('app:scrolltop'));
        return;
      }
      window.history.pushState({ page: next }, '', pathFor(next) + hash);
      setPage(next);
    },
    [page]
  );

  return <RouterContext.Provider value={{ page, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

// Anchor that behaves like an SPA link but keeps native semantics
// (middle-click / cmd-click open a new tab).
export function RouteLink({ to, hash = '', children, onClick, ...rest }) {
  const { navigate } = useRouter();
  return (
    <a
      href={pathFor(to) + hash}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onClick?.(e);
        navigate(to, hash);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
