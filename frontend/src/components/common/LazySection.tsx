import { Suspense, lazy, type ComponentType } from 'react';
import { LazyMount } from './LazyMount';

type SectionModule<T> = { [K in keyof T]: T[K] };

/**
 * Lazy-load a named export section when it scrolls near the viewport.
 */
export function lazySection<T extends Record<string, ComponentType<unknown>>>(
  factory: () => Promise<T>,
  exportName: keyof T & string,
) {
  const LazyComponent = lazy(() =>
    factory().then((mod) => ({ default: mod[exportName] as ComponentType<unknown> })),
  );

  return function LazySection(props: Record<string, unknown> & { minHeight?: string; rootMargin?: string }) {
    const { minHeight, rootMargin, ...rest } = props;
    return (
      <LazyMount minHeight={minHeight} rootMargin={rootMargin}>
        <Suspense fallback={<div style={{ minHeight: minHeight ?? '320px' }} aria-hidden />}>
          <LazyComponent {...rest} />
        </Suspense>
      </LazyMount>
    );
  };
}
