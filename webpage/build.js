/**
 * Module for "building" the webpage.
 *
 * Although it is currently very simple, there is a need to inject environment variables
 * for certain things, like the webserver / api url, which is different in development vs
 * production environments.
 */
import cpy from "cpy";
import { replaceInFile } from "replace-in-file";

// Determine if we have all the required environment variables
const REQUIRED_ENV_VARS = ["WHEREBY_INTERNS_WEBSERVER_URL"];
const FILES_TO_INCLUDE = ["css", "html", "js"];

async function build() {
  const replacements = {};

  REQUIRED_ENV_VARS.forEach((envVar) => {
    const value = process.env[envVar];

    if (value) {
      replacements[`__${envVar}__`] = value;
    } else {
      console.warn(`WARNING: Missing ${envVar} environment variable.`);
    }
  });

  // Copy the source files to dist
  await cpy(`src/**/*.{${FILES_TO_INCLUDE.join(",")}}`, "dist");

  // Replace the environment variables in the dist files
  Object.entries(replacements).forEach(async ([key, value]) => {
    await replaceInFile({
      files: `dist/**/*.{${FILES_TO_INCLUDE.join(",")}}`,
      from: key,
      to: value,
    });
  });
}

build();
