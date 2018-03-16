
export const toDate = (dateString) => {
  let date = new Date(Date.parse(dateString));
  return date.toLocaleDateString("en-US");
}