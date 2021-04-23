"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.protect = exports.signin = exports.verifyToken = exports.newToken = void 0;
var config_1 = __importDefault(require("./config"));
var usuario_model_1 = __importDefault(require("../resources/usuario/usuario.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var newToken = function (usuario) {
    return jsonwebtoken_1.default.sign({ id: usuario._id }, config_1.default.SECRETS.jwt, {
        expiresIn: config_1.default.SECRETS.jwtExp,
    });
};
exports.newToken = newToken;
var verifyToken = function (token) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(token, config_1.default.SECRETS.jwt, function (err, payload) {
            if (err)
                return reject(err);
            resolve(payload);
        });
    });
};
exports.verifyToken = verifyToken;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var invalid, user, match, token, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                invalid = { auth: false, message: "Matricula o clave no existe" };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, usuario_model_1.default.findOne({
                        matricula: req.body.matricula,
                    }).exec()];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).send(invalid)];
                }
                return [4 /*yield*/, user.checkPassword(req.body.clave)];
            case 3:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, res.status(401).send(invalid)];
                }
                if (!user.roles.includes("admin")) {
                    return [2 /*return*/, res.status(401).send(__assign(__assign({}, invalid), { message: "Este usuario no tiene permiso de acceder" }))];
                }
                token = exports.newToken(user);
                return [2 /*return*/, res.status(201).send({ auth: true, token: token, user: user._id })];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                res.status(500).end();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
var protect = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bearer, token, payload, e_2, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bearer = req.headers.authorization;
                if (!bearer || !bearer.startsWith("Bearer ")) {
                    return [2 /*return*/, res.status(401).end()];
                }
                token = bearer.split("Bearer ")[1].trim();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exports.verifyToken(token)];
            case 2:
                payload = (_a.sent()) || { id: null };
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, res.status(401).end()];
            case 4: return [4 /*yield*/, usuario_model_1.default.findById(payload.id)
                    .select("-clave")
                    .lean()
                    .exec()];
            case 5:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).end()];
                }
                req.currentUser = user;
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.protect = protect;
var verify = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bearer, token;
    return __generator(this, function (_a) {
        bearer = req.headers.authorization;
        if (!bearer || !bearer.startsWith("Bearer ")) {
            return [2 /*return*/, res.status(401).end()];
        }
        token = bearer.split("Bearer ")[1].trim();
        jsonwebtoken_1.default.verify(token, config_1.default.SECRETS.jwt, function (err, payload) {
            if (err)
                return res.status(401).end();
            res.status(200).end();
        });
        res.status(401).end();
        return [2 /*return*/];
    });
}); };
exports.verify = verify;
