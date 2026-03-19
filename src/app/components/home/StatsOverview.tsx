import { TrendingUp } from "lucide-react";

interface StatsProps {
  totalScans: number;
  safeProducts: number;
  unsafeProducts: number;
  safePercentage: number;
}

export function StatsOverview({
  totalScans,
  safeProducts,
  unsafeProducts,
  safePercentage,
}: StatsProps) {
  if (totalScans === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-900" /> Dit overblik
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{totalScans}</div>
          <div className="text-sm text-gray-500 mt-1">Scannede</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-900">{safeProducts}</div>
          <div className="text-sm text-blue-900 mt-1">Sikre</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-rose-600">
            {unsafeProducts}
          </div>
          <div className="text-sm text-rose-700 mt-1">Usikre</div>
        </div>
      </div>

      {safePercentage > 0 && (
        <div className="mt-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Sikkerhedsrate</span>
            <span className="text-sm font-semibold text-blue-900">
              {safePercentage}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${safePercentage}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
