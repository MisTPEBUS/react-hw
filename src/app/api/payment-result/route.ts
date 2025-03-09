export async function POST(req: Request) {
  const formData = await req.formData();
  const queryParams = new URLSearchParams();

  // 轉換 POST Body 參數為 URL Query 格式
  formData.forEach((value, key) => {
    queryParams.append(key, value as string);
  });

  // 重新導向到 /payment-result 頁面 (轉為 GET 方法)
  return Response.redirect(`/payment-result?${queryParams.toString()}`);
}
