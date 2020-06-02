const $ = require("cheerio");
const puppeteer = require("puppeteer");
require("dotenv").config();
const createWorker = require("tesseract.js").createWorker;
const worker = createWorker();
const url = process.env.URL;
const Gists = require("gists");
const gist = new Gists({
  username: process.env.GIT_USERNAME,
  password: process.env.GIT_PASSWORD,
});
const gistID = process.env.GIST_ID;

const generateImage = async () => {
  const chrome = await puppeteer.launch();
  const page = await chrome.newPage();
  console.log("Go to : " + url);
  await page.goto(url);
  console.log("Capturing webpage");
  await page.waitFor(5000);
  await page.waitForSelector("#kod");
  const element = await page.$("#kod");

  await element.screenshot({ path: "ss.jpg" });
  await chrome.close();
};
const readImage = async () => {
  const img = "./ss.jpg";
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(img);
  await worker.terminate();
  return text;
};

const editGist = async (license) => {
  console.log("editing gists");
  await gist.edit(gistID, {
    files: {
      host: {
        content: license,
      },
    },
  });
};

(async function main() {
  try {
    await generateImage();
    const license = await readImage();
    console.log(license);
    await editGist(license);
  } catch (ex) {
    console.log(ex);
  }
})();
