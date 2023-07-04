const PageHeader = ({ header, paragraph }: { header: string; paragraph: string }) => {
  return (
    <header className="space-y-3 mb-8 2xl:space-y-4">
      <h1 className="text-2xl font-semibold text-slate-700 dark:text-gray-200 2xl:text-3xl">
        {header}
      </h1>
      <p className="text-base text-gray-400 dark:text-gray-400 2xl:text-lg">
        {paragraph}
      </p>
    </header>
  );
};

export default PageHeader;
