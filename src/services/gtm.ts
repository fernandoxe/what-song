const logEvent = (event: string, params?: any) => {
  gtag('event', event, params);
};

export const clickLevel = (level: number) => {
  logEvent('click_level', { level });
};

export const selectTrack = (level: number, track: string, selected_track: string, time: number, correct: boolean) => {
  logEvent('select_track', { level, track, selected_track, time, correct });
};

export const showResults = (level: number, total_correct: number, total_time: number) => {
  logEvent('show_results', { level, total_correct, total_time });
};

export const showShare = (can_share: boolean) => {
  logEvent('can_share', { can_share });
};

export const clickShare = (level: number, total_incorrect: number) => {
  logEvent('click_share', { level, total_incorrect });
};

export const clickShowAnswers = (level: number, total_incorrect: number, show: boolean) => {
  logEvent('click_show_answers', { level, total_incorrect, show });
};

export const clickPlayAgain = (level: number, total_correct: number) => {
  logEvent('click_play_again', { level, total_correct });
};
