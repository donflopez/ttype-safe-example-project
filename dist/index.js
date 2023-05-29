"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("ttype-safe/validate");
const SimpleTypeValidator = (0, validate_1.validate)("{\"type\":\"SimpleType\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":false,\"isEnum\":false,\"tags\":[],\"children\":{\"input\":{\"type\":\"string\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":true,\"enum\":false,\"tags\":[[\"min\",\"1\",\"input\"],[\"max\",\"8\",\"input\"],[\"alphanumeric\",null,\"input\"]]}}}");
console.log(SimpleTypeValidator({ input: 'hello' })); // true
console.log(SimpleTypeValidator({ input: 'hello-' })); // false
console.log(SimpleTypeValidator({ input: '' })); // false
console.log(SimpleTypeValidator({ input: 'abcdefghi' })); // false
