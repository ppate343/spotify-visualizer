// higher order function for async/await error handling , returns a function

export const catchErrors = fn => {
    return function (...args) {
        return fn(...args).catch((err) => {
            console.error(err);
        })
    }
}