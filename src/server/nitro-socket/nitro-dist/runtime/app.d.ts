import { App as H3App, Router } from "h3";
import { createCall, createFetch as createLocalFetch } from "unenv/runtime/fetch/index";
import { Hookable } from "hookable";
export interface NitroApp {
    h3App: H3App;
    router: Router;
    hooks: Hookable;
    localCall: ReturnType<typeof createCall>;
    localFetch: ReturnType<typeof createLocalFetch>;
}
export declare const nitroApp: NitroApp;
export declare const useNitroApp: () => NitroApp;
