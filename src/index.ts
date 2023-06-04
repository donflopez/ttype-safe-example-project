import { $schema, createCustomValidate, validate } from "ttype-safe/validate"

const throwCatcher = (fn: Function) => {
    try {
        fn();
    } catch (e) {
        console.log(e);
    }
}

type SimpleType = {
    /**
     * Input string that has some constraints
     * 
     * @min 1
     * @max 8
     * @alphanumeric
     * @startsWithA
     */
    input: string,
}

const SimpleTypeValidator = validate<SimpleType>($schema<SimpleType>());

console.log(SimpleTypeValidator({input: 'hello'})); // true
console.log(SimpleTypeValidator({input: 'hello-'})); // false
console.log(SimpleTypeValidator({input: ''})); // false
console.log(SimpleTypeValidator({input: 'abcdefghi'})); // false


// ENABLE THROWING ERRORS
const validatorThatThrows = createCustomValidate({}, true);

const SimpleTypeValidatorThrows = validatorThatThrows<SimpleType>($schema<SimpleType>());

throwCatcher(() => SimpleTypeValidatorThrows({input: 'hello-'})); // Error: ValidationError: Tag validation [alphanumeric] and comment [null] didn't succeed for value [hello-]
throwCatcher(() => SimpleTypeValidatorThrows({input: ''})); // Error: ValidationError: Tag validation [min] and comment [1] didn't succeed for value []
throwCatcher(() => SimpleTypeValidatorThrows({input: 'abcdefghi'})); // ValidationError: Tag validation [max] and comment [8] didn't succeed for value [abcdefghi]

// ADD CUSTOM TAGS
const validatorThatThrows2 = createCustomValidate({
    string: {
        startsWithA: (value, _tagInput) => {
            return !!value && (value[0] === 'a' || value[0] === 'A');
        }
    }
}, true);

const SimpleTypeValidatorThrows2 = validatorThatThrows2<SimpleType>($schema<SimpleType>());

throwCatcher(() => SimpleTypeValidatorThrows2({input: 'Ahello'})); // Correct
throwCatcher(() => SimpleTypeValidatorThrows2({input: 'hello'})); // Error: ValidationError: Tag validation [startsWithA] and comment [null] didn't succeed for value [hello]
throwCatcher(() => SimpleTypeValidatorThrows2({input: 'hello-'})); // Error: ValidationError: Tag validation [alphanumeric] and comment [null] didn't succeed for value [hello-]
throwCatcher(() => SimpleTypeValidatorThrows2({input: ''})); // Error: ValidationError: Tag validation [min] and comment [1] didn't succeed for value []
throwCatcher(() => SimpleTypeValidatorThrows2({input: 'abcdefghi'})); // ValidationError: Tag validation [max] and comment [8] didn't succeed for value [abcdefghi]
