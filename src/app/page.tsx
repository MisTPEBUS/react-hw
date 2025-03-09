"use client";
import { useState } from "react";

export default function HomePage() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      productName,
      quantity,
    };

    try {
      const response = await fetch(
        "https://foodiefund.onrender.com/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "訂單建立失敗");
      }

      // 假設後端回傳藍新金流所需的參數
      const { MerchantID, TradeInfo, TradeSha, Version } = data;

      // 建立隱藏表單並提交到藍新金流
      const newebpayUrl = "https://ccore.newebpay.com/MPG/mpg_gateway";
      const form = document.createElement("form");
      form.method = "POST";
      form.action = newebpayUrl;

      const fields = { MerchantID, TradeInfo, TradeSha, Version };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("建立訂單錯誤:", error);
      alert("訂單建立失敗，請重試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">購買商品</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          商品名稱：
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          數量：
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            min="1"
            className="w-full p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "處理中..." : "送出訂單"}
        </button>
      </form>
    </div>
  );
}
