/**
 * Defines the "postpone" key of Promise objects, that runs a setTimeout
 * for a specified number of milliseconds before resolving the Promise.
 * The postpone can also contain a function which will also run just before
 * resolving the Promise.
 * 
 * @author Zach Reznicek <zbrezi@gmail.com>
 * @version 1.0.0
 */

(function() {

    /**
     * A private function that creates a Promise containing a setTimeout
     * which upon completion resolves. You can include an optional function
     * that will execute just before the Promise resolves that is passed
     * the previous Promise's result.
     * 
     * @function
     * @private
     * @param {*} result - Result of previous Promise to pass on
     * @param {function} [func] - An optional function to run before resolving the Promise
     * @param {number} time - The postpone time in milliseconds
     */
    let _postpone = function(result, func, time) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                if (typeof func === 'function') func(result);
                resolve(result);
            }, time);
        });
    }

    /**
     * Assign the _postpone function as a direct member of the Promise object.
     * 
     * @function
     * @public
     * @param {function} [func] - An optional function to run before resolving the Promise
     * @param {number} time - The postpone time in milliseconds
     * @see _postpone
     */
    Promise.postpone = function(func, time) {
        if (!time) {
            time = func;
            func = null;
        }
        return _postpone(null, func, time);
    }

    /**
     * Assign the _postpone function as a member of Promise instances.
     * This allows you to chain postpone() calls as you would then().
     * 
     * @function
     * @public
     * @param {function} [func] - An optional function to run before resolving the Promise
     * @param {number} time - The postpone time in milliseconds
     * @see _postpone
     */
    Promise.prototype.postpone = function(func, time) {
        if (!time) {
            time = func;
            func = null;
        }
        return this.then(function(result) {
            return _postpone(result, func, time);
        });
    }

})();