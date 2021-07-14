/*
 * @Descripttion:
 * @Author: cui
 * @Date: 2021-03-05 13:00:45
 * @LastEditors: cui
 * @LastEditTime: 2021-03-05 14:32:38
 */
export default function ({ app, route, store }) {
  const arrCookie = document.cookie.split("; ");
  for (let i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (arr[0] == "email") {
    }
  }
  console.log("cookie", arrCookie);
  console.log("store", store);
}