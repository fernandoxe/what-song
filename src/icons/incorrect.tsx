import { motion } from 'framer-motion';

export interface IncorrectProps {
  onAnimationComplete: () => void;
}

export const Incorrect = ({onAnimationComplete}: IncorrectProps) => {
  return (
    <svg width="100%" height="100%" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        stroke="currentColor"
        fill="transparent"
        cx="64"
        cy="64"
        r="60"
        strokeLinecap="round"
        strokeWidth="8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        stroke="currentColor"
        fill="transparent"
        d="m32.378 32.498 63.244 63.005"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2, ease: 'easeIn' }}
      />
      <motion.path
        stroke="currentColor"
        fill="transparent"
        d="m95.622 32.498-63.244 63.005"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.2, ease: 'easeIn' }}
        onAnimationComplete={onAnimationComplete}
      />
    </svg>
  );
};
