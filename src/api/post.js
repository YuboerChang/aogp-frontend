import { post } from "@/api/api";
import { toFormatDateString } from "@/util/util";

export async function queryDaysPrice(queryDate) {
  // 查询特定日期的黄金价格
  let daysPrice = 0,
    today = new Date();
  if (queryDate < today) {
    await post(
      "/api/queryDaysPrice",
      {
        date: toFormatDateString(queryDate),
      },
      {}
    ).then((res) => {
      daysPrice = res.price;
    });
  }
  return daysPrice;
}
