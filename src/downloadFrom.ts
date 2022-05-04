import fs from "fs";

import download from "./download";

export default () => {
  fs.readFile("./data.json", "utf8", async (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    const imgs: string[] = await JSON.parse(jsonString);

    imgs?.map(async (img) => {
      await download(img);
    });
  });
};
