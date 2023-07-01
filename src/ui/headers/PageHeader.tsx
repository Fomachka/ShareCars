const PageHeader = ({ header, paragraph }: { header: string; paragraph: string }) => {
  return (
    <header className="space-y-3 mb-8">
      <h1 className="text-2xl font-semibold text-slate-700 dark:text-gray-200 xl:text-3xl">
        {header}
      </h1>
      <p className="text-base  text-gray-400 dark:text-gray-400 xl:text-lg">
        {paragraph}
      </p>
    </header>
  );
};

export default PageHeader;
