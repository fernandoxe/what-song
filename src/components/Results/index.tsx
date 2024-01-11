import { useEffect, useState } from 'react';
import { formatTime } from '@/services';
import { Switch } from '../Switch';
import { Share } from '@/components/Share';
import { LEVELS } from '@/constants';
import { clickShare, clickShowAnswers, showResults } from '@/services/gtm';

export interface ResultsProps {
  level: number;
  results: {
    track: string,
    answer: string,
    correct: boolean,
    time: number
  }[];
};

export const Results = ({level, results}: ResultsProps) => {
  const [showYourAnswers, setShowYourAnswers] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    showResults(
      level,
      results.filter(result => result.correct).length,
      results.reduce((acc, result) => acc + result.time, 0)
    );
  }, []);

  const handleSwitchClick = () => {
    setShowYourAnswers(!showYourAnswers);
    clickShowAnswers(level, results.filter(result => !result.correct).length, !showYourAnswers);
  };

  const handleShareClick = () => {
    clickShare(level, results.filter(result => !result.correct).length);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold">
          What {process.env.NEXT_PUBLIC_SITE_ARTIST_SHORT_NAME}&apos;s song is it?
        </h2>
        <div>
          <h3 className="font-semibold">Level: {LEVELS[level].name} ({LEVELS[level].difficulty})</h3>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="font-semibold">
            {results.filter(result => result.correct).length} / {results.length} correct
          </div>
          <div className="text-sm">
            Time: {formatTime(results.reduce((acc, result) => acc + result.time, 0))}s
          </div>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <ul className="flex flex-col gap-0.5">
            {results.map((result, index) => (
              <li
                key={index}
                className="w-full h-10 px-4 flex items-center justify-between gap-4 bg-purple-50 leading-none"
              >
                <div className="text-left flex flex-col whitespace-nowrap overflow-hidden">
                  <div className={`italic text-sm ${result.correct ? 'text-green-600' : 'text-red-600'} overflow-hidden text-ellipsis`}>
                    {result.track}
                  </div>
                  {showYourAnswers && !result.correct &&
                    <div className="text-xs overflow-hidden text-ellipsis">
                      My answer: {result.answer}
                    </div>
                  }
                </div>
                <div className="text-xs">
                  {formatTime(result.time)}s
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Share
            results={results}
            showYourAnswers={showYourAnswers}
            level={level}
            onClick={handleShareClick}
          >
            Share
          </Share>
        </div>
        <Switch
          onClick={handleSwitchClick}
          checked={showYourAnswers}
        >
          Show my answers
        </Switch>
      </div>
    </div>
  );
};
