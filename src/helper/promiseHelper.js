/**
 * Promise capability helper.
 */

export function createPromiseCapability() {
  let capability = {};
  capability.promise = new Promise(function(resolve, reject) {
    capability.resolve = resolve;
    capability.reject = reject;
  });

  return capability;
}
