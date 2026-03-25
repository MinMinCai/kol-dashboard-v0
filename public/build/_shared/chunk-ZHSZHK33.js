import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
var import_react = __toESM(require_react(), 1);

// node_modules/@tabler/icons-react/dist/esm/defaultAttributes.mjs
var defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};

// node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
var createReactComponent = (type, iconName, iconNamePascal, iconNode) => {
  const Component = (0, import_react.forwardRef)(
    ({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }, ref) => (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes[type],
        width: size,
        height: size,
        className: [`tabler-icon`, `tabler-icon-${iconName}`, className].join(" "),
        ...type === "filled" ? {
          fill: color
        } : {
          strokeWidth: stroke,
          stroke: color
        },
        ...rest
      },
      [
        title && (0, import_react.createElement)("title", { key: "svg-title" }, title),
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  Component.displayName = `${iconNamePascal}`;
  return Component;
};

// node_modules/@tabler/icons-react/dist/esm/icons/IconArrowLeft.mjs
var __iconNode = [["path", { "d": "M5 12l14 0", "key": "svg-0" }], ["path", { "d": "M5 12l6 6", "key": "svg-1" }], ["path", { "d": "M5 12l6 -6", "key": "svg-2" }]];
var IconArrowLeft = createReactComponent("outline", "arrow-left", "ArrowLeft", __iconNode);

// node_modules/@tabler/icons-react/dist/esm/icons/IconBulb.mjs
var __iconNode2 = [["path", { "d": "M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7", "key": "svg-0" }], ["path", { "d": "M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3", "key": "svg-1" }], ["path", { "d": "M9.7 17l4.6 0", "key": "svg-2" }]];
var IconBulb = createReactComponent("outline", "bulb", "Bulb", __iconNode2);

// node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs
var __iconNode3 = [["path", { "d": "M5 12l5 5l10 -10", "key": "svg-0" }]];
var IconCheck = createReactComponent("outline", "check", "Check", __iconNode3);

// node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs
var __iconNode4 = [["path", { "d": "M6 9l6 6l6 -6", "key": "svg-0" }]];
var IconChevronDown = createReactComponent("outline", "chevron-down", "ChevronDown", __iconNode4);

// node_modules/@tabler/icons-react/dist/esm/icons/IconClockHour4.mjs
var __iconNode5 = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 12l3 2", "key": "svg-1" }], ["path", { "d": "M12 7v5", "key": "svg-2" }]];
var IconClockHour4 = createReactComponent("outline", "clock-hour-4", "ClockHour4", __iconNode5);

// node_modules/@tabler/icons-react/dist/esm/icons/IconCloudUpload.mjs
var __iconNode6 = [["path", { "d": "M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1", "key": "svg-0" }], ["path", { "d": "M9 15l3 -3l3 3", "key": "svg-1" }], ["path", { "d": "M12 12l0 9", "key": "svg-2" }]];
var IconCloudUpload = createReactComponent("outline", "cloud-upload", "CloudUpload", __iconNode6);

// node_modules/@tabler/icons-react/dist/esm/icons/IconDownload.mjs
var __iconNode7 = [["path", { "d": "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2", "key": "svg-0" }], ["path", { "d": "M7 11l5 5l5 -5", "key": "svg-1" }], ["path", { "d": "M12 4l0 12", "key": "svg-2" }]];
var IconDownload = createReactComponent("outline", "download", "Download", __iconNode7);

// node_modules/@tabler/icons-react/dist/esm/icons/IconEye.mjs
var __iconNode8 = [["path", { "d": "M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0", "key": "svg-0" }], ["path", { "d": "M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6", "key": "svg-1" }]];
var IconEye = createReactComponent("outline", "eye", "Eye", __iconNode8);

// node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs
var __iconNode9 = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", "key": "svg-1" }], ["path", { "d": "M9 17h6", "key": "svg-2" }], ["path", { "d": "M9 13h6", "key": "svg-3" }]];
var IconFileDescription = createReactComponent("outline", "file-description", "FileDescription", __iconNode9);

// node_modules/@tabler/icons-react/dist/esm/icons/IconFileInvoice.mjs
var __iconNode10 = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", "key": "svg-1" }], ["path", { "d": "M9 7l1 0", "key": "svg-2" }], ["path", { "d": "M9 13l6 0", "key": "svg-3" }], ["path", { "d": "M13 17l2 0", "key": "svg-4" }]];
var IconFileInvoice = createReactComponent("outline", "file-invoice", "FileInvoice", __iconNode10);

// node_modules/@tabler/icons-react/dist/esm/icons/IconFileText.mjs
var __iconNode11 = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", "key": "svg-1" }], ["path", { "d": "M9 9l1 0", "key": "svg-2" }], ["path", { "d": "M9 13l6 0", "key": "svg-3" }], ["path", { "d": "M9 17l6 0", "key": "svg-4" }]];
var IconFileText = createReactComponent("outline", "file-text", "FileText", __iconNode11);

// node_modules/@tabler/icons-react/dist/esm/icons/IconFileTypePpt.mjs
var __iconNode12 = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-1" }], ["path", { "d": "M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6", "key": "svg-2" }], ["path", { "d": "M11 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6", "key": "svg-3" }], ["path", { "d": "M16.5 15h3", "key": "svg-4" }], ["path", { "d": "M18 15v6", "key": "svg-5" }], ["path", { "d": "M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4", "key": "svg-6" }]];
var IconFileTypePpt = createReactComponent("outline", "file-type-ppt", "FileTypePpt", __iconNode12);

// node_modules/@tabler/icons-react/dist/esm/icons/IconFile.mjs
var __iconNode13 = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", "key": "svg-1" }]];
var IconFile = createReactComponent("outline", "file", "File", __iconNode13);

// node_modules/@tabler/icons-react/dist/esm/icons/IconPencil.mjs
var __iconNode14 = [["path", { "d": "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4", "key": "svg-0" }], ["path", { "d": "M13.5 6.5l4 4", "key": "svg-1" }]];
var IconPencil = createReactComponent("outline", "pencil", "Pencil", __iconNode14);

// node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs
var __iconNode15 = [["path", { "d": "M12 5l0 14", "key": "svg-0" }], ["path", { "d": "M5 12l14 0", "key": "svg-1" }]];
var IconPlus = createReactComponent("outline", "plus", "Plus", __iconNode15);

// node_modules/@tabler/icons-react/dist/esm/icons/IconReportAnalytics.mjs
var __iconNode16 = [["path", { "d": "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2", "key": "svg-0" }], ["path", { "d": "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2", "key": "svg-1" }], ["path", { "d": "M9 17v-5", "key": "svg-2" }], ["path", { "d": "M12 17v-1", "key": "svg-3" }], ["path", { "d": "M15 17v-3", "key": "svg-4" }]];
var IconReportAnalytics = createReactComponent("outline", "report-analytics", "ReportAnalytics", __iconNode16);

// node_modules/@tabler/icons-react/dist/esm/icons/IconRobot.mjs
var __iconNode17 = [["path", { "d": "M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4", "key": "svg-0" }], ["path", { "d": "M12 2v2", "key": "svg-1" }], ["path", { "d": "M9 12v9", "key": "svg-2" }], ["path", { "d": "M15 12v9", "key": "svg-3" }], ["path", { "d": "M5 16l4 -2", "key": "svg-4" }], ["path", { "d": "M15 14l4 2", "key": "svg-5" }], ["path", { "d": "M9 18h6", "key": "svg-6" }], ["path", { "d": "M10 8v.01", "key": "svg-7" }], ["path", { "d": "M14 8v.01", "key": "svg-8" }]];
var IconRobot = createReactComponent("outline", "robot", "Robot", __iconNode17);

// node_modules/@tabler/icons-react/dist/esm/icons/IconStar.mjs
var __iconNode18 = [["path", { "d": "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245", "key": "svg-0" }]];
var IconStar = createReactComponent("outline", "star", "Star", __iconNode18);

// node_modules/@tabler/icons-react/dist/esm/icons/IconTemplate.mjs
var __iconNode19 = [["path", { "d": "M4 5a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1l0 -2", "key": "svg-0" }], ["path", { "d": "M4 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6", "key": "svg-1" }], ["path", { "d": "M14 12l6 0", "key": "svg-2" }], ["path", { "d": "M14 16l6 0", "key": "svg-3" }], ["path", { "d": "M14 20l6 0", "key": "svg-4" }]];
var IconTemplate = createReactComponent("outline", "template", "Template", __iconNode19);

// node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs
var __iconNode20 = [["path", { "d": "M4 7l16 0", "key": "svg-0" }], ["path", { "d": "M10 11l0 6", "key": "svg-1" }], ["path", { "d": "M14 11l0 6", "key": "svg-2" }], ["path", { "d": "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", "key": "svg-3" }], ["path", { "d": "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", "key": "svg-4" }]];
var IconTrash = createReactComponent("outline", "trash", "Trash", __iconNode20);

// node_modules/@tabler/icons-react/dist/esm/icons/IconUpload.mjs
var __iconNode21 = [["path", { "d": "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2", "key": "svg-0" }], ["path", { "d": "M7 9l5 -5l5 5", "key": "svg-1" }], ["path", { "d": "M12 4l0 12", "key": "svg-2" }]];
var IconUpload = createReactComponent("outline", "upload", "Upload", __iconNode21);

// node_modules/@tabler/icons-react/dist/esm/icons/IconUsers.mjs
var __iconNode22 = [["path", { "d": "M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0", "key": "svg-0" }], ["path", { "d": "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2", "key": "svg-1" }], ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75", "key": "svg-2" }], ["path", { "d": "M21 21v-2a4 4 0 0 0 -3 -3.85", "key": "svg-3" }]];
var IconUsers = createReactComponent("outline", "users", "Users", __iconNode22);

// node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs
var __iconNode23 = [["path", { "d": "M18 6l-12 12", "key": "svg-0" }], ["path", { "d": "M6 6l12 12", "key": "svg-1" }]];
var IconX = createReactComponent("outline", "x", "X", __iconNode23);

export {
  IconArrowLeft,
  IconBulb,
  IconCheck,
  IconChevronDown,
  IconClockHour4,
  IconCloudUpload,
  IconDownload,
  IconEye,
  IconFileDescription,
  IconFileInvoice,
  IconFileText,
  IconFileTypePpt,
  IconFile,
  IconPencil,
  IconPlus,
  IconReportAnalytics,
  IconRobot,
  IconStar,
  IconTemplate,
  IconTrash,
  IconUpload,
  IconUsers,
  IconX
};
/*! Bundled license information:

@tabler/icons-react/dist/esm/defaultAttributes.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/createReactComponent.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconArrowLeft.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconBulb.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconCheck.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconClockHour4.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconCloudUpload.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconDownload.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconEye.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconFileInvoice.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconFileText.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconFileTypePpt.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconFile.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconPencil.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconPlus.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconReportAnalytics.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconRobot.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconStar.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconTemplate.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconTrash.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconUpload.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconUsers.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconX.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/tabler-icons-react.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=/build/_shared/chunk-ZHSZHK33.js.map
