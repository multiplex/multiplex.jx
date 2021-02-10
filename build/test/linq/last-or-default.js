(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../multiplex')) :
    typeof define === 'function' && define.amd ? define(['../../multiplex'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mx));
}(this, (function (mx) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var mx__default = /*#__PURE__*/_interopDefaultLegacy(mx);

    var array = [1, 2, 3, 4, 5];
    var enumerable = mx__default['default'].range(1, 5);
    var collection = new mx__default['default'].Collection(array);
    var list = new mx__default['default'].List(array);
    var linkedList = new mx__default['default'].LinkedList(array);
    var hashSet = new mx__default['default'].HashSet(array);
    var stack = new mx__default['default'].Stack(array);
    var queue = new mx__default['default'].Queue(array);
    var set = new mx__default['default'].Set(array);
    var map = new mx__default['default'].Map();
    var dictionary = new mx__default['default'].Dictionary();
    var sortedList = new mx__default['default'].SortedList();
    var readOnlyCollection = list.asReadOnly();
    var lookup = new mx__default['default'].Lookup(array, function (t) {
        return t;
    });

    for (var i = 0; i < array.length; i++) {
        map.set(array[i], array[i]);
        dictionary.set(array[i], array[i]);
        sortedList.add(array[i], array[i]);
    }

    var qunit = typeof QUnit === 'undefined' ? require('qunitjs') : QUnit;
    var qmodule = qunit.module;
    var qtest = qunit.test;
    qunit.expect;

    qmodule('linq-last-or-default');

    function simpleNumericPredicate(t) {
        return t > 100;
    }


    qtest('basic "lastOrDefault" test', function (assert) {
        assert.equal(mx__default['default']([]).lastOrDefault(), null, 'lastOrDefault of an empty iterator');
        assert.equal(mx__default['default']([]).lastOrDefault(simpleNumericPredicate, 0), 0, 'lastOrDefault of an empty iterator with default value');

        assert.equal(mx__default['default'](array).lastOrDefault(), 5, 'lastOrDefault of an array of numbers');
        assert.equal(mx__default['default'](array).lastOrDefault(simpleNumericPredicate), null, 'lastOrDefault of an array of numbers with predicate');
        assert.equal(mx__default['default'](array).lastOrDefault(simpleNumericPredicate, 0), 0, 'lastOrDefault of an array of numbers with predicate and default value');
        assert.equal(mx__default['default']('string').lastOrDefault(), 'g', 'lastOrDefault of an string');
    });


    qtest('collections "lastOrDefault" method tests', function (assert) {
        assert.equal(enumerable.lastOrDefault(), 5, 'Test "lastOrDefault" in an enumerable');
        assert.equal(enumerable.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in an enumerable with predicate');
        assert.equal(enumerable.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in an enumerable with predicate and default value');

        assert.equal(collection.lastOrDefault(), 5, 'Test "lastOrDefault" in a Collection');
        assert.equal(collection.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a Collection with predicate');
        assert.equal(collection.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a Collection with predicate and default value');

        assert.equal(list.lastOrDefault(), 5, 'Test "lastOrDefault" in a List');
        assert.equal(list.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a List with predicate');
        assert.equal(list.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a List with predicate and default value');

        assert.equal(readOnlyCollection.lastOrDefault(), 5, 'Test "lastOrDefault" in a ReadOnlyCollection');
        assert.equal(readOnlyCollection.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a ReadOnlyCollection with predicate');
        assert.equal(readOnlyCollection.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a ReadOnlyCollection with predicate and default value');

        assert.equal(linkedList.lastOrDefault(), 5, 'Test "lastOrDefault" in a LinkedList');
        assert.equal(linkedList.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a LinkedList with predicate');
        assert.equal(linkedList.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a LinkedList with predicate and default value');

        assert.equal(hashSet.lastOrDefault(), 5, 'Test "lastOrDefault" in a HashSet');
        assert.equal(hashSet.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a HashSet with predicate');
        assert.equal(hashSet.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a HashSet with predicate and default value');

        assert.equal(stack.lastOrDefault(), 5, 'Test "lastOrDefault" in a Stack');
        assert.equal(stack.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a Stack with predicate');
        assert.equal(stack.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a Stack with predicate and default value');

        assert.equal(queue.lastOrDefault(), 5, 'Test "lastOrDefault" in a Queue');
        assert.equal(queue.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a Queue with predicate');
        assert.equal(queue.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a Queue with predicate and default value');

        assert.equal(set.lastOrDefault(), 5, 'Test "lastOrDefault" in a Set');
        assert.equal(set.lastOrDefault(simpleNumericPredicate), null, 'Test "lastOrDefault" in a Set with predicate');
        assert.equal(set.lastOrDefault(simpleNumericPredicate, 0), 0, 'Test "lastOrDefault" in a Set with predicate and default value');

        assert.equal(map.lastOrDefault()[0], 5, 'Test "lastOrDefault" in a Map');
        assert.equal(map.lastOrDefault(function (t) {
            return t[0] > 100;
        }), null, 'Test "lastOrDefault" in a Map with predicate');
        assert.equal(map.lastOrDefault(function (t) {
            return t[0] > 100;
        }, 0), 0, 'Test "lastOrDefault" in a Map with predicate and default value');

        function keyvaluePredicate(t) {
            return t.key > 100;
        }

        assert.equal(dictionary.lastOrDefault().key, 5, 'Test "lastOrDefault" in a Dictionary');
        assert.equal(dictionary.lastOrDefault(keyvaluePredicate), null, 'Test "lastOrDefault" in a Dictionary with predicate');
        assert.equal(dictionary.lastOrDefault(keyvaluePredicate, 0), 0, 'Test "lastOrDefault" in a Dictionary with predicate and default value');

        assert.equal(lookup.lastOrDefault().key, 5, 'Test "lastOrDefault" in a Lookup');
        assert.equal(lookup.lastOrDefault(keyvaluePredicate), null, 'Test "lastOrDefault" in a Lookup with predicate');
        assert.equal(lookup.lastOrDefault(keyvaluePredicate, 0), 0, 'Test "lastOrDefault" in a Lookup with predicate and default value');

        assert.equal(sortedList.lastOrDefault().key, 5, 'Test "lastOrDefault" in a SortedList');
        assert.equal(sortedList.lastOrDefault(keyvaluePredicate), null, 'Test "lastOrDefault" in a SortedList with predicate');
        assert.equal(sortedList.lastOrDefault(keyvaluePredicate, 0), 0, 'Test "lastOrDefault" in a SortedList with predicate and default value');
    });


    qtest('lastOrDefault method validations', function (assert) {
        assert.throws(function () {
            mx__default['default']([1]).lastOrDefault(1);
        }, 'non-function predicate');
    });

})));

