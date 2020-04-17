import { CALL_EFFECT, PUT_EFFECT } from "./effects";

export default class Saga {
    constructor() {
        this.actions = new Map();
    }

    registerAction(actionType, handler) {
        this.actions.set(actionType, handler);
    }

    middleware = (store) => (next) => (action) => {
        /*
        If the "action" is a redux action (aka has a `type` prop),
          then check if the action is also watched by a saga.
        If the action is watched for by a saga,
          then set the handle to the saga handler (generator).
        */
        // eslint-disable-next-line no-undefined
        const handler = action.type ? this.actions.get(action.type) : undefined;

        if (handler) {
            /*
            Initiate the generator, providing the action as the first argument.
            This will process up to the first yield statement or complete if
            no yield statement exists.
            */
            const handlerInstance = handler(action);

            // yield the first value
            let yieldedValue = handlerInstance.next();

            /*
            Create an async IIFE (IIAFE), and
            loop until we reach the end of the saga.

            The IIAFE allows us to `await` values from asyncronous effects.

            Check for yielded
            "effects" -- plain JS objects that instruct the middleware "what" to do.
            That inherently makes testing the middleware quite easy.
            */
            (async () => {
                /* eslint-disable no-await-in-loop, no-loop-func */
                while (!yieldedValue.done) {
                    switch (yieldedValue.value.effect) {
                        case CALL_EFFECT:
                            // await the async function
                            await yieldedValue.value.payload
                                // Call the async function with the provided args
                                .apply(null, yieldedValue.value.args)
                                // on SUCCESS, set the response value to the next value of yield
                                .then((res) => {
                                    yieldedValue = handlerInstance.next(res);
                                })
                                // on ERROR, set the error value to the next value of throw
                                .catch((err) => {
                                    yieldedValue = handlerInstance.throw(err);
                                });
                            break;
                        case PUT_EFFECT:
                            // dispatch the action
                            store.dispatch(yieldedValue.value.payload);
                            yieldedValue = handlerInstance.next();
                            break;
                        default:
                            /*
                            We must set the default case to the value of the next `yield` in
                            order to continue our loop. However, we can safetly ignore (do not
                            need to dispatch through redux) the value if it is _not_ an effect.
                            */
                            yieldedValue = handlerInstance.next();
                    }
                }
                /* eslint-enable no-await-in-loop, no-loop-func */
            })();
        }

        next(action);
    };
}
