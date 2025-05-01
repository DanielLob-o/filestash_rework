// Want to integrate organiStash as a SDK in your application? You are in the right place!
//
// How it works you may ask? it's simple:
// 1) pick a component to render. organiStash components look like this:
//    function(render, opts = {}) {
//        // ...
//    }
// 2) similarly to every framework out there, call the framework bootstrap procedure:
//    render(Component, $node, args = {});
//
//
// /***********************************************/
// /* example to render the 3D viewer application */
// /***********************************************/
// import { render } from "https://demo.organiStash.app/assets/index.js";
// import * as Component from "https://demo.organiStash.app/assets/pages/viewerpage/application_3d.js";
//
// render(Component, document.getElementById("app"), {});
//
//
//
import { createRender } from "./lib/skeleton/index.js";
import { loadCSS } from "./helpers/loader.js";

export function render(module, $app, opts = {}) {
    assertArgs(module, $app);
    execute(module, $app, opts);
}

function assertArgs(module, $app) {
    if (typeof module.default !== "function") throw new TypeError("Unsupported module - see documentation on how to use organiStash");
    else if (!($app instanceof Node)) throw new TypeError("Invalid node - see documentation on how to use organiStash");
}

function execute(module, $app, opts) {
    const priors = [
        import("./boot/ctrl_boot_frontoffice.js"),
        loadCSS(import.meta.url, "./css/designsystem.css"),
    ];
    if (typeof module.init === "function") priors.push(module.init($app));

    return Promise.all(priors)
        .then(async() => await module.default(createRender($app), opts))
        .catch((err) => console.error(err));
}
