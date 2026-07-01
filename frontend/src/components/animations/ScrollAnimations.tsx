import React from 'react';
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimationProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  viewportOnce?: boolean;
}

// 1. Blur Reveal: Entry with low blur to sharp focus
export const BlurReveal = ({
  children,
  duration = 0.6,
  delay = 0,
  className = '',
  viewportOnce = true,
  ...props
}: AnimationProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: viewportOnce, margin: '-20px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 2. Scale In: Entry scaling up from 0.96 to 1
export const ScaleIn = ({
  children,
  duration = 0.5,
  delay = 0,
  className = '',
  viewportOnce = true,
  ...props
}: AnimationProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: viewportOnce, margin: '-25px' }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 3. Stagger Container: Multi-child stagger orchestrator
interface StaggerContainerProps extends AnimationProps {
  staggerChildren?: number;
  delayChildren?: number;
}

export const StaggerContainer = ({
  children,
  staggerChildren = 0.08,
  delayChildren = 0,
  className = '',
  viewportOnce = true,
  ...props
}: StaggerContainerProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: '-30px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 4. Stagger Item: Individual elements inside Stagger Container animating up
export const StaggerItem = ({
  children,
  className = '',
  ...props
}: Omit<AnimationProps, 'duration' | 'delay'>) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
