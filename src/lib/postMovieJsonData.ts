import * as fs from "fs/promises";

export default async function readJsonFile() {
  const jsonData = await fs.readFile("data.json", "utf-8");
  const parsedData = JSON.parse(jsonData);

  return parsedData
}
