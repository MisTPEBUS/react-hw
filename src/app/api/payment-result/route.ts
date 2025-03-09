export async function POST(req: Request) {
  try {
    // 檢查請求的 Content-Type
    const contentType = req.headers.get("content-type");

    let bodyData;
    if (contentType?.includes("application/x-www-form-urlencoded")) {
      // 解析 URL-encoded 表單數據
      const bodyText = await req.text();
      bodyData = new URLSearchParams(bodyText);
    } else if (contentType?.includes("application/json")) {
      // 解析 JSON 數據
      bodyData = await req.json();
    } else {
      return new Response("Unsupported Content-Type", { status: 400 });
    }

    console.log("📢 收到藍新金流回傳:", bodyData); // Debug Log

    // 轉換成 URL Query 參數
    const queryParams = new URLSearchParams(bodyData as any);

    // 在 Vercel 上轉跳到付款結果頁面 (帶上交易資訊)
    return Response.redirect(`/payment-result?${queryParams.toString()}`, 302);
  } catch (error) {
    console.error("❌ 處理付款結果時發生錯誤:", error);
    return new Response("伺服器錯誤", { status: 500 });
  }
}
