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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.testConnection = testConnection;
exports.executeQuery = executeQuery;
exports.executeQueryOne = executeQueryOne;
exports.executeUpdate = executeUpdate;
var promise_1 = require("mysql2/promise");
var dotenv_1 = require("dotenv");
// 加载环境变量
(0, dotenv_1.config)();
// 数据库配置
var dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'procure_sales_asset_manager',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};
// 创建连接池
exports.pool = (0, promise_1.createPool)(dbConfig);
// 测试数据库连接
function testConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.pool.getConnection()];
                case 1:
                    connection = _a.sent();
                    console.log('✅ 数据库连接成功');
                    connection.release();
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    console.error('❌ 数据库连接失败:', error_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 执行查询的辅助函数
function executeQuery(sql_1) {
    return __awaiter(this, arguments, void 0, function (sql, params) {
        var rows, error_2;
        if (params === void 0) { params = []; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.pool.execute(sql, params)];
                case 1:
                    rows = (_a.sent())[0];
                    return [2 /*return*/, rows];
                case 2:
                    error_2 = _a.sent();
                    console.error('查询执行失败:', error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 执行单个查询的辅助函数
function executeQueryOne(sql_1) {
    return __awaiter(this, arguments, void 0, function (sql, params) {
        var rows, result, error_3;
        if (params === void 0) { params = []; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.pool.execute(sql, params)];
                case 1:
                    rows = (_a.sent())[0];
                    result = rows;
                    return [2 /*return*/, result.length > 0 ? result[0] : null];
                case 2:
                    error_3 = _a.sent();
                    console.error('查询执行失败:', error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 执行插入/更新/删除的辅助函数
function executeUpdate(sql_1) {
    return __awaiter(this, arguments, void 0, function (sql, params) {
        var result, error_4;
        if (params === void 0) { params = []; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.pool.execute(sql, params)];
                case 1:
                    result = (_a.sent())[0];
                    return [2 /*return*/, result];
                case 2:
                    error_4 = _a.sent();
                    console.error('更新执行失败:', error_4);
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
