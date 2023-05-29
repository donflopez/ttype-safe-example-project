import { $schema, validate } from "ttype-safe/validate"

type SimpleType = {
    /**
     * Input string that has some constraints
     * 
     * @min 1
     * @max 8
     * @alphanumeric
     */
    input: string,
}

const SimpleTypeValidator = validate<SimpleType>($schema<SimpleType>());

console.log(SimpleTypeValidator({input: 'hello'})); // true
console.log(SimpleTypeValidator({input: 'hello-'})); // false
console.log(SimpleTypeValidator({input: ''})); // false
console.log(SimpleTypeValidator({input: 'abcdefghi'})); // false
