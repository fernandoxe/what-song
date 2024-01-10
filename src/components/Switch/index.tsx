import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface SwitchProps {
  checked: boolean;
  onClick: () => void;
  children: ReactNode;
}

export const Switch = ({checked, onClick, children}: SwitchProps) => {
  return (
    <div
      className="flex items-center gap-1 text-xs select-none"
    >
      <label>
        {children}
      </label>
      <motion.div
        className={`
          w-10 h-6 flex items-center justify-start
          bg-purple-100 rounded-full
          border-2 border-purple-700
          data-[checked=true]:justify-end
        `}
        data-checked={checked}
        transition={{duration: 0.2}}
        animate={checked ? {background: 'rgb(126, 34, 206)'} : {background: 'rgb(243, 232, 255)'}}
        onClick={onClick}
      >
        <motion.div
          layout
          className="w-5 h-5 bg-purple-700 rounded-full"
          transition={{duration: 0.2}}
          initial={{scale: 0.6}}
          animate={checked ? {background: 'rgb(243, 232, 255)', scale: 1} : {background: 'rgb(126, 34, 206)'}}
        ></motion.div>
      </motion.div>
    </div>
  );
};
