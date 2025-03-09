export async function POST(req: Request) {
  try {
    const bodyText = await req.text(); // 取得原始 body 內容
    const queryParams = new URLSearchParams(bodyText); // 轉換成 URL Query 格式

    console.log("接收到的付款結果:", bodyText); // 確保我們拿到了藍新回傳的數據

    // 重新導向到 /payment-result，並附加查詢參數
    return Response.redirect(`/payment-result?${queryParams.toString()}`, 302);
  } catch (error) {
    console.error("處理付款結果時發生錯誤:", error);
    return new Response("伺服器錯誤", { status: 500 });
  }
}
