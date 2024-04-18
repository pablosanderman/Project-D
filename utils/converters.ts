export const formatDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};
