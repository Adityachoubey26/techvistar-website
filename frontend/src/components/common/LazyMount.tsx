import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazyMountProps {
  children: ReactNode;
  /** Placeholder height to reserve space before mount */
  minHeight?: string;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers mounting children until the placeholder nears the viewport.
 * Reduces initial JS parse + DOM on long pages without changing layout.
 */
export function LazyMount({
  children,
  minHeight = '320px',
  rootMargin = '250px 0px',
  className,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className} style={!visible ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
}
