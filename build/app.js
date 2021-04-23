"use strict";
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
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./utils/config"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
// Middleware
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default("common"));
var auth_1 = require("./utils/auth");
app.post("/signin", auth_1.signin);
app.use("/verify", auth_1.verify);
app.use("/api", auth_1.protect);
// Routers
var area_router_1 = __importDefault(require("./resources/area/area.router"));
var curso_router_1 = __importDefault(require("./resources/curso/curso.router"));
var diplomado_router_1 = __importDefault(require("./resources/diplomado/diplomado.router"));
var capacitacion_router_1 = __importDefault(require("./resources/capacitacion/capacitacion.router"));
var certificacion_router_1 = __importDefault(require("./resources/certificacion/certificacion.router"));
var instanciaCurso_router_1 = __importDefault(require("./resources/instanciaCurso/instanciaCurso.router"));
var instanciaDiplomado_router_1 = __importDefault(require("./resources/instanciaDiplomado/instanciaDiplomado.router"));
var jornada_router_1 = __importDefault(require("./resources/jornada/jornada.router"));
var registroAcreditacion_router_1 = __importDefault(require("./resources/registroAcreditacion/registroAcreditacion.router"));
var usuario_router_1 = __importDefault(require("./resources/usuario/usuario.router"));
app.use("/api/areas", area_router_1.default);
app.use("/api/cursos", curso_router_1.default);
app.use("/api/diplomados", diplomado_router_1.default);
app.use("/api/capacitaciones", capacitacion_router_1.default);
app.use("/api/certificaciones", certificacion_router_1.default);
app.use("/api/instanciascurso", instanciaCurso_router_1.default);
app.use("/api/instanciasdiplomado", instanciaDiplomado_router_1.default);
app.use("/api/jornadas", jornada_router_1.default);
app.use("/api/registrosacreditacion", registroAcreditacion_router_1.default);
app.use("/api/usuarios", usuario_router_1.default);
app.get("/", function (req, res) {
    res.send("hola");
});
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connect(config_1.default.CONNECTION_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                })];
            case 1:
                _a.sent();
                app.listen(config_1.default.PORT, function () {
                    console.log("Server iniciado");
                });
                return [2 /*return*/];
        }
    });
}); });
