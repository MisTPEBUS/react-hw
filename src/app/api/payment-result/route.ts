export async function POST(req: Request): Promise<Response> {
  try {
    const contentType = req.headers.get("content-type");

    let bodyData: Record<string, string> = {};

    if (contentType?.includes("application/x-www-form-urlencoded")) {
      // ✅ 解析 URL-encoded 資料
      const bodyText = await req.text();
      bodyData = Object.fromEntries(new URLSearchParams(bodyText));
    } else if (contentType?.includes("application/json")) {
      // ✅ 解析 JSON 資料
      bodyData = await req.json();
    } else {
      return new Response("Unsupported Content-Type", { status: 400 });
    }

    console.log("📢 收到藍新付款結果:", bodyData);

    // ✅ 確保 `MerchantOrderNo` 存在，避免 undefined
    const orderId = bodyData.MerchantOrderNo ?? "unknown";

    // ✅ 轉跳到前端 `/payment-result/:orderId`
    return Response.redirect(
      `https://your-frontend.com/payment-result/${orderId}`,
      302
    );
  } catch (error) {
    console.error("❌ 處理付款結果時發生錯誤:", error);
    return new Response("伺服器錯誤", { status: 500 });
  }
}
