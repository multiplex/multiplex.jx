import isArray from './is-array';
import isString from './is-string';
import isArrayLike from './is-array-like';
import Collection from '../collections/collection';
import ArrayIterable from '../iteration/iterable-array';
import $iterable from '../iteration/iterable-factory';

/**
* Buffers an Iterale object into an array.
* @param {Iterale} value An Iterale object.
* @param {Boolean} forceIterate If true, buffers the specified iterable object using its iterator.
* @returns {Array}
*/
export default function buffer(value, forceIterate = false) {
    if (!forceIterate) {
        if (isArrayLike(value)) {                      // array-likes have fixed element count
            return arrayBuffer(value);
        }

        else if (value instanceof Collection) {             // Collections have 'toArray' method
            return arrayBuffer(value.toArray());
        }

        else if (value instanceof ArrayIterable) {          // ArrayIterable wrapper
            return arrayBuffer(value.toArray());
        }
    }

    // do it the hard way
    return [...$iterable(value)];
}


function arrayBuffer(value) {
    if (isArray(value)) {                  	// fast buffer arrays
        return value.concat();            	// 'concat' is fastest way to duplicate an array
    }

    else if (isString(value)) {           	// fast buffer strings
        return value.split('');        	    // buffer string to char-array
    }

    // use the despised Array constructor as a function
    return value.length === 1 ? [value[0]] : Array.apply(null, value);
}
