import jsdom = require("jsdom");
import fs = require("fs");
import dirs = require("../data-directories");

import type * as p5 from "p5";

/**
 * Asynchronously loads `p5` via CDN and returns its instance.
 */
export const create = async (): Promise<p5> => {
  const html = await fs.promises.readFile(`${dirs.srcData}/load-p5.html`);
  const { window } = new jsdom.JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
  });

  return new Promise<p5>((resolve, reject) => {
    const onLoad = () => resolve(new window.p5(() => {}));
    window.addEventListener("load", onLoad);

    const onError = (event: any) =>
      reject(new Error(event ? event.error || event : "Failed to load p5.js"));
    window.addEventListener("error", onError);
  });
};
