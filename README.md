# FETCH PLESK TRIAL CODE

Automatically fetch trial code from "https://trialplesk.domainhizmetleri.com/"
This script run by creating headless chrome instance, screenshot the code, and convert it to text via Tesseract.js, then update serial key gists.

If you know more elegant way to fetch the license, please create a pull request.

For updating license script, you can use `update-license.sh`

## Installation

```
npm install
node index.js
```
