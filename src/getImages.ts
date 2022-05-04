import fs from "fs";

export default async (data: string): Promise<any> => {
  let imgs: String[] = [];
  const reg = /src=("|')(https?)?(.\S*)\.(jpe?g|png|gif){1}("|')+/g;
  const allMatches = data.match(reg);

  if (allMatches) {
    for (let match of allMatches) {
      if (match) {
        const sliced = match.substring(5, match.length - 1);
        let url = "";

        if (!match.includes("http")) {
          url = "http://me.utm.md/" + sliced;
        } else {
          url = sliced;
        }

        imgs.push(url);
      }
    }
  }

  fs.writeFile("data.json", JSON.stringify(imgs), "utf8", (err) => {
    err && console.log(err);
  });
};
