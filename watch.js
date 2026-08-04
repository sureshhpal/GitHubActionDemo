const chokidar = require("chokidar");
const { exec } = require("child_process");

console.log("Watching server.js for changes...");

const watcher = chokidar.watch("server.js");

watcher.on("change", () => {

    console.log("server.js changed!");

    exec("git add .", (err) => {
        if (err) return console.log(err);

        exec('git commit -m "server.js updated"', (err) => {
            if (err) {
                console.log("Nothing to commit");
                return;
            }

            exec("git push", (err, stdout, stderr) => {

                if (err) {
                    console.log(stderr);
                    return;
                }

                console.log(stdout);
                console.log("GitHub Updated Successfully");
            });

        });

    });

});