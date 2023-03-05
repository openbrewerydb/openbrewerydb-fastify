import slugify from "slugify";
import { Brewery } from "./types.js";

const slugifyOptions = {
  remove: /[*+~.,()'"!:@/]/g,
  lower: true,
  strict: true,
};

export function generateId(brewery: Brewery, suffix: null | string = null) {
  return slugify(
    `${brewery.name.toLowerCase()}-${brewery.city.toLowerCase()}${
      suffix ? `-${suffix}` : ""
    }`,
    slugifyOptions
  );
}
