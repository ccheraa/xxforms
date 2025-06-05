"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.xxform = exports.xform = exports.xslt = exports.transform = exports.transformXml = void 0;
var bun_1 = require("bun");
var path_1 = require("path");
var fs_1 = require("fs");
function transformXml(xml, xsl) {
    return __awaiter(this, void 0, Promise, function () {
        var out, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    while (fs_1.existsSync(out = path_1.resolve('assets/tmp', path_1.basename(xml) + "_" + path_1.basename(xsl) + "_" + bun_1.randomUUIDv7() + ".xml"))) { }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("Transforming " + xml + " with " + xsl + "...");
                    return [4 /*yield*/, bun_1.$(templateObject_1 || (templateObject_1 = __makeTemplateObject(["java -jar saxon/saxon.jar -s:", " -xsl:", " -o:", " baseuri=\"/xsltforms/\""], ["java -jar saxon/saxon.jar -s:", " -xsl:", " -o:", " baseuri=\"/xsltforms/\""])), xml, xsl, out)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, out];
                case 3:
                    error_1 = _a.sent();
                    console.log('-------------------------------------');
                    console.log(error_1.text());
                    console.log('-------------------------------------');
                    console.error(error_1);
                    if (fs_1.existsSync(out)) {
                        fs_1.unlinkSync(out);
                    }
                    return [2 /*return*/, error_1.message];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.transformXml = transformXml;
function transform(xml, xsl, clean) {
    if (clean === void 0) { clean = true; }
    return __awaiter(this, void 0, Promise, function () {
        var out, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transformXml(xml, xsl)];
                case 1:
                    out = _a.sent();
                    return [4 /*yield*/, Bun.file(out).text()];
                case 2:
                    result = _a.sent();
                    if (clean) {
                        fs_1.unlinkSync(out);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.transform = transform;
function xslt(xml, xsl) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, transform(path_1.resolve('assets/xml', xml + '.xml'), path_1.resolve('assets/xsl', xsl + '.xsl'))];
        });
    });
}
exports.xslt = xslt;
function xform(xml) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, transform(path_1.resolve('assets/form', xml + '.xml'), path_1.resolve('assets/xsl/xsltforms.xsl'))];
        });
    });
}
exports.xform = xform;
function xxform(xml) {
    return __awaiter(this, void 0, Promise, function () {
        var out, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (xml === 'test') {
                        return [2 /*return*/, transform(path_1.resolve('assets/form/test.xhtml'), path_1.resolve('assets/xsl/xsltforms.xsl'))];
                    }
                    return [4 /*yield*/, transformXml(path_1.resolve('assets/form', xml + '.xhtml'), path_1.resolve('assets/xsl/xx-forms.xsl'))];
                case 1:
                    out = _a.sent();
                    return [4 /*yield*/, transform(out, path_1.resolve('assets/xsl/xsltforms.xsl'))];
                case 2:
                    result = _a.sent();
                    fs_1.unlinkSync(out);
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.xxform = xxform;
var templateObject_1;
