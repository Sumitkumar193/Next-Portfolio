import { atom } from "recoil";

const mobileState = atom({
  key: "mobileState",
  default: false,
});

export default mobileState;