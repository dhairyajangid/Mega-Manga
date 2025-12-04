import { atom } from "recoil";

const novelsAtom = atom({
  key: "novelsAtom",
  default: [],
});

export default novelsAtom;
