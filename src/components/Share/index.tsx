import { ReactNode, useEffect, useRef, useState } from 'react';
import { Share as ShareIcon } from '@/icons/share';
import { motion } from 'framer-motion';
import { formatTime } from '@/services';
import { LEVELS } from '@/constants';
import { showShare } from '@/services/gtm';
import { captureException } from '@sentry/nextjs';

export interface ShareProps {
  children: ReactNode;
  results: {
    track: string,
    answer: string,
    correct: boolean,
    time: number
  }[];
  showYourAnswers: boolean;
  level: number;
  onClick?: () => void;
}

export const Share = ({children, results, showYourAnswers, level, onClick}: ShareProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canShare, setCanShare] = useState<boolean>(false);

  const createImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasProps = {
      width: 1080,
      height: 1920,
      paddingX: 60,
      paddingY: 60,
      backgroundColor: '#f3e8ff',
      textBaseline: 'top',
      fontFamily: '"Open Sans", sans-serif',
      gap: 34,
    };

    const title = {
      text: `What ${process.env.NEXT_PUBLIC_SITE_ARTIST_SHORT_NAME}'s song is it?`,
      size: 46,
      lineHeight: 46,
      textAlign: 'center',
      color: '#3f3b41',
      x: canvasProps.width / 2,
      y: canvasProps.paddingY,
    };

    const subtitle = {
      text: `Level: ${LEVELS[level].name} (${LEVELS[level].difficulty})`,
      size: 43,
      lineHeight: 43,
      textAlign: 'center',
      color: '#3f3b41',
      x: canvasProps.width / 2,
      y: title.y + title.lineHeight + canvasProps.gap,
    };

    const totalCorrect = {
      text: `${results.filter(result => result.correct).length} / ${results.length} correct`,
      size: 40,
      lineHeight: 40,
      textAlign: 'left',
      color: '#3f3b41',
      x: canvasProps.paddingX,
      y: subtitle.y + subtitle.lineHeight + canvasProps.gap,
    };
    
    const totalTime = {
      text: `Time: ${formatTime(results.reduce((acc, result) => acc + result.time, 0))}`,
      size: 32,
      lineHeight: 32,
      textAlign: 'right',
      color: '#3f3b41',
      x: canvasProps.width - canvasProps.paddingX,
      y: totalCorrect.y + (totalCorrect.lineHeight / 2) - (32 / 2),
    };

    const list = {
      gap: 5,
      x: canvasProps.paddingX,
      y: totalCorrect.y + totalCorrect.lineHeight + canvasProps.gap,
    };

    const listBox = {
      gap: 14,
      w: canvasProps.width - canvasProps.paddingX * 2,
      h: 110,
      paddingX: 44,
      color: '#faf5ff',
    };

    const textTrack = {
      size: 40,
      lineHeight: 40,
      textAlign: 'left',
      x: list.x + listBox.paddingX,
    };

    const correctTrack = {
      color: '#16a34a',
    };

    const incorrectTrack = {
      color: '#dc2626',
    };
    
    const answer = {
      size: 32,
      lineHeight: 32,
      textAlign: 'left',
      color: '#3f3b41',
    };

    const itemTime = {
      size: 32,
      lineHeight: 32,
      textAlign: 'right',
      color: '#3f3b41',
      x: canvasProps.width - canvasProps.paddingX - listBox.paddingX,
    };

    const link = {
      text: process.env.NEXT_PUBLIC_SITE_URL || '',
      size: 40,
      lineHeight: 40,
      textAlign: 'center',
      color: '#3f3b41',
      x: canvasProps.width / 2,
      y: list.y + (results.length * listBox.h) + (results.length * list.gap) + canvasProps.gap,
    };

    // canvas props
    canvasProps.height = link.y + link.lineHeight + canvasProps.paddingY;
    ctx.canvas.width = canvasProps.width;
    ctx.canvas.height = canvasProps.height;
    ctx.textBaseline = canvasProps.textBaseline as CanvasTextBaseline;
    
    // draw background
    ctx.fillStyle = canvasProps.backgroundColor;
    ctx.fillRect(0, 0, canvasProps.width, canvasProps.height);

    // draw title
    ctx.font = `bold ${title.size}px ${canvasProps.fontFamily}`;
    ctx.textAlign = title.textAlign as CanvasTextAlign;
    ctx.fillStyle = title.color;
    ctx.fillText(title.text, title.x, title.y);

    // draw subtitle
    ctx.font = `bold ${subtitle.size}px ${canvasProps.fontFamily}`;
    ctx.fillText(subtitle.text, subtitle.x, subtitle.y);

    // draw total correct
    ctx.font = `bold ${totalCorrect.size}px ${canvasProps.fontFamily}`;
    ctx.textAlign = totalCorrect.textAlign as CanvasTextAlign;
    ctx.fillText(totalCorrect.text, totalCorrect.x, totalCorrect.y);

    // draw total time
    ctx.font = `${totalTime.size}px ${canvasProps.fontFamily}`;
    ctx.textAlign = totalTime.textAlign as CanvasTextAlign;
    ctx.fillText(`${totalTime.text}s`, totalTime.x, totalTime.y);
    
    // draw list
    results.forEach((track, index) => {
      // draw box
      ctx.fillStyle = listBox.color;
      ctx.fillRect(list.x, list.y + (list.gap * index) + (listBox.h * index), listBox.w, listBox.h);
      
      // draw track
      ctx.font = `italic ${textTrack.size}px ${canvasProps.fontFamily}`;
      ctx.textAlign = textTrack.textAlign as CanvasTextAlign;
      ctx.fillStyle = track.correct ? correctTrack.color : incorrectTrack.color;
      
      if(showYourAnswers && !track.correct) {
        // draw incorrect track with answer
        // draw track
        ctx.fillText(track.track, textTrack.x, list.y + (list.gap * index) + (listBox.h * index) + listBox.gap);
  
        // draw answer
        ctx.font = `${answer.size}px ${canvasProps.fontFamily}`;
        ctx.fillStyle = answer.color;
        ctx.fillText(`Your answer: ${track.answer}`, textTrack.x, list.y + listBox.gap + (list.gap * index) + (listBox.h * index) + listBox.gap + textTrack.lineHeight);
      } else {
        // draw track without answer
        ctx.fillText(track.track, textTrack.x, list.y + (list.gap * index) + (listBox.h * index) + (listBox.h / 2) - (textTrack.lineHeight / 2));
      }

      ctx.font = `${itemTime.size}px ${canvasProps.fontFamily}`;
      ctx.textAlign = itemTime.textAlign as CanvasTextAlign;
      ctx.fillStyle = itemTime.color;
      ctx.fillText(`${formatTime(track.time)}s`, itemTime.x, list.y + (list.gap * index) + (listBox.h * index) + (listBox.h / 2) - (itemTime.lineHeight / 2));
    });

    ctx.font = `bold ${link.size}px ${canvasProps.fontFamily}`;
    ctx.textAlign = link.textAlign as CanvasTextAlign;
    ctx.fillText(link.text, link.x, link.y);

    // download image
    // const download = document.createElement('a');
    // download.download = 'ts5words.jpg';
    // download.href = canvas.toDataURL('image/jpeg');
    // download.click();
  };

  // share with a title, text, and image
  const share = async () => {
    createImage();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (!blob) return;
      const image = new File([blob], 'results.jpg', {type: 'image/jpeg'});
      const shareData = {
        files: [image],
        // title: process.env.NEXT_PUBLIC_SITE_TITLE || '',
        // text: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '',
        url: process.env.NEXT_PUBLIC_SITE_URL || '',
      };
      try {
        navigator.share(shareData);
      } catch (err: any) {
        // console.error(err);
        captureException(err);
      }
    }, 'image/jpeg', 0.8);
  };

  const handleClick = () => {
    createImage();
    share();
    onClick?.();
  };

  useEffect(() => {
    // createImage();
    setCanShare(!!navigator.canShare);
    showShare(!!navigator.canShare);
  }, []);

  return (
    <>
      {canShare &&
        <>
          <div
            className="flex items-center gap-1 select-none"
          >
            <motion.div
              className="size-8 p-2 bg-purple-600 text-purple-100 rounded-full"
              onTap={handleClick}
              whileTap={{scale: 0.9, backgroundColor: 'rgba(168, 85, 247)'}}
              transition={{duration: 0.1}}
            >
              <ShareIcon />
            </motion.div>
            <label className="text-xs">
              {children}
            </label>
          </div>
        </>
      }
      <canvas className="hidden" ref={canvasRef} />
    </>
  );
}