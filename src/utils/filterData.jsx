import { svgPacket } from "../../svgPacket";

export const filterData = {
  files: {
    id: "files",
    name: "Files",
    value: "files",
    isSelected: false,
    count: 0,
    icon: svgPacket["attachFileIcon"],
  },
  people: {
    id: "people",
    name: "People",
    value: "people",
    isSelected: false,
    count: 0,
    icon: svgPacket["peopleIcon"],
  },
  chats: {
    id: "chats",
    name: "Chats",
    value: "chats",
    isSelected: false,
    count: 0,
    icon: svgPacket["messageIcon"],
  },
  lists: {
    id: "lists",
    name: "Lists",
    value: "lists",
    isSelected: false,
    count: 0,
    icon: svgPacket["listIcon"],
  },
};
