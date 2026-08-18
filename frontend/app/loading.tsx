export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-500 text-lg mt-6 animate-pulse">Carregando...</p>
      </div>
    </div>
  );
}
