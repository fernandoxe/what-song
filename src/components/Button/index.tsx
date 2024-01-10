import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({children, onClick}: ButtonProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-32 h-16 bg-purple-700 text-purple-100 rounded-full select-none cursor-default"
      onTap={onClick}
      whileTap={{scale: 0.9, backgroundColor: 'rgba(168, 85, 247)'}}
      transition={{duration: 0.1}}
    >
      {children}
    </motion.div>
  );
};
