// Set log level of cordova-console-plugin to DEBUG
// v1.0
//
// The cordova-console-plugin uses a hard-coded 
// log level of WARN. This means, you see only
// messages of types LOG, ERROR and WARN.
// With this hook, the log level is set to DEBUG.
//
// For using the hook, add the following lines
// to your config.xml:
// <hook type="after_platform_add" src="hooks/fix_console_log_level.js" />
// <hook type="after_prepare" src="hooks/fix_console_log_level.js" />
//
// Additionally, you have to add these devDependencies to your package.json:
// "fs": "0.0.1-security",
// "path": "0.12.7",
//
// Supported platforms:
// - ios
// 
// For Android, the hook is not needed, since the 
// plugin is not used on this platform.
//  
// You can change the log level also programmatically with
// cordova.logger.level(cordova.logger.DEBUG);
// (but not before device-ready event).

module.exports = function (ctx) {
	var fs = require('fs');
	var path = require('path');

	// fix the log level in the given file
	function setLogLevel(loggerPath) {
		var data = fs.readFileSync(loggerPath, 'utf8');

		var toReplace = "CurrentLevel = LevelsMap.WARN;";
		var replaceWith = "CurrentLevel = LevelsMap.DEBUG;";
		if (data.indexOf(toReplace) >= 0) {
			var result = data.replace(new RegExp(toReplace, "g"), replaceWith);

			fs.writeFileSync(loggerPath, result, 'utf8')
			process.stdout.write('log level set to DEBUG in file ' + loggerPath + '\n');
		}
	}

	var rootdir = ctx.opts.projectRoot;
	if (rootdir) {

		// go through each of the platform directories that have been prepared
		var platforms = ctx.opts.platforms;
		for (var x = 0; x < platforms.length; x++) {
			try {
				var platform = platforms[x].trim().toLowerCase();
				var loggerPath;

				if (platform === 'ios') {
					// cordova-plugin-console (cordova-ios < 4.5.0)
					loggerPath = path.join('platforms', platform, 'www', 'plugins', 'cordova-plugin-console', 'www', 'logger.js');
					if (loggerPath && fs.existsSync(loggerPath)) {
						setLogLevel(loggerPath, platform);
					}

					// cordova-ios >= 4.5.0
					loggerPath = path.join('platforms', platform, 'CordovaLib', 'cordova.js');
					if (loggerPath && fs.existsSync(loggerPath)) {
						setLogLevel(loggerPath, platform);
					}
				}


			} catch (e) {
				process.stdout.write(e);
			}
		}
	}
}
