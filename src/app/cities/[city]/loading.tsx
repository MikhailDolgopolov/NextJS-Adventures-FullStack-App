
export default function CityPageLoading() {
  return (
    <div className="p-8 text-center">
      <p className="text-lg font-medium">Загрузка данных города…</p>
      <div className="mt-4 animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full mx-auto" />
    </div>
  );
}
