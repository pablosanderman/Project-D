import { getLocales } from "expo-localization";

type choice = "timeonly" | "date" | "datetime" | "weekday";
const locales = getLocales();
const deviceLanguage = locales[0].languageTag;
export const formatDate = (
  dateString: string,
  custom: choice,
  locale: string = deviceLanguage === "nl-NL" ? deviceLanguage : "en-US"
): string => {
  const date = new Date(dateString);
  let formattedDate: string = "";
  if (custom === "timeonly") {
    formattedDate = date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
    });
  } else if (custom === "datetime") {
    formattedDate = date.toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else if (custom === "date") {
    formattedDate = date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (custom === "weekday") {
    formattedDate = date.toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }
  return formattedDate;
};
