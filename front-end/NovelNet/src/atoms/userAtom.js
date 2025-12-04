import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    username: "",
    artistName: "",
    avatar: "/default-avatar.png"
  }
});
