"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("ttype-safe/validate");
const throwCatcher = (fn) => {
    try {
        fn();
    }
    catch (e) {
        console.log(e);
    }
};
const SimpleTypeValidator = (0, validate_1.validate)("{\"type\":\"SimpleType\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":false,\"isEnum\":false,\"tags\":[],\"children\":{\"input\":{\"type\":\"string\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":true,\"enum\":false,\"tags\":[]}}}");
console.log(SimpleTypeValidator({ input: 'hello' })); // true
console.log(SimpleTypeValidator({ input: 'hello-' })); // false
console.log(SimpleTypeValidator({ input: '' })); // false
console.log(SimpleTypeValidator({ input: 'abcdefghi' })); // false
// ENABLE THROWING ERRORS
const validatorThatThrows = (0, validate_1.createCustomValidate)({}, true);
const SimpleTypeValidatorThrows = validatorThatThrows("{\"type\":\"SimpleType\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":false,\"isEnum\":false,\"tags\":[],\"children\":{\"input\":{\"type\":\"string\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":true,\"enum\":false,\"tags\":[]}}}");
throwCatcher(() => SimpleTypeValidatorThrows({ input: 'hello-' })); // Error: ValidationError: Tag validation [alphanumeric] and comment [null] didn't succeed for value [hello-]
throwCatcher(() => SimpleTypeValidatorThrows({ input: '' })); // Error: ValidationError: Tag validation [min] and comment [1] didn't succeed for value []
throwCatcher(() => SimpleTypeValidatorThrows({ input: 'abcdefghi' })); // ValidationError: Tag validation [max] and comment [8] didn't succeed for value [abcdefghi]
// ADD CUSTOM TAGS
const validatorThatThrows2 = (0, validate_1.createCustomValidate)({
    string: {
        startsWithA: (value, _tagInput) => {
            return !!value && (value[0] === 'a' || value[0] === 'A');
        }
    }
}, true);
const SimpleTypeValidatorThrows2 = validatorThatThrows2("{\"type\":\"SimpleType\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":false,\"isEnum\":false,\"tags\":[],\"children\":{\"input\":{\"type\":\"string\",\"optional\":false,\"union\":false,\"literal\":false,\"array\":false,\"primitive\":true,\"enum\":false,\"tags\":[]}}}");
throwCatcher(() => SimpleTypeValidatorThrows2({ input: 'Ahello' })); // Correct
throwCatcher(() => SimpleTypeValidatorThrows2({ input: 'hello' })); // Error: ValidationError: Tag validation [startsWithA] and comment [null] didn't succeed for value [hello]
throwCatcher(() => SimpleTypeValidatorThrows2({ input: 'hello-' })); // Error: ValidationError: Tag validation [alphanumeric] and comment [null] didn't succeed for value [hello-]
throwCatcher(() => SimpleTypeValidatorThrows2({ input: '' })); // Error: ValidationError: Tag validation [min] and comment [1] didn't succeed for value []
throwCatcher(() => SimpleTypeValidatorThrows2({ input: 'abcdefghi' })); // ValidationError: Tag validation [max] and comment [8] didn't succeed for value [abcdefghi]
