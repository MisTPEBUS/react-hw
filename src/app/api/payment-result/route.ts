export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const queryParams = new URLSearchParams();

    // 轉換 POST 參數為 URL 查詢字串
    formData.forEach((value, key) => {
      queryParams.append(key, value as string);
    });

    // 重新導向到 /payment-result 並附加 Query 參數
    return Response.redirect(`/payment-result?${queryParams.toString()}`);
  } catch (error) {
    return new Response("伺服器錯誤", { status: 500 });
  }
}
