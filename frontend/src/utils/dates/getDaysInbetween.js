export default function getDaysInbetween(start, end) {
  const startDate = new Date(start);
  let arr;
  for (arr = []; startDate <= end; startDate.setDate(startDate.getDate() + 1)) {
    arr.push(new Date(startDate));
  }
  return arr;
}
