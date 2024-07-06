export default function DashboardHeader() {
  return (
    <div className="dashboard-header max-h-1/3 my-6 overflow-hidden rounded-xl bg-cover bg-no-repeat lg:w-3/4">
      <div className="dashboard-background bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
        <div className="flex h-full items-center justify-center">
          <div className="px-2 text-center text-white md:px-12 lg:px-6">
            <h1 className="mb-12 mt-12 text-3xl font-bold lg:text-5xl">Herzlich Willkommen in Westerloy</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
