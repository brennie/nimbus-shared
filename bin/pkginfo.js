#!/usr/bin/env node
// Extract package info for the Makefile.
// This must be a JS script because it is called before we run `npm ci` to
// install typescript.

const fs = require("fs");

function usage() {
    console.error("usage: pkginfo.ts [name|version|py-version]");
    process.exit(1);
}

if (process.argv.length != 3) {
    usage();
}

const content = fs.readFileSync("package.json", { encoding: "utf-8" });
const json = JSON.parse(content);

switch (process.argv[2]) {
    case "name":
    case "version":
        console.log(json[process.argv[2]]);
        break;

    case "py-version":
        console.log(json.version.replace("-dev", ".dev0"));
        break;

    default:
        usage();
}
