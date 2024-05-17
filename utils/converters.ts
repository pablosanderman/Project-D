import { getLocales } from "expo-localization";

const locales = getLocales();
const deviceLanguage = locales[0].languageTag;
const locale: string = deviceLanguage === "nl-NL" ? deviceLanguage : "en-US";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatWeekday(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatFromTimeToTime(
  dateStringFrom: string,
  dateStringTo: string
): string {
  return `${formatTime(dateStringFrom)} - ${formatTime(dateStringTo)}`;
}

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
      return "1-2";
    case "TWO_TO_FOUR":
      return "2-4";
    case "FOUR_TO_EIGHT":
      return "4-8";
    case "EIGHT_TO_SIXTEEN":
      return "8-16";
    default:
      return "Room size not given";
  }
};
