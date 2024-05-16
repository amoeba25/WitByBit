import { atom } from "recoil";

export const userTypeState = atom({
  key: "userTypeState",
  default: "",
});

export const currentUserEmailState = atom({
  key: "currentUserEmailState",
  default: "",
});
