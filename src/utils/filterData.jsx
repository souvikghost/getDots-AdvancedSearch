import { svgPacket } from "../../svgPacket";

export const filterData = {
  all: {
    id: "all",
    name: "All",
    value: "all",
    isSelected: true,
    isHighlighted: true,
    count: 0,
    icon: "",
  },
  files: {
    id: "files",
    name: "Files",
    value: "files",
    isSelected: true,
    isHighlighted: false,
    count: 0,
    icon: svgPacket["attachFileIcon"],
  },
  people: {
    id: "people",
    name: "People",
    value: "people",
    isSelected: true,
    isHighlighted: false,
    count: 0,
    icon: svgPacket["peopleIcon"],
  },
  chats: {
    id: "chats",
    name: "Chats",
    value: "chats",
    isSelected: false,
    isHighlighted: false,
    count: 0,
    icon: svgPacket["messageIcon"],
  },
  lists: {
    id: "lists",
    name: "Lists",
    value: "lists",
    isSelected: false,
    isHighlighted: false,
    count: 0,
    icon: svgPacket["listIcon"],
  },
};
