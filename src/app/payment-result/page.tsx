"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function PaymentResult() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <PaymentResultContent />
    </Suspense>
  );
}

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const queryParams = Array.from(searchParams.entries());

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">付款結果</h1>
      <h2 className="mt-4 text-lg font-semibold">交易資訊：</h2>
      <ul className="mt-2 list-none p-0">
        {queryParams.length > 0 ? (
          queryParams.map(([key, value]) => (
            <li key={key} className="mb-2">
              <span className="font-bold">{key}</span>: {value}
            </li>
          ))
        ) : (
          <li className="text-gray-500">無交易資訊</li>
        )}
      </ul>
    </div>
  );
}
