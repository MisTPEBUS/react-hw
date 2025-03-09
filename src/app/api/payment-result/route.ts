export async function POST(req: Request) {
  try {
    const bodyText = await req.text(); // 取得原始 POST 內容
    const queryParams = new URLSearchParams(bodyText); // 轉換為 URL 查詢參數

    console.log("收到藍新金流付款結果:", bodyText); // Debug 紀錄

    // 自動跳轉到 /payment-result 頁面，並帶上交易資訊
    return Response.redirect(`/payment-result?${queryParams.toString()}`, 302);
  } catch (error) {
    console.error("處理付款結果時發生錯誤:", error);
    return new Response("伺服器錯誤", { status: 500 });
  }
}
