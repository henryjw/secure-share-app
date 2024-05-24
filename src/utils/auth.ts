// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type {AuthMode} from '@aws-amplify/data-schema/src/runtime/client'

export function getAuthMode(isLoggedIn: boolean):  AuthMode {
    // If the user is logged in, use the user pool. Otherwise, use the identity pool.
    // This is especially useful when creating a new snippet. For some reason, the `createdBy` field isn't populated
    // when using the identity pool.
    return isLoggedIn ? 'userPool' : 'identityPool';
}