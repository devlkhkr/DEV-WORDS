"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
require("../styles/globals.scss");
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
require("@fortawesome/fontawesome-svg-core/styles.css");
fontawesome_svg_core_1.config.autoAddCss = false;
var head_1 = require("next/head");
var Header_1 = require("./components/Header");
var Footer_1 = require("./components/Footer");
var Loading_1 = require("./components/atoms/Loading");
var Login_1 = require("./components/templates/Login");
var styled_components_1 = require("styled-components");
var router_1 = require("next/router");
var react_1 = require("react");
var react_2 = require("react");
var Wrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  background-color: #f3f3f3;\n  overflow: hidden;\n"], ["\n  width: 100%;\n  height: 100%;\n  background-color: #f3f3f3;\n  overflow: hidden;\n"])));
var Wrap = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 720px;\n  min-width: 360px;\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"], ["\n  max-width: 720px;\n  min-width: 360px;\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"])));
var ComponentWrap = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: calc(100% - var(--height-header) - var(--height-footer));\n  padding: 20px;\n  overflow-y: auto;\n  overflow-x: hidden;\n"], ["\n  height: calc(100% - var(--height-header) - var(--height-footer));\n  padding: 20px;\n  overflow-y: auto;\n  overflow-x: hidden;\n"])));
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    var router = router_1.useRouter();
    var _b = react_1.useState(false), loadingStart = _b[0], setLoadingStart = _b[1];
    var _c = react_1.useState(false), isTokenLive = _c[0], setIsTokenLive = _c[1];
    react_2.useEffect(function () {
        var routesLoadStart = function () {
            setLoadingStart(true);
        };
        var routesLoadEnd = function () {
            setLoadingStart(false);
        };
        router.events.on("routeChangeStart", routesLoadStart);
        router.events.on("routeChangeComplete", routesLoadEnd);
        router.events.on("routeChangeError", routesLoadEnd);
        return function () {
            router.events.off("routeChangeStart", routesLoadStart);
            router.events.off("routeChangeComplete", routesLoadEnd);
            router.events.off("routeChangeError", routesLoadEnd);
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Copublish IT Dictionary"),
            React.createElement("meta", { name: "description", content: "Generated by create next app" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" }),
            React.createElement("link", { rel: "icon", href: "/favicon.ico" })),
        loadingStart ? React.createElement(Loading_1["default"], null) : React.createElement(React.Fragment, null),
        !isTokenLive ? React.createElement(Login_1["default"], { setIsTokenLive: setIsTokenLive }) :
            React.createElement(Wrapper, null,
                React.createElement(Wrap, null,
                    React.createElement(Header_1["default"], null),
                    React.createElement(ComponentWrap, { style: router.pathname == "/" ? { overflow: "hidden" } : {} },
                        React.createElement(Component, __assign({}, pageProps))),
                    React.createElement(Footer_1["default"], null)))));
}
exports["default"] = MyApp;
var templateObject_1, templateObject_2, templateObject_3;