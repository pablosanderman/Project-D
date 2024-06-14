import { RoomType } from "@prisma/client";

export function prettyRoomType(roomType: RoomType) {
  if (roomType === "DESK") return "Desk";
  if (roomType === "FOCUS") return "Focus room";
  if (roomType === "MEETING") return "Meeting room";
}
