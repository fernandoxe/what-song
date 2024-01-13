export interface LoaderProps {
  borderWidth?: string;
};

export const Loader = ({borderWidth = '1px'}: LoaderProps) => {
  return (
    <div
      className={`size-full border-inherit border-l-transparent rounded-full animate-spin`}
      style={{borderWidth}}
    >
    </div>
  );
};
