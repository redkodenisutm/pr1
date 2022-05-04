import net from "net";
import downloadFrom from "./downloadFrom";

import getImages from "./getImages";

export default async (address: string): Promise<void> => {
  const port = 80;
  const socket: net.Socket = new net.Socket();
  let data = "";

  const client = socket.connect(port, address, () => {
    console.log(`Connected to socket ${address}:${port}`);
  });

  client.write(
    `GET / HTTP/1.1\r\nHost: ${address}\r\nContent-Type: text/html; charset=UTF-8\r\nAccept: */*\r\nAccept-Encoding: gzip, deflate, br\r\nConnection: Keep-Alive\r\nReferer: ${address}/\r\n\r\n`
  );

  client.on("data", (res) => {
    data += res;
  });

  client.on("error", (err) => console.error(err));

  client.on("close", async () => {
    console.log("Closing connection");

    await getImages(data);
    await downloadFrom();
  });
};
