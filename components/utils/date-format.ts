export function toDate(date: any | undefined) {
  if (!date) return '';
  const d = date.toDate();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return day + '/' + month + '/' + year;
}

export function toDateTime(date: any | undefined) {
  if (!date) return '';
  const d = date.toDate();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
}
