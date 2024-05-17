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

export const convertRoomType = (type: string): string => {
  switch (type) {
    case "MEETING":
      return "Meeting Room";
    case "FOCUS":
      return "Focus Room";
    case "DESK":
      return "Desk";
    default:
      return "Room type not given";
  }
};

export const convertRoomSize = (size: string): string => {
  switch (size) {
    case "ONE_TO_TWO":
      return "One to two people";
    case "TWO_TO_FOUR":
      return "Two to four people";
    case "FOUR_TO_EIGHT":
      return "Four to eight people";
    case "EIGHT_TO_SIXTEEN":
      return "Eight to sixteen people";
    default:
      return "Room size not given";
  }
};
