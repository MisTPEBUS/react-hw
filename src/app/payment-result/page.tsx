"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function PaymentResult() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PaymentResultContent />
    </Suspense>
  );
}

// ✅ 交易結果內容組件
function PaymentResultContent() {
  const searchParams = useSearchParams();
  const queryParams = Array.from(searchParams.entries());

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center text-green-600">
        付款結果
      </h1>

      {queryParams.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">交易資訊：</h2>
          <ul className="mt-2 list-none p-0 bg-gray-100 p-4 rounded-lg">
            {queryParams.map(([key, value]) => (
              <li key={key} className="mb-2 text-gray-700">
                <span className="font-bold">{key}</span>: {value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          <p>⚠️ 無法取得交易資訊</p>
          <p className="text-sm">請確認付款是否成功，或聯繫客服。</p>
        </div>
      )}
    </div>
  );
}

// ✅ 讀取中的 Loading UI
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      <p className="ml-2 text-gray-600">載入中...</p>
    </div>
  );
}
