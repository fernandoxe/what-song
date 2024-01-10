import { Correct } from '@/icons/correct';
import { Modal } from '../Modal';
import { Incorrect } from '@/icons/incorrect';
import { motion } from 'framer-motion';

export interface RoundResultProps {
  correct: boolean;
  track: string;
  onAnimationComplete: () => void;
}

export const RoundResult = ({correct, track, onAnimationComplete}: RoundResultProps) => {
  return (
    <Modal>
      <div className={`flex flex-col items-center gap-8  ${correct ? 'text-green-600' : 'text-red-600'}`}>
        <div className="w-48">
          {correct &&
            <Correct
              onAnimationComplete={onAnimationComplete}
            />
          }
          {!correct &&
            <div className="flex flex-col gap-4">
              <Incorrect
                onAnimationComplete={onAnimationComplete}
              />
            </div>
          }
        </div>
        {!correct &&
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{opacity: 0, translateY: 20}}
            animate={{opacity: 1, translateY: 0}}
            transition={{delay: 0.4, duration: 0.2}}
          >
            <div>
              Correct answer:
            </div>
            <div className="text-lg text-center font-semibold">
              {track}
            </div>
          </motion.div>
        }
      </div>
    </Modal>
  );
};
