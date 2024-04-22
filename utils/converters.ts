export const formatDate = (
  dateString: string,
  locale: string,
  timeonly?: boolean
): string => {
  const date = new Date(dateString);
  let formattedDate: string = "";
  if (timeonly) {
    formattedDate = date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    formattedDate = date.toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
  return formattedDate;
};
