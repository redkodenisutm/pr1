import fs from "fs";
import http from "http";
import path from "path";

export default async (url: string): Promise<void> => {
  const { ext, name } = path.parse(url);

  const dir = "src/images/";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  http.get(url, (res) => {
    res.pipe(fs.createWriteStream(`src/images/${name}.${ext}`));

    console.log("Download complete");
  });
};
