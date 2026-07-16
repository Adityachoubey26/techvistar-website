import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type HeroScrollIndicatorProps = {
  onScrollNext: () => void;
  className?: string;
};

export function HeroScrollIndicator({ onScrollNext, className }: HeroScrollIndicatorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      onClick={onScrollNext}
      className={cn(
        'hero-scroll-indicator group hidden items-center gap-3 text-xs font-semibold tracking-wider text-zinc-400',
        'cursor-pointer select-none md:flex',
        'rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
        className,
      )}
      aria-label="Scroll to next section"
    >
      <span className="transition-colors group-hover:text-zinc-200">Explore TechVistar</span>
      <motion.span
        className="relative flex h-10 w-6 items-center justify-center rounded-full border-2 border-zinc-500/60 bg-zinc-950/40 shadow-[0_0_16px_rgba(16,185,129,0.18)] backdrop-blur-sm transition-[border-color,box-shadow] group-hover:border-emerald-400/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.28)]"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -4, 0],
              }
        }
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 0.6,
        }}
      >
        <motion.span
          className="absolute top-2 h-1.5 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 12, 0],
                  opacity: [1, 0.55, 1],
                }
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.span>
    </motion.button>
  );
}
