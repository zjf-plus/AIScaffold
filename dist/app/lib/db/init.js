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
exports.initializeDatabase = initializeDatabase;
exports.insertSampleData = insertSampleData;
exports.setupDatabase = setupDatabase;
var fs_1 = require("fs");
var path_1 = require("path");
var config_1 = require("./config");
// 读取SQL文件
function readSQLFile(filename) {
    var filePath = (0, path_1.join)(__dirname, filename);
    return (0, fs_1.readFileSync)(filePath, 'utf8');
}
// 初始化数据库
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var isConnected, sqlContent, statements, i, statement, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    console.log('🚀 开始初始化数据库...');
                    return [4 /*yield*/, (0, config_1.testConnection)()];
                case 1:
                    isConnected = _a.sent();
                    if (!isConnected) {
                        console.error('❌ 数据库连接失败，请检查配置');
                        return [2 /*return*/, false];
                    }
                    sqlContent = readSQLFile('schema.sql');
                    statements = sqlContent
                        .split(';')
                        .map(function (stmt) { return stmt.trim(); })
                        .filter(function (stmt) { return stmt.length > 0; });
                    console.log("\uD83D\uDCDD \u51C6\u5907\u6267\u884C ".concat(statements.length, " \u6761SQL\u8BED\u53E5..."));
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < statements.length)) return [3 /*break*/, 7];
                    statement = statements[i];
                    if (!statement.trim()) return [3 /*break*/, 6];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, config_1.pool.execute(statement)];
                case 4:
                    _a.sent();
                    console.log("\u2705 \u6267\u884C\u8BED\u53E5 ".concat(i + 1, "/").concat(statements.length, " \u6210\u529F"));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.warn("\u26A0\uFE0F \u6267\u884C\u8BED\u53E5 ".concat(i + 1, " \u65F6\u51FA\u73B0\u8B66\u544A:"), error_1);
                    return [3 /*break*/, 6];
                case 6:
                    i++;
                    return [3 /*break*/, 2];
                case 7:
                    console.log('🎉 数据库初始化完成！');
                    return [2 /*return*/, true];
                case 8:
                    error_2 = _a.sent();
                    console.error('❌ 数据库初始化失败:', error_2);
                    return [2 /*return*/, false];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// 插入示例数据
function insertSampleData() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _i, users_1, user, suppliers, _a, suppliers_1, supplier, customers, _b, customers_1, customer, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 13, , 14]);
                    console.log('📊 开始插入示例数据...');
                    users = [
                        {
                            id: 'user-1',
                            username: 'admin',
                            email: 'admin@company.com',
                            password_hash: '$2b$10$example', // 实际应用中应该使用bcrypt
                            full_name: '系统管理员',
                            role: 'admin',
                            department: 'IT部门'
                        },
                        {
                            id: 'user-2',
                            username: 'manager1',
                            email: 'manager@company.com',
                            password_hash: '$2b$10$example',
                            full_name: '采购经理',
                            role: 'manager',
                            department: '采购部'
                        }
                    ];
                    _i = 0, users_1 = users;
                    _c.label = 1;
                case 1:
                    if (!(_i < users_1.length)) return [3 /*break*/, 4];
                    user = users_1[_i];
                    return [4 /*yield*/, config_1.pool.execute("\n        INSERT IGNORE INTO users (id, username, email, password_hash, full_name, role, department)\n        VALUES (?, ?, ?, ?, ?, ?, ?)\n      ", [user.id, user.username, user.email, user.password_hash, user.full_name, user.role, user.department])];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    suppliers = [
                        {
                            id: 'supplier-1',
                            supplier_code: 'SUP001',
                            company_name: 'ABC科技有限公司',
                            contact_person: '张经理',
                            email: 'zhang@abc.com',
                            phone: '13800138001',
                            address: '北京市朝阳区科技园区',
                            city: '北京',
                            country: '中国'
                        }
                    ];
                    _a = 0, suppliers_1 = suppliers;
                    _c.label = 5;
                case 5:
                    if (!(_a < suppliers_1.length)) return [3 /*break*/, 8];
                    supplier = suppliers_1[_a];
                    return [4 /*yield*/, config_1.pool.execute("\n        INSERT IGNORE INTO suppliers (id, supplier_code, company_name, contact_person, email, phone, address, city, country)\n        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)\n      ", [supplier.id, supplier.supplier_code, supplier.company_name, supplier.contact_person,
                            supplier.email, supplier.phone, supplier.address, supplier.city, supplier.country])];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    customers = [
                        {
                            id: 'customer-1',
                            customer_code: 'CUS001',
                            company_name: 'XYZ贸易公司',
                            contact_person: '李总',
                            email: 'li@xyz.com',
                            phone: '13900139001',
                            address: '上海市浦东新区',
                            city: '上海',
                            country: '中国'
                        }
                    ];
                    _b = 0, customers_1 = customers;
                    _c.label = 9;
                case 9:
                    if (!(_b < customers_1.length)) return [3 /*break*/, 12];
                    customer = customers_1[_b];
                    return [4 /*yield*/, config_1.pool.execute("\n        INSERT IGNORE INTO customers (id, customer_code, company_name, contact_person, email, phone, address, city, country)\n        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)\n      ", [customer.id, customer.customer_code, customer.company_name, customer.contact_person,
                            customer.email, customer.phone, customer.address, customer.city, customer.country])];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11:
                    _b++;
                    return [3 /*break*/, 9];
                case 12:
                    console.log('✅ 示例数据插入完成！');
                    return [3 /*break*/, 14];
                case 13:
                    error_3 = _c.sent();
                    console.error('❌ 插入示例数据失败:', error_3);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
// 主初始化函数
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var initialized;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initializeDatabase()];
                case 1:
                    initialized = _a.sent();
                    if (!initialized) return [3 /*break*/, 3];
                    return [4 /*yield*/, insertSampleData()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, initialized];
            }
        });
    });
}
