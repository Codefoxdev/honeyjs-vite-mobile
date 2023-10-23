import type { Plugin } from "vite";

declare interface Options {
  /**
   * The url to use for the inspector page
   * @default "__mobile"
   */
  url: string;

  /**
   * Different logging levels:
   * - false: No logging at all
   * - true: Logs the mobile inspector url at start of server
   * - "verbose": Logs client events; connect, disconnect, errors, etc.
   * @default true
   */
  logging: true | false | "verbose";

  /**
   * Whether or not to inject the inspector script into the main module, if it doesn't work, try importing it manually,
   * add this to your main entry file (usually app.js(x) or index.js(x)):
   * ```js
   * import "@honeyjs/vite-mobile/client";
   * ```
   * or if you don't want to transfer this to the build
   * ```js
   * //@inspector "vite-mobile"
   * ```
   * @default true
   */
  shouldInject: boolean;

  /**
   * The name of the main module, same as the src property of main script tag in the index.html
   * ```html
   * <script type="module" src="./app.jsx"></script>
   * ```
   * Defaults to app.js or app.jsx, and tries to guess it based on index.html content, see scriptRegex and srcRegex for more info
   * @default "app.js(x)"
   */
  mainModule: string;

  /**
   * The resolved id of the main module file
   */
  resolvedUrl: string;

  regex: {
    /**
     * The regex code to use when searching for the main module entry in index.html
     *
     * @default /<script[\s\S]*?>[\s\S]*?<\/script>/gi
     */
    script: RegExp | string;

    /**
     * The regex code to use for determining the src of a script tag
     *
     * @default /<script.{1,}?src="([a-z\.\/@]*)"/i
     */

    src: RegExp | string;
    /**
     * The regex code to use when searching for queries, used to search for an `@inspector` query
     *
     * @default /\/\/\s*@([a-z]*?)\s*(".*?")/i
     */
    query: RegExp | string;
  };
}

export default function (options: Options | undefined): Plugin;
