const chokidar = require("chokidar");
const { exec } = require("child_process");

console.log("Watching server.js for changes...");

const watcher = chokidar.watch("server.js");

watcher.on("change", () => {

    console.log("server.js changed!");

    exec("git add .", (err) => {

        if (err) {
            console.log(err);
            return;
        }

        // Create a fresh timestamp for every change
        const now = new Date();

        const timestamp =
            now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0") + " " +
            String(now.getHours()).padStart(2, "0") + ":" +
            String(now.getMinutes()).padStart(2, "0") + ":" +
            String(now.getSeconds()).padStart(2, "0");

        const commitMessage = `Auto Commit - ${timestamp}`;

        exec(`git commit -m "${commitMessage}"`, (err) => {

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