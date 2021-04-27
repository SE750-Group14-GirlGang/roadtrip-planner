export default function getDaysInbetween(start, end) {
    let startDate = new Date(start);
    for (
        var arr = [];
        startDate <= end;
        startDate.setDate(startDate.getDate() + 1)
    ) {
        arr.push(new Date(startDate));
    }
    return arr;
}
