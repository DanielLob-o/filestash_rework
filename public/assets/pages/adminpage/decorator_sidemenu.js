import { createElement, createRender } from "../../lib/skeleton/index.js";
import { toHref } from "../../lib/skeleton/router.js";
import rxjs, { effect, stateMutation } from "../../lib/rx.js";
import { qs } from "../../lib/dom.js";

import { CSS } from "../../helpers/loader.js";

import { get as getRelease } from "./model_release.js";
import { isSaving } from "./model_config.js";
import { isLoading } from "./model_audit.js";

import "../../components/icon.js";

export default function(ctrl) {
    return async function(render) {
        const $page = createElement(`
            <div class="component_page_admin">
                <style>${await CSS(import.meta.url, "decorator_sidemenu.css", "index.css")}</style>
                <div class="component_menu_sidebar no-select">
                    <a class="header" href="">
                        <svg class="arrow_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="m 16,7.16 -4.58,4.59 4.58,4.59 -1.41,1.41 -6,-6 6,-6 z"/>
                        </svg>
                    </a>
                    <h2>Admin console</h2>
                    <ul>
                        <li>
                            <a href="${toHref("/admin/backend")}" data-link>
                                Backend
                            </a>
                        </li>
                        <li>
                            <a href="${toHref("/admin/settings")}" data-link>
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="${toHref("/admin/logs")}" data-link>
                                Logs
                            </a>
                        </li>
                        <li class="version">
                            <a href="${toHref("/admin/about")}" data-link data-bind="version">
                                &nbsp;
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="page_container scroll-y" data-bind="admin"></div>
            </div>
        `);
        render($page);

        // feature: setup the childrens
        ctrl(createRender(qs($page, "[data-bind=\"admin\"]")));

        // feature: display the release version
        effect(getRelease().pipe(
            rxjs.map(({ version }) => version),
            stateMutation(qs($page, "[data-bind=\"version\"]"), "textContent")
        ));
        

        // feature: currently active menu link
        effect(rxjs.of($page.querySelectorAll(".component_menu_sidebar li a")).pipe(
            rxjs.mergeMap(($els) => $els),
            rxjs.filter(($el) => location.pathname.endsWith($el.getAttribute("href"))),
            rxjs.tap(($el) => $el.classList.add("active")),
            rxjs.tap(($el) => $el.removeAttribute("href"))
        ));
    };
}
