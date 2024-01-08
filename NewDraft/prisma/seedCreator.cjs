"use strict";
/*
    Seed creator v2.0.1 - By Megas
    How to use: Import the seedCreator.ts file and call the readAllTables function
    Ex: import model from './seedCreator';

    model.readAllTables({ allSeeds: true });
    model.readAllTables({ allSeeds: true, seedFile: true, logTables: false });
    Flag: allSeeds --> Create all seeds from all tables inside the ./prisma/seeds folder (create seeds folder if it doesn't exist)
    Flag: seedFile --> Create seed.ts file with all seeds imported
    Flag: logTables --> Log tables inside the console

    filters array:
    [
      { keyToFilter: 'password', replaceTo: '01dfa4d90d9afbe', inTable: 'User' }, // Filter to not include in the seeds columns password and replaceTo = '01dfa4d90d9afbe' in the table User
      { keyToFilter: 'deletedAt' }, // Filter all keys deletedAt in all tables
      { keyToFilter: 'like', replaceTo: true, inTable: 'CommentAndLike' } // Filter all keys like in CommentAndLike table and replaceTo = true
    ] // This array is optional and you can add more filters

    Ex: model.readAllTables({ allSeeds: true, seedFile: true, logTables: false, arrFilters: filters });

    prisma[table].findMany({
        take: 1000,
      }); // Limit in 1000 rows

    After the seeds are created, you shuld run 'npx prisma db seed' (Ps: npx prisma migrate reset maybe dont make the seed all)
*/
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
exports.readAllTables = void 0;
var client_1 = require("@prisma/client");
var fs_1 = require("fs");
var prisma = new client_1.PrismaClient();
// Filter to not include in the seeds
var filters = [
// {
//   keyToFilter: 'password',
//   replaceTo: '01dfa4d90d9afbe',
//   inTable: 'User'
// },
// { keyToFilter: 'deletedAt' },
// { keyToFilter: 'like', replaceTo: true, inTable: 'CommentAndLike' }
];
// Ex: User go to user | CommentAndLike go to commentAndLike
var snakeToCamel = function (str) {
    return str.toLocaleLowerCase().replace(/([-_][a-z])/g, function (undeScoreAndString) {
        return undeScoreAndString.toUpperCase().replace('-', '').replace('_', '');
    });
};
var writeTable = function (table, value, folder) { return __awaiter(void 0, void 0, void 0, function () {
    var tableNameCamelCase, dir;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tableNameCamelCase = snakeToCamel(table);
                dir = "./prisma/".concat(folder);
                return [4 /*yield*/, fs_1.promises.mkdir(dir, { recursive: true })];
            case 1:
                _a.sent();
                return [2 /*return*/, fs_1.promises.writeFile("".concat(dir, "/").concat(tableNameCamelCase, ".json"), "".concat(JSON.stringify(value, null, 2)))];
        }
    });
}); };
var createSeedFile = function () {
    var fileString = "\nimport { Prisma, PrismaClient } from '@prisma/client';\nimport { promises as fs } from 'fs';\n\nconst prisma = new PrismaClient();\n\nasync function main() {\n  let tablesTryAgain: any[] = [];\n  const tables = Object.keys(Prisma.ModelName);\n  let limit = 10;\n  const MAX = limit;\n\n  const snakeToCamel = (str: string) =>\n    str.toLocaleLowerCase().replace(/([-_][a-z0-9])/g, undeScoreAndString => {\n      return undeScoreAndString.toUpperCase().replace('-', '').replace('_', '');\n    });\n\n  const readFile = async (path: string) => {\n    try {\n      const data = await fs.readFile(`./prisma/seeds/${path}`, 'utf8');\n      const dataParse = JSON.parse(data);\n      if (Array.isArray(dataParse)) return dataParse;\n    } catch (error: any) {\n      console.log(error.message, '<---XXX');\n    }\n    return [];\n  };\n\n  const seedTable = async (table: Prisma.ModelName) => {\n    const data = await readFile(`${snakeToCamel(table)}.json`);\n\n    try {\n      tablesTryAgain = tablesTryAgain.filter(t => t !== table);\n      // ~@ts-expect-error ts(2322): Type 'string' is not assignable to type 'Prisma.ModelName'.\n      await prisma[table].createMany({ data });\n    } catch (error: any) {\n      if (!error.message.toLowerCase().includes('unique constraint')) {\n        console.log('\\n XXXXXXXXX ', error.message, '\\n', table, '<---Adding in try Again XXXXX');\n        tablesTryAgain.push(table);\n      }\n    }\n  };\n\n  const dropAll = async (arrTables = tables) => {\n    for (let i = 0; i < arrTables.length; i++) {\n      const table = arrTables[i];\n      try {\n        tablesTryAgain = tablesTryAgain.filter(t => t !== table);\n        // ~@ts-expect-error ts(2322): Type 'string' is not assignable to type 'Prisma.ModelName'.\n        await prisma[table].deleteMany({});\n      } catch (error: any) {\n        tablesTryAgain.push(table);\n        console.log('\\n XXXXXXXXX ', '\\n', table, '<--- FAIL TO DROPED XXXXX', tablesTryAgain, '\\n');\n      }\n    }\n  };\n  const seedAll = async () => {\n    for (let i = 0; i < tables.length; i++) {\n      await seedTable(tables[i] as Prisma.ModelName);\n    }\n  };\n  console.clear();\n\n  const isDroped = true;\n  const action = isDroped ? dropAll : seedAll;\n\n  await action();\n\n  if (tablesTryAgain.length > 0) {\n    while (tablesTryAgain.length > 0 && limit-- > 0) {\n      await action(tablesTryAgain);\n    }\n  }\n\n  console.log('The end', tablesTryAgain, '<-- Tables to seed (Fails) | Number of trys: ', MAX - limit);\n}\n\nmain()\n  .then(async () => {\n    await prisma.$disconnect();\n  })\n  .catch(async e => {\n    console.error(e);\n    await prisma.$disconnect();\n    process.exit(1);\n  });\n  ".trim();
    return fs_1.promises.writeFile('./prisma/seed.ts', fileString);
};
var removeNullElements = function (obj) {
    return Object.keys(obj).reduce(function (acc, key) {
        if (obj[key] === null) {
            return acc;
        }
        acc[key] = obj[key];
        return acc;
    }, {});
};
var filteredFields = function (obj, filter) {
    var keyToFilter = filter.keyToFilter, replaceTo = filter.replaceTo;
    return Object.keys(obj).reduce(function (acc, key) {
        if (key === keyToFilter) {
            if (replaceTo === undefined) {
                return acc;
            }
            acc[key] = replaceTo;
            return acc;
        }
        acc[key] = obj[key];
        return acc;
    }, {});
};
var filterTables = function (obj, filters, key) {
    return filters.reduce(function (acc, filter) {
        if (filter.inTable && filter.inTable !== key) {
            return acc;
        }
        return filteredFields(acc, filter);
    }, obj);
};
var createAllSeeds = function (tables, folder) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.allSettled(Object.keys(tables).map(function (key) {
                    writeTable(key, tables[key], folder);
                }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Stack to try again -- Tables to re try the find All if some promisse is rejected.
var stackTryAgain = {};
var findAndRefind = function (tables, internalFilters) { return __awaiter(void 0, void 0, void 0, function () {
    var selectsAll, merged;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.allSettled(tables.map(function (table) {
                    return prisma[table].findMany({
                        take: 1000
                    });
                }))];
            case 1:
                selectsAll = _a.sent();
                merged = selectsAll.reduce(function (acc, result, i) {
                    if (result.status !== 'fulfilled') {
                        console.log('Error', result.reason, '<---Try Again XXXXX');
                        stackTryAgain[tables[i]] = (stackTryAgain[tables[i]] || 0) + 1;
                        return acc;
                    }
                    delete stackTryAgain[tables[i]];
                    acc[tables[i]] = result.value.map(function (item) {
                        return filterTables(removeNullElements(item), internalFilters, tables[i]);
                    });
                    return acc;
                }, {});
                return [2 /*return*/, merged];
        }
    });
}); };
var readAllTables = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.allSeeds, allSeeds = _c === void 0 ? false : _c, _d = _b.seedFile, seedFile = _d === void 0 ? false : _d, _e = _b.logTables, logTables = _e === void 0 ? true : _e, _f = _b.arrFilters, arrFilters = _f === void 0 ? filters : _f, _g = _b.onlyTables, onlyTables = _g === void 0 ? [] : _g, // only especific tables
    _h = _b.folderName, // only especific tables
    folderName = _h === void 0 ? 'seeds' : _h;
    return __awaiter(void 0, void 0, void 0, function () {
        var tables, merged, _j, MAX_TRY_AGAIN, breakWhile, newMerge, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    tables = onlyTables.length > 0
                        ? onlyTables
                        : Object.keys(client_1.Prisma.ModelName);
                    if (!!allSeeds) return [3 /*break*/, 1];
                    _j = {};
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, findAndRefind(tables, arrFilters)];
                case 2:
                    _j = _m.sent();
                    _m.label = 3;
                case 3:
                    merged = _j;
                    MAX_TRY_AGAIN = 3;
                    breakWhile = 10;
                    if (!(Object.keys(stackTryAgain).length > 0)) return [3 /*break*/, 6];
                    console.log(JSON.stringify(stackTryAgain, null, 2), '<--- stackTryAgain');
                    console.log('\n **************** Go run while ************** \n');
                    _m.label = 4;
                case 4:
                    if (!(Object.keys(stackTryAgain).length > 0 &&
                        Object.values(stackTryAgain).some(function (v) { return v < MAX_TRY_AGAIN; }) &&
                        breakWhile-- > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, findAndRefind(Object.keys(stackTryAgain), arrFilters)];
                case 5:
                    newMerge = _m.sent();
                    Object.assign(merged, newMerge);
                    return [3 /*break*/, 4];
                case 6:
                    logTables && console.log('Start -->', merged, '<-- End');
                    _k = allSeeds;
                    if (!_k) return [3 /*break*/, 8];
                    return [4 /*yield*/, createAllSeeds(merged, folderName)];
                case 7:
                    _k = (_m.sent());
                    _m.label = 8;
                case 8:
                    _k;
                    _l = seedFile;
                    if (!_l) return [3 /*break*/, 10];
                    return [4 /*yield*/, createSeedFile()];
                case 9:
                    _l = (_m.sent());
                    _m.label = 10;
                case 10:
                    _l;
                    console.log('Done ---');
                    return [2 /*return*/, { tables: tables, collections: merged, stackTryAgain: stackTryAgain }];
            }
        });
    });
};
exports.readAllTables = readAllTables;
// import './seedCreator';
// /*
(0, exports.readAllTables)({
    allSeeds: true,
    seedFile: true,
    logTables: false,
    onlyTables: []
});
//  */
