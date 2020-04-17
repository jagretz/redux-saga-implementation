/**
 * @module effects
 *
 * Saga Effects
 */

export const CALL_EFFECT = "effect/CALL";
export const PUT_EFFECT = "effect/PUT";

/**
 * Instructs the middleware to invoke an async function using the provided
 * 0 to many arguments.
 *
 * @param {async function} fn an async function that returns a {@link Promise}
 * @param {*[]} args - arbitrary number of arguments with which to call the
 * asynchronous function {@link fn} argument.
 * @returns {CallEffect} call effect
 * @see [call]{@link https://github.com/redux-saga/redux-saga/blob/master/packages/core/types/effects.d.ts#443}
 */
export const call = (fn, ...args) => {
    return {
        effect: CALL_EFFECT,
        payload: fn,
        args,
    };
};

/**
 * Instruct the middleware to dispatch the desired action.
 *
 * @param {ReduxAction} action to disptach
 * @returns {PutEffect} put effect
 * @see [put]{@link https://github.com/redux-saga/redux-saga/blob/master/packages/core/types/effects.d.ts#L367}
 */
export const put = (action) => {
    return {
        effect: PUT_EFFECT,
        payload: action,
    };
};
