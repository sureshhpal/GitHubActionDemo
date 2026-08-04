const chokidar = require("chokidar");
const { exec } = require("child_process");

console.log("Watching server.js for changes...");

const watcher = chokidar.watch("server.js");

let timer = null;
let isPushing = false;

watcher.on("change", () => {

    console.log("Change detected...");

    // Cancel previous timer
    clearTimeout(timer);

    // Wait 2 seconds after the last change
    timer = setTimeout(() => {

        if (isPushing) {
            console.log("Push already in progress...");
            return;
        }

        isPushing = true;

        console.log("Starting Git Push...");

        exec("git add .", (err) => {

            if (err) {
                console.log(err);
                isPushing = false;
                return;
            }

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
                    isPushing = false;
                    return;
                }

                exec("git push", (err, stdout, stderr) => {

                    if (err) {
                        console.log(stderr);
                        isPushing = false;
                        return;
                    }

                    console.log(stdout);
                    console.log("GitHub Updated Successfully");

                    isPushing = false;
                });

            });

        });

    }, 2000);

});