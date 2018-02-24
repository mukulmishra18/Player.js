/* global Promise */

/**
 * Promise capability helper.
 */

export default function createPromiseCapability() {
  let capability = {};
  capability.promise = new Promise(function(resolve, reject) {
    capability.resolve = resolve;
    capability.reject = reject;
  });

  return capability;
}
