var fs = require("fs");
// import path = require("path");
var xpath = require("xpath");
var xmldom = require("xmldom");

// retrieve bundle version argument
const args = process.argv.slice(2);
if (args.length === 0) {
	console.error("no version specified");
	process.exit(1);
}
const bundleVersion = args[0];
console.debug(`update_bundle_version - bundleVersion: ${bundleVersion}`);

// read file
const fileName = "config.xml";
let rawContent = fs.readFileSync(fileName).toString();
let document = new xmldom.DOMParser().parseFromString(rawContent);
console.debug(`update_bundle_version - file ${fileName} read and parsed`);

let selectWithNamespace = xpath.useNamespaces({ w: "http://www.w3.org/ns/widgets" });
let widgetNode = selectWithNamespace("w:widget", document)[0];

let bundleVersionAttribute = widgetNode.attributes.getNamedItem("ios-CFBundleVersion");
bundleVersionAttribute.value = bundleVersion;
console.debug(`update_bundle_version - attribute ios-CFBundleVersion updated`);

// write file
fs.writeFileSync(fileName, document);
console.debug(`update_bundle_version - file ${fileName} written`);