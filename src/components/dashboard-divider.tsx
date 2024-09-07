import { FC } from 'react';

interface DashboardDividerProps {
  title: string;
}

const DashboardDivider: FC<DashboardDividerProps> = ({ title }) => {
  return (
    <div className="mx-auto my-12 flex max-w-4xl items-center">
      <div className="flex-grow border-t-2 border-gray-300"></div>
      <h2 className="mx-6 flex-shrink-0 rounded-full bg-primary px-6 py-3 text-base font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 ease-in-out hover:shadow-lg lg:px-8 lg:py-4 lg:text-xl">
        {title}
      </h2>
      <div className="flex-grow border-t-2 border-gray-300"></div>
    </div>
  );
};

export default DashboardDivider;
