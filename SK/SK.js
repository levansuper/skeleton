/*

This file is part of Skeletonode Library

Copyright (c) 2012 Levan Basharuli

contact: l.basharuli@gmail.com


*/
/**
 * @class SK
 * @singleton
 */
(function() {
    var global = this;
    if (typeof SK === 'undefined') {
        global.SK = {};
    }

    SK.global = global;



    /**
     * Copies all the properties of config to the specified object.
     * Note that if recursive merging and cloning without referencing the original objects / arrays is needed, use
     * {@link SK.Object#merge} instead.
     * @param {Object} object The receiver of the properties
     * @param {Object} config The source of the properties
     * @param {Object} defaults A different object that will also be applied for default values
     * @return {Object} returns obj
     */
    SK.apply = function(object, config, defaults) {
        if (defaults) {
            SK.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }
        }

        return object;
    };
    
    
    SK.apply(SK, {
        dirname:__dirname        
    })


    SK.apply(SK, {
        /**
         * A reusable empty function
         */
        emptyFn: function() {},

        /**
         * Copies all the properties of config to object if they don't already exist.
         * @param {Object} object The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf: function(object, config) {
            var property;

            if (object) {
                for (property in config) {
                    if (object[property] === undefined) {
                        object[property] = config[property];
                    }
                }
            }

            return object;
        },

        /**
         * Iterates either an array or an object. This method delegates to
         * {@link SK.Array#each SK.Array.each} if the given value is iterable, and {@link SK.Object#each SK.Object.each} otherwise.
         *
         * @param {Object/Array} object The object or array to be iterated.
         * @param {Function} fn The function to be called for each iteration. See and {@link SK.Array#each SK.Array.each} and
         * {@link SK.Object#each SK.Object.each} for detailed lists of arguments passed to this function depending on the given object
         * type that is being iterated.
         * @param {Object} scope (Optional) The scope (`this` reference) in which the specified function is executed.
         * Defaults to the object being iterated itself.
         * @markdown
         */
        iterate: function(object, fn, scope) {
            if (SK.isEmpty(object)) {
                return;
            }

            if (scope === undefined) {
                scope = object;
            }

            if (SK.isIterable(object)) {
                SK.Array.each.call(SK.Array, object, fn, scope);
            }
            else {
                SK.Object.each.call(SK.Object, object, fn, scope);
            }
        }
    });

    SK.apply(SK, {
        /**
         * Proxy to {@link SK.Base#override}. Please refer {@link SK.Base#override} for further details.

    SK.define('My.cool.Class', {
        sayHi: function() {
            alert('Hi!');
        }
    }

    SK.override(My.cool.Class, {
        sayHi: function() {
            alert('About to say...');

            this.callOverridden();
        }
    });

    var cool = new My.cool.Class();
    cool.sayHi(); // alerts 'About to say...'
                  // alerts 'Hi!'

         * Please note that `this.callOverridden()` only works if the class was previously
         * created with {@link SK#define)
         *
         * @param {Object} cls The class to override
         * @param {Object} overrides The list of functions to add to origClass. This should be specified as an object literal
         * containing one or more methods.
         * @method override
         * @markdown
         */
        override: function(cls, overrides) {
            if (cls.prototype.$className) {
                return cls.override(overrides);
            }
            else {
                SK.apply(cls.prototype, overrides);
            }
        }
    });

    // A full set of static methods to do type checking
    SK.apply(SK, {

        /**
         * Returns the given value itself if it's not empty, as described in {@link SK#isEmpty}; returns the default
         * value (second argument) otherwise.
         *
         * @param {Object} value The value to test
         * @param {Object} defaultValue The value to return if the original value is empty
         * @param {Boolean} allowBlank (optional) true to allow zero length strings to qualify as non-empty (defaults to false)
         * @return {Object} value, if non-empty, else defaultValue
         */
        valueFrom: function(value, defaultValue, allowBlank){
            return SK.isEmpty(value, allowBlank) ? defaultValue : value;
        },

        /**
         * Returns the type of the given variable in string format. List of possible values are:
         *
         * - `undefined`: If the given value is `undefined`
         * - `null`: If the given value is `null`
         * - `string`: If the given value is a string
         * - `number`: If the given value is a number
         * - `boolean`: If the given value is a boolean value
         * - `date`: If the given value is a `Date` object
         * - `function`: If the given value is a function reference
         * - `object`: If the given value is an object
         * - `array`: If the given value is an array
         * - `regexp`: If the given value is a regular expression
         * - `element`: If the given value is a DOM Element
         * @param {Object} value
         * @return {String}
         * @markdown
         */
        typeOf: function(value) {
            if (value === null) {
                return 'null';
            }

            var type = typeof value;

            if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
                return type;
            }

            var typeToString = toString.call(value);

            switch(typeToString) {
                case '[object Array]':
                    return 'array';
                case '[object Date]':
                    return 'date';
                case '[object Boolean]':
                    return 'boolean';
                case '[object Number]':
                    return 'number';
                case '[object RegExp]':
                    return 'regexp';
            }

            if (type === 'function') {
                return 'function';
            }

          

        //<debug error>
        /*SK.Error.raise({
                sourceClass: 'SK',
                sourceMethod: 'typeOf',
                msg: 'Failed to determine the type of the specified value "' + value + '". This is most likely a bug.'
            });*/
        //</debug>
        },

        /**
         * Returns true if the passed value is empty, false otherwise. The value is deemed to be empty if it is either:
         *
         * - `null`
         * - `undefined`
         * - a zero-length array
         * - a zero-length string (Unless the `allowEmptyString` parameter is set to `true`)
         *
         * @param {Object} value The value to test
         * @param {Boolean} allowEmptyString (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         * @markdown
         */
        isEmpty: function(value, allowEmptyString) {
            return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (SK.isArray(value) && value.length === 0);
        },

        /**
         * Returns true if the passed value is a JavaScript Array, false otherwise.
         *
         * @param {Object} target The target to test
         * @return {Boolean}
         * @method
         */
        isArray: ('isArray' in Array) ? Array.isArray : function(value) {
            return toString.call(value) === '[object Array]';
        },

        /**
         * Returns true if the passed value is a JavaScript Date object, false otherwise.
         * @param {Object} object The object to test
         * @return {Boolean}
         */
        isDate: function(value) {
            return toString.call(value) === '[object Date]';
        },

        /**
         * Returns true if the passed value is a JavaScript Object, false otherwise.
         * @param {Object} value The value to test
         * @return {Boolean}
         * @method
         */
        isObject: (toString.call(null) === '[object Object]') ?
        function(value) {
            // check ownerDocument here as well to exclude DOM nodes
            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } :
        function(value) {
            return toString.call(value) === '[object Object]';
        },

        /**
         * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isPrimitive: function(value) {
            var type = typeof value;

            return type === 'string' || type === 'number' || type === 'boolean';
        },

        /**
         * Returns true if the passed value is a JavaScript Function, false otherwise.
         * @param {Object} value The value to test
         * @return {Boolean}
         * @method
         */
        isFunction: function(value) {
            return typeof value === 'function';
        },

        /**
         * Returns true if the passed value is a number. Returns false for non-finite numbers.
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Validates that a value is numeric.
         * @param {Object} value Examples: 1, '1', '2.34'
         * @return {Boolean} True if numeric, false otherwise
         */
        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },

        /**
         * Returns true if the passed value is a string.
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isString: function(value) {
            return typeof value === 'string';
        },

        /**
         * Returns true if the passed value is a boolean.
         *
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

      
        /**
         * Returns true if the passed value is defined.
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },

        /**
         * Returns true if the passed value is iterable, false otherwise
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isIterable: function(value) {
            return (value && typeof value !== 'string') ? value.length !== undefined : false;
        }
    });
    
    SK.each = function(arr,fn,scope){
        var fn = fn;
        var scope = scope;
        if(!SK.isDefined(scope)){
            scope = this;
        }
        for(var i in arr){
            (function(){
                fn.apply(scope,arguments)
            })(arr[i],i,arr);    
        }        
        
    }
    
    

    SK.apply(SK, {

        /**
         * Clone almost any type of variable including array, object and Date without keeping the old reference
         * @param {Object} item The variable to clone
         * @return {Object} clone
         */
        clone: function(item) {
            if (item === null || item === undefined) {
                return item;
            }
            var type = toString.call(item);

            // Date
            if (type === '[object Date]') {
                return new Date(item.getTime());
            }

            var i, j, k, clone, key;

            // Array
            if (type === '[object Array]') {
                i = item.length;

                clone = [];

                while (i--) {
                    clone[i] = SK.clone(item[i]);
                }
            }
            // Object
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = SK.clone(item[key]);
                }

            }

            return clone || item;
        }
       
    });
    
    SK.apply(SK, {            
        namespace:function(path){
            var path = path.split('.');
            var currObj = global;
            SK.each(path,function(newNamespace){
                if(!SK.isDefined(currObj[newNamespace])){
                    currObj[newNamespace] = {};
                }
                currObj = currObj[newNamespace];
                    
            })
                
            return currObj;
        },
        getNamespace:function(path,scope){
            var path = path.split('.');
            var currObj = scope || global;
            var index = 0;
            var  found = true;
            SK.each(path,function(newNamespace){
                if(SK.isDefined(currObj[newNamespace])){
                    index++;
                    currObj = currObj[newNamespace];
                }else{
                    found = false;
                }
            })
            if(index>0 && found){
                return currObj;
            }else{
                return undefined;
            }
        }
            
    });
    SK.type = SK.typeOf;
    
    
    
    
    var cm = require('./core/ClassManager');
    SK.cm = new cm();
    
    SK.define = SK.cm.define;
    
    
    
    var Loader = require('./core/Loader');
    SK.loader = new Loader();
    SK.require = SK.loader.require;
    
})();

