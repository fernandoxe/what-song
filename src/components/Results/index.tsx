export interface ResultsProps {
  results: {track: string, correct: boolean}[];
};

export const Results = ({results}: ResultsProps) => {
  return (
    <div className="text-center">
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.track} {result.correct ? '✅' : '❌'}</li>
        ))}
      </ul>
    </div>
  );
};
