(function () {
  'use strict';

  /*!
   * Glide.js v3.4.1
   * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
   * Released under the MIT License.
   */
  var defaults = {
    /**
     * Type of the movement.
     *
     * Available types:
     * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
     * `carousel` - Changes slides without starting over when it reaches the first or last slide.
     *
     * @type {String}
     */
    type: 'slider',

    /**
     * Start at specific slide number defined with zero-based index.
     *
     * @type {Number}
     */
    startAt: 0,

    /**
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perView: 1,

    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,

    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,

    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,

    /**
     * Stop autoplay on mouseover event.
     *
     * @type {Boolean}
     */
    hoverpause: true,

    /**
     * Allow for changing slides with left and right keyboard arrows.
     *
     * @type {Boolean}
     */
    keyboard: true,

    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only with `slider` type and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,

    /**
     * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
     *
     * @type {Number|Boolean}
     */
    swipeThreshold: 80,

    /**
     * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
     *
     * @type {Number|Boolean}
     */
    dragThreshold: 120,

    /**
     * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
     *
     * @type {Number|Boolean}
     */
    perTouch: false,

    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,

    /**
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,

    /**
     * Duration of the animation in milliseconds.
     *
     * @type {Number}
     */
    animationDuration: 400,

    /**
     * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
     *
     * @type {Boolean}
     */
    rewind: true,

    /**
     * Duration of the rewinding animation of the `slider` type in milliseconds.
     *
     * @type {Number}
     */
    rewindDuration: 800,

    /**
     * Easing function for the animation.
     *
     * @type {String}
     */
    animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 10,

    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: 'ltr',

    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
     *
     * @type {Number|String|Object}
     */
    peek: 0,

    /**
     * Collection of options applied at specified media breakpoints.
     * For example: display two slides per view under 800px.
     * `{
     *   '800px': {
     *     perView: 2
     *   }
     * }`
     */
    breakpoints: {},

    /**
     * Collection of internally used HTML classes.
     *
     * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
     * @type {Object}
     */
    classes: {
      direction: {
        ltr: 'glide--ltr',
        rtl: 'glide--rtl'
      },
      slider: 'glide--slider',
      carousel: 'glide--carousel',
      swipeable: 'glide--swipeable',
      dragging: 'glide--dragging',
      cloneSlide: 'glide__slide--clone',
      activeNav: 'glide__bullet--active',
      activeSlide: 'glide__slide--active',
      disabledArrow: 'glide__arrow--disabled'
    }
  };
  /**
   * Outputs warning message to the bowser console.
   *
   * @param  {String} msg
   * @return {Void}
   */

  function warn(msg) {
    console.error("[Glide warn]: " + msg);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
  /**
   * Converts value entered as number
   * or string to integer value.
   *
   * @param {String} value
   * @returns {Number}
   */


  function toInt(value) {
    return parseInt(value);
  }
  /**
   * Converts value entered as number
   * or string to flat value.
   *
   * @param {String} value
   * @returns {Number}
   */


  function toFloat(value) {
    return parseFloat(value);
  }
  /**
   * Indicates whether the specified value is a string.
   *
   * @param  {*}   value
   * @return {Boolean}
   */


  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * Indicates whether the specified value is an object.
   *
   * @param  {*} value
   * @return {Boolean}
   *
   * @see https://github.com/jashkenas/underscore
   */


  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
  }
  /**
   * Indicates whether the specified value is a number.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isNumber(value) {
    return typeof value === 'number';
  }
  /**
   * Indicates whether the specified value is a function.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Indicates whether the specified value is undefined.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Indicates whether the specified value is an array.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isArray(value) {
    return value.constructor === Array;
  }
  /**
   * Creates and initializes specified collection of extensions.
   * Each extension receives access to instance of glide and rest of components.
   *
   * @param {Object} glide
   * @param {Object} extensions
   *
   * @returns {Object}
   */


  function mount(glide, extensions, events) {
    var components = {};

    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn('Extension must be a function');
      }
    }

    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }

    return components;
  }
  /**
   * Defines getter and setter property on the specified object.
   *
   * @param  {Object} obj         Object where property has to be defined.
   * @param  {String} prop        Name of the defined property.
   * @param  {Object} definition  Get and set definitions for the property.
   * @return {Void}
   */


  function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }
  /**
   * Sorts aphabetically object keys.
   *
   * @param  {Object} obj
   * @return {Object}
   */


  function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function (r, k) {
      r[k] = obj[k];
      return r[k], r;
    }, {});
  }
  /**
   * Merges passed settings object with default options.
   *
   * @param  {Object} defaults
   * @param  {Object} settings
   * @return {Object}
   */


  function mergeOptions(defaults, settings) {
    var options = _extends({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
    // have to do it manually for every nested object
    // in options. Although it does not look smart,
    // it's smaller and faster than some fancy
    // merging deep-merge algorithm script.


    if (settings.hasOwnProperty('classes')) {
      options.classes = _extends({}, defaults.classes, settings.classes);

      if (settings.classes.hasOwnProperty('direction')) {
        options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
      }
    }

    if (settings.hasOwnProperty('breakpoints')) {
      options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
    }

    return options;
  }

  var EventsBus = function () {
    /**
     * Construct a EventBus instance.
     *
     * @param {Object} events
     */
    function EventsBus() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBus);
      this.events = events;
      this.hop = events.hasOwnProperty;
    }
    /**
     * Adds listener to the specifed event.
     *
     * @param {String|Array} event
     * @param {Function} handler
     */


    createClass(EventsBus, [{
      key: 'on',
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.on(event[i], handler);
          }
        } // Create the event's object if not yet created


        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        } // Add the handler to queue


        var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }
      /**
       * Runs registered handlers for specified event.
       *
       * @param {String|Array} event
       * @param {Object=} context
       */

    }, {
      key: 'emit',
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.emit(event[i], context);
          }
        } // If the event doesn't exist, or there's no handlers in queue, just leave


        if (!this.hop.call(this.events, event)) {
          return;
        } // Cycle through events queue, fire!


        this.events[event].forEach(function (item) {
          item(context || {});
        });
      }
    }]);
    return EventsBus;
  }();

  var Glide = function () {
    /**
     * Construct glide.
     *
     * @param  {String} selector
     * @param  {Object} options
     */
    function Glide(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Glide);
      this._c = {};
      this._t = [];
      this._e = new EventsBus();
      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }
    /**
     * Initializes glide.
     *
     * @param {Object} extensions Collection of extensions to initialize.
     * @return {Glide}
     */


    createClass(Glide, [{
      key: 'mount',
      value: function mount$$1() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._e.emit('mount.before');

        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn('You need to provide a object on `mount()`');
        }

        this._e.emit('mount.after');

        return this;
      }
      /**
       * Collects an instance `translate` transformers.
       *
       * @param  {Array} transformers Collection of transformers.
       * @return {Void}
       */

    }, {
      key: 'mutate',
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn('You need to provide a array on `mutate()`');
        }

        return this;
      }
      /**
       * Updates glide with specified settings.
       *
       * @param {Object} settings
       * @return {Glide}
       */

    }, {
      key: 'update',
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.settings = mergeOptions(this.settings, settings);

        if (settings.hasOwnProperty('startAt')) {
          this.index = settings.startAt;
        }

        this._e.emit('update');

        return this;
      }
      /**
       * Change slide with specified pattern. A pattern must be in the special format:
       * `>` - Move one forward
       * `<` - Move one backward
       * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
       * `>>` - Rewinds to end (last slide)
       * `<<` - Rewinds to start (first slide)
       *
       * @param {String} pattern
       * @return {Glide}
       */

    }, {
      key: 'go',
      value: function go(pattern) {
        this._c.Run.make(pattern);

        return this;
      }
      /**
       * Move track by specified distance.
       *
       * @param {String} distance
       * @return {Glide}
       */

    }, {
      key: 'move',
      value: function move(distance) {
        this._c.Transition.disable();

        this._c.Move.make(distance);

        return this;
      }
      /**
       * Destroy instance and revert all changes done by this._c.
       *
       * @return {Glide}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._e.emit('destroy');

        return this;
      }
      /**
       * Start instance autoplaying.
       *
       * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Glide}
       */

    }, {
      key: 'play',
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (interval) {
          this.settings.autoplay = interval;
        }

        this._e.emit('play');

        return this;
      }
      /**
       * Stop instance autoplaying.
       *
       * @return {Glide}
       */

    }, {
      key: 'pause',
      value: function pause() {
        this._e.emit('pause');

        return this;
      }
      /**
       * Sets glide into a idle status.
       *
       * @return {Glide}
       */

    }, {
      key: 'disable',
      value: function disable() {
        this.disabled = true;
        return this;
      }
      /**
       * Sets glide into a active status.
       *
       * @return {Glide}
       */

    }, {
      key: 'enable',
      value: function enable() {
        this.disabled = false;
        return this;
      }
      /**
       * Adds cuutom event listener with handler.
       *
       * @param  {String|Array} event
       * @param  {Function} handler
       * @return {Glide}
       */

    }, {
      key: 'on',
      value: function on(event, handler) {
        this._e.on(event, handler);

        return this;
      }
      /**
       * Checks if glide is a precised type.
       *
       * @param  {String} name
       * @return {Boolean}
       */

    }, {
      key: 'isType',
      value: function isType(name) {
        return this.settings.type === name;
      }
      /**
       * Gets value of the core options.
       *
       * @return {Object}
       */

    }, {
      key: 'settings',
      get: function get$$1() {
        return this._o;
      }
      /**
       * Sets value of the core options.
       *
       * @param  {Object} o
       * @return {Void}
       */
      ,
      set: function set$$1(o) {
        if (isObject(o)) {
          this._o = o;
        } else {
          warn('Options must be an `object` instance.');
        }
      }
      /**
       * Gets current index of the slider.
       *
       * @return {Object}
       */

    }, {
      key: 'index',
      get: function get$$1() {
        return this._i;
      }
      /**
       * Sets current index a slider.
       *
       * @return {Object}
       */
      ,
      set: function set$$1(i) {
        this._i = toInt(i);
      }
      /**
       * Gets type name of the slider.
       *
       * @return {String}
       */

    }, {
      key: 'type',
      get: function get$$1() {
        return this.settings.type;
      }
      /**
       * Gets value of the idle status.
       *
       * @return {Boolean}
       */

    }, {
      key: 'disabled',
      get: function get$$1() {
        return this._d;
      }
      /**
       * Sets value of the idle status.
       *
       * @return {Boolean}
       */
      ,
      set: function set$$1(status) {
        this._d = !!status;
      }
    }]);
    return Glide;
  }();

  function Run(Glide, Components, Events) {
    var Run = {
      /**
       * Initializes autorunning of the glide.
       *
       * @return {Void}
       */
      mount: function mount() {
        this._o = false;
      },

      /**
       * Makes glides running based on the passed moving schema.
       *
       * @param {String} move
       */
      make: function make(move) {
        var _this = this;

        if (!Glide.disabled) {
          Glide.disable();
          this.move = move;
          Events.emit('run.before', this.move);
          this.calculate();
          Events.emit('run', this.move);
          Components.Transition.after(function () {
            if (_this.isStart()) {
              Events.emit('run.start', _this.move);
            }

            if (_this.isEnd()) {
              Events.emit('run.end', _this.move);
            }

            if (_this.isOffset('<') || _this.isOffset('>')) {
              _this._o = false;
              Events.emit('run.offset', _this.move);
            }

            Events.emit('run.after', _this.move);
            Glide.enable();
          });
        }
      },

      /**
       * Calculates current index based on defined move.
       *
       * @return {Void}
       */
      calculate: function calculate() {
        var move = this.move,
            length = this.length;
        var steps = move.steps,
            direction = move.direction;
        var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

        switch (direction) {
          case '>':
            if (steps === '>') {
              Glide.index = length;
            } else if (this.isEnd()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = 0;
              }
            } else if (countableSteps) {
              Glide.index += Math.min(length - Glide.index, -toInt(steps));
            } else {
              Glide.index++;
            }

            break;

          case '<':
            if (steps === '<') {
              Glide.index = 0;
            } else if (this.isStart()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = length;
              }
            } else if (countableSteps) {
              Glide.index -= Math.min(Glide.index, toInt(steps));
            } else {
              Glide.index--;
            }

            break;

          case '=':
            Glide.index = steps;
            break;

          default:
            warn('Invalid direction pattern [' + direction + steps + '] has been used');
            break;
        }
      },

      /**
       * Checks if we are on the first slide.
       *
       * @return {Boolean}
       */
      isStart: function isStart() {
        return Glide.index === 0;
      },

      /**
       * Checks if we are on the last slide.
       *
       * @return {Boolean}
       */
      isEnd: function isEnd() {
        return Glide.index === this.length;
      },

      /**
       * Checks if we are making a offset run.
       *
       * @param {String} direction
       * @return {Boolean}
       */
      isOffset: function isOffset(direction) {
        return this._o && this.move.direction === direction;
      }
    };
    define(Run, 'move', {
      /**
       * Gets value of the move schema.
       *
       * @returns {Object}
       */
      get: function get() {
        return this._m;
      },

      /**
       * Sets value of the move schema.
       *
       * @returns {Object}
       */
      set: function set(value) {
        var step = value.substr(1);
        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });
    define(Run, 'length', {
      /**
       * Gets value of the running distance based
       * on zero-indexing number of slides.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;
        var length = Components.Html.slides.length; // If the `bound` option is acitve, a maximum running distance should be
        // reduced by `perView` and `focusAt` settings. Running distance
        // should end before creating an empty space after instance.

        if (Glide.isType('slider') && settings.focusAt !== 'center' && settings.bound) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }

        return length - 1;
      }
    });
    define(Run, 'offset', {
      /**
       * Gets status of the offsetting flag.
       *
       * @return {Boolean}
       */
      get: function get() {
        return this._o;
      }
    });
    return Run;
  }
  /**
   * Returns a current time.
   *
   * @return {Number}
   */


  function now() {
    return new Date().getTime();
  }
  /**
   * Returns a function, that, when invoked, will only be triggered
   * at most once during a given window of time.
   *
   * @param {Function} func
   * @param {Number} wait
   * @param {Object=} options
   * @return {Function}
   *
   * @see https://github.com/jashkenas/underscore
   */


  function throttle(func, wait, options) {
    var timeout = void 0,
        context = void 0,
        args = void 0,
        result = void 0;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
      var at = now();
      if (!previous && options.leading === false) previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = at;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  var MARGIN_TYPE = {
    ltr: ['marginLeft', 'marginRight'],
    rtl: ['marginRight', 'marginLeft']
  };

  function Gaps(Glide, Components, Events) {
    var Gaps = {
      /**
       * Applies gaps between slides. First and last
       * slides do not receive it's edge margins.
       *
       * @param {HTMLCollection} slides
       * @return {Void}
       */
      apply: function apply(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          var direction = Components.Direction.value;

          if (i !== 0) {
            style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][0]] = '';
          }

          if (i !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][1]] = '';
          }
        }
      },

      /**
       * Removes gaps from the slides.
       *
       * @param {HTMLCollection} slides
       * @returns {Void}
      */
      remove: function remove(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          style.marginLeft = '';
          style.marginRight = '';
        }
      }
    };
    define(Gaps, 'value', {
      /**
       * Gets value of the gap.
       *
       * @returns {Number}
       */
      get: function get() {
        return toInt(Glide.settings.gap);
      }
    });
    define(Gaps, 'grow', {
      /**
       * Gets additional dimentions value caused by gaps.
       * Used to increase width of the slides wrapper.
       *
       * @returns {Number}
       */
      get: function get() {
        return Gaps.value * (Components.Sizes.length - 1);
      }
    });
    define(Gaps, 'reductor', {
      /**
       * Gets reduction value caused by gaps.
       * Used to subtract width of the slides.
       *
       * @returns {Number}
       */
      get: function get() {
        var perView = Glide.settings.perView;
        return Gaps.value * (perView - 1) / perView;
      }
    });
    /**
     * Apply calculated gaps:
     * - after building, so slides (including clones) will receive proper margins
     * - on updating via API, to recalculate gaps with new options
     */

    Events.on(['build.after', 'update'], throttle(function () {
      Gaps.apply(Components.Html.wrapper.children);
    }, 30));
    /**
     * Remove gaps:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Gaps.remove(Components.Html.wrapper.children);
    });
    return Gaps;
  }
  /**
   * Finds siblings nodes of the passed node.
   *
   * @param  {Element} node
   * @return {Array}
   */


  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];

      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }

      return matched;
    }

    return [];
  }
  /**
   * Checks if passed node exist and is a valid element.
   *
   * @param  {Element} node
   * @return {Boolean}
   */


  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }

    return false;
  }

  var TRACK_SELECTOR = '[data-glide-el="track"]';

  function Html(Glide, Components) {
    var Html = {
      /**
       * Setup slider HTML nodes.
       *
       * @param {Glide} glide
       */
      mount: function mount() {
        this.root = Glide.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
          return !slide.classList.contains(Glide.settings.classes.cloneSlide);
        });
      }
    };
    define(Html, 'root', {
      /**
       * Gets node of the glide main element.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._r;
      },

      /**
       * Sets node of the glide main element.
       *
       * @return {Object}
       */
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }

        if (exist(r)) {
          Html._r = r;
        } else {
          warn('Root element must be a existing Html node');
        }
      }
    });
    define(Html, 'track', {
      /**
       * Gets node of the glide track with slides.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._t;
      },

      /**
       * Sets node of the glide track with slides.
       *
       * @return {Object}
       */
      set: function set(t) {
        if (exist(t)) {
          Html._t = t;
        } else {
          warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
        }
      }
    });
    define(Html, 'wrapper', {
      /**
       * Gets node of the slides wrapper.
       *
       * @return {Object}
       */
      get: function get() {
        return Html.track.children[0];
      }
    });
    return Html;
  }

  function Peek(Glide, Components, Events) {
    var Peek = {
      /**
       * Setups how much to peek based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.peek;
      }
    };
    define(Peek, 'value', {
      /**
       * Gets value of the peek.
       *
       * @returns {Number|Object}
       */
      get: function get() {
        return Peek._v;
      },

      /**
       * Sets value of the peek.
       *
       * @param {Number|Object} value
       * @return {Void}
       */
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }

        Peek._v = value;
      }
    });
    define(Peek, 'reductor', {
      /**
       * Gets reduction value caused by peek.
       *
       * @returns {Number}
       */
      get: function get() {
        var value = Peek.value;
        var perView = Glide.settings.perView;

        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }

        return value * 2 / perView;
      }
    });
    /**
     * Recalculate peeking sizes on:
     * - when resizing window to update to proper percents
     */

    Events.on(['resize', 'update'], function () {
      Peek.mount();
    });
    return Peek;
  }

  function Move(Glide, Components, Events) {
    var Move = {
      /**
       * Constructs move component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        this._o = 0;
      },

      /**
       * Calculates a movement value based on passed offset and currently active index.
       *
       * @param  {Number} offset
       * @return {Void}
       */
      make: function make() {
        var _this = this;

        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.offset = offset;
        Events.emit('move', {
          movement: this.value
        });
        Components.Transition.after(function () {
          Events.emit('move.after', {
            movement: _this.value
          });
        });
      }
    };
    define(Move, 'offset', {
      /**
       * Gets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      get: function get() {
        return Move._o;
      },

      /**
       * Sets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      set: function set(value) {
        Move._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });
    define(Move, 'translate', {
      /**
       * Gets a raw movement value.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Sizes.slideWidth * Glide.index;
      }
    });
    define(Move, 'value', {
      /**
       * Gets an actual movement value corrected by offset.
       *
       * @return {Number}
       */
      get: function get() {
        var offset = this.offset;
        var translate = this.translate;

        if (Components.Direction.is('rtl')) {
          return translate + offset;
        }

        return translate - offset;
      }
    });
    /**
     * Make movement to proper slide on:
     * - before build, so glide will start at `startAt` index
     * - on each standard run to move to newly calculated index
     */

    Events.on(['build.before', 'run'], function () {
      Move.make();
    });
    return Move;
  }

  function Sizes(Glide, Components, Events) {
    var Sizes = {
      /**
       * Setups dimentions of slides.
       *
       * @return {Void}
       */
      setupSlides: function setupSlides() {
        var width = this.slideWidth + 'px';
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = width;
        }
      },

      /**
       * Setups dimentions of slides wrapper.
       *
       * @return {Void}
       */
      setupWrapper: function setupWrapper(dimention) {
        Components.Html.wrapper.style.width = this.wrapperSize + 'px';
      },

      /**
       * Removes applied styles from HTML elements.
       *
       * @returns {Void}
       */
      remove: function remove() {
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = '';
        }

        Components.Html.wrapper.style.width = '';
      }
    };
    define(Sizes, 'length', {
      /**
       * Gets count number of the slides.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.slides.length;
      }
    });
    define(Sizes, 'width', {
      /**
       * Gets width value of the glide.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.root.offsetWidth;
      }
    });
    define(Sizes, 'wrapperSize', {
      /**
       * Gets size of the slides wrapper.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
      }
    });
    define(Sizes, 'slideWidth', {
      /**
       * Gets width value of the single slide.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
      }
    });
    /**
     * Apply calculated glide's dimensions:
     * - before building, so other dimentions (e.g. translate) will be calculated propertly
     * - when resizing window to recalculate sildes dimensions
     * - on updating via API, to calculate dimensions based on new options
     */

    Events.on(['build.before', 'resize', 'update'], function () {
      Sizes.setupSlides();
      Sizes.setupWrapper();
    });
    /**
     * Remove calculated glide's dimensions:
     * - on destoting to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Sizes.remove();
    });
    return Sizes;
  }

  function Build(Glide, Components, Events) {
    var Build = {
      /**
       * Init glide building. Adds classes, sets
       * dimensions and setups initial state.
       *
       * @return {Void}
       */
      mount: function mount() {
        Events.emit('build.before');
        this.typeClass();
        this.activeClass();
        Events.emit('build.after');
      },

      /**
       * Adds `type` class to the glide element.
       *
       * @return {Void}
       */
      typeClass: function typeClass() {
        Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      activeClass: function activeClass() {
        var classes = Glide.settings.classes;
        var slide = Components.Html.slides[Glide.index];

        if (slide) {
          slide.classList.add(classes.activeSlide);
          siblings(slide).forEach(function (sibling) {
            sibling.classList.remove(classes.activeSlide);
          });
        }
      },

      /**
       * Removes HTML classes applied at building.
       *
       * @return {Void}
       */
      removeClasses: function removeClasses() {
        var classes = Glide.settings.classes;
        Components.Html.root.classList.remove(classes[Glide.settings.type]);
        Components.Html.slides.forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    };
    /**
     * Clear building classes:
     * - on destroying to bring HTML to its initial state
     * - on updating to remove classes before remounting component
     */

    Events.on(['destroy', 'update'], function () {
      Build.removeClasses();
    });
    /**
     * Remount component:
     * - on resizing of the window to calculate new dimentions
     * - on updating settings via API
     */

    Events.on(['resize', 'update'], function () {
      Build.mount();
    });
    /**
     * Swap active class of current slide:
     * - after each move to the new index
     */

    Events.on('move.after', function () {
      Build.activeClass();
    });
    return Build;
  }

  function Clones(Glide, Components, Events) {
    var Clones = {
      /**
       * Create pattern map and collect slides to be cloned.
       */
      mount: function mount() {
        this.items = [];

        if (Glide.isType('carousel')) {
          this.items = this.collect();
        }
      },

      /**
       * Collect clones with pattern.
       *
       * @return {Void}
       */
      collect: function collect() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide.settings,
            perView = _Glide$settings.perView,
            classes = _Glide$settings.classes;
        var peekIncrementer = +!!Glide.settings.peek;
        var part = perView + peekIncrementer;
        var start = slides.slice(0, part);
        var end = slides.slice(-part);

        for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < start.length; i++) {
            var clone = start[i].cloneNode(true);
            clone.classList.add(classes.cloneSlide);
            items.push(clone);
          }

          for (var _i = 0; _i < end.length; _i++) {
            var _clone = end[_i].cloneNode(true);

            _clone.classList.add(classes.cloneSlide);

            items.unshift(_clone);
          }
        }

        return items;
      },

      /**
       * Append cloned slides with generated pattern.
       *
       * @return {Void}
       */
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html,
            wrapper = _Components$Html.wrapper,
            slides = _Components$Html.slides;
        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append = items.slice(half, items.length);
        var width = Components.Sizes.slideWidth + 'px';

        for (var i = 0; i < append.length; i++) {
          wrapper.appendChild(append[i]);
        }

        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }

        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },

      /**
       * Remove all cloned slides.
       *
       * @return {Void}
       */
      remove: function remove() {
        var items = this.items;

        for (var i = 0; i < items.length; i++) {
          Components.Html.wrapper.removeChild(items[i]);
        }
      }
    };
    define(Clones, 'grow', {
      /**
       * Gets additional dimentions value caused by clones.
       *
       * @return {Number}
       */
      get: function get() {
        return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
      }
    });
    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */

    Events.on('update', function () {
      Clones.remove();
      Clones.mount();
      Clones.append();
    });
    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */

    Events.on('build.before', function () {
      if (Glide.isType('carousel')) {
        Clones.append();
      }
    });
    /**
     * Remove clones HTMLElements:
     * - on destroying, to bring HTML to its initial state
     */

    Events.on('destroy', function () {
      Clones.remove();
    });
    return Clones;
  }

  var EventsBinder = function () {
    /**
     * Construct a EventsBinder instance.
     */
    function EventsBinder() {
      var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBinder);
      this.listeners = listeners;
    }
    /**
     * Adds events listeners to arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Function} closure
     * @param  {Boolean|Object} capture
     * @return {Void}
     */


    createClass(EventsBinder, [{
      key: 'on',
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          this.listeners[events[i]] = closure;
          el.addEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Removes event listeners from arrows HTML elements.
       *
       * @param  {String|Array} events
       * @param  {Element|Window|Document} el
       * @param  {Boolean|Object} capture
       * @return {Void}
       */

    }, {
      key: 'off',
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          el.removeEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Destroy collected listeners.
       *
       * @returns {Void}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        delete this.listeners;
      }
    }]);
    return EventsBinder;
  }();

  function Resize(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Resize = {
      /**
       * Initializes window bindings.
       */
      mount: function mount() {
        this.bind();
      },

      /**
       * Binds `rezsize` listener to the window.
       * It's a costly event, so we are debouncing it.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('resize', window, throttle(function () {
          Events.emit('resize');
        }, Glide.settings.throttle));
      },

      /**
       * Unbinds listeners from the window.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('resize', window);
      }
    };
    /**
     * Remove bindings from window:
     * - on destroying, to remove added EventListener
     */

    Events.on('destroy', function () {
      Resize.unbind();
      Binder.destroy();
    });
    return Resize;
  }

  var VALID_DIRECTIONS = ['ltr', 'rtl'];
  var FLIPED_MOVEMENTS = {
    '>': '<',
    '<': '>',
    '=': '='
  };

  function Direction(Glide, Components, Events) {
    var Direction = {
      /**
       * Setups gap value based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.direction;
      },

      /**
       * Resolves pattern based on direction value
       *
       * @param {String} pattern
       * @returns {String}
       */
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);

        if (this.is('rtl')) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }

        return pattern;
      },

      /**
       * Checks value of direction mode.
       *
       * @param {String} direction
       * @returns {Boolean}
       */
      is: function is(direction) {
        return this.value === direction;
      },

      /**
       * Applies direction class to the root HTML element.
       *
       * @return {Void}
       */
      addClass: function addClass() {
        Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
      },

      /**
       * Removes direction class from the root HTML element.
       *
       * @return {Void}
       */
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
      }
    };
    define(Direction, 'value', {
      /**
       * Gets value of the direction.
       *
       * @returns {Number}
       */
      get: function get() {
        return Direction._v;
      },

      /**
       * Sets value of the direction.
       *
       * @param {String} value
       * @return {Void}
       */
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction._v = value;
        } else {
          warn('Direction value must be `ltr` or `rtl`');
        }
      }
    });
    /**
     * Clear direction class:
     * - on destroy to bring HTML to its initial state
     * - on update to remove class before reappling bellow
     */

    Events.on(['destroy', 'update'], function () {
      Direction.removeClass();
    });
    /**
     * Remount component:
     * - on update to reflect changes in direction value
     */

    Events.on('update', function () {
      Direction.mount();
    });
    /**
     * Apply direction class:
     * - before building to apply class for the first time
     * - on updating to reapply direction class that may changed
     */

    Events.on(['build.before', 'update'], function () {
      Direction.addClass();
    });
    return Direction;
  }
  /**
   * Reflects value of glide movement.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Rtl(Glide, Components) {
    return {
      /**
       * Negates the passed translate if glide is in RTL option.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Components.Direction.is('rtl')) {
          return -translate;
        }

        return translate;
      }
    };
  }
  /**
   * Updates glide movement with a `gap` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Gap(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with number in the `gap` settings.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Gaps.value * Glide.index;
      }
    };
  }
  /**
   * Updates glide movement with width of additional clones width.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Grow(Glide, Components) {
    return {
      /**
       * Adds to the passed translate width of the half of clones.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }
  /**
   * Updates glide movement with a `peek` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Peeking(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with a `peek` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Glide.settings.focusAt >= 0) {
          var peek = Components.Peek.value;

          if (isObject(peek)) {
            return translate - peek.before;
          }

          return translate - peek;
        }

        return translate;
      }
    };
  }
  /**
   * Updates glide movement with a `focusAt` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Focusing(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with index in the `focusAt` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;

        if (focusAt === 'center') {
          return translate - (width / 2 - slideWidth / 2);
        }

        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }
  /**
   * Applies diffrent transformers on translate value.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function mutator(Glide, Components, Events) {
    /**
     * Merge instance transformers with collection of default transformers.
     * It's important that the Rtl component be last on the list,
     * so it reflects all previous transformations.
     *
     * @type {Array}
     */
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
    return {
      /**
       * Piplines translate value with registered transformers.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      mutate: function mutate(translate) {
        for (var i = 0; i < TRANSFORMERS.length; i++) {
          var transformer = TRANSFORMERS[i];

          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide, Components, Events).modify(translate);
          } else {
            warn('Transformer should be a function that returns an object with `modify()` method');
          }
        }

        return translate;
      }
    };
  }

  function Translate(Glide, Components, Events) {
    var Translate = {
      /**
       * Sets value of translate on HTML element.
       *
       * @param {Number} value
       * @return {Void}
       */
      set: function set(value) {
        var transform = mutator(Glide, Components).mutate(value);
        Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
      },

      /**
       * Removes value of translate from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transform = '';
      }
    };
    /**
     * Set new translate value:
     * - on move to reflect index change
     * - on updating via API to reflect possible changes in options
     */

    Events.on('move', function (context) {
      var gap = Components.Gaps.value;
      var length = Components.Sizes.length;
      var width = Components.Sizes.slideWidth;

      if (Glide.isType('carousel') && Components.Run.isOffset('<')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');
          Translate.set(width * (length - 1));
        });
        return Translate.set(-width - gap * length);
      }

      if (Glide.isType('carousel') && Components.Run.isOffset('>')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');
          Translate.set(0);
        });
        return Translate.set(width * length + gap * length);
      }

      return Translate.set(context.movement);
    });
    /**
     * Remove translate:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Translate.remove();
    });
    return Translate;
  }

  function Transition(Glide, Components, Events) {
    /**
     * Holds inactivity status of transition.
     * When true transition is not applied.
     *
     * @type {Boolean}
     */
    var disabled = false;
    var Transition = {
      /**
       * Composes string of the CSS transition.
       *
       * @param {String} property
       * @return {String}
       */
      compose: function compose(property) {
        var settings = Glide.settings;

        if (!disabled) {
          return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
        }

        return property + ' 0ms ' + settings.animationTimingFunc;
      },

      /**
       * Sets value of transition on HTML element.
       *
       * @param {String=} property
       * @return {Void}
       */
      set: function set() {
        var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
        Components.Html.wrapper.style.transition = this.compose(property);
      },

      /**
       * Removes value of transition from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transition = '';
      },

      /**
       * Runs callback after animation.
       *
       * @param  {Function} callback
       * @return {Void}
       */
      after: function after(callback) {
        setTimeout(function () {
          callback();
        }, this.duration);
      },

      /**
       * Enable transition.
       *
       * @return {Void}
       */
      enable: function enable() {
        disabled = false;
        this.set();
      },

      /**
       * Disable transition.
       *
       * @return {Void}
       */
      disable: function disable() {
        disabled = true;
        this.set();
      }
    };
    define(Transition, 'duration', {
      /**
       * Gets duration of the transition based
       * on currently running animation type.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;

        if (Glide.isType('slider') && Components.Run.offset) {
          return settings.rewindDuration;
        }

        return settings.animationDuration;
      }
    });
    /**
     * Set transition `style` value:
     * - on each moving, because it may be cleared by offset move
     */

    Events.on('move', function () {
      Transition.set();
    });
    /**
     * Disable transition:
     * - before initial build to avoid transitioning from `0` to `startAt` index
     * - while resizing window and recalculating dimentions
     * - on jumping from offset transition at start and end edges in `carousel` type
     */

    Events.on(['build.before', 'resize', 'translate.jump'], function () {
      Transition.disable();
    });
    /**
     * Enable transition:
     * - on each running, because it may be disabled by offset move
     */

    Events.on('run', function () {
      Transition.enable();
    });
    /**
     * Remove transition:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Transition.remove();
    });
    return Transition;
  }
  /**
   * Test via a getter in the options object to see
   * if the passive property is accessed.
   *
   * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   */


  var supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  var supportsPassive$1 = supportsPassive;
  var START_EVENTS = ['touchstart', 'mousedown'];
  var MOVE_EVENTS = ['touchmove', 'mousemove'];
  var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

  function Swipe(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Swipe = {
      /**
       * Initializes swipe bindings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bindSwipeStart();
      },

      /**
       * Handler for `swipestart` event. Calculates entry points of the user's tap.
       *
       * @param {Object} event
       * @return {Void}
       */
      start: function start(event) {
        if (!disabled && !Glide.disabled) {
          this.disable();
          var swipe = this.touches(event);
          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);
          this.bindSwipeMove();
          this.bindSwipeEnd();
          Events.emit('swipe.start');
        }
      },

      /**
       * Handler for `swipemove` event. Calculates user's tap angle and distance.
       *
       * @param {Object} event
       */
      move: function move(event) {
        if (!Glide.disabled) {
          var _Glide$settings = Glide.settings,
              touchAngle = _Glide$settings.touchAngle,
              touchRatio = _Glide$settings.touchRatio,
              classes = _Glide$settings.classes;
          var swipe = this.touches(event);
          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);
          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();
            Components.Move.make(subExSx * toFloat(touchRatio));
            Components.Html.root.classList.add(classes.dragging);
            Events.emit('swipe.move');
          } else {
            return false;
          }
        }
      },

      /**
       * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
       *
       * @param {Object} event
       * @return {Void}
       */
      end: function end(event) {
        if (!Glide.disabled) {
          var settings = Glide.settings;
          var swipe = this.touches(event);
          var threshold = this.threshold(event);
          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);
          this.enable();

          if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
            // While swipe is positive and greater than threshold move backward.
            if (settings.perTouch) {
              steps = Math.min(steps, toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('<' + steps));
          } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
            // While swipe is negative and lower than negative threshold move forward.
            if (settings.perTouch) {
              steps = Math.max(steps, -toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('>' + steps));
          } else {
            // While swipe don't reach distance apply previous transform.
            Components.Move.make();
          }

          Components.Html.root.classList.remove(settings.classes.dragging);
          this.unbindSwipeMove();
          this.unbindSwipeEnd();
          Events.emit('swipe.end');
        }
      },

      /**
       * Binds swipe's starting event.
       *
       * @return {Void}
       */
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;

        var settings = Glide.settings;

        if (settings.swipeThreshold) {
          Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }

        if (settings.dragThreshold) {
          Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }
      },

      /**
       * Unbinds swipe's starting event.
       *
       * @return {Void}
       */
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
        Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
      },

      /**
       * Binds swipe's moving event.
       *
       * @return {Void}
       */
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;

        Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
          _this2.move(event);
        }, Glide.settings.throttle), capture);
      },

      /**
       * Unbinds swipe's moving event.
       *
       * @return {Void}
       */
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
      },

      /**
       * Binds swipe's ending event.
       *
       * @return {Void}
       */
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;

        Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
          _this3.end(event);
        });
      },

      /**
       * Unbinds swipe's ending event.
       *
       * @return {Void}
       */
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },

      /**
       * Normalizes event touches points accorting to different types.
       *
       * @param {Object} event
       */
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }

        return event.touches[0] || event.changedTouches[0];
      },

      /**
       * Gets value of minimum swipe distance settings based on event type.
       *
       * @return {Number}
       */
      threshold: function threshold(event) {
        var settings = Glide.settings;

        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }

        return settings.swipeThreshold;
      },

      /**
       * Enables swipe event.
       *
       * @return {self}
       */
      enable: function enable() {
        disabled = false;
        Components.Transition.enable();
        return this;
      },

      /**
       * Disables swipe event.
       *
       * @return {self}
       */
      disable: function disable() {
        disabled = true;
        Components.Transition.disable();
        return this;
      }
    };
    /**
     * Add component class:
     * - after initial building
     */

    Events.on('build.after', function () {
      Components.Html.root.classList.add(Glide.settings.classes.swipeable);
    });
    /**
     * Remove swiping bindings:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Swipe.unbindSwipeStart();
      Swipe.unbindSwipeMove();
      Swipe.unbindSwipeEnd();
      Binder.destroy();
    });
    return Swipe;
  }

  function Images(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Images = {
      /**
       * Binds listener to glide wrapper.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bind();
      },

      /**
       * Binds `dragstart` event on wrapper to prevent dragging images.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
      },

      /**
       * Unbinds `dragstart` event on wrapper.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('dragstart', Components.Html.wrapper);
      },

      /**
       * Event handler. Prevents dragging.
       *
       * @return {Void}
       */
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };
    /**
     * Remove bindings from images:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Images.unbind();
      Binder.destroy();
    });
    return Images;
  }

  function Anchors(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    /**
     * Holds detaching status of anchors.
     * Prevents detaching of already detached anchors.
     *
     * @private
     * @type {Boolean}
     */

    var detached = false;
    /**
     * Holds preventing status of anchors.
     * If `true` redirection after click will be disabled.
     *
     * @private
     * @type {Boolean}
     */

    var prevented = false;
    var Anchors = {
      /**
       * Setups a initial state of anchors component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        /**
         * Holds collection of anchors elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._a = Components.Html.wrapper.querySelectorAll('a');
        this.bind();
      },

      /**
       * Binds events to anchors inside a track.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('click', Components.Html.wrapper, this.click);
      },

      /**
       * Unbinds events attached to anchors inside a track.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('click', Components.Html.wrapper);
      },

      /**
       * Handler for click event. Prevents clicks when glide is in `prevent` status.
       *
       * @param  {Object} event
       * @return {Void}
       */
      click: function click(event) {
        if (prevented) {
          event.stopPropagation();
          event.preventDefault();
        }
      },

      /**
       * Detaches anchors click event inside glide.
       *
       * @return {self}
       */
      detach: function detach() {
        prevented = true;

        if (!detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = false;
            this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));
            this.items[i].removeAttribute('href');
          }

          detached = true;
        }

        return this;
      },

      /**
       * Attaches anchors click events inside glide.
       *
       * @return {self}
       */
      attach: function attach() {
        prevented = false;

        if (detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = true;
            this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
          }

          detached = false;
        }

        return this;
      }
    };
    define(Anchors, 'items', {
      /**
       * Gets collection of the arrows HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Anchors._a;
      }
    });
    /**
     * Detach anchors inside slides:
     * - on swiping, so they won't redirect to its `href` attributes
     */

    Events.on('swipe.move', function () {
      Anchors.detach();
    });
    /**
     * Attach anchors inside slides:
     * - after swiping and transitions ends, so they can redirect after click again
     */

    Events.on('swipe.end', function () {
      Components.Transition.after(function () {
        Anchors.attach();
      });
    });
    /**
     * Unbind anchors inside slides:
     * - on destroying, to bring anchors to its initial state
     */

    Events.on('destroy', function () {
      Anchors.attach();
      Anchors.unbind();
      Binder.destroy();
    });
    return Anchors;
  }

  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

  function Controls(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Controls = {
      /**
       * Inits arrows. Binds events listeners
       * to the arrows HTML elements.
       *
       * @return {Void}
       */
      mount: function mount() {
        /**
         * Collection of navigation HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
        /**
         * Collection of controls HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */

        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
        this.addBindings();
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.addClass(this._n[i].children);
        }
      },

      /**
       * Removes active class to current slide.
       *
       * @return {Void}
       */
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.removeClass(this._n[i].children);
        }
      },

      /**
       * Toggles active class on items inside navigation.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      addClass: function addClass(controls) {
        var settings = Glide.settings;
        var item = controls[Glide.index];

        if (item) {
          item.classList.add(settings.classes.activeNav);
          siblings(item).forEach(function (sibling) {
            sibling.classList.remove(settings.classes.activeNav);
          });
        }
      },

      /**
       * Removes active class from active control.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      removeClass: function removeClass(controls) {
        var item = controls[Glide.index];

        if (item) {
          item.classList.remove(Glide.settings.classes.activeNav);
        }
      },

      /**
       * Adds handles to the each group of controls.
       *
       * @return {Void}
       */
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },

      /**
       * Removes handles from the each group of controls.
       *
       * @return {Void}
       */
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },

      /**
       * Binds events to arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on('click', elements[i], this.click);
          Binder.on('touchstart', elements[i], this.click, capture);
        }
      },

      /**
       * Unbinds events binded to the arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(['click', 'touchstart'], elements[i]);
        }
      },

      /**
       * Handles `click` event on the arrows HTML elements.
       * Moves slider in driection precised in
       * `data-glide-dir` attribute.
       *
       * @param {Object} event
       * @return {Void}
       */
      click: function click(event) {
        event.preventDefault();
        Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
      }
    };
    define(Controls, 'items', {
      /**
       * Gets collection of the controls HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Controls._c;
      }
    });
    /**
     * Swap active class of current navigation item:
     * - after mounting to set it to initial index
     * - after each move to the new index
     */

    Events.on(['mount.after', 'move.after'], function () {
      Controls.setActive();
    });
    /**
     * Remove bindings and HTML Classes:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Controls.removeBindings();
      Controls.removeActive();
      Binder.destroy();
    });
    return Controls;
  }

  function Keyboard(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Keyboard = {
      /**
       * Binds keyboard events on component mount.
       *
       * @return {Void}
       */
      mount: function mount() {
        if (Glide.settings.keyboard) {
          this.bind();
        }
      },

      /**
       * Adds keyboard press events.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('keyup', document, this.press);
      },

      /**
       * Removes keyboard press events.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('keyup', document);
      },

      /**
       * Handles keyboard's arrows press and moving glide foward and backward.
       *
       * @param  {Object} event
       * @return {Void}
       */
      press: function press(event) {
        if (event.keyCode === 39) {
          Components.Run.make(Components.Direction.resolve('>'));
        }

        if (event.keyCode === 37) {
          Components.Run.make(Components.Direction.resolve('<'));
        }
      }
    };
    /**
     * Remove bindings from keyboard:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */

    Events.on(['destroy', 'update'], function () {
      Keyboard.unbind();
    });
    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */

    Events.on('update', function () {
      Keyboard.mount();
    });
    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Keyboard;
  }

  function Autoplay(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Autoplay = {
      /**
       * Initializes autoplaying and events.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.start();

        if (Glide.settings.hoverpause) {
          this.bind();
        }
      },

      /**
       * Starts autoplaying in configured interval.
       *
       * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Void}
       */
      start: function start() {
        var _this = this;

        if (Glide.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function () {
              _this.stop();

              Components.Run.make('>');

              _this.start();
            }, this.time);
          }
        }
      },

      /**
       * Stops autorunning of the glide.
       *
       * @return {Void}
       */
      stop: function stop() {
        this._i = clearInterval(this._i);
      },

      /**
       * Stops autoplaying while mouse is over glide's area.
       *
       * @return {Void}
       */
      bind: function bind() {
        var _this2 = this;

        Binder.on('mouseover', Components.Html.root, function () {
          _this2.stop();
        });
        Binder.on('mouseout', Components.Html.root, function () {
          _this2.start();
        });
      },

      /**
       * Unbind mouseover events.
       *
       * @returns {Void}
       */
      unbind: function unbind() {
        Binder.off(['mouseover', 'mouseout'], Components.Html.root);
      }
    };
    define(Autoplay, 'time', {
      /**
       * Gets time period value for the autoplay interval. Prioritizes
       * times in `data-glide-autoplay` attrubutes over options.
       *
       * @return {Number}
       */
      get: function get() {
        var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

        if (autoplay) {
          return toInt(autoplay);
        }

        return toInt(Glide.settings.autoplay);
      }
    });
    /**
     * Stop autoplaying and unbind events:
     * - on destroying, to clear defined interval
     * - on updating via API to reset interval that may changed
     */

    Events.on(['destroy', 'update'], function () {
      Autoplay.unbind();
    });
    /**
     * Stop autoplaying:
     * - before each run, to restart autoplaying
     * - on pausing via API
     * - on destroying, to clear defined interval
     * - while starting a swipe
     * - on updating via API to reset interval that may changed
     */

    Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
      Autoplay.stop();
    });
    /**
     * Start autoplaying:
     * - after each run, to restart autoplaying
     * - on playing via API
     * - while ending a swipe
     */

    Events.on(['run.after', 'play', 'swipe.end'], function () {
      Autoplay.start();
    });
    /**
     * Remount autoplaying:
     * - on updating via API to reset interval that may changed
     */

    Events.on('update', function () {
      Autoplay.mount();
    });
    /**
     * Destroy a binder:
     * - on destroying glide instance to clearup listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Autoplay;
  }
  /**
   * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
   *
   * @param {Object} points
   * @returns {Object}
   */


  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn('Breakpoints option must be an object');
    }

    return {};
  }

  function Breakpoints(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    /**
     * Holds reference to settings.
     *
     * @type {Object}
     */

    var settings = Glide.settings;
    /**
     * Holds reference to breakpoints object in settings. Sorts breakpoints
     * from smaller to larger. It is required in order to proper
     * matching currently active breakpoint settings.
     *
     * @type {Object}
     */

    var points = sortBreakpoints(settings.breakpoints);
    /**
     * Cache initial settings before overwritting.
     *
     * @type {Object}
     */

    var defaults = _extends({}, settings);

    var Breakpoints = {
      /**
       * Matches settings for currectly matching media breakpoint.
       *
       * @param {Object} points
       * @returns {Object}
       */
      match: function match(points) {
        if (typeof window.matchMedia !== 'undefined') {
          for (var point in points) {
            if (points.hasOwnProperty(point)) {
              if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
                return points[point];
              }
            }
          }
        }

        return defaults;
      }
    };
    /**
     * Overwrite instance settings with currently matching breakpoint settings.
     * This happens right after component initialization.
     */

    _extends(settings, Breakpoints.match(points));
    /**
     * Update glide with settings of matched brekpoint:
     * - window resize to update slider
     */


    Binder.on('resize', window, throttle(function () {
      Glide.settings = mergeOptions(settings, Breakpoints.match(points));
    }, Glide.settings.throttle));
    /**
     * Resort and update default settings:
     * - on reinit via API, so breakpoint matching will be performed with options
     */

    Events.on('update', function () {
      points = sortBreakpoints(points);
      defaults = _extends({}, settings);
    });
    /**
     * Unbind resize listener:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Binder.off('resize', window);
    });
    return Breakpoints;
  }

  var COMPONENTS = {
    // Required
    Html: Html,
    Translate: Translate,
    Transition: Transition,
    Direction: Direction,
    Peek: Peek,
    Sizes: Sizes,
    Gaps: Gaps,
    Move: Move,
    Clones: Clones,
    Resize: Resize,
    Build: Build,
    Run: Run,
    // Optional
    Swipe: Swipe,
    Images: Images,
    Anchors: Anchors,
    Controls: Controls,
    Keyboard: Keyboard,
    Autoplay: Autoplay,
    Breakpoints: Breakpoints
  };

  var Glide$1 = function (_Core) {
    inherits(Glide$$1, _Core);

    function Glide$$1() {
      classCallCheck(this, Glide$$1);
      return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
    }

    createClass(Glide$$1, [{
      key: 'mount',
      value: function mount() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
      }
    }]);
    return Glide$$1;
  }(Glide);

  new Glide$1(".glide", {
    type: "carousel",
    perView: 4,
    autoplay: 3000
  }).mount();

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUuanMiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AZ2xpZGVqcy9nbGlkZS9kaXN0L2dsaWRlLmVzbS5qcyIsInNyYy9qcy9nbGlkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEdsaWRlLmpzIHYzLjQuMVxuICogKGMpIDIwMTMtMjAxOSBKxJlkcnplaiBDaGHFgnViZWsgPGplZHJ6ZWouY2hhbHViZWtAZ21haWwuY29tPiAoaHR0cDovL2plZHJ6ZWpjaGFsdWJlay5jb20vKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIG1vdmVtZW50LlxuICAgKlxuICAgKiBBdmFpbGFibGUgdHlwZXM6XG4gICAqIGBzbGlkZXJgIC0gUmV3aW5kcyBzbGlkZXIgdG8gdGhlIHN0YXJ0L2VuZCB3aGVuIGl0IHJlYWNoZXMgdGhlIGZpcnN0IG9yIGxhc3Qgc2xpZGUuXG4gICAqIGBjYXJvdXNlbGAgLSBDaGFuZ2VzIHNsaWRlcyB3aXRob3V0IHN0YXJ0aW5nIG92ZXIgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgdHlwZTogJ3NsaWRlcicsXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGF0IHNwZWNpZmljIHNsaWRlIG51bWJlciBkZWZpbmVkIHdpdGggemVyby1iYXNlZCBpbmRleC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHN0YXJ0QXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgbnVtYmVyIG9mIHNsaWRlcyB2aXNpYmxlIG9uIHRoZSBzaW5nbGUgdmlld3BvcnQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBwZXJWaWV3OiAxLFxuXG4gIC8qKlxuICAgKiBGb2N1cyBjdXJyZW50bHkgYWN0aXZlIHNsaWRlIGF0IGEgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSB0cmFjay5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogYGNlbnRlcmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgYWx3YXlzIGZvY3VzZWQgYXQgdGhlIGNlbnRlciBvZiBhIHRyYWNrLlxuICAgKiBgMCwxLDIsMy4uLmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgZm9jdXNlZCBvbiB0aGUgc3BlY2lmaWVkIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgKi9cbiAgZm9jdXNBdDogMCxcblxuICAvKipcbiAgICogQSBzaXplIG9mIHRoZSBnYXAgYWRkZWQgYmV0d2VlbiBzbGlkZXMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnYXA6IDEwLFxuXG4gIC8qKlxuICAgKiBDaGFuZ2Ugc2xpZGVzIGFmdGVyIGEgc3BlY2lmaWVkIGludGVydmFsLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYXV0b3BsYXkuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGF1dG9wbGF5OiBmYWxzZSxcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheSBvbiBtb3VzZW92ZXIgZXZlbnQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgaG92ZXJwYXVzZTogdHJ1ZSxcblxuICAvKipcbiAgICogQWxsb3cgZm9yIGNoYW5naW5nIHNsaWRlcyB3aXRoIGxlZnQgYW5kIHJpZ2h0IGtleWJvYXJkIGFycm93cy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBrZXlib2FyZDogdHJ1ZSxcblxuICAvKipcbiAgICogU3RvcCBydW5uaW5nIGBwZXJWaWV3YCBudW1iZXIgb2Ygc2xpZGVzIGZyb20gdGhlIGVuZC4gVXNlIHRoaXNcbiAgICogb3B0aW9uIGlmIHlvdSBkb24ndCB3YW50IHRvIGhhdmUgYW4gZW1wdHkgc3BhY2UgYWZ0ZXJcbiAgICogYSBzbGlkZXIuIFdvcmtzIG9ubHkgd2l0aCBgc2xpZGVyYCB0eXBlIGFuZCBhXG4gICAqIG5vbi1jZW50ZXJlZCBgZm9jdXNBdGAgc2V0dGluZy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBib3VuZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgc3dpcGUgZGlzdGFuY2UgbmVlZGVkIHRvIGNoYW5nZSB0aGUgc2xpZGUuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhIHN3aXBpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHN3aXBlVGhyZXNob2xkOiA4MCxcblxuICAvKipcbiAgICogTWluaW1hbCBtb3VzZSBkcmFnIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgZHJhZ1RocmVzaG9sZDogMTIwLFxuXG4gIC8qKlxuICAgKiBBIG1heGltdW0gbnVtYmVyIG9mIHNsaWRlcyB0byB3aGljaCBtb3ZlbWVudCB3aWxsIGJlIG1hZGUgb24gc3dpcGluZyBvciBkcmFnZ2luZy4gVXNlIGBmYWxzZWAgZm9yIHVubGltaXRlZC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgcGVyVG91Y2g6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNb3ZpbmcgZGlzdGFuY2UgcmF0aW8gb2YgdGhlIHNsaWRlcyBvbiBhIHN3aXBpbmcgYW5kIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hSYXRpbzogMC41LFxuXG4gIC8qKlxuICAgKiBBbmdsZSByZXF1aXJlZCB0byBhY3RpdmF0ZSBzbGlkZXMgbW92aW5nIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0b3VjaEFuZ2xlOiA0NSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNDAwLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgbG9vcGluZyB0aGUgYHNsaWRlcmAgdHlwZS4gU2xpZGVyIHdpbGwgcmV3aW5kIHRvIHRoZSBmaXJzdC9sYXN0IHNsaWRlIHdoZW4gaXQncyBhdCB0aGUgc3RhcnQvZW5kLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHJld2luZDogdHJ1ZSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIHJld2luZGluZyBhbmltYXRpb24gb2YgdGhlIGBzbGlkZXJgIHR5cGUgaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcmV3aW5kRHVyYXRpb246IDgwMCxcblxuICAvKipcbiAgICogRWFzaW5nIGZ1bmN0aW9uIGZvciB0aGUgYW5pbWF0aW9uLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgYW5pbWF0aW9uVGltaW5nRnVuYzogJ2N1YmljLWJlemllciguMTY1LCAuODQwLCAuNDQwLCAxKScsXG5cbiAgLyoqXG4gICAqIFRocm90dGxlIGNvc3RseSBldmVudHMgYXQgbW9zdCBvbmNlIHBlciBldmVyeSB3YWl0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRocm90dGxlOiAxMCxcblxuICAvKipcbiAgICogTW92aW5nIGRpcmVjdGlvbiBtb2RlLlxuICAgKlxuICAgKiBBdmFpbGFibGUgaW5wdXRzOlxuICAgKiAtICdsdHInIC0gbGVmdCB0byByaWdodCBtb3ZlbWVudCxcbiAgICogLSAncnRsJyAtIHJpZ2h0IHRvIGxlZnQgbW92ZW1lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBkaXJlY3Rpb246ICdsdHInLFxuXG4gIC8qKlxuICAgKiBUaGUgZGlzdGFuY2UgdmFsdWUgb2YgdGhlIG5leHQgYW5kIHByZXZpb3VzIHZpZXdwb3J0cyB3aGljaFxuICAgKiBoYXZlIHRvIHBlZWsgaW4gdGhlIGN1cnJlbnQgdmlldy4gQWNjZXB0cyBudW1iZXIgYW5kXG4gICAqIHBpeGVscyBhcyBhIHN0cmluZy4gTGVmdCBhbmQgcmlnaHQgcGVla2luZyBjYW4gYmVcbiAgICogc2V0IHVwIHNlcGFyYXRlbHkgd2l0aCBhIGRpcmVjdGlvbnMgb2JqZWN0LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZTpcbiAgICogYDEwMGAgLSBQZWVrIDEwMHB4IG9uIHRoZSBib3RoIHNpZGVzLlxuICAgKiB7IGJlZm9yZTogMTAwLCBhZnRlcjogNTAgfWAgLSBQZWVrIDEwMHB4IG9uIHRoZSBsZWZ0IHNpZGUgYW5kIDUwcHggb24gdGhlIHJpZ2h0IHNpZGUuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8U3RyaW5nfE9iamVjdH1cbiAgICovXG4gIHBlZWs6IDAsXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2Ygb3B0aW9ucyBhcHBsaWVkIGF0IHNwZWNpZmllZCBtZWRpYSBicmVha3BvaW50cy5cbiAgICogRm9yIGV4YW1wbGU6IGRpc3BsYXkgdHdvIHNsaWRlcyBwZXIgdmlldyB1bmRlciA4MDBweC5cbiAgICogYHtcbiAgICogICAnODAwcHgnOiB7XG4gICAqICAgICBwZXJWaWV3OiAyXG4gICAqICAgfVxuICAgKiB9YFxuICAgKi9cbiAgYnJlYWtwb2ludHM6IHt9LFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGludGVybmFsbHkgdXNlZCBIVE1MIGNsYXNzZXMuXG4gICAqXG4gICAqIEB0b2RvIFJlZmFjdG9yIGBzbGlkZXJgIGFuZCBgY2Fyb3VzZWxgIHByb3BlcnRpZXMgdG8gc2luZ2xlIGB0eXBlOiB7IHNsaWRlcjogJycsIGNhcm91c2VsOiAnJyB9YCBvYmplY3RcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGNsYXNzZXM6IHtcbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIGx0cjogJ2dsaWRlLS1sdHInLFxuICAgICAgcnRsOiAnZ2xpZGUtLXJ0bCdcbiAgICB9LFxuICAgIHNsaWRlcjogJ2dsaWRlLS1zbGlkZXInLFxuICAgIGNhcm91c2VsOiAnZ2xpZGUtLWNhcm91c2VsJyxcbiAgICBzd2lwZWFibGU6ICdnbGlkZS0tc3dpcGVhYmxlJyxcbiAgICBkcmFnZ2luZzogJ2dsaWRlLS1kcmFnZ2luZycsXG4gICAgY2xvbmVTbGlkZTogJ2dsaWRlX19zbGlkZS0tY2xvbmUnLFxuICAgIGFjdGl2ZU5hdjogJ2dsaWRlX19idWxsZXQtLWFjdGl2ZScsXG4gICAgYWN0aXZlU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWFjdGl2ZScsXG4gICAgZGlzYWJsZWRBcnJvdzogJ2dsaWRlX19hcnJvdy0tZGlzYWJsZWQnXG4gIH1cbn07XG5cbi8qKlxuICogT3V0cHV0cyB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGJvd3NlciBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gbXNnXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5mdW5jdGlvbiB3YXJuKG1zZykge1xuICBjb25zb2xlLmVycm9yKFwiW0dsaWRlIHdhcm5dOiBcIiArIG1zZyk7XG59XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gaW50ZWdlciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHRvSW50KHZhbHVlKSB7XG4gIHJldHVybiBwYXJzZUludCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgdmFsdWUgZW50ZXJlZCBhcyBudW1iZXJcbiAqIG9yIHN0cmluZyB0byBmbGF0IHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHsqfSAgIHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpO1xuXG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG51bWJlci5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyBzcGVjaWZpZWQgY29sbGVjdGlvbiBvZiBleHRlbnNpb25zLlxuICogRWFjaCBleHRlbnNpb24gcmVjZWl2ZXMgYWNjZXNzIHRvIGluc3RhbmNlIG9mIGdsaWRlIGFuZCByZXN0IG9mIGNvbXBvbmVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGdsaWRlXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9uc1xuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1vdW50KGdsaWRlLCBleHRlbnNpb25zLCBldmVudHMpIHtcbiAgdmFyIGNvbXBvbmVudHMgPSB7fTtcblxuICBmb3IgKHZhciBuYW1lIGluIGV4dGVuc2lvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihleHRlbnNpb25zW25hbWVdKSkge1xuICAgICAgY29tcG9uZW50c1tuYW1lXSA9IGV4dGVuc2lvbnNbbmFtZV0oZ2xpZGUsIGNvbXBvbmVudHMsIGV2ZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ0V4dGVuc2lvbiBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29tcG9uZW50c1tfbmFtZV0ubW91bnQpKSB7XG4gICAgICBjb21wb25lbnRzW19uYW1lXS5tb3VudCgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnRzO1xufVxuXG4vKipcbiAqIERlZmluZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgcHJvcGVydHkgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogICAgICAgICBPYmplY3Qgd2hlcmUgcHJvcGVydHkgaGFzIHRvIGJlIGRlZmluZWQuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3AgICAgICAgIE5hbWUgb2YgdGhlIGRlZmluZWQgcHJvcGVydHkuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmluaXRpb24gIEdldCBhbmQgc2V0IGRlZmluaXRpb25zIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5mdW5jdGlvbiBkZWZpbmUob2JqLCBwcm9wLCBkZWZpbml0aW9uKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlZmluaXRpb24pO1xufVxuXG4vKipcbiAqIFNvcnRzIGFwaGFiZXRpY2FsbHkgb2JqZWN0IGtleXMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc29ydEtleXMob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24gKHIsIGspIHtcbiAgICByW2tdID0gb2JqW2tdO1xuXG4gICAgcmV0dXJuIHJba10sIHI7XG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBNZXJnZXMgcGFzc2VkIHNldHRpbmdzIG9iamVjdCB3aXRoIGRlZmF1bHQgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmF1bHRzXG4gKiBAcGFyYW0gIHtPYmplY3R9IHNldHRpbmdzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhkZWZhdWx0cywgc2V0dGluZ3MpIHtcbiAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMsIHNldHRpbmdzKTtcblxuICAvLyBgT2JqZWN0LmFzc2lnbmAgZG8gbm90IGRlZXBseSBtZXJnZSBvYmplY3RzLCBzbyB3ZVxuICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5IGZvciBldmVyeSBuZXN0ZWQgb2JqZWN0XG4gIC8vIGluIG9wdGlvbnMuIEFsdGhvdWdoIGl0IGRvZXMgbm90IGxvb2sgc21hcnQsXG4gIC8vIGl0J3Mgc21hbGxlciBhbmQgZmFzdGVyIHRoYW4gc29tZSBmYW5jeVxuICAvLyBtZXJnaW5nIGRlZXAtbWVyZ2UgYWxnb3JpdGhtIHNjcmlwdC5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdjbGFzc2VzJykpIHtcbiAgICBvcHRpb25zLmNsYXNzZXMgPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMuY2xhc3Nlcywgc2V0dGluZ3MuY2xhc3Nlcyk7XG5cbiAgICBpZiAoc2V0dGluZ3MuY2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eSgnZGlyZWN0aW9uJykpIHtcbiAgICAgIG9wdGlvbnMuY2xhc3Nlcy5kaXJlY3Rpb24gPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMuY2xhc3Nlcy5kaXJlY3Rpb24sIHNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2JyZWFrcG9pbnRzJykpIHtcbiAgICBvcHRpb25zLmJyZWFrcG9pbnRzID0gX2V4dGVuZHMoe30sIGRlZmF1bHRzLmJyZWFrcG9pbnRzLCBzZXR0aW5ncy5icmVha3BvaW50cyk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIEV2ZW50c0J1cyA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIEV2ZW50QnVzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRzXG4gICAqL1xuICBmdW5jdGlvbiBFdmVudHNCdXMoKSB7XG4gICAgdmFyIGV2ZW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRzQnVzKTtcblxuICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuICAgIHRoaXMuaG9wID0gZXZlbnRzLmhhc093blByb3BlcnR5O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cblxuXG4gIGNyZWF0ZUNsYXNzKEV2ZW50c0J1cywgW3tcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMub24oZXZlbnRbaV0sIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQncyBvYmplY3QgaWYgbm90IHlldCBjcmVhdGVkXG4gICAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRoZSBoYW5kbGVyIHRvIHF1ZXVlXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChoYW5kbGVyKSAtIDE7XG5cbiAgICAgIC8vIFByb3ZpZGUgaGFuZGxlIGJhY2sgZm9yIHJlbW92YWwgb2YgZXZlbnRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudF1baW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgcmVnaXN0ZXJlZCBoYW5kbGVycyBmb3Igc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBjb250ZXh0XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2VtaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0KGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZW1pdChldmVudFtpXSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGV2ZW50IGRvZXNuJ3QgZXhpc3QsIG9yIHRoZXJlJ3Mgbm8gaGFuZGxlcnMgaW4gcXVldWUsIGp1c3QgbGVhdmVcbiAgICAgIGlmICghdGhpcy5ob3AuY2FsbCh0aGlzLmV2ZW50cywgZXZlbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ3ljbGUgdGhyb3VnaCBldmVudHMgcXVldWUsIGZpcmUhXG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtKGNvbnRleHQgfHwge30pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFdmVudHNCdXM7XG59KCk7XG5cbnZhciBHbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGdsaWRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gICAqL1xuICBmdW5jdGlvbiBHbGlkZShzZWxlY3Rvcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBHbGlkZSk7XG5cbiAgICB0aGlzLl9jID0ge307XG4gICAgdGhpcy5fdCA9IFtdO1xuICAgIHRoaXMuX2UgPSBuZXcgRXZlbnRzQnVzKCk7XG5cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLnNldHRpbmdzLnN0YXJ0QXQ7XG4gIH1cblxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIENvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucyB0byBpbml0aWFsaXplLlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xuXG5cbiAgY3JlYXRlQ2xhc3MoR2xpZGUsIFt7XG4gICAga2V5OiAnbW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3VudCQkMSgpIHtcbiAgICAgIHZhciBleHRlbnNpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgICAgdGhpcy5fZS5lbWl0KCdtb3VudC5iZWZvcmUnKTtcblxuICAgICAgaWYgKGlzT2JqZWN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgIHRoaXMuX2MgPSBtb3VudCh0aGlzLCBleHRlbnNpb25zLCB0aGlzLl9lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBvYmplY3Qgb24gYG1vdW50KClgJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgnbW91bnQuYWZ0ZXInKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBhbiBpbnN0YW5jZSBgdHJhbnNsYXRlYCB0cmFuc2Zvcm1lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7QXJyYXl9IHRyYW5zZm9ybWVycyBDb2xsZWN0aW9uIG9mIHRyYW5zZm9ybWVycy5cclxuICAgICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbXV0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbXV0YXRlKCkge1xuICAgICAgdmFyIHRyYW5zZm9ybWVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG5cbiAgICAgIGlmIChpc0FycmF5KHRyYW5zZm9ybWVycykpIHtcbiAgICAgICAgdGhpcy5fdCA9IHRyYW5zZm9ybWVycztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBhcnJheSBvbiBgbXV0YXRlKClgJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBnbGlkZSB3aXRoIHNwZWNpZmllZCBzZXR0aW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnModGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xuXG4gICAgICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ3N0YXJ0QXQnKSkge1xuICAgICAgICB0aGlzLmluZGV4ID0gc2V0dGluZ3Muc3RhcnRBdDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZS5lbWl0KCd1cGRhdGUnKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2Ugc2xpZGUgd2l0aCBzcGVjaWZpZWQgcGF0dGVybi4gQSBwYXR0ZXJuIG11c3QgYmUgaW4gdGhlIHNwZWNpYWwgZm9ybWF0OlxyXG4gICAgICogYD5gIC0gTW92ZSBvbmUgZm9yd2FyZFxyXG4gICAgICogYDxgIC0gTW92ZSBvbmUgYmFja3dhcmRcclxuICAgICAqIGA9e2l9YCAtIEdvIHRvIHtpfSB6ZXJvLWJhc2VkIHNsaWRlIChlcS4gJz0xJywgd2lsbCBnbyB0byBzZWNvbmQgc2xpZGUpXHJcbiAgICAgKiBgPj5gIC0gUmV3aW5kcyB0byBlbmQgKGxhc3Qgc2xpZGUpXHJcbiAgICAgKiBgPDxgIC0gUmV3aW5kcyB0byBzdGFydCAoZmlyc3Qgc2xpZGUpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dvJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ28ocGF0dGVybikge1xuICAgICAgdGhpcy5fYy5SdW4ubWFrZShwYXR0ZXJuKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRyYWNrIGJ5IHNwZWNpZmllZCBkaXN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlzdGFuY2VcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ21vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKGRpc3RhbmNlKSB7XG4gICAgICB0aGlzLl9jLlRyYW5zaXRpb24uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fYy5Nb3ZlLm1ha2UoZGlzdGFuY2UpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIERlc3Ryb3kgaW5zdGFuY2UgYW5kIHJldmVydCBhbGwgY2hhbmdlcyBkb25lIGJ5IHRoaXMuX2MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLl9lLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBpbnN0YW5jZSBhdXRvcGxheWluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBpbnRlcnZhbCBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgIHZhciBpbnRlcnZhbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZmFsc2U7XG5cbiAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmF1dG9wbGF5ID0gaW50ZXJ2YWw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgncGxheScpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFN0b3AgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncGF1c2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgIHRoaXMuX2UuZW1pdCgncGF1c2UnKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGdsaWRlIGludG8gYSBpZGxlIHN0YXR1cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNldHMgZ2xpZGUgaW50byBhIGFjdGl2ZSBzdGF0dXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEFkZHMgY3V1dG9tIGV2ZW50IGxpc3RlbmVyIHdpdGggaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihldmVudCwgaGFuZGxlcikge1xuICAgICAgdGhpcy5fZS5vbihldmVudCwgaGFuZGxlcik7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGdsaWRlIGlzIGEgcHJlY2lzZWQgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNUeXBlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNUeXBlKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGUgPT09IG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBjb3JlIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldHRpbmdzJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb1xyXG4gICAgICogQHJldHVybiB7Vm9pZH1cclxuICAgICAqL1xuICAgICxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShvKSB7XG4gICAgICBpZiAoaXNPYmplY3QobykpIHtcbiAgICAgICAgdGhpcy5fbyA9IG87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdPcHRpb25zIG11c3QgYmUgYW4gYG9iamVjdGAgaW5zdGFuY2UuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2k7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGN1cnJlbnQgaW5kZXggYSBzbGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGkpIHtcbiAgICAgIHRoaXMuX2kgPSB0b0ludChpKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgdHlwZSBuYW1lIG9mIHRoZSBzbGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3R5cGUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudHlwZTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGlkbGUgc3RhdHVzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZWQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Q7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHN0YXR1cykge1xuICAgICAgdGhpcy5fZCA9ICEhc3RhdHVzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gR2xpZGU7XG59KCk7XG5cbmZ1bmN0aW9uIFJ1biAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgUnVuID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9ydW5uaW5nIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5fbyA9IGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGdsaWRlcyBydW5uaW5nIGJhc2VkIG9uIHRoZSBwYXNzZWQgbW92aW5nIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb3ZlXG4gICAgICovXG4gICAgbWFrZTogZnVuY3Rpb24gbWFrZShtb3ZlKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIEdsaWRlLmRpc2FibGUoKTtcblxuICAgICAgICB0aGlzLm1vdmUgPSBtb3ZlO1xuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYmVmb3JlJywgdGhpcy5tb3ZlKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4nLCB0aGlzLm1vdmUpO1xuXG4gICAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzLmlzU3RhcnQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5zdGFydCcsIF90aGlzLm1vdmUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5pc0VuZCgpKSB7XG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLmVuZCcsIF90aGlzLm1vdmUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5pc09mZnNldCgnPCcpIHx8IF90aGlzLmlzT2Zmc2V0KCc+JykpIHtcbiAgICAgICAgICAgIF90aGlzLl9vID0gZmFsc2U7XG5cbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4ub2Zmc2V0JywgX3RoaXMubW92ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5hZnRlcicsIF90aGlzLm1vdmUpO1xuXG4gICAgICAgICAgR2xpZGUuZW5hYmxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgY3VycmVudCBpbmRleCBiYXNlZCBvbiBkZWZpbmVkIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNhbGN1bGF0ZTogZnVuY3Rpb24gY2FsY3VsYXRlKCkge1xuICAgICAgdmFyIG1vdmUgPSB0aGlzLm1vdmUsXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICB2YXIgc3RlcHMgPSBtb3ZlLnN0ZXBzLFxuICAgICAgICAgIGRpcmVjdGlvbiA9IG1vdmUuZGlyZWN0aW9uO1xuXG5cbiAgICAgIHZhciBjb3VudGFibGVTdGVwcyA9IGlzTnVtYmVyKHRvSW50KHN0ZXBzKSkgJiYgdG9JbnQoc3RlcHMpICE9PSAwO1xuXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoc3RlcHMgPT09ICc+Jykge1xuICAgICAgICAgICAgR2xpZGUuaW5kZXggPSBsZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRW5kKCkpIHtcbiAgICAgICAgICAgIGlmICghKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgIUdsaWRlLnNldHRpbmdzLnJld2luZCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgR2xpZGUuaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4ICs9IE1hdGgubWluKGxlbmd0aCAtIEdsaWRlLmluZGV4LCAtdG9JbnQoc3RlcHMpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgR2xpZGUuaW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgaWYgKHN0ZXBzID09PSAnPCcpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTdGFydCgpKSB7XG4gICAgICAgICAgICBpZiAoIShHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmICFHbGlkZS5zZXR0aW5ncy5yZXdpbmQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX28gPSB0cnVlO1xuXG4gICAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gbGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4IC09IE1hdGgubWluKEdsaWRlLmluZGV4LCB0b0ludChzdGVwcykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBHbGlkZS5pbmRleC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICc9JzpcbiAgICAgICAgICBHbGlkZS5pbmRleCA9IHN0ZXBzO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgd2FybignSW52YWxpZCBkaXJlY3Rpb24gcGF0dGVybiBbJyArIGRpcmVjdGlvbiArIHN0ZXBzICsgJ10gaGFzIGJlZW4gdXNlZCcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGZpcnN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1N0YXJ0OiBmdW5jdGlvbiBpc1N0YXJ0KCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmluZGV4ID09PSAwO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGxhc3Qgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRW5kOiBmdW5jdGlvbiBpc0VuZCgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBtYWtpbmcgYSBvZmZzZXQgcnVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNPZmZzZXQ6IGZ1bmN0aW9uIGlzT2Zmc2V0KGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX28gJiYgdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gZGlyZWN0aW9uO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoUnVuLCAnbW92ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHZhciBzdGVwID0gdmFsdWUuc3Vic3RyKDEpO1xuXG4gICAgICB0aGlzLl9tID0ge1xuICAgICAgICBkaXJlY3Rpb246IHZhbHVlLnN1YnN0cigwLCAxKSxcbiAgICAgICAgc3RlcHM6IHN0ZXAgPyB0b0ludChzdGVwKSA/IHRvSW50KHN0ZXApIDogc3RlcCA6IDBcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoUnVuLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIHJ1bm5pbmcgZGlzdGFuY2UgYmFzZWRcbiAgICAgKiBvbiB6ZXJvLWluZGV4aW5nIG51bWJlciBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcbiAgICAgIHZhciBsZW5ndGggPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aDtcblxuICAgICAgLy8gSWYgdGhlIGBib3VuZGAgb3B0aW9uIGlzIGFjaXR2ZSwgYSBtYXhpbXVtIHJ1bm5pbmcgZGlzdGFuY2Ugc2hvdWxkIGJlXG4gICAgICAvLyByZWR1Y2VkIGJ5IGBwZXJWaWV3YCBhbmQgYGZvY3VzQXRgIHNldHRpbmdzLiBSdW5uaW5nIGRpc3RhbmNlXG4gICAgICAvLyBzaG91bGQgZW5kIGJlZm9yZSBjcmVhdGluZyBhbiBlbXB0eSBzcGFjZSBhZnRlciBpbnN0YW5jZS5cblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgc2V0dGluZ3MuZm9jdXNBdCAhPT0gJ2NlbnRlcicgJiYgc2V0dGluZ3MuYm91bmQpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aCAtIDEgLSAodG9JbnQoc2V0dGluZ3MucGVyVmlldykgLSAxKSArIHRvSW50KHNldHRpbmdzLmZvY3VzQXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGVuZ3RoIC0gMTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShSdW4sICdvZmZzZXQnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzdGF0dXMgb2YgdGhlIG9mZnNldHRpbmcgZmxhZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbztcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBSdW47XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJlbnQgdGltZS5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkXG4gKiBhdCBtb3N0IG9uY2UgZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICogQHBhcmFtIHtOdW1iZXJ9IHdhaXRcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgdGltZW91dCA9IHZvaWQgMCxcbiAgICAgIGNvbnRleHQgPSB2b2lkIDAsXG4gICAgICBhcmdzID0gdm9pZCAwLFxuICAgICAgcmVzdWx0ID0gdm9pZCAwO1xuICB2YXIgcHJldmlvdXMgPSAwO1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcblxuICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiBsYXRlcigpIHtcbiAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogbm93KCk7XG4gICAgdGltZW91dCA9IG51bGw7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgfTtcblxuICB2YXIgdGhyb3R0bGVkID0gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIHZhciBhdCA9IG5vdygpO1xuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBhdDtcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChhdCAtIHByZXZpb3VzKTtcbiAgICBjb250ZXh0ID0gdGhpcztcbiAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICBpZiAodGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSBhdDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBwcmV2aW91cyA9IDA7XG4gICAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gdGhyb3R0bGVkO1xufVxuXG52YXIgTUFSR0lOX1RZUEUgPSB7XG4gIGx0cjogWydtYXJnaW5MZWZ0JywgJ21hcmdpblJpZ2h0J10sXG4gIHJ0bDogWydtYXJnaW5SaWdodCcsICdtYXJnaW5MZWZ0J11cbn07XG5cbmZ1bmN0aW9uIEdhcHMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIEdhcHMgPSB7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBnYXBzIGJldHdlZW4gc2xpZGVzLiBGaXJzdCBhbmQgbGFzdFxuICAgICAqIHNsaWRlcyBkbyBub3QgcmVjZWl2ZSBpdCdzIGVkZ2UgbWFyZ2lucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KHNsaWRlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGU7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBDb21wb25lbnRzLkRpcmVjdGlvbi52YWx1ZTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gdGhpcy52YWx1ZSAvIDIgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9IHRoaXMudmFsdWUgLyAyICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBnYXBzIGZyb20gdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoc2xpZGVzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHNsaWRlc1tpXS5zdHlsZTtcblxuICAgICAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gJyc7XG4gICAgICAgIHN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShHYXBzLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZ2FwLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5nYXApO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEdhcHMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gaW5jcmVhc2Ugd2lkdGggb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoR2FwcywgJ3JlZHVjdG9yJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgcmVkdWN0aW9uIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gc3VidHJhY3Qgd2lkdGggb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXc7XG5cbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKHBlclZpZXcgLSAxKSAvIHBlclZpZXc7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQXBwbHkgY2FsY3VsYXRlZCBnYXBzOlxuICAgKiAtIGFmdGVyIGJ1aWxkaW5nLCBzbyBzbGlkZXMgKGluY2x1ZGluZyBjbG9uZXMpIHdpbGwgcmVjZWl2ZSBwcm9wZXIgbWFyZ2luc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIHJlY2FsY3VsYXRlIGdhcHMgd2l0aCBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYWZ0ZXInLCAndXBkYXRlJ10sIHRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICBHYXBzLmFwcGx5KENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKTtcbiAgfSwgMzApKTtcblxuICAvKipcbiAgICogUmVtb3ZlIGdhcHM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEdhcHMucmVtb3ZlKENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKTtcbiAgfSk7XG5cbiAgcmV0dXJuIEdhcHM7XG59XG5cbi8qKlxuICogRmluZHMgc2libGluZ3Mgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlLlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBzaWJsaW5ncyhub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSkge1xuICAgIHZhciBuID0gbm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgdmFyIG1hdGNoZWQgPSBbXTtcblxuICAgIGZvciAoOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgaWYgKG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gbm9kZSkge1xuICAgICAgICBtYXRjaGVkLnB1c2gobik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZWQ7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHBhc3NlZCBub2RlIGV4aXN0IGFuZCBpcyBhIHZhbGlkIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZXhpc3Qobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBUUkFDS19TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cInRyYWNrXCJdJztcblxuZnVuY3Rpb24gSHRtbCAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgdmFyIEh0bWwgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXAgc2xpZGVyIEhUTUwgbm9kZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0dsaWRlfSBnbGlkZVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMucm9vdCA9IEdsaWRlLnNlbGVjdG9yO1xuICAgICAgdGhpcy50cmFjayA9IHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKFRSQUNLX1NFTEVDVE9SKTtcbiAgICAgIHRoaXMuc2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy53cmFwcGVyLmNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIHJldHVybiAhc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuY2xvbmVTbGlkZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKEh0bWwsICdyb290Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3I7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSBtYWluIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQocikge1xuICAgICAgaWYgKGlzU3RyaW5nKHIpKSB7XG4gICAgICAgIHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXhpc3QocikpIHtcbiAgICAgICAgSHRtbC5fciA9IHI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdSb290IGVsZW1lbnQgbXVzdCBiZSBhIGV4aXN0aW5nIEh0bWwgbm9kZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEh0bWwsICd0cmFjaycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIHRyYWNrIHdpdGggc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3Q7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh0KSB7XG4gICAgICBpZiAoZXhpc3QodCkpIHtcbiAgICAgICAgSHRtbC5fdCA9IHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdDb3VsZCBub3QgZmluZCB0cmFjayBlbGVtZW50LiBQbGVhc2UgdXNlICcgKyBUUkFDS19TRUxFQ1RPUiArICcgYXR0cmlidXRlLicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEh0bWwsICd3cmFwcGVyJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gSHRtbC50cmFjay5jaGlsZHJlblswXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBIdG1sO1xufVxuXG5mdW5jdGlvbiBQZWVrIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBQZWVrID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBob3cgbXVjaCB0byBwZWVrIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gR2xpZGUuc2V0dGluZ3MucGVlaztcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFBlZWssICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcnxPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gUGVlay5fdjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuYmVmb3JlID0gdG9JbnQodmFsdWUuYmVmb3JlKTtcbiAgICAgICAgdmFsdWUuYWZ0ZXIgPSB0b0ludCh2YWx1ZS5hZnRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgUGVlay5fdiA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFBlZWssICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBQZWVrLnZhbHVlO1xuICAgICAgdmFyIHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3O1xuXG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5iZWZvcmUgLyBwZXJWaWV3ICsgdmFsdWUuYWZ0ZXIgLyBwZXJWaWV3O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUgKiAyIC8gcGVyVmlldztcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZSBwZWVraW5nIHNpemVzIG9uOlxuICAgKiAtIHdoZW4gcmVzaXppbmcgd2luZG93IHRvIHVwZGF0ZSB0byBwcm9wZXIgcGVyY2VudHNcbiAgICovXG4gIEV2ZW50cy5vbihbJ3Jlc2l6ZScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIFBlZWsubW91bnQoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFBlZWs7XG59XG5cbmZ1bmN0aW9uIE1vdmUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIE1vdmUgPSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBtb3ZlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuX28gPSAwO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgYSBtb3ZlbWVudCB2YWx1ZSBiYXNlZCBvbiBwYXNzZWQgb2Zmc2V0IGFuZCBjdXJyZW50bHkgYWN0aXZlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1ha2U6IGZ1bmN0aW9uIG1ha2UoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuXG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgICAgRXZlbnRzLmVtaXQoJ21vdmUnLCB7XG4gICAgICAgIG1vdmVtZW50OiB0aGlzLnZhbHVlXG4gICAgICB9KTtcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ21vdmUuYWZ0ZXInLCB7XG4gICAgICAgICAgbW92ZW1lbnQ6IF90aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShNb3ZlLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIE1vdmUuX287XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiBvZmZzZXQgdmFsdWUgdXNlZCB0byBtb2RpZnkgY3VycmVudCB0cmFuc2xhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIE1vdmUuX28gPSAhaXNVbmRlZmluZWQodmFsdWUpID8gdG9JbnQodmFsdWUpIDogMDtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShNb3ZlLCAndHJhbnNsYXRlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYSByYXcgbW92ZW1lbnQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoTW92ZSwgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gYWN0dWFsIG1vdmVtZW50IHZhbHVlIGNvcnJlY3RlZCBieSBvZmZzZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgdHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGU7XG5cbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIG9mZnNldDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIG9mZnNldDtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBNYWtlIG1vdmVtZW50IHRvIHByb3BlciBzbGlkZSBvbjpcbiAgICogLSBiZWZvcmUgYnVpbGQsIHNvIGdsaWRlIHdpbGwgc3RhcnQgYXQgYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gb24gZWFjaCBzdGFuZGFyZCBydW4gdG8gbW92ZSB0byBuZXdseSBjYWxjdWxhdGVkIGluZGV4XG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncnVuJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBNb3ZlLm1ha2UoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIE1vdmU7XG59XG5cbmZ1bmN0aW9uIFNpemVzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBTaXplcyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZGltZW50aW9ucyBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwU2xpZGVzOiBmdW5jdGlvbiBzZXR1cFNsaWRlcygpIHtcbiAgICAgIHZhciB3aWR0aCA9IHRoaXMuc2xpZGVXaWR0aCArICdweCc7XG4gICAgICB2YXIgc2xpZGVzID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlcztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwV3JhcHBlcjogZnVuY3Rpb24gc2V0dXBXcmFwcGVyKGRpbWVudGlvbikge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSB0aGlzLndyYXBwZXJTaXplICsgJ3B4JztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFwcGxpZWQgc3R5bGVzIGZyb20gSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgdmFyIHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXM7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS53aWR0aCA9ICcnO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoU2l6ZXMsICdsZW5ndGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb3VudCBudW1iZXIgb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShTaXplcywgJ3dpZHRoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgd2lkdGggdmFsdWUgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuSHRtbC5yb290Lm9mZnNldFdpZHRoO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFNpemVzLCAnd3JhcHBlclNpemUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzaXplIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBTaXplcy5zbGlkZVdpZHRoICogU2l6ZXMubGVuZ3RoICsgQ29tcG9uZW50cy5HYXBzLmdyb3cgKyBDb21wb25lbnRzLkNsb25lcy5ncm93O1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFNpemVzLCAnc2xpZGVXaWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIHRoZSBzaW5nbGUgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gU2l6ZXMud2lkdGggLyBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3IC0gQ29tcG9uZW50cy5QZWVrLnJlZHVjdG9yIC0gQ29tcG9uZW50cy5HYXBzLnJlZHVjdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2xpZGUncyBkaW1lbnNpb25zOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZywgc28gb3RoZXIgZGltZW50aW9ucyAoZS5nLiB0cmFuc2xhdGUpIHdpbGwgYmUgY2FsY3VsYXRlZCBwcm9wZXJ0bHlcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byByZWNhbGN1bGF0ZSBzaWxkZXMgZGltZW5zaW9uc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIGNhbGN1bGF0ZSBkaW1lbnNpb25zIGJhc2VkIG9uIG5ldyBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgU2l6ZXMuc2V0dXBTbGlkZXMoKTtcbiAgICBTaXplcy5zZXR1cFdyYXBwZXIoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBvbiBkZXN0b3RpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBTaXplcy5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFNpemVzO1xufVxuXG5mdW5jdGlvbiBCdWlsZCAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgQnVpbGQgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdCBnbGlkZSBidWlsZGluZy4gQWRkcyBjbGFzc2VzLCBzZXRzXG4gICAgICogZGltZW5zaW9ucyBhbmQgc2V0dXBzIGluaXRpYWwgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5iZWZvcmUnKTtcblxuICAgICAgdGhpcy50eXBlQ2xhc3MoKTtcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3MoKTtcblxuICAgICAgRXZlbnRzLmVtaXQoJ2J1aWxkLmFmdGVyJyk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBgdHlwZWAgY2xhc3MgdG8gdGhlIGdsaWRlIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHR5cGVDbGFzczogZnVuY3Rpb24gdHlwZUNsYXNzKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzW0dsaWRlLnNldHRpbmdzLnR5cGVdKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhY3RpdmVDbGFzczogZnVuY3Rpb24gYWN0aXZlQ2xhc3MoKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXM7XG4gICAgICB2YXIgc2xpZGUgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG5cbiAgICAgICAgc2libGluZ3Moc2xpZGUpLmZvckVhY2goZnVuY3Rpb24gKHNpYmxpbmcpIHtcbiAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgSFRNTCBjbGFzc2VzIGFwcGxpZWQgYXQgYnVpbGRpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzZXM6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXM7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSk7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5zbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2libGluZykge1xuICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFyIGJ1aWxkaW5nIGNsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGNsYXNzZXMgYmVmb3JlIHJlbW91bnRpbmcgY29tcG9uZW50XG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQnVpbGQucmVtb3ZlQ2xhc3NlcygpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gcmVzaXppbmcgb2YgdGhlIHdpbmRvdyB0byBjYWxjdWxhdGUgbmV3IGRpbWVudGlvbnNcbiAgICogLSBvbiB1cGRhdGluZyBzZXR0aW5ncyB2aWEgQVBJXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBCdWlsZC5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBzbGlkZTpcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlLmFmdGVyJywgZnVuY3Rpb24gKCkge1xuICAgIEJ1aWxkLmFjdGl2ZUNsYXNzKCk7XG4gIH0pO1xuXG4gIHJldHVybiBCdWlsZDtcbn1cblxuZnVuY3Rpb24gQ2xvbmVzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBDbG9uZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhdHRlcm4gbWFwIGFuZCBjb2xsZWN0IHNsaWRlcyB0byBiZSBjbG9uZWQuXG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmNvbGxlY3QoKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGNsb25lcyB3aXRoIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIGNvbGxlY3QoKSB7XG4gICAgICB2YXIgaXRlbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgICAgdmFyIHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXM7XG4gICAgICB2YXIgX0dsaWRlJHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3MsXG4gICAgICAgICAgcGVyVmlldyA9IF9HbGlkZSRzZXR0aW5ncy5wZXJWaWV3LFxuICAgICAgICAgIGNsYXNzZXMgPSBfR2xpZGUkc2V0dGluZ3MuY2xhc3NlcztcblxuXG4gICAgICB2YXIgcGVla0luY3JlbWVudGVyID0gKyEhR2xpZGUuc2V0dGluZ3MucGVlaztcbiAgICAgIHZhciBwYXJ0ID0gcGVyVmlldyArIHBlZWtJbmNyZW1lbnRlcjtcbiAgICAgIHZhciBzdGFydCA9IHNsaWRlcy5zbGljZSgwLCBwYXJ0KTtcbiAgICAgIHZhciBlbmQgPSBzbGlkZXMuc2xpY2UoLXBhcnQpO1xuXG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocGVyVmlldyAvIHNsaWRlcy5sZW5ndGgpKTsgcisrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2xvbmUgPSBzdGFydFtpXS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSk7XG5cbiAgICAgICAgICBpdGVtcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBlbmQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgdmFyIF9jbG9uZSA9IGVuZFtfaV0uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgICAgX2Nsb25lLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5jbG9uZVNsaWRlKTtcblxuICAgICAgICAgIGl0ZW1zLnVuc2hpZnQoX2Nsb25lKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGNsb25lZCBzbGlkZXMgd2l0aCBnZW5lcmF0ZWQgcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQoKSB7XG4gICAgICB2YXIgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdmFyIF9Db21wb25lbnRzJEh0bWwgPSBDb21wb25lbnRzLkh0bWwsXG4gICAgICAgICAgd3JhcHBlciA9IF9Db21wb25lbnRzJEh0bWwud3JhcHBlcixcbiAgICAgICAgICBzbGlkZXMgPSBfQ29tcG9uZW50cyRIdG1sLnNsaWRlcztcblxuXG4gICAgICB2YXIgaGFsZiA9IE1hdGguZmxvb3IoaXRlbXMubGVuZ3RoIC8gMik7XG4gICAgICB2YXIgcHJlcGVuZCA9IGl0ZW1zLnNsaWNlKDAsIGhhbGYpLnJldmVyc2UoKTtcbiAgICAgIHZhciBhcHBlbmQgPSBpdGVtcy5zbGljZShoYWxmLCBpdGVtcy5sZW5ndGgpO1xuICAgICAgdmFyIHdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgJ3B4JztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcHBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChhcHBlbmRbaV0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBwcmVwZW5kLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgd3JhcHBlci5pbnNlcnRCZWZvcmUocHJlcGVuZFtfaTJdLCBzbGlkZXNbMF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBpdGVtcy5sZW5ndGg7IF9pMysrKSB7XG4gICAgICAgIGl0ZW1zW19pM10uc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGNsb25lZCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtcztcblxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnJlbW92ZUNoaWxkKGl0ZW1zW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKENsb25lcywgJ2dyb3cnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhZGRpdGlvbmFsIGRpbWVudGlvbnMgdmFsdWUgY2F1c2VkIGJ5IGNsb25lcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAoQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgQ29tcG9uZW50cy5HYXBzLnZhbHVlKSAqIENsb25lcy5pdGVtcy5sZW5ndGg7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIENsb25lcy5yZW1vdmUoKTtcbiAgICBDbG9uZXMubW91bnQoKTtcbiAgICBDbG9uZXMuYXBwZW5kKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBBcHBlbmQgYWRkaXRpb25hbCBzbGlkZSdzIGNsb25lczpcbiAgICogLSB3aGlsZSBnbGlkZSdzIHR5cGUgaXMgYGNhcm91c2VsYFxuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5iZWZvcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgQ2xvbmVzLmFwcGVuZCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbG9uZXMgSFRNTEVsZW1lbnRzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBDbG9uZXMucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBDbG9uZXM7XG59XG5cbnZhciBFdmVudHNCaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudHNCaW5kZXIgaW5zdGFuY2UuXG4gICAqL1xuICBmdW5jdGlvbiBFdmVudHNCaW5kZXIoKSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRzQmluZGVyKTtcblxuICAgIHRoaXMubGlzdGVuZXJzID0gbGlzdGVuZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnRzIGxpc3RlbmVycyB0byBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICogQHBhcmFtICB7RWxlbWVudHxXaW5kb3d8RG9jdW1lbnR9IGVsXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjbG9zdXJlXG4gICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAqIEByZXR1cm4ge1ZvaWR9XG4gICAqL1xuXG5cbiAgY3JlYXRlQ2xhc3MoRXZlbnRzQmluZGVyLCBbe1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnRzLCBlbCwgY2xvc3VyZSkge1xuICAgICAgdmFyIGNhcHR1cmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xuXG4gICAgICBpZiAoaXNTdHJpbmcoZXZlbnRzKSkge1xuICAgICAgICBldmVudHMgPSBbZXZlbnRzXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSA9IGNsb3N1cmU7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0sIGNhcHR1cmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZyb20gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb2ZmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50cywgZWwpIHtcbiAgICAgIHZhciBjYXB0dXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgICAgZXZlbnRzID0gW2V2ZW50c107XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGNvbGxlY3RlZCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnM7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFdmVudHNCaW5kZXI7XG59KCk7XG5cbmZ1bmN0aW9uIFJlc2l6ZSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIFJlc2l6ZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB3aW5kb3cgYmluZGluZ3MuXG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYHJlenNpemVgIGxpc3RlbmVyIHRvIHRoZSB3aW5kb3cuXG4gICAgICogSXQncyBhIGNvc3RseSBldmVudCwgc28gd2UgYXJlIGRlYm91bmNpbmcgaXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICBFdmVudHMuZW1pdCgncmVzaXplJyk7XG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSkpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgbGlzdGVuZXJzIGZyb20gdGhlIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gd2luZG93OlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgUmVzaXplLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBSZXNpemU7XG59XG5cbnZhciBWQUxJRF9ESVJFQ1RJT05TID0gWydsdHInLCAncnRsJ107XG52YXIgRkxJUEVEX01PVkVNRU5UUyA9IHtcbiAgJz4nOiAnPCcsXG4gICc8JzogJz4nLFxuICAnPSc6ICc9J1xufTtcblxuZnVuY3Rpb24gRGlyZWN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBEaXJlY3Rpb24gPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGdhcCB2YWx1ZSBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLmRpcmVjdGlvbjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyBwYXR0ZXJuIGJhc2VkIG9uIGRpcmVjdGlvbiB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUocGF0dGVybikge1xuICAgICAgdmFyIHRva2VuID0gcGF0dGVybi5zbGljZSgwLCAxKTtcblxuICAgICAgaWYgKHRoaXMuaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KHRva2VuKS5qb2luKEZMSVBFRF9NT1ZFTUVOVFNbdG9rZW5dKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhdHRlcm47XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHZhbHVlIG9mIGRpcmVjdGlvbiBtb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzOiBmdW5jdGlvbiBpcyhkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBkaXJlY3Rpb247XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBkaXJlY3Rpb24gY2xhc3MgdG8gdGhlIHJvb3QgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uW3RoaXMudmFsdWVdKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGRpcmVjdGlvbiBjbGFzcyBmcm9tIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShEaXJlY3Rpb24sICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIERpcmVjdGlvbi5fdjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICBpZiAoVkFMSURfRElSRUNUSU9OUy5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgIERpcmVjdGlvbi5fdiA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignRGlyZWN0aW9uIHZhbHVlIG11c3QgYmUgYGx0cmAgb3IgYHJ0bGAnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDbGVhciBkaXJlY3Rpb24gY2xhc3M6XG4gICAqIC0gb24gZGVzdHJveSB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRlIHRvIHJlbW92ZSBjbGFzcyBiZWZvcmUgcmVhcHBsaW5nIGJlbGxvd1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIERpcmVjdGlvbi5yZW1vdmVDbGFzcygpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gdXBkYXRlIHRvIHJlZmxlY3QgY2hhbmdlcyBpbiBkaXJlY3Rpb24gdmFsdWVcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIERpcmVjdGlvbi5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogQXBwbHkgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZyB0byBhcHBseSBjbGFzcyBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWFwcGx5IGRpcmVjdGlvbiBjbGFzcyB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBEaXJlY3Rpb24uYWRkQ2xhc3MoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIERpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBSZWZsZWN0cyB2YWx1ZSBvZiBnbGlkZSBtb3ZlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gUnRsIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIHBhc3NlZCB0cmFuc2xhdGUgaWYgZ2xpZGUgaXMgaW4gUlRMIG9wdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeTogZnVuY3Rpb24gbW9kaWZ5KHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gLXRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGdhcGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEdhcCAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggbnVtYmVyIGluIHRoZSBgZ2FwYCBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeTogZnVuY3Rpb24gbW9kaWZ5KHRyYW5zbGF0ZSkge1xuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIENvbXBvbmVudHMuR2Fwcy52YWx1ZSAqIEdsaWRlLmluZGV4O1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggd2lkdGggb2YgYWRkaXRpb25hbCBjbG9uZXMgd2lkdGguXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEdyb3cgKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogQWRkcyB0byB0aGUgcGFzc2VkIHRyYW5zbGF0ZSB3aWR0aCBvZiB0aGUgaGFsZiBvZiBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyBDb21wb25lbnRzLkNsb25lcy5ncm93IC8gMjtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYHBlZWtgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBQZWVraW5nIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBhIGBwZWVrYCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5OiBmdW5jdGlvbiBtb2RpZnkodHJhbnNsYXRlKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuZm9jdXNBdCA+PSAwKSB7XG4gICAgICAgIHZhciBwZWVrID0gQ29tcG9uZW50cy5QZWVrLnZhbHVlO1xuXG4gICAgICAgIGlmIChpc09iamVjdChwZWVrKSkge1xuICAgICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrLmJlZm9yZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgZm9jdXNBdGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEZvY3VzaW5nIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBpbmRleCBpbiB0aGUgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIHZhciBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWU7XG4gICAgICB2YXIgd2lkdGggPSBDb21wb25lbnRzLlNpemVzLndpZHRoO1xuICAgICAgdmFyIGZvY3VzQXQgPSBHbGlkZS5zZXR0aW5ncy5mb2N1c0F0O1xuICAgICAgdmFyIHNsaWRlV2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGg7XG5cbiAgICAgIGlmIChmb2N1c0F0ID09PSAnY2VudGVyJykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gKHdpZHRoIC8gMiAtIHNsaWRlV2lkdGggLyAyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIHNsaWRlV2lkdGggKiBmb2N1c0F0IC0gZ2FwICogZm9jdXNBdDtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQXBwbGllcyBkaWZmcmVudCB0cmFuc2Zvcm1lcnMgb24gdHJhbnNsYXRlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBtdXRhdG9yIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBNZXJnZSBpbnN0YW5jZSB0cmFuc2Zvcm1lcnMgd2l0aCBjb2xsZWN0aW9uIG9mIGRlZmF1bHQgdHJhbnNmb3JtZXJzLlxuICAgKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBSdGwgY29tcG9uZW50IGJlIGxhc3Qgb24gdGhlIGxpc3QsXG4gICAqIHNvIGl0IHJlZmxlY3RzIGFsbCBwcmV2aW91cyB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtBcnJheX1cbiAgICovXG4gIHZhciBUUkFOU0ZPUk1FUlMgPSBbR2FwLCBHcm93LCBQZWVraW5nLCBGb2N1c2luZ10uY29uY2F0KEdsaWRlLl90LCBbUnRsXSk7XG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBQaXBsaW5lcyB0cmFuc2xhdGUgdmFsdWUgd2l0aCByZWdpc3RlcmVkIHRyYW5zZm9ybWVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG11dGF0ZTogZnVuY3Rpb24gbXV0YXRlKHRyYW5zbGF0ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUUkFOU0ZPUk1FUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVyID0gVFJBTlNGT1JNRVJTW2ldO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKSAmJiBpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKCkubW9kaWZ5KSkge1xuICAgICAgICAgIHRyYW5zbGF0ZSA9IHRyYW5zZm9ybWVyKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpLm1vZGlmeSh0cmFuc2xhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm4oJ1RyYW5zZm9ybWVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgbW9kaWZ5KClgIG1ldGhvZCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGU7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBUcmFuc2xhdGUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIFRyYW5zbGF0ZSA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zbGF0ZSBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gbXV0YXRvcihHbGlkZSwgQ29tcG9uZW50cykubXV0YXRlKHZhbHVlKTtcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyAtMSAqIHRyYW5zZm9ybSArICdweCwgMHB4LCAwcHgpJztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zbGF0ZSBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdHJhbnNsYXRlIHZhbHVlOlxuICAgKiAtIG9uIG1vdmUgdG8gcmVmbGVjdCBpbmRleCBjaGFuZ2VcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlZmxlY3QgcG9zc2libGUgY2hhbmdlcyBpbiBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWU7XG4gICAgdmFyIGxlbmd0aCA9IENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoO1xuICAgIHZhciB3aWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aDtcblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykgJiYgQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJzwnKSkge1xuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ3RyYW5zbGF0ZS5qdW1wJyk7XG5cbiAgICAgICAgVHJhbnNsYXRlLnNldCh3aWR0aCAqIChsZW5ndGggLSAxKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQoLXdpZHRoIC0gZ2FwICogbGVuZ3RoKTtcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpICYmIENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc+JykpIHtcbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCd0cmFuc2xhdGUuanVtcCcpO1xuXG4gICAgICAgIFRyYW5zbGF0ZS5zZXQoMCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQod2lkdGggKiBsZW5ndGggKyBnYXAgKiBsZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KGNvbnRleHQubW92ZW1lbnQpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3ZlIHRyYW5zbGF0ZTpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNsYXRlLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gVHJhbnNsYXRlO1xufVxuXG5mdW5jdGlvbiBUcmFuc2l0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBIb2xkcyBpbmFjdGl2aXR5IHN0YXR1cyBvZiB0cmFuc2l0aW9uLlxuICAgKiBXaGVuIHRydWUgdHJhbnNpdGlvbiBpcyBub3QgYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICB2YXIgZGlzYWJsZWQgPSBmYWxzZTtcblxuICB2YXIgVHJhbnNpdGlvbiA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyBzdHJpbmcgb2YgdGhlIENTUyB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBvc2U6IGZ1bmN0aW9uIGNvbXBvc2UocHJvcGVydHkpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eSArICcgJyArIHRoaXMuZHVyYXRpb24gKyAnbXMgJyArIHNldHRpbmdzLmFuaW1hdGlvblRpbWluZ0Z1bmM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wZXJ0eSArICcgMG1zICcgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdHJhbnNpdGlvbiBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZz19IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCgpIHtcbiAgICAgIHZhciBwcm9wZXJ0eSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ3RyYW5zZm9ybSc7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLmNvbXBvc2UocHJvcGVydHkpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmFsdWUgb2YgdHJhbnNpdGlvbiBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUnVucyBjYWxsYmFjayBhZnRlciBhbmltYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFmdGVyOiBmdW5jdGlvbiBhZnRlcihjYWxsYmFjaykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnNldCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5zZXQoKTtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFRyYW5zaXRpb24sICdkdXJhdGlvbicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGR1cmF0aW9uIG9mIHRoZSB0cmFuc2l0aW9uIGJhc2VkXG4gICAgICogb24gY3VycmVudGx5IHJ1bm5pbmcgYW5pbWF0aW9uIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgQ29tcG9uZW50cy5SdW4ub2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5yZXdpbmREdXJhdGlvbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLmFuaW1hdGlvbkR1cmF0aW9uO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFNldCB0cmFuc2l0aW9uIGBzdHlsZWAgdmFsdWU6XG4gICAqIC0gb24gZWFjaCBtb3ZpbmcsIGJlY2F1c2UgaXQgbWF5IGJlIGNsZWFyZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBUcmFuc2l0aW9uLnNldCgpO1xuICB9KTtcblxuICAvKipcbiAgICogRGlzYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIGJlZm9yZSBpbml0aWFsIGJ1aWxkIHRvIGF2b2lkIHRyYW5zaXRpb25pbmcgZnJvbSBgMGAgdG8gYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gd2hpbGUgcmVzaXppbmcgd2luZG93IGFuZCByZWNhbGN1bGF0aW5nIGRpbWVudGlvbnNcbiAgICogLSBvbiBqdW1waW5nIGZyb20gb2Zmc2V0IHRyYW5zaXRpb24gYXQgc3RhcnQgYW5kIGVuZCBlZGdlcyBpbiBgY2Fyb3VzZWxgIHR5cGVcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdyZXNpemUnLCAndHJhbnNsYXRlLmp1bXAnXSwgZnVuY3Rpb24gKCkge1xuICAgIFRyYW5zaXRpb24uZGlzYWJsZSgpO1xuICB9KTtcblxuICAvKipcbiAgICogRW5hYmxlIHRyYW5zaXRpb246XG4gICAqIC0gb24gZWFjaCBydW5uaW5nLCBiZWNhdXNlIGl0IG1heSBiZSBkaXNhYmxlZCBieSBvZmZzZXQgbW92ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdydW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNpdGlvbi5lbmFibGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBUcmFuc2l0aW9uLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gVHJhbnNpdGlvbjtcbn1cblxuLyoqXG4gKiBUZXN0IHZpYSBhIGdldHRlciBpbiB0aGUgb3B0aW9ucyBvYmplY3QgdG8gc2VlXG4gKiBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL0V2ZW50TGlzdGVuZXJPcHRpb25zL2Jsb2IvZ2gtcGFnZXMvZXhwbGFpbmVyLm1kI2ZlYXR1cmUtZGV0ZWN0aW9uXG4gKi9cblxudmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cyk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpO1xufSBjYXRjaCAoZSkge31cblxudmFyIHN1cHBvcnRzUGFzc2l2ZSQxID0gc3VwcG9ydHNQYXNzaXZlO1xuXG52YXIgU1RBUlRfRVZFTlRTID0gWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93biddO1xudmFyIE1PVkVfRVZFTlRTID0gWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ107XG52YXIgRU5EX0VWRU5UUyA9IFsndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnLCAnbW91c2V1cCcsICdtb3VzZWxlYXZlJ107XG52YXIgTU9VU0VfRVZFTlRTID0gWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddO1xuXG5mdW5jdGlvbiBTd2lwZSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIHN3aXBlU2luID0gMDtcbiAgdmFyIHN3aXBlU3RhcnRYID0gMDtcbiAgdmFyIHN3aXBlU3RhcnRZID0gMDtcbiAgdmFyIGRpc2FibGVkID0gZmFsc2U7XG4gIHZhciBjYXB0dXJlID0gc3VwcG9ydHNQYXNzaXZlJDEgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG4gIHZhciBTd2lwZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBzd2lwZSBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5iaW5kU3dpcGVTdGFydCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZXN0YXJ0YCBldmVudC4gQ2FsY3VsYXRlcyBlbnRyeSBwb2ludHMgb2YgdGhlIHVzZXIncyB0YXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChldmVudCkge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiAhR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgdmFyIHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KTtcblxuICAgICAgICBzd2lwZVNpbiA9IG51bGw7XG4gICAgICAgIHN3aXBlU3RhcnRYID0gdG9JbnQoc3dpcGUucGFnZVgpO1xuICAgICAgICBzd2lwZVN0YXJ0WSA9IHRvSW50KHN3aXBlLnBhZ2VZKTtcblxuICAgICAgICB0aGlzLmJpbmRTd2lwZU1vdmUoKTtcbiAgICAgICAgdGhpcy5iaW5kU3dpcGVFbmQoKTtcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuc3RhcnQnKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVtb3ZlYCBldmVudC4gQ2FsY3VsYXRlcyB1c2VyJ3MgdGFwIGFuZ2xlIGFuZCBkaXN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG1vdmU6IGZ1bmN0aW9uIG1vdmUoZXZlbnQpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdmFyIF9HbGlkZSRzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzLFxuICAgICAgICAgICAgdG91Y2hBbmdsZSA9IF9HbGlkZSRzZXR0aW5ncy50b3VjaEFuZ2xlLFxuICAgICAgICAgICAgdG91Y2hSYXRpbyA9IF9HbGlkZSRzZXR0aW5ncy50b3VjaFJhdGlvLFxuICAgICAgICAgICAgY2xhc3NlcyA9IF9HbGlkZSRzZXR0aW5ncy5jbGFzc2VzO1xuXG5cbiAgICAgICAgdmFyIHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KTtcblxuICAgICAgICB2YXIgc3ViRXhTeCA9IHRvSW50KHN3aXBlLnBhZ2VYKSAtIHN3aXBlU3RhcnRYO1xuICAgICAgICB2YXIgc3ViRXlTeSA9IHRvSW50KHN3aXBlLnBhZ2VZKSAtIHN3aXBlU3RhcnRZO1xuICAgICAgICB2YXIgcG93RVggPSBNYXRoLmFicyhzdWJFeFN4IDw8IDIpO1xuICAgICAgICB2YXIgcG93RVkgPSBNYXRoLmFicyhzdWJFeVN5IDw8IDIpO1xuICAgICAgICB2YXIgc3dpcGVIeXBvdGVudXNlID0gTWF0aC5zcXJ0KHBvd0VYICsgcG93RVkpO1xuICAgICAgICB2YXIgc3dpcGVDYXRoZXR1cyA9IE1hdGguc3FydChwb3dFWSk7XG5cbiAgICAgICAgc3dpcGVTaW4gPSBNYXRoLmFzaW4oc3dpcGVDYXRoZXR1cyAvIHN3aXBlSHlwb3RlbnVzZSk7XG5cbiAgICAgICAgaWYgKHN3aXBlU2luICogMTgwIC8gTWF0aC5QSSA8IHRvdWNoQW5nbGUpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKHN1YkV4U3ggKiB0b0Zsb2F0KHRvdWNoUmF0aW8pKTtcblxuICAgICAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5kcmFnZ2luZyk7XG5cbiAgICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUubW92ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZWVuZGAgZXZlbnQuIEZpbml0aWFsaXplcyB1c2VyJ3MgdGFwIGFuZCBkZWNpZGVzIGFib3V0IGdsaWRlIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuZDogZnVuY3Rpb24gZW5kKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICAgIHZhciBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudCk7XG4gICAgICAgIHZhciB0aHJlc2hvbGQgPSB0aGlzLnRocmVzaG9sZChldmVudCk7XG5cbiAgICAgICAgdmFyIHN3aXBlRGlzdGFuY2UgPSBzd2lwZS5wYWdlWCAtIHN3aXBlU3RhcnRYO1xuICAgICAgICB2YXIgc3dpcGVEZWcgPSBzd2lwZVNpbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIHZhciBzdGVwcyA9IE1hdGgucm91bmQoc3dpcGVEaXN0YW5jZSAvIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCk7XG5cbiAgICAgICAgdGhpcy5lbmFibGUoKTtcblxuICAgICAgICBpZiAoc3dpcGVEaXN0YW5jZSA+IHRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBwb3NpdGl2ZSBhbmQgZ3JlYXRlciB0aGFuIHRocmVzaG9sZCBtb3ZlIGJhY2t3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1pbihzdGVwcywgdG9JbnQoc2V0dGluZ3MucGVyVG91Y2gpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgICAgICBzdGVwcyA9IC1zdGVwcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoJzwnICsgc3RlcHMpKTtcbiAgICAgICAgfSBlbHNlIGlmIChzd2lwZURpc3RhbmNlIDwgLXRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBuZWdhdGl2ZSBhbmQgbG93ZXIgdGhhbiBuZWdhdGl2ZSB0aHJlc2hvbGQgbW92ZSBmb3J3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1heChzdGVwcywgLXRvSW50KHNldHRpbmdzLnBlclRvdWNoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JyArIHN0ZXBzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgZG9uJ3QgcmVhY2ggZGlzdGFuY2UgYXBwbHkgcHJldmlvdXMgdHJhbnNmb3JtLlxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuZHJhZ2dpbmcpO1xuXG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVNb3ZlKCk7XG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVFbmQoKTtcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuZW5kJyk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlU3RhcnQ6IGZ1bmN0aW9uIGJpbmRTd2lwZVN0YXJ0KCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICBCaW5kZXIub24oU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgX3RoaXMuc3RhcnQoZXZlbnQpO1xuICAgICAgICB9LCBjYXB0dXJlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLmRyYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIF90aGlzLnN0YXJ0KGV2ZW50KTtcbiAgICAgICAgfSwgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIHN0YXJ0aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZVN0YXJ0OiBmdW5jdGlvbiB1bmJpbmRTd2lwZVN0YXJ0KCkge1xuICAgICAgQmluZGVyLm9mZihTVEFSVF9FVkVOVFNbMF0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKTtcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzFdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZU1vdmU6IGZ1bmN0aW9uIGJpbmRTd2lwZU1vdmUoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgQmluZGVyLm9uKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhyb3R0bGUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzMi5tb3ZlKGV2ZW50KTtcbiAgICAgIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIG1vdmluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVNb3ZlOiBmdW5jdGlvbiB1bmJpbmRTd2lwZU1vdmUoKSB7XG4gICAgICBCaW5kZXIub2ZmKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZUVuZDogZnVuY3Rpb24gYmluZFN3aXBlRW5kKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIEJpbmRlci5vbihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzMy5lbmQoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIGVuZGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVFbmQ6IGZ1bmN0aW9uIHVuYmluZFN3aXBlRW5kKCkge1xuICAgICAgQmluZGVyLm9mZihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplcyBldmVudCB0b3VjaGVzIHBvaW50cyBhY2NvcnRpbmcgdG8gZGlmZmVyZW50IHR5cGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgdG91Y2hlczogZnVuY3Rpb24gdG91Y2hlcyhldmVudCkge1xuICAgICAgaWYgKE1PVVNFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIG1pbmltdW0gc3dpcGUgZGlzdGFuY2Ugc2V0dGluZ3MgYmFzZWQgb24gZXZlbnQgdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICB0aHJlc2hvbGQ6IGZ1bmN0aW9uIHRocmVzaG9sZChldmVudCkge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5kcmFnVGhyZXNob2xkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQ7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZW5hYmxlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHN3aXBlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZGlzYWJsZSgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgY2xhc3M6XG4gICAqIC0gYWZ0ZXIgaW5pdGlhbCBidWlsZGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5hZnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuc3dpcGVhYmxlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzd2lwaW5nIGJpbmRpbmdzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIFN3aXBlLnVuYmluZFN3aXBlU3RhcnQoKTtcbiAgICBTd2lwZS51bmJpbmRTd2lwZU1vdmUoKTtcbiAgICBTd2lwZS51bmJpbmRTd2lwZUVuZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBTd2lwZTtcbn1cblxuZnVuY3Rpb24gSW1hZ2VzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgdmFyIEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKTtcblxuICB2YXIgSW1hZ2VzID0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGxpc3RlbmVyIHRvIGdsaWRlIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuYmluZCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGBkcmFnc3RhcnRgIGV2ZW50IG9uIHdyYXBwZXIgdG8gcHJldmVudCBkcmFnZ2luZyBpbWFnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmRyYWdzdGFydCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyLiBQcmV2ZW50cyBkcmFnZ2luZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZHJhZ3N0YXJ0OiBmdW5jdGlvbiBkcmFnc3RhcnQoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSBpbWFnZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgSW1hZ2VzLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBJbWFnZXM7XG59XG5cbmZ1bmN0aW9uIEFuY2hvcnMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIC8qKlxuICAgKiBIb2xkcyBkZXRhY2hpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIFByZXZlbnRzIGRldGFjaGluZyBvZiBhbHJlYWR5IGRldGFjaGVkIGFuY2hvcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgdmFyIGRldGFjaGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEhvbGRzIHByZXZlbnRpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIElmIGB0cnVlYCByZWRpcmVjdGlvbiBhZnRlciBjbGljayB3aWxsIGJlIGRpc2FibGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHZhciBwcmV2ZW50ZWQgPSBmYWxzZTtcblxuICB2YXIgQW5jaG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgYSBpbml0aWFsIHN0YXRlIG9mIGFuY2hvcnMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgLyoqXG4gICAgICAgKiBIb2xkcyBjb2xsZWN0aW9uIG9mIGFuY2hvcnMgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYSA9IENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblxuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRoaXMuY2xpY2spO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGF0dGFjaGVkIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgQmluZGVyLm9mZignY2xpY2snLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIFByZXZlbnRzIGNsaWNrcyB3aGVuIGdsaWRlIGlzIGluIGBwcmV2ZW50YCBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljazogZnVuY3Rpb24gY2xpY2soZXZlbnQpIHtcbiAgICAgIGlmIChwcmV2ZW50ZWQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudCBpbnNpZGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGRldGFjaDogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgcHJldmVudGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKCFkZXRhY2hlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicsIHRoaXMuaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudHMgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBhdHRhY2g6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWNoZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShBbmNob3JzLCAnaXRlbXMnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb2xsZWN0aW9uIG9mIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQW5jaG9ycy5fYTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBEZXRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIG9uIHN3aXBpbmcsIHNvIHRoZXkgd29uJ3QgcmVkaXJlY3QgdG8gaXRzIGBocmVmYCBhdHRyaWJ1dGVzXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLm1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgQW5jaG9ycy5kZXRhY2goKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gYWZ0ZXIgc3dpcGluZyBhbmQgdHJhbnNpdGlvbnMgZW5kcywgc28gdGhleSBjYW4gcmVkaXJlY3QgYWZ0ZXIgY2xpY2sgYWdhaW5cbiAgICovXG4gIEV2ZW50cy5vbignc3dpcGUuZW5kJywgZnVuY3Rpb24gKCkge1xuICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICBBbmNob3JzLmF0dGFjaCgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogVW5iaW5kIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBhbmNob3JzIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQW5jaG9ycy5hdHRhY2goKTtcbiAgICBBbmNob3JzLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBBbmNob3JzO1xufVxuXG52YXIgTkFWX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsPVwiY29udHJvbHNbbmF2XVwiXSc7XG52YXIgQ09OVFJPTFNfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWxePVwiY29udHJvbHNcIl0nO1xuXG5mdW5jdGlvbiBDb250cm9scyAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIGNhcHR1cmUgPSBzdXBwb3J0c1Bhc3NpdmUkMSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2U7XG5cbiAgdmFyIENvbnRyb2xzID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRzIGFycm93cy4gQmluZHMgZXZlbnRzIGxpc3RlbmVyc1xuICAgICAqIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIG5hdmlnYXRpb24gSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9uID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChOQVZfU0VMRUNUT1IpO1xuXG4gICAgICAvKipcbiAgICAgICAqIENvbGxlY3Rpb24gb2YgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9jID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChDT05UUk9MU19TRUxFQ1RPUik7XG5cbiAgICAgIHRoaXMuYWRkQmluZGluZ3MoKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXRBY3RpdmU6IGZ1bmN0aW9uIHNldEFjdGl2ZSgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmFkZENsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUFjdGl2ZTogZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3ModGhpcy5fbltpXS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBhY3RpdmUgY2xhc3Mgb24gaXRlbXMgaW5zaWRlIG5hdmlnYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZENsYXNzOiBmdW5jdGlvbiBhZGRDbGFzcyhjb250cm9scykge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG4gICAgICB2YXIgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcblxuICAgICAgICBzaWJsaW5ncyhpdGVtKS5mb3JFYWNoKGZ1bmN0aW9uIChzaWJsaW5nKSB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhY3RpdmUgY2xhc3MgZnJvbSBhY3RpdmUgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250cm9sc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNvbnRyb2xzKSB7XG4gICAgICB2YXIgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGhhbmRsZXMgdG8gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZEJpbmRpbmdzOiBmdW5jdGlvbiBhZGRCaW5kaW5ncygpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBoYW5kbGVzIGZyb20gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUJpbmRpbmdzOiBmdW5jdGlvbiByZW1vdmVCaW5kaW5ncygpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnVuYmluZCh0aGlzLl9jW2ldLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBldmVudHMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24gYmluZChlbGVtZW50cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub24oJ2NsaWNrJywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2spO1xuICAgICAgICBCaW5kZXIub24oJ3RvdWNoc3RhcnQnLCBlbGVtZW50c1tpXSwgdGhpcy5jbGljaywgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBldmVudHMgYmluZGVkIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IGVsZW1lbnRzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZChlbGVtZW50cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub2ZmKFsnY2xpY2snLCAndG91Y2hzdGFydCddLCBlbGVtZW50c1tpXSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBgY2xpY2tgIGV2ZW50IG9uIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKiBNb3ZlcyBzbGlkZXIgaW4gZHJpZWN0aW9uIHByZWNpc2VkIGluXG4gICAgICogYGRhdGEtZ2xpZGUtZGlyYCBhdHRyaWJ1dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNsaWNrOiBmdW5jdGlvbiBjbGljayhldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWRpcicpKSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShDb250cm9scywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQ29udHJvbHMuX2M7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBuYXZpZ2F0aW9uIGl0ZW06XG4gICAqIC0gYWZ0ZXIgbW91bnRpbmcgdG8gc2V0IGl0IHRvIGluaXRpYWwgaW5kZXhcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnbW91bnQuYWZ0ZXInLCAnbW92ZS5hZnRlciddLCBmdW5jdGlvbiAoKSB7XG4gICAgQ29udHJvbHMuc2V0QWN0aXZlKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgYW5kIEhUTUwgQ2xhc3NlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBDb250cm9scy5yZW1vdmVCaW5kaW5ncygpO1xuICAgIENvbnRyb2xzLnJlbW92ZUFjdGl2ZSgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBDb250cm9scztcbn1cblxuZnVuY3Rpb24gS2V5Ym9hcmQgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIHZhciBLZXlib2FyZCA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBrZXlib2FyZCBldmVudHMgb24gY29tcG9uZW50IG1vdW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3Mua2V5Ym9hcmQpIHtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBwcmVzcyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2tleXVwJywgZG9jdW1lbnQsIHRoaXMucHJlc3MpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2tleXVwJywgZG9jdW1lbnQpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMga2V5Ym9hcmQncyBhcnJvd3MgcHJlc3MgYW5kIG1vdmluZyBnbGlkZSBmb3dhcmQgYW5kIGJhY2t3YXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcHJlc3M6IGZ1bmN0aW9uIHByZXNzKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc8JykpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20ga2V5Ym9hcmQ6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgYWRkZWQgZXZlbnRzXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGV2ZW50cyBiZWZvcmUgcmVtb3VudGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIEtleWJvYXJkLnVuYmluZCgpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnRcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWZsZWN0IHBvdGVudGlhbCBjaGFuZ2VzIGluIHNldHRpbmdzXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBLZXlib2FyZC5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogRGVzdHJveSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgbGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQmluZGVyLmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgcmV0dXJuIEtleWJvYXJkO1xufVxuXG5mdW5jdGlvbiBBdXRvcGxheSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIEF1dG9wbGF5ID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9wbGF5aW5nIGFuZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuc3RhcnQoKTtcblxuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmhvdmVycGF1c2UpIHtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIGF1dG9wbGF5aW5nIGluIGNvbmZpZ3VyZWQgaW50ZXJ2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBmb3JjZSBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHRoaXMuX2kpKSB7XG4gICAgICAgICAgdGhpcy5faSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZSgnPicpO1xuXG4gICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgIH0sIHRoaXMudGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLl9pID0gY2xlYXJJbnRlcnZhbCh0aGlzLl9pKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcGxheWluZyB3aGlsZSBtb3VzZSBpcyBvdmVyIGdsaWRlJ3MgYXJlYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBCaW5kZXIub24oJ21vdXNlb3ZlcicsIENvbXBvbmVudHMuSHRtbC5yb290LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5zdG9wKCk7XG4gICAgICB9KTtcblxuICAgICAgQmluZGVyLm9uKCdtb3VzZW91dCcsIENvbXBvbmVudHMuSHRtbC5yb290LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5zdGFydCgpO1xuICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kIG1vdXNlb3ZlciBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoWydtb3VzZW92ZXInLCAnbW91c2VvdXQnXSwgQ29tcG9uZW50cy5IdG1sLnJvb3QpO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoQXV0b3BsYXksICd0aW1lJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdGltZSBwZXJpb2QgdmFsdWUgZm9yIHRoZSBhdXRvcGxheSBpbnRlcnZhbC4gUHJpb3JpdGl6ZXNcbiAgICAgKiB0aW1lcyBpbiBgZGF0YS1nbGlkZS1hdXRvcGxheWAgYXR0cnVidXRlcyBvdmVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgYXV0b3BsYXkgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2xpZGUtYXV0b3BsYXknKTtcblxuICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIHJldHVybiB0b0ludChhdXRvcGxheSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5hdXRvcGxheSk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZyBhbmQgdW5iaW5kIGV2ZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQXV0b3BsYXkudW5iaW5kKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5aW5nOlxuICAgKiAtIGJlZm9yZSBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBhdXNpbmcgdmlhIEFQSVxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGNsZWFyIGRlZmluZWQgaW50ZXJ2YWxcbiAgICogLSB3aGlsZSBzdGFydGluZyBhIHN3aXBlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYmVmb3JlJywgJ3BhdXNlJywgJ2Rlc3Ryb3knLCAnc3dpcGUuc3RhcnQnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBBdXRvcGxheS5zdG9wKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTdGFydCBhdXRvcGxheWluZzpcbiAgICogLSBhZnRlciBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBsYXlpbmcgdmlhIEFQSVxuICAgKiAtIHdoaWxlIGVuZGluZyBhIHN3aXBlXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYWZ0ZXInLCAncGxheScsICdzd2lwZS5lbmQnXSwgZnVuY3Rpb24gKCkge1xuICAgIEF1dG9wbGF5LnN0YXJ0KCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdW50IGF1dG9wbGF5aW5nOlxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgQXV0b3BsYXkubW91bnQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyBnbGlkZSBpbnN0YW5jZSB0byBjbGVhcnVwIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBBdXRvcGxheTtcbn1cblxuLyoqXG4gKiBTb3J0cyBrZXlzIG9mIGJyZWFrcG9pbnQgb2JqZWN0IHNvIHRoZXkgd2lsbCBiZSBvcmRlcmVkIGZyb20gbG93ZXIgdG8gYmlnZ2VyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNvcnRCcmVha3BvaW50cyhwb2ludHMpIHtcbiAgaWYgKGlzT2JqZWN0KHBvaW50cykpIHtcbiAgICByZXR1cm4gc29ydEtleXMocG9pbnRzKTtcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdCcmVha3BvaW50cyBvcHRpb24gbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gQnJlYWtwb2ludHMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIC8qKlxuICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIGJyZWFrcG9pbnRzIG9iamVjdCBpbiBzZXR0aW5ncy4gU29ydHMgYnJlYWtwb2ludHNcbiAgICogZnJvbSBzbWFsbGVyIHRvIGxhcmdlci4gSXQgaXMgcmVxdWlyZWQgaW4gb3JkZXIgdG8gcHJvcGVyXG4gICAqIG1hdGNoaW5nIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHZhciBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMoc2V0dGluZ3MuYnJlYWtwb2ludHMpO1xuXG4gIC8qKlxuICAgKiBDYWNoZSBpbml0aWFsIHNldHRpbmdzIGJlZm9yZSBvdmVyd3JpdHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB2YXIgZGVmYXVsdHMgPSBfZXh0ZW5kcyh7fSwgc2V0dGluZ3MpO1xuXG4gIHZhciBCcmVha3BvaW50cyA9IHtcbiAgICAvKipcbiAgICAgKiBNYXRjaGVzIHNldHRpbmdzIGZvciBjdXJyZWN0bHkgbWF0Y2hpbmcgbWVkaWEgYnJlYWtwb2ludC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChwb2ludHMpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm1hdGNoTWVkaWEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZvciAodmFyIHBvaW50IGluIHBvaW50cykge1xuICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocG9pbnQpKSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6ICcgKyBwb2ludCArICdweCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwb2ludHNbcG9pbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBPdmVyd3JpdGUgaW5zdGFuY2Ugc2V0dGluZ3Mgd2l0aCBjdXJyZW50bHkgbWF0Y2hpbmcgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICogVGhpcyBoYXBwZW5zIHJpZ2h0IGFmdGVyIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIF9leHRlbmRzKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKTtcblxuICAvKipcbiAgICogVXBkYXRlIGdsaWRlIHdpdGggc2V0dGluZ3Mgb2YgbWF0Y2hlZCBicmVrcG9pbnQ6XG4gICAqIC0gd2luZG93IHJlc2l6ZSB0byB1cGRhdGUgc2xpZGVyXG4gICAqL1xuICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgIEdsaWRlLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKTtcbiAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKTtcblxuICAvKipcbiAgICogUmVzb3J0IGFuZCB1cGRhdGUgZGVmYXVsdCBzZXR0aW5nczpcbiAgICogLSBvbiByZWluaXQgdmlhIEFQSSwgc28gYnJlYWtwb2ludCBtYXRjaGluZyB3aWxsIGJlIHBlcmZvcm1lZCB3aXRoIG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHBvaW50cyA9IHNvcnRCcmVha3BvaW50cyhwb2ludHMpO1xuXG4gICAgZGVmYXVsdHMgPSBfZXh0ZW5kcyh7fSwgc2V0dGluZ3MpO1xuICB9KTtcblxuICAvKipcbiAgICogVW5iaW5kIHJlc2l6ZSBsaXN0ZW5lcjpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpO1xuICB9KTtcblxuICByZXR1cm4gQnJlYWtwb2ludHM7XG59XG5cbnZhciBDT01QT05FTlRTID0ge1xuICAvLyBSZXF1aXJlZFxuICBIdG1sOiBIdG1sLFxuICBUcmFuc2xhdGU6IFRyYW5zbGF0ZSxcbiAgVHJhbnNpdGlvbjogVHJhbnNpdGlvbixcbiAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXG4gIFBlZWs6IFBlZWssXG4gIFNpemVzOiBTaXplcyxcbiAgR2FwczogR2FwcyxcbiAgTW92ZTogTW92ZSxcbiAgQ2xvbmVzOiBDbG9uZXMsXG4gIFJlc2l6ZTogUmVzaXplLFxuICBCdWlsZDogQnVpbGQsXG4gIFJ1bjogUnVuLFxuXG4gIC8vIE9wdGlvbmFsXG4gIFN3aXBlOiBTd2lwZSxcbiAgSW1hZ2VzOiBJbWFnZXMsXG4gIEFuY2hvcnM6IEFuY2hvcnMsXG4gIENvbnRyb2xzOiBDb250cm9scyxcbiAgS2V5Ym9hcmQ6IEtleWJvYXJkLFxuICBBdXRvcGxheTogQXV0b3BsYXksXG4gIEJyZWFrcG9pbnRzOiBCcmVha3BvaW50c1xufTtcblxudmFyIEdsaWRlJDEgPSBmdW5jdGlvbiAoX0NvcmUpIHtcbiAgaW5oZXJpdHMoR2xpZGUkJDEsIF9Db3JlKTtcblxuICBmdW5jdGlvbiBHbGlkZSQkMSgpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBHbGlkZSQkMSk7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEdsaWRlJCQxLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xpZGUkJDEpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKEdsaWRlJCQxLCBbe1xuICAgIGtleTogJ21vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB2YXIgZXh0ZW5zaW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHJldHVybiBnZXQoR2xpZGUkJDEucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xpZGUkJDEucHJvdG90eXBlKSwgJ21vdW50JywgdGhpcykuY2FsbCh0aGlzLCBfZXh0ZW5kcyh7fSwgQ09NUE9ORU5UUywgZXh0ZW5zaW9ucykpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gR2xpZGUkJDE7XG59KEdsaWRlKTtcblxuZXhwb3J0IGRlZmF1bHQgR2xpZGUkMTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5pbXBvcnQgR2xpZGUgZnJvbSBcIkBnbGlkZWpzL2dsaWRlXCI7XHJcbm5ldyBHbGlkZShcIi5nbGlkZVwiLCB7IHR5cGU6IFwiY2Fyb3VzZWxcIiwgcGVyVmlldzogNCwgYXV0b3BsYXk6IDMwMDAgfSkubW91bnQoKTtcclxuIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwidHlwZSIsInN0YXJ0QXQiLCJwZXJWaWV3IiwiZm9jdXNBdCIsImdhcCIsImF1dG9wbGF5IiwiaG92ZXJwYXVzZSIsImtleWJvYXJkIiwiYm91bmQiLCJzd2lwZVRocmVzaG9sZCIsImRyYWdUaHJlc2hvbGQiLCJwZXJUb3VjaCIsInRvdWNoUmF0aW8iLCJ0b3VjaEFuZ2xlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJyZXdpbmQiLCJyZXdpbmREdXJhdGlvbiIsImFuaW1hdGlvblRpbWluZ0Z1bmMiLCJ0aHJvdHRsZSIsImRpcmVjdGlvbiIsInBlZWsiLCJicmVha3BvaW50cyIsImNsYXNzZXMiLCJsdHIiLCJydGwiLCJzbGlkZXIiLCJjYXJvdXNlbCIsInN3aXBlYWJsZSIsImRyYWdnaW5nIiwiY2xvbmVTbGlkZSIsImFjdGl2ZU5hdiIsImFjdGl2ZVNsaWRlIiwiZGlzYWJsZWRBcnJvdyIsIndhcm4iLCJtc2ciLCJjb25zb2xlIiwiZXJyb3IiLCJfdHlwZW9mIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsImNsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsImNyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInRhcmdldCIsInByb3BzIiwiaSIsImxlbmd0aCIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImtleSIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl9leHRlbmRzIiwiYXNzaWduIiwiYXJndW1lbnRzIiwic291cmNlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZ2V0Iiwib2JqZWN0IiwicHJvcGVydHkiLCJyZWNlaXZlciIsIkZ1bmN0aW9uIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInVuZGVmaW5lZCIsInBhcmVudCIsImdldFByb3RvdHlwZU9mIiwidmFsdWUiLCJnZXR0ZXIiLCJpbmhlcml0cyIsInN1YkNsYXNzIiwic3VwZXJDbGFzcyIsImNyZWF0ZSIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwicG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsInNlbGYiLCJSZWZlcmVuY2VFcnJvciIsInRvSW50IiwicGFyc2VJbnQiLCJ0b0Zsb2F0IiwicGFyc2VGbG9hdCIsImlzU3RyaW5nIiwiaXNPYmplY3QiLCJpc051bWJlciIsImlzRnVuY3Rpb24iLCJpc1VuZGVmaW5lZCIsImlzQXJyYXkiLCJBcnJheSIsIm1vdW50IiwiZ2xpZGUiLCJleHRlbnNpb25zIiwiZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hbWUiLCJfbmFtZSIsImRlZmluZSIsInByb3AiLCJkZWZpbml0aW9uIiwic29ydEtleXMiLCJrZXlzIiwic29ydCIsInJlZHVjZSIsInIiLCJrIiwibWVyZ2VPcHRpb25zIiwic2V0dGluZ3MiLCJvcHRpb25zIiwiRXZlbnRzQnVzIiwiaG9wIiwib24iLCJldmVudCIsImhhbmRsZXIiLCJpbmRleCIsInB1c2giLCJyZW1vdmUiLCJlbWl0IiwiY29udGV4dCIsImZvckVhY2giLCJpdGVtIiwiR2xpZGUiLCJzZWxlY3RvciIsIl9jIiwiX3QiLCJfZSIsImRpc2FibGVkIiwibW91bnQkJDEiLCJtdXRhdGUiLCJ0cmFuc2Zvcm1lcnMiLCJ1cGRhdGUiLCJnbyIsInBhdHRlcm4iLCJSdW4iLCJtYWtlIiwibW92ZSIsImRpc3RhbmNlIiwiVHJhbnNpdGlvbiIsImRpc2FibGUiLCJNb3ZlIiwiZGVzdHJveSIsInBsYXkiLCJpbnRlcnZhbCIsInBhdXNlIiwiZW5hYmxlIiwiaXNUeXBlIiwiZ2V0JCQxIiwiX28iLCJzZXQiLCJzZXQkJDEiLCJvIiwiX2kiLCJfZCIsInN0YXR1cyIsIkNvbXBvbmVudHMiLCJFdmVudHMiLCJfdGhpcyIsImNhbGN1bGF0ZSIsImFmdGVyIiwiaXNTdGFydCIsImlzRW5kIiwiaXNPZmZzZXQiLCJzdGVwcyIsImNvdW50YWJsZVN0ZXBzIiwiTWF0aCIsIm1pbiIsIl9tIiwic3RlcCIsInN1YnN0ciIsIkh0bWwiLCJzbGlkZXMiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsImZ1bmMiLCJ3YWl0IiwidGltZW91dCIsImFyZ3MiLCJyZXN1bHQiLCJwcmV2aW91cyIsImxhdGVyIiwibGVhZGluZyIsImFwcGx5IiwidGhyb3R0bGVkIiwiYXQiLCJyZW1haW5pbmciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsInNldFRpbWVvdXQiLCJjYW5jZWwiLCJNQVJHSU5fVFlQRSIsIkdhcHMiLCJsZW4iLCJzdHlsZSIsIkRpcmVjdGlvbiIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsIlNpemVzIiwid3JhcHBlciIsImNoaWxkcmVuIiwic2libGluZ3MiLCJub2RlIiwicGFyZW50Tm9kZSIsIm4iLCJmaXJzdENoaWxkIiwibWF0Y2hlZCIsIm5leHRTaWJsaW5nIiwibm9kZVR5cGUiLCJleGlzdCIsIndpbmRvdyIsIkhUTUxFbGVtZW50IiwiVFJBQ0tfU0VMRUNUT1IiLCJyb290IiwidHJhY2siLCJxdWVyeVNlbGVjdG9yIiwic2xpY2UiLCJmaWx0ZXIiLCJzbGlkZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiX3IiLCJkb2N1bWVudCIsInQiLCJQZWVrIiwiX3YiLCJiZWZvcmUiLCJvZmZzZXQiLCJtb3ZlbWVudCIsInNsaWRlV2lkdGgiLCJ0cmFuc2xhdGUiLCJpcyIsInNldHVwU2xpZGVzIiwid2lkdGgiLCJzZXR1cFdyYXBwZXIiLCJkaW1lbnRpb24iLCJ3cmFwcGVyU2l6ZSIsIm9mZnNldFdpZHRoIiwiZ3JvdyIsIkNsb25lcyIsInJlZHVjdG9yIiwiQnVpbGQiLCJ0eXBlQ2xhc3MiLCJhY3RpdmVDbGFzcyIsImFkZCIsInNpYmxpbmciLCJyZW1vdmVDbGFzc2VzIiwiaXRlbXMiLCJjb2xsZWN0IiwiX0dsaWRlJHNldHRpbmdzIiwicGVla0luY3JlbWVudGVyIiwicGFydCIsInN0YXJ0IiwiZW5kIiwibWF4IiwiZmxvb3IiLCJjbG9uZSIsImNsb25lTm9kZSIsIl9jbG9uZSIsInVuc2hpZnQiLCJhcHBlbmQiLCJfQ29tcG9uZW50cyRIdG1sIiwiaGFsZiIsInByZXBlbmQiLCJyZXZlcnNlIiwiYXBwZW5kQ2hpbGQiLCJfaTIiLCJpbnNlcnRCZWZvcmUiLCJfaTMiLCJyZW1vdmVDaGlsZCIsIkV2ZW50c0JpbmRlciIsImxpc3RlbmVycyIsImVsIiwiY2xvc3VyZSIsImNhcHR1cmUiLCJhZGRFdmVudExpc3RlbmVyIiwib2ZmIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlJlc2l6ZSIsIkJpbmRlciIsImJpbmQiLCJ1bmJpbmQiLCJWQUxJRF9ESVJFQ1RJT05TIiwiRkxJUEVEX01PVkVNRU5UUyIsInJlc29sdmUiLCJ0b2tlbiIsInNwbGl0Iiwiam9pbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJpbmRleE9mIiwiUnRsIiwibW9kaWZ5IiwiR2FwIiwiR3JvdyIsIlBlZWtpbmciLCJGb2N1c2luZyIsIm11dGF0b3IiLCJUUkFOU0ZPUk1FUlMiLCJjb25jYXQiLCJ0cmFuc2Zvcm1lciIsIlRyYW5zbGF0ZSIsInRyYW5zZm9ybSIsImNvbXBvc2UiLCJkdXJhdGlvbiIsInRyYW5zaXRpb24iLCJjYWxsYmFjayIsInN1cHBvcnRzUGFzc2l2ZSIsIm9wdHMiLCJlIiwic3VwcG9ydHNQYXNzaXZlJDEiLCJTVEFSVF9FVkVOVFMiLCJNT1ZFX0VWRU5UUyIsIkVORF9FVkVOVFMiLCJNT1VTRV9FVkVOVFMiLCJTd2lwZSIsInN3aXBlU2luIiwic3dpcGVTdGFydFgiLCJzd2lwZVN0YXJ0WSIsInBhc3NpdmUiLCJiaW5kU3dpcGVTdGFydCIsInN3aXBlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJiaW5kU3dpcGVNb3ZlIiwiYmluZFN3aXBlRW5kIiwic3ViRXhTeCIsInN1YkV5U3kiLCJwb3dFWCIsImFicyIsInBvd0VZIiwic3dpcGVIeXBvdGVudXNlIiwic3FydCIsInN3aXBlQ2F0aGV0dXMiLCJhc2luIiwiUEkiLCJzdG9wUHJvcGFnYXRpb24iLCJ0aHJlc2hvbGQiLCJzd2lwZURpc3RhbmNlIiwic3dpcGVEZWciLCJyb3VuZCIsInVuYmluZFN3aXBlTW92ZSIsInVuYmluZFN3aXBlRW5kIiwidW5iaW5kU3dpcGVTdGFydCIsIl90aGlzMiIsIl90aGlzMyIsImNoYW5nZWRUb3VjaGVzIiwiSW1hZ2VzIiwiZHJhZ3N0YXJ0IiwicHJldmVudERlZmF1bHQiLCJBbmNob3JzIiwiZGV0YWNoZWQiLCJwcmV2ZW50ZWQiLCJfYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbGljayIsImRldGFjaCIsImRyYWdnYWJsZSIsInNldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dGFjaCIsIk5BVl9TRUxFQ1RPUiIsIkNPTlRST0xTX1NFTEVDVE9SIiwiQ29udHJvbHMiLCJfbiIsImFkZEJpbmRpbmdzIiwic2V0QWN0aXZlIiwicmVtb3ZlQWN0aXZlIiwiY29udHJvbHMiLCJyZW1vdmVCaW5kaW5ncyIsImVsZW1lbnRzIiwiY3VycmVudFRhcmdldCIsIktleWJvYXJkIiwicHJlc3MiLCJrZXlDb2RlIiwiQXV0b3BsYXkiLCJzZXRJbnRlcnZhbCIsInN0b3AiLCJ0aW1lIiwiY2xlYXJJbnRlcnZhbCIsInNvcnRCcmVha3BvaW50cyIsInBvaW50cyIsIkJyZWFrcG9pbnRzIiwibWF0Y2giLCJtYXRjaE1lZGlhIiwicG9pbnQiLCJtYXRjaGVzIiwiQ09NUE9ORU5UUyIsIkdsaWRlJDEiLCJfQ29yZSIsIkdsaWRlJCQxIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTs7Ozs7RUFNQSxJQUFJQSxRQUFRLEdBQUc7RUFDYjs7Ozs7Ozs7O0VBU0FDLEVBQUFBLElBQUksRUFBRSxRQVZPOztFQVliOzs7OztFQUtBQyxFQUFBQSxPQUFPLEVBQUUsQ0FqQkk7O0VBbUJiOzs7OztFQUtBQyxFQUFBQSxPQUFPLEVBQUUsQ0F4Qkk7O0VBMEJiOzs7Ozs7Ozs7RUFTQUMsRUFBQUEsT0FBTyxFQUFFLENBbkNJOztFQXFDYjs7Ozs7RUFLQUMsRUFBQUEsR0FBRyxFQUFFLEVBMUNROztFQTRDYjs7Ozs7RUFLQUMsRUFBQUEsUUFBUSxFQUFFLEtBakRHOztFQW1EYjs7Ozs7RUFLQUMsRUFBQUEsVUFBVSxFQUFFLElBeERDOztFQTBEYjs7Ozs7RUFLQUMsRUFBQUEsUUFBUSxFQUFFLElBL0RHOztFQWlFYjs7Ozs7Ozs7RUFRQUMsRUFBQUEsS0FBSyxFQUFFLEtBekVNOztFQTJFYjs7Ozs7RUFLQUMsRUFBQUEsY0FBYyxFQUFFLEVBaEZIOztFQWtGYjs7Ozs7RUFLQUMsRUFBQUEsYUFBYSxFQUFFLEdBdkZGOztFQXlGYjs7Ozs7RUFLQUMsRUFBQUEsUUFBUSxFQUFFLEtBOUZHOztFQWdHYjs7Ozs7RUFLQUMsRUFBQUEsVUFBVSxFQUFFLEdBckdDOztFQXVHYjs7Ozs7RUFLQUMsRUFBQUEsVUFBVSxFQUFFLEVBNUdDOztFQThHYjs7Ozs7RUFLQUMsRUFBQUEsaUJBQWlCLEVBQUUsR0FuSE47O0VBcUhiOzs7OztFQUtBQyxFQUFBQSxNQUFNLEVBQUUsSUExSEs7O0VBNEhiOzs7OztFQUtBQyxFQUFBQSxjQUFjLEVBQUUsR0FqSUg7O0VBbUliOzs7OztFQUtBQyxFQUFBQSxtQkFBbUIsRUFBRSxtQ0F4SVI7O0VBMEliOzs7OztFQUtBQyxFQUFBQSxRQUFRLEVBQUUsRUEvSUc7O0VBaUpiOzs7Ozs7Ozs7RUFTQUMsRUFBQUEsU0FBUyxFQUFFLEtBMUpFOztFQTRKYjs7Ozs7Ozs7Ozs7O0VBWUFDLEVBQUFBLElBQUksRUFBRSxDQXhLTzs7RUEwS2I7Ozs7Ozs7OztFQVNBQyxFQUFBQSxXQUFXLEVBQUUsRUFuTEE7O0VBcUxiOzs7Ozs7RUFNQUMsRUFBQUEsT0FBTyxFQUFFO0VBQ1BILElBQUFBLFNBQVMsRUFBRTtFQUNUSSxNQUFBQSxHQUFHLEVBQUUsWUFESTtFQUVUQyxNQUFBQSxHQUFHLEVBQUU7RUFGSSxLQURKO0VBS1BDLElBQUFBLE1BQU0sRUFBRSxlQUxEO0VBTVBDLElBQUFBLFFBQVEsRUFBRSxpQkFOSDtFQU9QQyxJQUFBQSxTQUFTLEVBQUUsa0JBUEo7RUFRUEMsSUFBQUEsUUFBUSxFQUFFLGlCQVJIO0VBU1BDLElBQUFBLFVBQVUsRUFBRSxxQkFUTDtFQVVQQyxJQUFBQSxTQUFTLEVBQUUsdUJBVko7RUFXUEMsSUFBQUEsV0FBVyxFQUFFLHNCQVhOO0VBWVBDLElBQUFBLGFBQWEsRUFBRTtFQVpSO0VBM0xJLENBQWY7RUEyTUE7Ozs7Ozs7RUFNQSxTQUFTQyxJQUFULENBQWNDLEdBQWQsRUFBbUI7RUFDakJDLEVBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLG1CQUFtQkYsR0FBakM7RUFDRDs7RUFFRCxJQUFJRyxPQUFPLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPQSxNQUFNLENBQUNDLFFBQWQsS0FBMkIsUUFBM0QsR0FBc0UsVUFBVUMsR0FBVixFQUFlO0VBQ2pHLFNBQU8sT0FBT0EsR0FBZDtFQUNELENBRmEsR0FFVixVQUFVQSxHQUFWLEVBQWU7RUFDakIsU0FBT0EsR0FBRyxJQUFJLE9BQU9GLE1BQVAsS0FBa0IsVUFBekIsSUFBdUNFLEdBQUcsQ0FBQ0MsV0FBSixLQUFvQkgsTUFBM0QsSUFBcUVFLEdBQUcsS0FBS0YsTUFBTSxDQUFDSSxTQUFwRixHQUFnRyxRQUFoRyxHQUEyRyxPQUFPRixHQUF6SDtFQUNELENBSkQ7O0VBTUEsSUFBSUcsY0FBYyxHQUFHLFVBQVVDLFFBQVYsRUFBb0JDLFdBQXBCLEVBQWlDO0VBQ3BELE1BQUksRUFBRUQsUUFBUSxZQUFZQyxXQUF0QixDQUFKLEVBQXdDO0VBQ3RDLFVBQU0sSUFBSUMsU0FBSixDQUFjLG1DQUFkLENBQU47RUFDRDtFQUNGLENBSkQ7O0VBTUEsSUFBSUMsV0FBVyxHQUFHLFlBQVk7RUFDNUIsV0FBU0MsZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDQyxLQUFsQyxFQUF5QztFQUN2QyxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELEtBQUssQ0FBQ0UsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7RUFDckMsVUFBSUUsVUFBVSxHQUFHSCxLQUFLLENBQUNDLENBQUQsQ0FBdEI7RUFDQUUsTUFBQUEsVUFBVSxDQUFDQyxVQUFYLEdBQXdCRCxVQUFVLENBQUNDLFVBQVgsSUFBeUIsS0FBakQ7RUFDQUQsTUFBQUEsVUFBVSxDQUFDRSxZQUFYLEdBQTBCLElBQTFCO0VBQ0EsVUFBSSxXQUFXRixVQUFmLEVBQTJCQSxVQUFVLENBQUNHLFFBQVgsR0FBc0IsSUFBdEI7RUFDM0JDLE1BQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQlQsTUFBdEIsRUFBOEJJLFVBQVUsQ0FBQ00sR0FBekMsRUFBOENOLFVBQTlDO0VBQ0Q7RUFDRjs7RUFFRCxTQUFPLFVBQVVSLFdBQVYsRUFBdUJlLFVBQXZCLEVBQW1DQyxXQUFuQyxFQUFnRDtFQUNyRCxRQUFJRCxVQUFKLEVBQWdCWixnQkFBZ0IsQ0FBQ0gsV0FBVyxDQUFDSCxTQUFiLEVBQXdCa0IsVUFBeEIsQ0FBaEI7RUFDaEIsUUFBSUMsV0FBSixFQUFpQmIsZ0JBQWdCLENBQUNILFdBQUQsRUFBY2dCLFdBQWQsQ0FBaEI7RUFDakIsV0FBT2hCLFdBQVA7RUFDRCxHQUpEO0VBS0QsQ0FoQmlCLEVBQWxCOztFQWtCQSxJQUFJaUIsUUFBUSxHQUFHTCxNQUFNLENBQUNNLE1BQVAsSUFBaUIsVUFBVWQsTUFBVixFQUFrQjtFQUNoRCxPQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdhLFNBQVMsQ0FBQ1osTUFBOUIsRUFBc0NELENBQUMsRUFBdkMsRUFBMkM7RUFDekMsUUFBSWMsTUFBTSxHQUFHRCxTQUFTLENBQUNiLENBQUQsQ0FBdEI7O0VBRUEsU0FBSyxJQUFJUSxHQUFULElBQWdCTSxNQUFoQixFQUF3QjtFQUN0QixVQUFJUixNQUFNLENBQUNmLFNBQVAsQ0FBaUJ3QixjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNGLE1BQXJDLEVBQTZDTixHQUE3QyxDQUFKLEVBQXVEO0VBQ3JEVixRQUFBQSxNQUFNLENBQUNVLEdBQUQsQ0FBTixHQUFjTSxNQUFNLENBQUNOLEdBQUQsQ0FBcEI7RUFDRDtFQUNGO0VBQ0Y7O0VBRUQsU0FBT1YsTUFBUDtFQUNELENBWkQ7O0VBY0EsSUFBSW1CLEdBQUcsR0FBRyxTQUFTQSxHQUFULENBQWFDLE1BQWIsRUFBcUJDLFFBQXJCLEVBQStCQyxRQUEvQixFQUF5QztFQUNqRCxNQUFJRixNQUFNLEtBQUssSUFBZixFQUFxQkEsTUFBTSxHQUFHRyxRQUFRLENBQUM5QixTQUFsQjtFQUNyQixNQUFJK0IsSUFBSSxHQUFHaEIsTUFBTSxDQUFDaUIsd0JBQVAsQ0FBZ0NMLE1BQWhDLEVBQXdDQyxRQUF4QyxDQUFYOztFQUVBLE1BQUlHLElBQUksS0FBS0UsU0FBYixFQUF3QjtFQUN0QixRQUFJQyxNQUFNLEdBQUduQixNQUFNLENBQUNvQixjQUFQLENBQXNCUixNQUF0QixDQUFiOztFQUVBLFFBQUlPLE1BQU0sS0FBSyxJQUFmLEVBQXFCO0VBQ25CLGFBQU9ELFNBQVA7RUFDRCxLQUZELE1BRU87RUFDTCxhQUFPUCxHQUFHLENBQUNRLE1BQUQsRUFBU04sUUFBVCxFQUFtQkMsUUFBbkIsQ0FBVjtFQUNEO0VBQ0YsR0FSRCxNQVFPLElBQUksV0FBV0UsSUFBZixFQUFxQjtFQUMxQixXQUFPQSxJQUFJLENBQUNLLEtBQVo7RUFDRCxHQUZNLE1BRUE7RUFDTCxRQUFJQyxNQUFNLEdBQUdOLElBQUksQ0FBQ0wsR0FBbEI7O0VBRUEsUUFBSVcsTUFBTSxLQUFLSixTQUFmLEVBQTBCO0VBQ3hCLGFBQU9BLFNBQVA7RUFDRDs7RUFFRCxXQUFPSSxNQUFNLENBQUNaLElBQVAsQ0FBWUksUUFBWixDQUFQO0VBQ0Q7RUFDRixDQXZCRDs7RUF5QkEsSUFBSVMsUUFBUSxHQUFHLFVBQVVDLFFBQVYsRUFBb0JDLFVBQXBCLEVBQWdDO0VBQzdDLE1BQUksT0FBT0EsVUFBUCxLQUFzQixVQUF0QixJQUFvQ0EsVUFBVSxLQUFLLElBQXZELEVBQTZEO0VBQzNELFVBQU0sSUFBSXBDLFNBQUosQ0FBYyw2REFBNkQsT0FBT29DLFVBQWxGLENBQU47RUFDRDs7RUFFREQsRUFBQUEsUUFBUSxDQUFDdkMsU0FBVCxHQUFxQmUsTUFBTSxDQUFDMEIsTUFBUCxDQUFjRCxVQUFVLElBQUlBLFVBQVUsQ0FBQ3hDLFNBQXZDLEVBQWtEO0VBQ3JFRCxJQUFBQSxXQUFXLEVBQUU7RUFDWHFDLE1BQUFBLEtBQUssRUFBRUcsUUFESTtFQUVYM0IsTUFBQUEsVUFBVSxFQUFFLEtBRkQ7RUFHWEUsTUFBQUEsUUFBUSxFQUFFLElBSEM7RUFJWEQsTUFBQUEsWUFBWSxFQUFFO0VBSkg7RUFEd0QsR0FBbEQsQ0FBckI7RUFRQSxNQUFJMkIsVUFBSixFQUFnQnpCLE1BQU0sQ0FBQzJCLGNBQVAsR0FBd0IzQixNQUFNLENBQUMyQixjQUFQLENBQXNCSCxRQUF0QixFQUFnQ0MsVUFBaEMsQ0FBeEIsR0FBc0VELFFBQVEsQ0FBQ0ksU0FBVCxHQUFxQkgsVUFBM0Y7RUFDakIsQ0FkRDs7RUFnQkEsSUFBSUkseUJBQXlCLEdBQUcsVUFBVUMsSUFBVixFQUFnQnBCLElBQWhCLEVBQXNCO0VBQ3BELE1BQUksQ0FBQ29CLElBQUwsRUFBVztFQUNULFVBQU0sSUFBSUMsY0FBSixDQUFtQiwyREFBbkIsQ0FBTjtFQUNEOztFQUVELFNBQU9yQixJQUFJLEtBQUssT0FBT0EsSUFBUCxLQUFnQixRQUFoQixJQUE0QixPQUFPQSxJQUFQLEtBQWdCLFVBQWpELENBQUosR0FBbUVBLElBQW5FLEdBQTBFb0IsSUFBakY7RUFDRCxDQU5EO0VBUUE7Ozs7Ozs7OztFQU9BLFNBQVNFLEtBQVQsQ0FBZVgsS0FBZixFQUFzQjtFQUNwQixTQUFPWSxRQUFRLENBQUNaLEtBQUQsQ0FBZjtFQUNEO0VBRUQ7Ozs7Ozs7OztFQU9BLFNBQVNhLE9BQVQsQ0FBaUJiLEtBQWpCLEVBQXdCO0VBQ3RCLFNBQU9jLFVBQVUsQ0FBQ2QsS0FBRCxDQUFqQjtFQUNEO0VBRUQ7Ozs7Ozs7O0VBTUEsU0FBU2UsUUFBVCxDQUFrQmYsS0FBbEIsRUFBeUI7RUFDdkIsU0FBTyxPQUFPQSxLQUFQLEtBQWlCLFFBQXhCO0VBQ0Q7RUFFRDs7Ozs7Ozs7OztFQVFBLFNBQVNnQixRQUFULENBQWtCaEIsS0FBbEIsRUFBeUI7RUFDdkIsTUFBSTlFLElBQUksR0FBRyxPQUFPOEUsS0FBUCxLQUFpQixXQUFqQixHQUErQixXQUEvQixHQUE2Q3pDLE9BQU8sQ0FBQ3lDLEtBQUQsQ0FBL0Q7RUFFQSxTQUFPOUUsSUFBSSxLQUFLLFVBQVQsSUFBdUJBLElBQUksS0FBSyxRQUFULElBQXFCLENBQUMsQ0FBQzhFLEtBQXJELENBSHVCO0VBSXhCO0VBRUQ7Ozs7Ozs7O0VBTUEsU0FBU2lCLFFBQVQsQ0FBa0JqQixLQUFsQixFQUF5QjtFQUN2QixTQUFPLE9BQU9BLEtBQVAsS0FBaUIsUUFBeEI7RUFDRDtFQUVEOzs7Ozs7OztFQU1BLFNBQVNrQixVQUFULENBQW9CbEIsS0FBcEIsRUFBMkI7RUFDekIsU0FBTyxPQUFPQSxLQUFQLEtBQWlCLFVBQXhCO0VBQ0Q7RUFFRDs7Ozs7Ozs7RUFNQSxTQUFTbUIsV0FBVCxDQUFxQm5CLEtBQXJCLEVBQTRCO0VBQzFCLFNBQU8sT0FBT0EsS0FBUCxLQUFpQixXQUF4QjtFQUNEO0VBRUQ7Ozs7Ozs7O0VBTUEsU0FBU29CLE9BQVQsQ0FBaUJwQixLQUFqQixFQUF3QjtFQUN0QixTQUFPQSxLQUFLLENBQUNyQyxXQUFOLEtBQXNCMEQsS0FBN0I7RUFDRDtFQUVEOzs7Ozs7Ozs7OztFQVNBLFNBQVNDLEtBQVQsQ0FBZUMsS0FBZixFQUFzQkMsVUFBdEIsRUFBa0NDLE1BQWxDLEVBQTBDO0VBQ3hDLE1BQUlDLFVBQVUsR0FBRyxFQUFqQjs7RUFFQSxPQUFLLElBQUlDLElBQVQsSUFBaUJILFVBQWpCLEVBQTZCO0VBQzNCLFFBQUlOLFVBQVUsQ0FBQ00sVUFBVSxDQUFDRyxJQUFELENBQVgsQ0FBZCxFQUFrQztFQUNoQ0QsTUFBQUEsVUFBVSxDQUFDQyxJQUFELENBQVYsR0FBbUJILFVBQVUsQ0FBQ0csSUFBRCxDQUFWLENBQWlCSixLQUFqQixFQUF3QkcsVUFBeEIsRUFBb0NELE1BQXBDLENBQW5CO0VBQ0QsS0FGRCxNQUVPO0VBQ0x0RSxNQUFBQSxJQUFJLENBQUMsOEJBQUQsQ0FBSjtFQUNEO0VBQ0Y7O0VBRUQsT0FBSyxJQUFJeUUsS0FBVCxJQUFrQkYsVUFBbEIsRUFBOEI7RUFDNUIsUUFBSVIsVUFBVSxDQUFDUSxVQUFVLENBQUNFLEtBQUQsQ0FBVixDQUFrQk4sS0FBbkIsQ0FBZCxFQUF5QztFQUN2Q0ksTUFBQUEsVUFBVSxDQUFDRSxLQUFELENBQVYsQ0FBa0JOLEtBQWxCO0VBQ0Q7RUFDRjs7RUFFRCxTQUFPSSxVQUFQO0VBQ0Q7RUFFRDs7Ozs7Ozs7OztFQVFBLFNBQVNHLE1BQVQsQ0FBZ0JuRSxHQUFoQixFQUFxQm9FLElBQXJCLEVBQTJCQyxVQUEzQixFQUF1QztFQUNyQ3BELEVBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQmxCLEdBQXRCLEVBQTJCb0UsSUFBM0IsRUFBaUNDLFVBQWpDO0VBQ0Q7RUFFRDs7Ozs7Ozs7RUFNQSxTQUFTQyxRQUFULENBQWtCdEUsR0FBbEIsRUFBdUI7RUFDckIsU0FBT2lCLE1BQU0sQ0FBQ3NELElBQVAsQ0FBWXZFLEdBQVosRUFBaUJ3RSxJQUFqQixHQUF3QkMsTUFBeEIsQ0FBK0IsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0VBQ3BERCxJQUFBQSxDQUFDLENBQUNDLENBQUQsQ0FBRCxHQUFPM0UsR0FBRyxDQUFDMkUsQ0FBRCxDQUFWO0VBRUEsV0FBT0QsQ0FBQyxDQUFDQyxDQUFELENBQUQsRUFBTUQsQ0FBYjtFQUNELEdBSk0sRUFJSixFQUpJLENBQVA7RUFLRDtFQUVEOzs7Ozs7Ozs7RUFPQSxTQUFTRSxZQUFULENBQXNCckgsUUFBdEIsRUFBZ0NzSCxRQUFoQyxFQUEwQztFQUN4QyxNQUFJQyxPQUFPLEdBQUd4RCxRQUFRLENBQUMsRUFBRCxFQUFLL0QsUUFBTCxFQUFlc0gsUUFBZixDQUF0QixDQUR3QztFQUl4QztFQUNBO0VBQ0E7RUFDQTs7O0VBQ0EsTUFBSUEsUUFBUSxDQUFDbkQsY0FBVCxDQUF3QixTQUF4QixDQUFKLEVBQXdDO0VBQ3RDb0QsSUFBQUEsT0FBTyxDQUFDaEcsT0FBUixHQUFrQndDLFFBQVEsQ0FBQyxFQUFELEVBQUsvRCxRQUFRLENBQUN1QixPQUFkLEVBQXVCK0YsUUFBUSxDQUFDL0YsT0FBaEMsQ0FBMUI7O0VBRUEsUUFBSStGLFFBQVEsQ0FBQy9GLE9BQVQsQ0FBaUI0QyxjQUFqQixDQUFnQyxXQUFoQyxDQUFKLEVBQWtEO0VBQ2hEb0QsTUFBQUEsT0FBTyxDQUFDaEcsT0FBUixDQUFnQkgsU0FBaEIsR0FBNEIyQyxRQUFRLENBQUMsRUFBRCxFQUFLL0QsUUFBUSxDQUFDdUIsT0FBVCxDQUFpQkgsU0FBdEIsRUFBaUNrRyxRQUFRLENBQUMvRixPQUFULENBQWlCSCxTQUFsRCxDQUFwQztFQUNEO0VBQ0Y7O0VBRUQsTUFBSWtHLFFBQVEsQ0FBQ25ELGNBQVQsQ0FBd0IsYUFBeEIsQ0FBSixFQUE0QztFQUMxQ29ELElBQUFBLE9BQU8sQ0FBQ2pHLFdBQVIsR0FBc0J5QyxRQUFRLENBQUMsRUFBRCxFQUFLL0QsUUFBUSxDQUFDc0IsV0FBZCxFQUEyQmdHLFFBQVEsQ0FBQ2hHLFdBQXBDLENBQTlCO0VBQ0Q7O0VBRUQsU0FBT2lHLE9BQVA7RUFDRDs7RUFFRCxJQUFJQyxTQUFTLEdBQUcsWUFBWTtFQUMxQjs7Ozs7RUFLQSxXQUFTQSxTQUFULEdBQXFCO0VBQ25CLFFBQUloQixNQUFNLEdBQUd2QyxTQUFTLENBQUNaLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JZLFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJXLFNBQXpDLEdBQXFEWCxTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxFQUFqRjtFQUNBckIsSUFBQUEsY0FBYyxDQUFDLElBQUQsRUFBTzRFLFNBQVAsQ0FBZDtFQUVBLFNBQUtoQixNQUFMLEdBQWNBLE1BQWQ7RUFDQSxTQUFLaUIsR0FBTCxHQUFXakIsTUFBTSxDQUFDckMsY0FBbEI7RUFDRDtFQUVEOzs7Ozs7OztFQVFBbkIsRUFBQUEsV0FBVyxDQUFDd0UsU0FBRCxFQUFZLENBQUM7RUFDdEI1RCxJQUFBQSxHQUFHLEVBQUUsSUFEaUI7RUFFdEJtQixJQUFBQSxLQUFLLEVBQUUsU0FBUzJDLEVBQVQsQ0FBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7RUFDakMsVUFBSXpCLE9BQU8sQ0FBQ3dCLEtBQUQsQ0FBWCxFQUFvQjtFQUNsQixhQUFLLElBQUl2RSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHdUUsS0FBSyxDQUFDdEUsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7RUFDckMsZUFBS3NFLEVBQUwsQ0FBUUMsS0FBSyxDQUFDdkUsQ0FBRCxDQUFiLEVBQWtCd0UsT0FBbEI7RUFDRDtFQUNGLE9BTGdDOzs7RUFRakMsVUFBSSxDQUFDLEtBQUtILEdBQUwsQ0FBU3JELElBQVQsQ0FBYyxLQUFLb0MsTUFBbkIsRUFBMkJtQixLQUEzQixDQUFMLEVBQXdDO0VBQ3RDLGFBQUtuQixNQUFMLENBQVltQixLQUFaLElBQXFCLEVBQXJCO0VBQ0QsT0FWZ0M7OztFQWFqQyxVQUFJRSxLQUFLLEdBQUcsS0FBS3JCLE1BQUwsQ0FBWW1CLEtBQVosRUFBbUJHLElBQW5CLENBQXdCRixPQUF4QixJQUFtQyxDQUEvQyxDQWJpQzs7RUFnQmpDLGFBQU87RUFDTEcsUUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7RUFDeEIsaUJBQU8sS0FBS3ZCLE1BQUwsQ0FBWW1CLEtBQVosRUFBbUJFLEtBQW5CLENBQVA7RUFDRDtFQUhJLE9BQVA7RUFLRDtFQUVEOzs7Ozs7O0VBekJzQixHQUFELEVBZ0NwQjtFQUNEakUsSUFBQUEsR0FBRyxFQUFFLE1BREo7RUFFRG1CLElBQUFBLEtBQUssRUFBRSxTQUFTaUQsSUFBVCxDQUFjTCxLQUFkLEVBQXFCTSxPQUFyQixFQUE4QjtFQUNuQyxVQUFJOUIsT0FBTyxDQUFDd0IsS0FBRCxDQUFYLEVBQW9CO0VBQ2xCLGFBQUssSUFBSXZFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd1RSxLQUFLLENBQUN0RSxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztFQUNyQyxlQUFLNEUsSUFBTCxDQUFVTCxLQUFLLENBQUN2RSxDQUFELENBQWYsRUFBb0I2RSxPQUFwQjtFQUNEO0VBQ0YsT0FMa0M7OztFQVFuQyxVQUFJLENBQUMsS0FBS1IsR0FBTCxDQUFTckQsSUFBVCxDQUFjLEtBQUtvQyxNQUFuQixFQUEyQm1CLEtBQTNCLENBQUwsRUFBd0M7RUFDdEM7RUFDRCxPQVZrQzs7O0VBYW5DLFdBQUtuQixNQUFMLENBQVltQixLQUFaLEVBQW1CTyxPQUFuQixDQUEyQixVQUFVQyxJQUFWLEVBQWdCO0VBQ3pDQSxRQUFBQSxJQUFJLENBQUNGLE9BQU8sSUFBSSxFQUFaLENBQUo7RUFDRCxPQUZEO0VBR0Q7RUFsQkEsR0FoQ29CLENBQVosQ0FBWDtFQW9EQSxTQUFPVCxTQUFQO0VBQ0QsQ0EzRWUsRUFBaEI7O0VBNkVBLElBQUlZLEtBQUssR0FBRyxZQUFZO0VBQ3RCOzs7Ozs7RUFNQSxXQUFTQSxLQUFULENBQWVDLFFBQWYsRUFBeUI7RUFDdkIsUUFBSWQsT0FBTyxHQUFHdEQsU0FBUyxDQUFDWixNQUFWLEdBQW1CLENBQW5CLElBQXdCWSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxTQUF6QyxHQUFxRFgsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsRUFBbEY7RUFDQXJCLElBQUFBLGNBQWMsQ0FBQyxJQUFELEVBQU93RixLQUFQLENBQWQ7RUFFQSxTQUFLRSxFQUFMLEdBQVUsRUFBVjtFQUNBLFNBQUtDLEVBQUwsR0FBVSxFQUFWO0VBQ0EsU0FBS0MsRUFBTCxHQUFVLElBQUloQixTQUFKLEVBQVY7RUFFQSxTQUFLaUIsUUFBTCxHQUFnQixLQUFoQjtFQUNBLFNBQUtKLFFBQUwsR0FBZ0JBLFFBQWhCO0VBQ0EsU0FBS2YsUUFBTCxHQUFnQkQsWUFBWSxDQUFDckgsUUFBRCxFQUFXdUgsT0FBWCxDQUE1QjtFQUNBLFNBQUtNLEtBQUwsR0FBYSxLQUFLUCxRQUFMLENBQWNwSCxPQUEzQjtFQUNEO0VBRUQ7Ozs7Ozs7O0VBUUE4QyxFQUFBQSxXQUFXLENBQUNvRixLQUFELEVBQVEsQ0FBQztFQUNsQnhFLElBQUFBLEdBQUcsRUFBRSxPQURhO0VBRWxCbUIsSUFBQUEsS0FBSyxFQUFFLFNBQVMyRCxRQUFULEdBQW9CO0VBQ3pCLFVBQUluQyxVQUFVLEdBQUd0QyxTQUFTLENBQUNaLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JZLFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJXLFNBQXpDLEdBQXFEWCxTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxFQUFyRjs7RUFFQSxXQUFLdUUsRUFBTCxDQUFRUixJQUFSLENBQWEsY0FBYjs7RUFFQSxVQUFJakMsUUFBUSxDQUFDUSxVQUFELENBQVosRUFBMEI7RUFDeEIsYUFBSytCLEVBQUwsR0FBVWpDLEtBQUssQ0FBQyxJQUFELEVBQU9FLFVBQVAsRUFBbUIsS0FBS2lDLEVBQXhCLENBQWY7RUFDRCxPQUZELE1BRU87RUFDTHRHLFFBQUFBLElBQUksQ0FBQywyQ0FBRCxDQUFKO0VBQ0Q7O0VBRUQsV0FBS3NHLEVBQUwsQ0FBUVIsSUFBUixDQUFhLGFBQWI7O0VBRUEsYUFBTyxJQUFQO0VBQ0Q7RUFFRDs7Ozs7OztFQWxCa0IsR0FBRCxFQXlCaEI7RUFDRHBFLElBQUFBLEdBQUcsRUFBRSxRQURKO0VBRURtQixJQUFBQSxLQUFLLEVBQUUsU0FBUzRELE1BQVQsR0FBa0I7RUFDdkIsVUFBSUMsWUFBWSxHQUFHM0UsU0FBUyxDQUFDWixNQUFWLEdBQW1CLENBQW5CLElBQXdCWSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxTQUF6QyxHQUFxRFgsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsRUFBdkY7O0VBRUEsVUFBSWtDLE9BQU8sQ0FBQ3lDLFlBQUQsQ0FBWCxFQUEyQjtFQUN6QixhQUFLTCxFQUFMLEdBQVVLLFlBQVY7RUFDRCxPQUZELE1BRU87RUFDTDFHLFFBQUFBLElBQUksQ0FBQywyQ0FBRCxDQUFKO0VBQ0Q7O0VBRUQsYUFBTyxJQUFQO0VBQ0Q7RUFFRDs7Ozs7OztFQWRDLEdBekJnQixFQThDaEI7RUFDRDBCLElBQUFBLEdBQUcsRUFBRSxRQURKO0VBRURtQixJQUFBQSxLQUFLLEVBQUUsU0FBUzhELE1BQVQsR0FBa0I7RUFDdkIsVUFBSXZCLFFBQVEsR0FBR3JELFNBQVMsQ0FBQ1osTUFBVixHQUFtQixDQUFuQixJQUF3QlksU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQlcsU0FBekMsR0FBcURYLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLEVBQW5GO0VBRUEsV0FBS3FELFFBQUwsR0FBZ0JELFlBQVksQ0FBQyxLQUFLQyxRQUFOLEVBQWdCQSxRQUFoQixDQUE1Qjs7RUFFQSxVQUFJQSxRQUFRLENBQUNuRCxjQUFULENBQXdCLFNBQXhCLENBQUosRUFBd0M7RUFDdEMsYUFBSzBELEtBQUwsR0FBYVAsUUFBUSxDQUFDcEgsT0FBdEI7RUFDRDs7RUFFRCxXQUFLc0ksRUFBTCxDQUFRUixJQUFSLENBQWEsUUFBYjs7RUFFQSxhQUFPLElBQVA7RUFDRDtFQUVEOzs7Ozs7Ozs7Ozs7RUFoQkMsR0E5Q2dCLEVBMEVoQjtFQUNEcEUsSUFBQUEsR0FBRyxFQUFFLElBREo7RUFFRG1CLElBQUFBLEtBQUssRUFBRSxTQUFTK0QsRUFBVCxDQUFZQyxPQUFaLEVBQXFCO0VBQzFCLFdBQUtULEVBQUwsQ0FBUVUsR0FBUixDQUFZQyxJQUFaLENBQWlCRixPQUFqQjs7RUFFQSxhQUFPLElBQVA7RUFDRDtFQUVEOzs7Ozs7O0VBUkMsR0ExRWdCLEVBeUZoQjtFQUNEbkYsSUFBQUEsR0FBRyxFQUFFLE1BREo7RUFFRG1CLElBQUFBLEtBQUssRUFBRSxTQUFTbUUsSUFBVCxDQUFjQyxRQUFkLEVBQXdCO0VBQzdCLFdBQUtiLEVBQUwsQ0FBUWMsVUFBUixDQUFtQkMsT0FBbkI7O0VBQ0EsV0FBS2YsRUFBTCxDQUFRZ0IsSUFBUixDQUFhTCxJQUFiLENBQWtCRSxRQUFsQjs7RUFFQSxhQUFPLElBQVA7RUFDRDtFQUVEOzs7Ozs7RUFUQyxHQXpGZ0IsRUF3R2hCO0VBQ0R2RixJQUFBQSxHQUFHLEVBQUUsU0FESjtFQUVEbUIsSUFBQUEsS0FBSyxFQUFFLFNBQVN3RSxPQUFULEdBQW1CO0VBQ3hCLFdBQUtmLEVBQUwsQ0FBUVIsSUFBUixDQUFhLFNBQWI7O0VBRUEsYUFBTyxJQUFQO0VBQ0Q7RUFFRDs7Ozs7OztFQVJDLEdBeEdnQixFQXVIaEI7RUFDRHBFLElBQUFBLEdBQUcsRUFBRSxNQURKO0VBRURtQixJQUFBQSxLQUFLLEVBQUUsU0FBU3lFLElBQVQsR0FBZ0I7RUFDckIsVUFBSUMsUUFBUSxHQUFHeEYsU0FBUyxDQUFDWixNQUFWLEdBQW1CLENBQW5CLElBQXdCWSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxTQUF6QyxHQUFxRFgsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsS0FBbkY7O0VBRUEsVUFBSXdGLFFBQUosRUFBYztFQUNaLGFBQUtuQyxRQUFMLENBQWNoSCxRQUFkLEdBQXlCbUosUUFBekI7RUFDRDs7RUFFRCxXQUFLakIsRUFBTCxDQUFRUixJQUFSLENBQWEsTUFBYjs7RUFFQSxhQUFPLElBQVA7RUFDRDtFQUVEOzs7Ozs7RUFkQyxHQXZIZ0IsRUEySWhCO0VBQ0RwRSxJQUFBQSxHQUFHLEVBQUUsT0FESjtFQUVEbUIsSUFBQUEsS0FBSyxFQUFFLFNBQVMyRSxLQUFULEdBQWlCO0VBQ3RCLFdBQUtsQixFQUFMLENBQVFSLElBQVIsQ0FBYSxPQUFiOztFQUVBLGFBQU8sSUFBUDtFQUNEO0VBRUQ7Ozs7OztFQVJDLEdBM0lnQixFQXlKaEI7RUFDRHBFLElBQUFBLEdBQUcsRUFBRSxTQURKO0VBRURtQixJQUFBQSxLQUFLLEVBQUUsU0FBU3NFLE9BQVQsR0FBbUI7RUFDeEIsV0FBS1osUUFBTCxHQUFnQixJQUFoQjtFQUVBLGFBQU8sSUFBUDtFQUNEO0VBRUQ7Ozs7OztFQVJDLEdBekpnQixFQXVLaEI7RUFDRDdFLElBQUFBLEdBQUcsRUFBRSxRQURKO0VBRURtQixJQUFBQSxLQUFLLEVBQUUsU0FBUzRFLE1BQVQsR0FBa0I7RUFDdkIsV0FBS2xCLFFBQUwsR0FBZ0IsS0FBaEI7RUFFQSxhQUFPLElBQVA7RUFDRDtFQUVEOzs7Ozs7OztFQVJDLEdBdktnQixFQXVMaEI7RUFDRDdFLElBQUFBLEdBQUcsRUFBRSxJQURKO0VBRURtQixJQUFBQSxLQUFLLEVBQUUsU0FBUzJDLEVBQVQsQ0FBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7RUFDakMsV0FBS1ksRUFBTCxDQUFRZCxFQUFSLENBQVdDLEtBQVgsRUFBa0JDLE9BQWxCOztFQUVBLGFBQU8sSUFBUDtFQUNEO0VBRUQ7Ozs7Ozs7RUFSQyxHQXZMZ0IsRUFzTWhCO0VBQ0RoRSxJQUFBQSxHQUFHLEVBQUUsUUFESjtFQUVEbUIsSUFBQUEsS0FBSyxFQUFFLFNBQVM2RSxNQUFULENBQWdCbEQsSUFBaEIsRUFBc0I7RUFDM0IsYUFBTyxLQUFLWSxRQUFMLENBQWNySCxJQUFkLEtBQXVCeUcsSUFBOUI7RUFDRDtFQUVEOzs7Ozs7RUFOQyxHQXRNZ0IsRUFrTmhCO0VBQ0Q5QyxJQUFBQSxHQUFHLEVBQUUsVUFESjtFQUVEUyxJQUFBQSxHQUFHLEVBQUUsU0FBU3dGLE1BQVQsR0FBa0I7RUFDckIsYUFBTyxLQUFLQyxFQUFaO0VBQ0Q7RUFFRDs7Ozs7O0VBTkM7RUFhREMsSUFBQUEsR0FBRyxFQUFFLFNBQVNDLE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CO0VBQ3RCLFVBQUlsRSxRQUFRLENBQUNrRSxDQUFELENBQVosRUFBaUI7RUFDZixhQUFLSCxFQUFMLEdBQVVHLENBQVY7RUFDRCxPQUZELE1BRU87RUFDTC9ILFFBQUFBLElBQUksQ0FBQyx1Q0FBRCxDQUFKO0VBQ0Q7RUFDRjtFQUVEOzs7Ozs7RUFyQkMsR0FsTmdCLEVBNk9oQjtFQUNEMEIsSUFBQUEsR0FBRyxFQUFFLE9BREo7RUFFRFMsSUFBQUEsR0FBRyxFQUFFLFNBQVN3RixNQUFULEdBQWtCO0VBQ3JCLGFBQU8sS0FBS0ssRUFBWjtFQUNEO0VBRUQ7Ozs7O0VBTkM7RUFZREgsSUFBQUEsR0FBRyxFQUFFLFNBQVNDLE1BQVQsQ0FBZ0I1RyxDQUFoQixFQUFtQjtFQUN0QixXQUFLOEcsRUFBTCxHQUFVeEUsS0FBSyxDQUFDdEMsQ0FBRCxDQUFmO0VBQ0Q7RUFFRDs7Ozs7O0VBaEJDLEdBN09nQixFQW1RaEI7RUFDRFEsSUFBQUEsR0FBRyxFQUFFLE1BREo7RUFFRFMsSUFBQUEsR0FBRyxFQUFFLFNBQVN3RixNQUFULEdBQWtCO0VBQ3JCLGFBQU8sS0FBS3ZDLFFBQUwsQ0FBY3JILElBQXJCO0VBQ0Q7RUFFRDs7Ozs7O0VBTkMsR0FuUWdCLEVBK1FoQjtFQUNEMkQsSUFBQUEsR0FBRyxFQUFFLFVBREo7RUFFRFMsSUFBQUEsR0FBRyxFQUFFLFNBQVN3RixNQUFULEdBQWtCO0VBQ3JCLGFBQU8sS0FBS00sRUFBWjtFQUNEO0VBRUQ7Ozs7O0VBTkM7RUFZREosSUFBQUEsR0FBRyxFQUFFLFNBQVNDLE1BQVQsQ0FBZ0JJLE1BQWhCLEVBQXdCO0VBQzNCLFdBQUtELEVBQUwsR0FBVSxDQUFDLENBQUNDLE1BQVo7RUFDRDtFQWRBLEdBL1FnQixDQUFSLENBQVg7RUErUkEsU0FBT2hDLEtBQVA7RUFDRCxDQTdUVyxFQUFaOztFQStUQSxTQUFTWSxHQUFULENBQWNaLEtBQWQsRUFBcUJpQyxVQUFyQixFQUFpQ0MsTUFBakMsRUFBeUM7RUFDdkMsTUFBSXRCLEdBQUcsR0FBRztFQUNSOzs7OztFQUtBM0MsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7RUFDdEIsV0FBS3lELEVBQUwsR0FBVSxLQUFWO0VBQ0QsS0FSTzs7RUFXUjs7Ozs7RUFLQWIsSUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsQ0FBY0MsSUFBZCxFQUFvQjtFQUN4QixVQUFJcUIsS0FBSyxHQUFHLElBQVo7O0VBRUEsVUFBSSxDQUFDbkMsS0FBSyxDQUFDSyxRQUFYLEVBQXFCO0VBQ25CTCxRQUFBQSxLQUFLLENBQUNpQixPQUFOO0VBRUEsYUFBS0gsSUFBTCxHQUFZQSxJQUFaO0VBRUFvQixRQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksWUFBWixFQUEwQixLQUFLa0IsSUFBL0I7RUFFQSxhQUFLc0IsU0FBTDtFQUVBRixRQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksS0FBWixFQUFtQixLQUFLa0IsSUFBeEI7RUFFQW1CLFFBQUFBLFVBQVUsQ0FBQ2pCLFVBQVgsQ0FBc0JxQixLQUF0QixDQUE0QixZQUFZO0VBQ3RDLGNBQUlGLEtBQUssQ0FBQ0csT0FBTixFQUFKLEVBQXFCO0VBQ25CSixZQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksV0FBWixFQUF5QnVDLEtBQUssQ0FBQ3JCLElBQS9CO0VBQ0Q7O0VBRUQsY0FBSXFCLEtBQUssQ0FBQ0ksS0FBTixFQUFKLEVBQW1CO0VBQ2pCTCxZQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksU0FBWixFQUF1QnVDLEtBQUssQ0FBQ3JCLElBQTdCO0VBQ0Q7O0VBRUQsY0FBSXFCLEtBQUssQ0FBQ0ssUUFBTixDQUFlLEdBQWYsS0FBdUJMLEtBQUssQ0FBQ0ssUUFBTixDQUFlLEdBQWYsQ0FBM0IsRUFBZ0Q7RUFDOUNMLFlBQUFBLEtBQUssQ0FBQ1QsRUFBTixHQUFXLEtBQVg7RUFFQVEsWUFBQUEsTUFBTSxDQUFDdEMsSUFBUCxDQUFZLFlBQVosRUFBMEJ1QyxLQUFLLENBQUNyQixJQUFoQztFQUNEOztFQUVEb0IsVUFBQUEsTUFBTSxDQUFDdEMsSUFBUCxDQUFZLFdBQVosRUFBeUJ1QyxLQUFLLENBQUNyQixJQUEvQjtFQUVBZCxVQUFBQSxLQUFLLENBQUN1QixNQUFOO0VBQ0QsU0FsQkQ7RUFtQkQ7RUFDRixLQWxETzs7RUFxRFI7Ozs7O0VBS0FhLElBQUFBLFNBQVMsRUFBRSxTQUFTQSxTQUFULEdBQXFCO0VBQzlCLFVBQUl0QixJQUFJLEdBQUcsS0FBS0EsSUFBaEI7RUFBQSxVQUNJN0YsTUFBTSxHQUFHLEtBQUtBLE1BRGxCO0VBRUEsVUFBSXdILEtBQUssR0FBRzNCLElBQUksQ0FBQzJCLEtBQWpCO0VBQUEsVUFDSXpKLFNBQVMsR0FBRzhILElBQUksQ0FBQzlILFNBRHJCO0VBSUEsVUFBSTBKLGNBQWMsR0FBRzlFLFFBQVEsQ0FBQ04sS0FBSyxDQUFDbUYsS0FBRCxDQUFOLENBQVIsSUFBMEJuRixLQUFLLENBQUNtRixLQUFELENBQUwsS0FBaUIsQ0FBaEU7O0VBRUEsY0FBUXpKLFNBQVI7RUFDRSxhQUFLLEdBQUw7RUFDRSxjQUFJeUosS0FBSyxLQUFLLEdBQWQsRUFBbUI7RUFDakJ6QyxZQUFBQSxLQUFLLENBQUNQLEtBQU4sR0FBY3hFLE1BQWQ7RUFDRCxXQUZELE1BRU8sSUFBSSxLQUFLc0gsS0FBTCxFQUFKLEVBQWtCO0VBQ3ZCLGdCQUFJLEVBQUV2QyxLQUFLLENBQUN3QixNQUFOLENBQWEsUUFBYixLQUEwQixDQUFDeEIsS0FBSyxDQUFDZCxRQUFOLENBQWV0RyxNQUE1QyxDQUFKLEVBQXlEO0VBQ3ZELG1CQUFLOEksRUFBTCxHQUFVLElBQVY7RUFFQTFCLGNBQUFBLEtBQUssQ0FBQ1AsS0FBTixHQUFjLENBQWQ7RUFDRDtFQUNGLFdBTk0sTUFNQSxJQUFJaUQsY0FBSixFQUFvQjtFQUN6QjFDLFlBQUFBLEtBQUssQ0FBQ1AsS0FBTixJQUFla0QsSUFBSSxDQUFDQyxHQUFMLENBQVMzSCxNQUFNLEdBQUcrRSxLQUFLLENBQUNQLEtBQXhCLEVBQStCLENBQUNuQyxLQUFLLENBQUNtRixLQUFELENBQXJDLENBQWY7RUFDRCxXQUZNLE1BRUE7RUFDTHpDLFlBQUFBLEtBQUssQ0FBQ1AsS0FBTjtFQUNEOztFQUNEOztFQUVGLGFBQUssR0FBTDtFQUNFLGNBQUlnRCxLQUFLLEtBQUssR0FBZCxFQUFtQjtFQUNqQnpDLFlBQUFBLEtBQUssQ0FBQ1AsS0FBTixHQUFjLENBQWQ7RUFDRCxXQUZELE1BRU8sSUFBSSxLQUFLNkMsT0FBTCxFQUFKLEVBQW9CO0VBQ3pCLGdCQUFJLEVBQUV0QyxLQUFLLENBQUN3QixNQUFOLENBQWEsUUFBYixLQUEwQixDQUFDeEIsS0FBSyxDQUFDZCxRQUFOLENBQWV0RyxNQUE1QyxDQUFKLEVBQXlEO0VBQ3ZELG1CQUFLOEksRUFBTCxHQUFVLElBQVY7RUFFQTFCLGNBQUFBLEtBQUssQ0FBQ1AsS0FBTixHQUFjeEUsTUFBZDtFQUNEO0VBQ0YsV0FOTSxNQU1BLElBQUl5SCxjQUFKLEVBQW9CO0VBQ3pCMUMsWUFBQUEsS0FBSyxDQUFDUCxLQUFOLElBQWVrRCxJQUFJLENBQUNDLEdBQUwsQ0FBUzVDLEtBQUssQ0FBQ1AsS0FBZixFQUFzQm5DLEtBQUssQ0FBQ21GLEtBQUQsQ0FBM0IsQ0FBZjtFQUNELFdBRk0sTUFFQTtFQUNMekMsWUFBQUEsS0FBSyxDQUFDUCxLQUFOO0VBQ0Q7O0VBQ0Q7O0VBRUYsYUFBSyxHQUFMO0VBQ0VPLFVBQUFBLEtBQUssQ0FBQ1AsS0FBTixHQUFjZ0QsS0FBZDtFQUNBOztFQUVGO0VBQ0UzSSxVQUFBQSxJQUFJLENBQUMsZ0NBQWdDZCxTQUFoQyxHQUE0Q3lKLEtBQTVDLEdBQW9ELGlCQUFyRCxDQUFKO0VBQ0E7RUF2Q0o7RUF5Q0QsS0E1R087O0VBK0dSOzs7OztFQUtBSCxJQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtFQUMxQixhQUFPdEMsS0FBSyxDQUFDUCxLQUFOLEtBQWdCLENBQXZCO0VBQ0QsS0F0SE87O0VBeUhSOzs7OztFQUtBOEMsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7RUFDdEIsYUFBT3ZDLEtBQUssQ0FBQ1AsS0FBTixLQUFnQixLQUFLeEUsTUFBNUI7RUFDRCxLQWhJTzs7RUFtSVI7Ozs7OztFQU1BdUgsSUFBQUEsUUFBUSxFQUFFLFNBQVNBLFFBQVQsQ0FBa0J4SixTQUFsQixFQUE2QjtFQUNyQyxhQUFPLEtBQUswSSxFQUFMLElBQVcsS0FBS1osSUFBTCxDQUFVOUgsU0FBVixLQUF3QkEsU0FBMUM7RUFDRDtFQTNJTyxHQUFWO0VBOElBd0YsRUFBQUEsTUFBTSxDQUFDb0MsR0FBRCxFQUFNLE1BQU4sRUFBYztFQUNsQjs7Ozs7RUFLQTNFLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBTyxLQUFLNEcsRUFBWjtFQUNELEtBUmlCOztFQVdsQjs7Ozs7RUFLQWxCLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULENBQWFoRixLQUFiLEVBQW9CO0VBQ3ZCLFVBQUltRyxJQUFJLEdBQUduRyxLQUFLLENBQUNvRyxNQUFOLENBQWEsQ0FBYixDQUFYO0VBRUEsV0FBS0YsRUFBTCxHQUFVO0VBQ1I3SixRQUFBQSxTQUFTLEVBQUUyRCxLQUFLLENBQUNvRyxNQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQURIO0VBRVJOLFFBQUFBLEtBQUssRUFBRUssSUFBSSxHQUFHeEYsS0FBSyxDQUFDd0YsSUFBRCxDQUFMLEdBQWN4RixLQUFLLENBQUN3RixJQUFELENBQW5CLEdBQTRCQSxJQUEvQixHQUFzQztFQUZ6QyxPQUFWO0VBSUQ7RUF2QmlCLEdBQWQsQ0FBTjtFQTBCQXRFLEVBQUFBLE1BQU0sQ0FBQ29DLEdBQUQsRUFBTSxRQUFOLEVBQWdCO0VBQ3BCOzs7Ozs7RUFNQTNFLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsVUFBSWlELFFBQVEsR0FBR2MsS0FBSyxDQUFDZCxRQUFyQjtFQUNBLFVBQUlqRSxNQUFNLEdBQUdnSCxVQUFVLENBQUNlLElBQVgsQ0FBZ0JDLE1BQWhCLENBQXVCaEksTUFBcEMsQ0FGa0I7RUFLbEI7RUFDQTs7RUFFQSxVQUFJK0UsS0FBSyxDQUFDd0IsTUFBTixDQUFhLFFBQWIsS0FBMEJ0QyxRQUFRLENBQUNsSCxPQUFULEtBQXFCLFFBQS9DLElBQTJEa0gsUUFBUSxDQUFDN0csS0FBeEUsRUFBK0U7RUFDN0UsZUFBTzRDLE1BQU0sR0FBRyxDQUFULElBQWNxQyxLQUFLLENBQUM0QixRQUFRLENBQUNuSCxPQUFWLENBQUwsR0FBMEIsQ0FBeEMsSUFBNkN1RixLQUFLLENBQUM0QixRQUFRLENBQUNsSCxPQUFWLENBQXpEO0VBQ0Q7O0VBRUQsYUFBT2lELE1BQU0sR0FBRyxDQUFoQjtFQUNEO0VBcEJtQixHQUFoQixDQUFOO0VBdUJBdUQsRUFBQUEsTUFBTSxDQUFDb0MsR0FBRCxFQUFNLFFBQU4sRUFBZ0I7RUFDcEI7Ozs7O0VBS0EzRSxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLGFBQU8sS0FBS3lGLEVBQVo7RUFDRDtFQVJtQixHQUFoQixDQUFOO0VBV0EsU0FBT2QsR0FBUDtFQUNEO0VBRUQ7Ozs7Ozs7RUFLQSxTQUFTc0MsR0FBVCxHQUFlO0VBQ2IsU0FBTyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBUDtFQUNEO0VBRUQ7Ozs7Ozs7Ozs7Ozs7RUFXQSxTQUFTckssUUFBVCxDQUFrQnNLLElBQWxCLEVBQXdCQyxJQUF4QixFQUE4Qm5FLE9BQTlCLEVBQXVDO0VBQ3JDLE1BQUlvRSxPQUFPLEdBQUcsS0FBSyxDQUFuQjtFQUFBLE1BQ0kxRCxPQUFPLEdBQUcsS0FBSyxDQURuQjtFQUFBLE1BRUkyRCxJQUFJLEdBQUcsS0FBSyxDQUZoQjtFQUFBLE1BR0lDLE1BQU0sR0FBRyxLQUFLLENBSGxCO0VBSUEsTUFBSUMsUUFBUSxHQUFHLENBQWY7RUFDQSxNQUFJLENBQUN2RSxPQUFMLEVBQWNBLE9BQU8sR0FBRyxFQUFWOztFQUVkLE1BQUl3RSxLQUFLLEdBQUcsU0FBU0EsS0FBVCxHQUFpQjtFQUMzQkQsSUFBQUEsUUFBUSxHQUFHdkUsT0FBTyxDQUFDeUUsT0FBUixLQUFvQixLQUFwQixHQUE0QixDQUE1QixHQUFnQ1YsR0FBRyxFQUE5QztFQUNBSyxJQUFBQSxPQUFPLEdBQUcsSUFBVjtFQUNBRSxJQUFBQSxNQUFNLEdBQUdKLElBQUksQ0FBQ1EsS0FBTCxDQUFXaEUsT0FBWCxFQUFvQjJELElBQXBCLENBQVQ7RUFDQSxRQUFJLENBQUNELE9BQUwsRUFBYzFELE9BQU8sR0FBRzJELElBQUksR0FBRyxJQUFqQjtFQUNmLEdBTEQ7O0VBT0EsTUFBSU0sU0FBUyxHQUFHLFNBQVNBLFNBQVQsR0FBcUI7RUFDbkMsUUFBSUMsRUFBRSxHQUFHYixHQUFHLEVBQVo7RUFDQSxRQUFJLENBQUNRLFFBQUQsSUFBYXZFLE9BQU8sQ0FBQ3lFLE9BQVIsS0FBb0IsS0FBckMsRUFBNENGLFFBQVEsR0FBR0ssRUFBWDtFQUM1QyxRQUFJQyxTQUFTLEdBQUdWLElBQUksSUFBSVMsRUFBRSxHQUFHTCxRQUFULENBQXBCO0VBQ0E3RCxJQUFBQSxPQUFPLEdBQUcsSUFBVjtFQUNBMkQsSUFBQUEsSUFBSSxHQUFHM0gsU0FBUDs7RUFDQSxRQUFJbUksU0FBUyxJQUFJLENBQWIsSUFBa0JBLFNBQVMsR0FBR1YsSUFBbEMsRUFBd0M7RUFDdEMsVUFBSUMsT0FBSixFQUFhO0VBQ1hVLFFBQUFBLFlBQVksQ0FBQ1YsT0FBRCxDQUFaO0VBQ0FBLFFBQUFBLE9BQU8sR0FBRyxJQUFWO0VBQ0Q7O0VBQ0RHLE1BQUFBLFFBQVEsR0FBR0ssRUFBWDtFQUNBTixNQUFBQSxNQUFNLEdBQUdKLElBQUksQ0FBQ1EsS0FBTCxDQUFXaEUsT0FBWCxFQUFvQjJELElBQXBCLENBQVQ7RUFDQSxVQUFJLENBQUNELE9BQUwsRUFBYzFELE9BQU8sR0FBRzJELElBQUksR0FBRyxJQUFqQjtFQUNmLEtBUkQsTUFRTyxJQUFJLENBQUNELE9BQUQsSUFBWXBFLE9BQU8sQ0FBQytFLFFBQVIsS0FBcUIsS0FBckMsRUFBNEM7RUFDakRYLE1BQUFBLE9BQU8sR0FBR1ksVUFBVSxDQUFDUixLQUFELEVBQVFLLFNBQVIsQ0FBcEI7RUFDRDs7RUFDRCxXQUFPUCxNQUFQO0VBQ0QsR0FsQkQ7O0VBb0JBSyxFQUFBQSxTQUFTLENBQUNNLE1BQVYsR0FBbUIsWUFBWTtFQUM3QkgsSUFBQUEsWUFBWSxDQUFDVixPQUFELENBQVo7RUFDQUcsSUFBQUEsUUFBUSxHQUFHLENBQVg7RUFDQUgsSUFBQUEsT0FBTyxHQUFHMUQsT0FBTyxHQUFHMkQsSUFBSSxHQUFHLElBQTNCO0VBQ0QsR0FKRDs7RUFNQSxTQUFPTSxTQUFQO0VBQ0Q7O0VBRUQsSUFBSU8sV0FBVyxHQUFHO0VBQ2hCakwsRUFBQUEsR0FBRyxFQUFFLENBQUMsWUFBRCxFQUFlLGFBQWYsQ0FEVztFQUVoQkMsRUFBQUEsR0FBRyxFQUFFLENBQUMsYUFBRCxFQUFnQixZQUFoQjtFQUZXLENBQWxCOztFQUtBLFNBQVNpTCxJQUFULENBQWV0RSxLQUFmLEVBQXNCaUMsVUFBdEIsRUFBa0NDLE1BQWxDLEVBQTBDO0VBQ3hDLE1BQUlvQyxJQUFJLEdBQUc7RUFDVDs7Ozs7OztFQU9BVCxJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlWixNQUFmLEVBQXVCO0VBQzVCLFdBQUssSUFBSWpJLENBQUMsR0FBRyxDQUFSLEVBQVd1SixHQUFHLEdBQUd0QixNQUFNLENBQUNoSSxNQUE3QixFQUFxQ0QsQ0FBQyxHQUFHdUosR0FBekMsRUFBOEN2SixDQUFDLEVBQS9DLEVBQW1EO0VBQ2pELFlBQUl3SixLQUFLLEdBQUd2QixNQUFNLENBQUNqSSxDQUFELENBQU4sQ0FBVXdKLEtBQXRCO0VBQ0EsWUFBSXhMLFNBQVMsR0FBR2lKLFVBQVUsQ0FBQ3dDLFNBQVgsQ0FBcUI5SCxLQUFyQzs7RUFFQSxZQUFJM0IsQ0FBQyxLQUFLLENBQVYsRUFBYTtFQUNYd0osVUFBQUEsS0FBSyxDQUFDSCxXQUFXLENBQUNyTCxTQUFELENBQVgsQ0FBdUIsQ0FBdkIsQ0FBRCxDQUFMLEdBQW1DLEtBQUsyRCxLQUFMLEdBQWEsQ0FBYixHQUFpQixJQUFwRDtFQUNELFNBRkQsTUFFTztFQUNMNkgsVUFBQUEsS0FBSyxDQUFDSCxXQUFXLENBQUNyTCxTQUFELENBQVgsQ0FBdUIsQ0FBdkIsQ0FBRCxDQUFMLEdBQW1DLEVBQW5DO0VBQ0Q7O0VBRUQsWUFBSWdDLENBQUMsS0FBS2lJLE1BQU0sQ0FBQ2hJLE1BQVAsR0FBZ0IsQ0FBMUIsRUFBNkI7RUFDM0J1SixVQUFBQSxLQUFLLENBQUNILFdBQVcsQ0FBQ3JMLFNBQUQsQ0FBWCxDQUF1QixDQUF2QixDQUFELENBQUwsR0FBbUMsS0FBSzJELEtBQUwsR0FBYSxDQUFiLEdBQWlCLElBQXBEO0VBQ0QsU0FGRCxNQUVPO0VBQ0w2SCxVQUFBQSxLQUFLLENBQUNILFdBQVcsQ0FBQ3JMLFNBQUQsQ0FBWCxDQUF1QixDQUF2QixDQUFELENBQUwsR0FBbUMsRUFBbkM7RUFDRDtFQUNGO0VBQ0YsS0F6QlE7O0VBNEJUOzs7Ozs7RUFNQTJHLElBQUFBLE1BQU0sRUFBRSxTQUFTQSxNQUFULENBQWdCc0QsTUFBaEIsRUFBd0I7RUFDOUIsV0FBSyxJQUFJakksQ0FBQyxHQUFHLENBQVIsRUFBV3VKLEdBQUcsR0FBR3RCLE1BQU0sQ0FBQ2hJLE1BQTdCLEVBQXFDRCxDQUFDLEdBQUd1SixHQUF6QyxFQUE4Q3ZKLENBQUMsRUFBL0MsRUFBbUQ7RUFDakQsWUFBSXdKLEtBQUssR0FBR3ZCLE1BQU0sQ0FBQ2pJLENBQUQsQ0FBTixDQUFVd0osS0FBdEI7RUFFQUEsUUFBQUEsS0FBSyxDQUFDRSxVQUFOLEdBQW1CLEVBQW5CO0VBQ0FGLFFBQUFBLEtBQUssQ0FBQ0csV0FBTixHQUFvQixFQUFwQjtFQUNEO0VBQ0Y7RUF6Q1EsR0FBWDtFQTRDQW5HLEVBQUFBLE1BQU0sQ0FBQzhGLElBQUQsRUFBTyxPQUFQLEVBQWdCO0VBQ3BCOzs7OztFQUtBckksSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtFQUNsQixhQUFPcUIsS0FBSyxDQUFDMEMsS0FBSyxDQUFDZCxRQUFOLENBQWVqSCxHQUFoQixDQUFaO0VBQ0Q7RUFSbUIsR0FBaEIsQ0FBTjtFQVdBdUcsRUFBQUEsTUFBTSxDQUFDOEYsSUFBRCxFQUFPLE1BQVAsRUFBZTtFQUNuQjs7Ozs7O0VBTUFySSxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLGFBQU9xSSxJQUFJLENBQUMzSCxLQUFMLElBQWNzRixVQUFVLENBQUMyQyxLQUFYLENBQWlCM0osTUFBakIsR0FBMEIsQ0FBeEMsQ0FBUDtFQUNEO0VBVGtCLEdBQWYsQ0FBTjtFQVlBdUQsRUFBQUEsTUFBTSxDQUFDOEYsSUFBRCxFQUFPLFVBQVAsRUFBbUI7RUFDdkI7Ozs7OztFQU1BckksSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtFQUNsQixVQUFJbEUsT0FBTyxHQUFHaUksS0FBSyxDQUFDZCxRQUFOLENBQWVuSCxPQUE3QjtFQUVBLGFBQU91TSxJQUFJLENBQUMzSCxLQUFMLElBQWM1RSxPQUFPLEdBQUcsQ0FBeEIsSUFBNkJBLE9BQXBDO0VBQ0Q7RUFYc0IsR0FBbkIsQ0FBTjtFQWNBOzs7Ozs7RUFLQW1LLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxDQUFDLGFBQUQsRUFBZ0IsUUFBaEIsQ0FBVixFQUFxQ3ZHLFFBQVEsQ0FBQyxZQUFZO0VBQ3hEdUwsSUFBQUEsSUFBSSxDQUFDVCxLQUFMLENBQVc1QixVQUFVLENBQUNlLElBQVgsQ0FBZ0I2QixPQUFoQixDQUF3QkMsUUFBbkM7RUFDRCxHQUY0QyxFQUUxQyxFQUYwQyxDQUE3QztFQUlBOzs7OztFQUlBNUMsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBWTtFQUMvQmdGLElBQUFBLElBQUksQ0FBQzNFLE1BQUwsQ0FBWXNDLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjZCLE9BQWhCLENBQXdCQyxRQUFwQztFQUNELEdBRkQ7RUFJQSxTQUFPUixJQUFQO0VBQ0Q7RUFFRDs7Ozs7Ozs7RUFNQSxTQUFTUyxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtFQUN0QixNQUFJQSxJQUFJLElBQUlBLElBQUksQ0FBQ0MsVUFBakIsRUFBNkI7RUFDM0IsUUFBSUMsQ0FBQyxHQUFHRixJQUFJLENBQUNDLFVBQUwsQ0FBZ0JFLFVBQXhCO0VBQ0EsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0VBRUEsV0FBT0YsQ0FBUCxFQUFVQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0csV0FBaEIsRUFBNkI7RUFDM0IsVUFBSUgsQ0FBQyxDQUFDSSxRQUFGLEtBQWUsQ0FBZixJQUFvQkosQ0FBQyxLQUFLRixJQUE5QixFQUFvQztFQUNsQ0ksUUFBQUEsT0FBTyxDQUFDMUYsSUFBUixDQUFhd0YsQ0FBYjtFQUNEO0VBQ0Y7O0VBRUQsV0FBT0UsT0FBUDtFQUNEOztFQUVELFNBQU8sRUFBUDtFQUNEO0VBRUQ7Ozs7Ozs7O0VBTUEsU0FBU0csS0FBVCxDQUFlUCxJQUFmLEVBQXFCO0VBQ25CLE1BQUlBLElBQUksSUFBSUEsSUFBSSxZQUFZUSxNQUFNLENBQUNDLFdBQW5DLEVBQWdEO0VBQzlDLFdBQU8sSUFBUDtFQUNEOztFQUVELFNBQU8sS0FBUDtFQUNEOztFQUVELElBQUlDLGNBQWMsR0FBRyx5QkFBckI7O0VBRUEsU0FBUzFDLElBQVQsQ0FBZWhELEtBQWYsRUFBc0JpQyxVQUF0QixFQUFrQztFQUNoQyxNQUFJZSxJQUFJLEdBQUc7RUFDVDs7Ozs7RUFLQS9FLElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0VBQ3RCLFdBQUswSCxJQUFMLEdBQVkzRixLQUFLLENBQUNDLFFBQWxCO0VBQ0EsV0FBSzJGLEtBQUwsR0FBYSxLQUFLRCxJQUFMLENBQVVFLGFBQVYsQ0FBd0JILGNBQXhCLENBQWI7RUFDQSxXQUFLekMsTUFBTCxHQUFjakYsS0FBSyxDQUFDekQsU0FBTixDQUFnQnVMLEtBQWhCLENBQXNCOUosSUFBdEIsQ0FBMkIsS0FBSzZJLE9BQUwsQ0FBYUMsUUFBeEMsRUFBa0RpQixNQUFsRCxDQUF5RCxVQUFVQyxLQUFWLEVBQWlCO0VBQ3RGLGVBQU8sQ0FBQ0EsS0FBSyxDQUFDQyxTQUFOLENBQWdCQyxRQUFoQixDQUF5QmxHLEtBQUssQ0FBQ2QsUUFBTixDQUFlL0YsT0FBZixDQUF1Qk8sVUFBaEQsQ0FBUjtFQUNELE9BRmEsQ0FBZDtFQUdEO0VBWlEsR0FBWDtFQWVBOEUsRUFBQUEsTUFBTSxDQUFDd0UsSUFBRCxFQUFPLE1BQVAsRUFBZTtFQUNuQjs7Ozs7RUFLQS9HLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBTytHLElBQUksQ0FBQ21ELEVBQVo7RUFDRCxLQVJrQjs7RUFXbkI7Ozs7O0VBS0F4RSxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhNUMsQ0FBYixFQUFnQjtFQUNuQixVQUFJckIsUUFBUSxDQUFDcUIsQ0FBRCxDQUFaLEVBQWlCO0VBQ2ZBLFFBQUFBLENBQUMsR0FBR3FILFFBQVEsQ0FBQ1AsYUFBVCxDQUF1QjlHLENBQXZCLENBQUo7RUFDRDs7RUFFRCxVQUFJd0csS0FBSyxDQUFDeEcsQ0FBRCxDQUFULEVBQWM7RUFDWmlFLFFBQUFBLElBQUksQ0FBQ21ELEVBQUwsR0FBVXBILENBQVY7RUFDRCxPQUZELE1BRU87RUFDTGpGLFFBQUFBLElBQUksQ0FBQywyQ0FBRCxDQUFKO0VBQ0Q7RUFDRjtFQTFCa0IsR0FBZixDQUFOO0VBNkJBMEUsRUFBQUEsTUFBTSxDQUFDd0UsSUFBRCxFQUFPLE9BQVAsRUFBZ0I7RUFDcEI7Ozs7O0VBS0EvRyxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLGFBQU8rRyxJQUFJLENBQUM3QyxFQUFaO0VBQ0QsS0FSbUI7O0VBV3BCOzs7OztFQUtBd0IsSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsQ0FBYTBFLENBQWIsRUFBZ0I7RUFDbkIsVUFBSWQsS0FBSyxDQUFDYyxDQUFELENBQVQsRUFBYztFQUNackQsUUFBQUEsSUFBSSxDQUFDN0MsRUFBTCxHQUFVa0csQ0FBVjtFQUNELE9BRkQsTUFFTztFQUNMdk0sUUFBQUEsSUFBSSxDQUFDLDhDQUE4QzRMLGNBQTlDLEdBQStELGFBQWhFLENBQUo7RUFDRDtFQUNGO0VBdEJtQixHQUFoQixDQUFOO0VBeUJBbEgsRUFBQUEsTUFBTSxDQUFDd0UsSUFBRCxFQUFPLFNBQVAsRUFBa0I7RUFDdEI7Ozs7O0VBS0EvRyxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLGFBQU8rRyxJQUFJLENBQUM0QyxLQUFMLENBQVdkLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBUDtFQUNEO0VBUnFCLEdBQWxCLENBQU47RUFXQSxTQUFPOUIsSUFBUDtFQUNEOztFQUVELFNBQVNzRCxJQUFULENBQWV0RyxLQUFmLEVBQXNCaUMsVUFBdEIsRUFBa0NDLE1BQWxDLEVBQTBDO0VBQ3hDLE1BQUlvRSxJQUFJLEdBQUc7RUFDVDs7Ozs7RUFLQXJJLElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0VBQ3RCLFdBQUt0QixLQUFMLEdBQWFxRCxLQUFLLENBQUNkLFFBQU4sQ0FBZWpHLElBQTVCO0VBQ0Q7RUFSUSxHQUFYO0VBV0F1RixFQUFBQSxNQUFNLENBQUM4SCxJQUFELEVBQU8sT0FBUCxFQUFnQjtFQUNwQjs7Ozs7RUFLQXJLLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBT3FLLElBQUksQ0FBQ0MsRUFBWjtFQUNELEtBUm1COztFQVdwQjs7Ozs7O0VBTUE1RSxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhaEYsS0FBYixFQUFvQjtFQUN2QixVQUFJZ0IsUUFBUSxDQUFDaEIsS0FBRCxDQUFaLEVBQXFCO0VBQ25CQSxRQUFBQSxLQUFLLENBQUM2SixNQUFOLEdBQWVsSixLQUFLLENBQUNYLEtBQUssQ0FBQzZKLE1BQVAsQ0FBcEI7RUFDQTdKLFFBQUFBLEtBQUssQ0FBQzBGLEtBQU4sR0FBYy9FLEtBQUssQ0FBQ1gsS0FBSyxDQUFDMEYsS0FBUCxDQUFuQjtFQUNELE9BSEQsTUFHTztFQUNMMUYsUUFBQUEsS0FBSyxHQUFHVyxLQUFLLENBQUNYLEtBQUQsQ0FBYjtFQUNEOztFQUVEMkosTUFBQUEsSUFBSSxDQUFDQyxFQUFMLEdBQVU1SixLQUFWO0VBQ0Q7RUExQm1CLEdBQWhCLENBQU47RUE2QkE2QixFQUFBQSxNQUFNLENBQUM4SCxJQUFELEVBQU8sVUFBUCxFQUFtQjtFQUN2Qjs7Ozs7RUFLQXJLLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsVUFBSVUsS0FBSyxHQUFHMkosSUFBSSxDQUFDM0osS0FBakI7RUFDQSxVQUFJNUUsT0FBTyxHQUFHaUksS0FBSyxDQUFDZCxRQUFOLENBQWVuSCxPQUE3Qjs7RUFFQSxVQUFJNEYsUUFBUSxDQUFDaEIsS0FBRCxDQUFaLEVBQXFCO0VBQ25CLGVBQU9BLEtBQUssQ0FBQzZKLE1BQU4sR0FBZXpPLE9BQWYsR0FBeUI0RSxLQUFLLENBQUMwRixLQUFOLEdBQWN0SyxPQUE5QztFQUNEOztFQUVELGFBQU80RSxLQUFLLEdBQUcsQ0FBUixHQUFZNUUsT0FBbkI7RUFDRDtFQWZzQixHQUFuQixDQUFOO0VBa0JBOzs7OztFQUlBbUssRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FBVixFQUFnQyxZQUFZO0VBQzFDZ0gsSUFBQUEsSUFBSSxDQUFDckksS0FBTDtFQUNELEdBRkQ7RUFJQSxTQUFPcUksSUFBUDtFQUNEOztFQUVELFNBQVNwRixJQUFULENBQWVsQixLQUFmLEVBQXNCaUMsVUFBdEIsRUFBa0NDLE1BQWxDLEVBQTBDO0VBQ3hDLE1BQUloQixJQUFJLEdBQUc7RUFDVDs7Ozs7RUFLQWpELElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0VBQ3RCLFdBQUt5RCxFQUFMLEdBQVUsQ0FBVjtFQUNELEtBUlE7O0VBV1Q7Ozs7OztFQU1BYixJQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtFQUNwQixVQUFJc0IsS0FBSyxHQUFHLElBQVo7O0VBRUEsVUFBSXNFLE1BQU0sR0FBRzVLLFNBQVMsQ0FBQ1osTUFBVixHQUFtQixDQUFuQixJQUF3QlksU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQlcsU0FBekMsR0FBcURYLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLENBQWpGO0VBRUEsV0FBSzRLLE1BQUwsR0FBY0EsTUFBZDtFQUVBdkUsTUFBQUEsTUFBTSxDQUFDdEMsSUFBUCxDQUFZLE1BQVosRUFBb0I7RUFDbEI4RyxRQUFBQSxRQUFRLEVBQUUsS0FBSy9KO0VBREcsT0FBcEI7RUFJQXNGLE1BQUFBLFVBQVUsQ0FBQ2pCLFVBQVgsQ0FBc0JxQixLQUF0QixDQUE0QixZQUFZO0VBQ3RDSCxRQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksWUFBWixFQUEwQjtFQUN4QjhHLFVBQUFBLFFBQVEsRUFBRXZFLEtBQUssQ0FBQ3hGO0VBRFEsU0FBMUI7RUFHRCxPQUpEO0VBS0Q7RUFqQ1EsR0FBWDtFQW9DQTZCLEVBQUFBLE1BQU0sQ0FBQzBDLElBQUQsRUFBTyxRQUFQLEVBQWlCO0VBQ3JCOzs7OztFQUtBakYsSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtFQUNsQixhQUFPaUYsSUFBSSxDQUFDUSxFQUFaO0VBQ0QsS0FSb0I7O0VBV3JCOzs7OztFQUtBQyxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhaEYsS0FBYixFQUFvQjtFQUN2QnVFLE1BQUFBLElBQUksQ0FBQ1EsRUFBTCxHQUFVLENBQUM1RCxXQUFXLENBQUNuQixLQUFELENBQVosR0FBc0JXLEtBQUssQ0FBQ1gsS0FBRCxDQUEzQixHQUFxQyxDQUEvQztFQUNEO0VBbEJvQixHQUFqQixDQUFOO0VBcUJBNkIsRUFBQUEsTUFBTSxDQUFDMEMsSUFBRCxFQUFPLFdBQVAsRUFBb0I7RUFDeEI7Ozs7O0VBS0FqRixJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLGFBQU9nRyxVQUFVLENBQUMyQyxLQUFYLENBQWlCK0IsVUFBakIsR0FBOEIzRyxLQUFLLENBQUNQLEtBQTNDO0VBQ0Q7RUFSdUIsR0FBcEIsQ0FBTjtFQVdBakIsRUFBQUEsTUFBTSxDQUFDMEMsSUFBRCxFQUFPLE9BQVAsRUFBZ0I7RUFDcEI7Ozs7O0VBS0FqRixJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLFVBQUl3SyxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7RUFDQSxVQUFJRyxTQUFTLEdBQUcsS0FBS0EsU0FBckI7O0VBRUEsVUFBSTNFLFVBQVUsQ0FBQ3dDLFNBQVgsQ0FBcUJvQyxFQUFyQixDQUF3QixLQUF4QixDQUFKLEVBQW9DO0VBQ2xDLGVBQU9ELFNBQVMsR0FBR0gsTUFBbkI7RUFDRDs7RUFFRCxhQUFPRyxTQUFTLEdBQUdILE1BQW5CO0VBQ0Q7RUFmbUIsR0FBaEIsQ0FBTjtFQWtCQTs7Ozs7O0VBS0F2RSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsQ0FBQyxjQUFELEVBQWlCLEtBQWpCLENBQVYsRUFBbUMsWUFBWTtFQUM3QzRCLElBQUFBLElBQUksQ0FBQ0wsSUFBTDtFQUNELEdBRkQ7RUFJQSxTQUFPSyxJQUFQO0VBQ0Q7O0VBRUQsU0FBUzBELEtBQVQsQ0FBZ0I1RSxLQUFoQixFQUF1QmlDLFVBQXZCLEVBQW1DQyxNQUFuQyxFQUEyQztFQUN6QyxNQUFJMEMsS0FBSyxHQUFHO0VBQ1Y7Ozs7O0VBS0FrQyxJQUFBQSxXQUFXLEVBQUUsU0FBU0EsV0FBVCxHQUF1QjtFQUNsQyxVQUFJQyxLQUFLLEdBQUcsS0FBS0osVUFBTCxHQUFrQixJQUE5QjtFQUNBLFVBQUkxRCxNQUFNLEdBQUdoQixVQUFVLENBQUNlLElBQVgsQ0FBZ0JDLE1BQTdCOztFQUVBLFdBQUssSUFBSWpJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdpSSxNQUFNLENBQUNoSSxNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztFQUN0Q2lJLFFBQUFBLE1BQU0sQ0FBQ2pJLENBQUQsQ0FBTixDQUFVd0osS0FBVixDQUFnQnVDLEtBQWhCLEdBQXdCQSxLQUF4QjtFQUNEO0VBQ0YsS0FiUzs7RUFnQlY7Ozs7O0VBS0FDLElBQUFBLFlBQVksRUFBRSxTQUFTQSxZQUFULENBQXNCQyxTQUF0QixFQUFpQztFQUM3Q2hGLE1BQUFBLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjZCLE9BQWhCLENBQXdCTCxLQUF4QixDQUE4QnVDLEtBQTlCLEdBQXNDLEtBQUtHLFdBQUwsR0FBbUIsSUFBekQ7RUFDRCxLQXZCUzs7RUEwQlY7Ozs7O0VBS0F2SCxJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtFQUN4QixVQUFJc0QsTUFBTSxHQUFHaEIsVUFBVSxDQUFDZSxJQUFYLENBQWdCQyxNQUE3Qjs7RUFFQSxXQUFLLElBQUlqSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUksTUFBTSxDQUFDaEksTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7RUFDdENpSSxRQUFBQSxNQUFNLENBQUNqSSxDQUFELENBQU4sQ0FBVXdKLEtBQVYsQ0FBZ0J1QyxLQUFoQixHQUF3QixFQUF4QjtFQUNEOztFQUVEOUUsTUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBaEIsQ0FBd0JMLEtBQXhCLENBQThCdUMsS0FBOUIsR0FBc0MsRUFBdEM7RUFDRDtFQXZDUyxHQUFaO0VBMENBdkksRUFBQUEsTUFBTSxDQUFDb0csS0FBRCxFQUFRLFFBQVIsRUFBa0I7RUFDdEI7Ozs7O0VBS0EzSSxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLGFBQU9nRyxVQUFVLENBQUNlLElBQVgsQ0FBZ0JDLE1BQWhCLENBQXVCaEksTUFBOUI7RUFDRDtFQVJxQixHQUFsQixDQUFOO0VBV0F1RCxFQUFBQSxNQUFNLENBQUNvRyxLQUFELEVBQVEsT0FBUixFQUFpQjtFQUNyQjs7Ozs7RUFLQTNJLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBT2dHLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjJDLElBQWhCLENBQXFCd0IsV0FBNUI7RUFDRDtFQVJvQixHQUFqQixDQUFOO0VBV0EzSSxFQUFBQSxNQUFNLENBQUNvRyxLQUFELEVBQVEsYUFBUixFQUF1QjtFQUMzQjs7Ozs7RUFLQTNJLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBTzJJLEtBQUssQ0FBQytCLFVBQU4sR0FBbUIvQixLQUFLLENBQUMzSixNQUF6QixHQUFrQ2dILFVBQVUsQ0FBQ3FDLElBQVgsQ0FBZ0I4QyxJQUFsRCxHQUF5RG5GLFVBQVUsQ0FBQ29GLE1BQVgsQ0FBa0JELElBQWxGO0VBQ0Q7RUFSMEIsR0FBdkIsQ0FBTjtFQVdBNUksRUFBQUEsTUFBTSxDQUFDb0csS0FBRCxFQUFRLFlBQVIsRUFBc0I7RUFDMUI7Ozs7O0VBS0EzSSxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0VBQ2xCLGFBQU8ySSxLQUFLLENBQUNtQyxLQUFOLEdBQWMvRyxLQUFLLENBQUNkLFFBQU4sQ0FBZW5ILE9BQTdCLEdBQXVDa0ssVUFBVSxDQUFDcUUsSUFBWCxDQUFnQmdCLFFBQXZELEdBQWtFckYsVUFBVSxDQUFDcUMsSUFBWCxDQUFnQmdELFFBQXpGO0VBQ0Q7RUFSeUIsR0FBdEIsQ0FBTjtFQVdBOzs7Ozs7O0VBTUFwRixFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsQ0FBQyxjQUFELEVBQWlCLFFBQWpCLEVBQTJCLFFBQTNCLENBQVYsRUFBZ0QsWUFBWTtFQUMxRHNGLElBQUFBLEtBQUssQ0FBQ2tDLFdBQU47RUFDQWxDLElBQUFBLEtBQUssQ0FBQ29DLFlBQU47RUFDRCxHQUhEO0VBS0E7Ozs7O0VBSUE5RSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFZO0VBQy9Cc0YsSUFBQUEsS0FBSyxDQUFDakYsTUFBTjtFQUNELEdBRkQ7RUFJQSxTQUFPaUYsS0FBUDtFQUNEOztFQUVELFNBQVMyQyxLQUFULENBQWdCdkgsS0FBaEIsRUFBdUJpQyxVQUF2QixFQUFtQ0MsTUFBbkMsRUFBMkM7RUFDekMsTUFBSXFGLEtBQUssR0FBRztFQUNWOzs7Ozs7RUFNQXRKLElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0VBQ3RCaUUsTUFBQUEsTUFBTSxDQUFDdEMsSUFBUCxDQUFZLGNBQVo7RUFFQSxXQUFLNEgsU0FBTDtFQUNBLFdBQUtDLFdBQUw7RUFFQXZGLE1BQUFBLE1BQU0sQ0FBQ3RDLElBQVAsQ0FBWSxhQUFaO0VBQ0QsS0FkUzs7RUFpQlY7Ozs7O0VBS0E0SCxJQUFBQSxTQUFTLEVBQUUsU0FBU0EsU0FBVCxHQUFxQjtFQUM5QnZGLE1BQUFBLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjJDLElBQWhCLENBQXFCTSxTQUFyQixDQUErQnlCLEdBQS9CLENBQW1DMUgsS0FBSyxDQUFDZCxRQUFOLENBQWUvRixPQUFmLENBQXVCNkcsS0FBSyxDQUFDZCxRQUFOLENBQWVySCxJQUF0QyxDQUFuQztFQUNELEtBeEJTOztFQTJCVjs7Ozs7RUFLQTRQLElBQUFBLFdBQVcsRUFBRSxTQUFTQSxXQUFULEdBQXVCO0VBQ2xDLFVBQUl0TyxPQUFPLEdBQUc2RyxLQUFLLENBQUNkLFFBQU4sQ0FBZS9GLE9BQTdCO0VBQ0EsVUFBSTZNLEtBQUssR0FBRy9ELFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQkMsTUFBaEIsQ0FBdUJqRCxLQUFLLENBQUNQLEtBQTdCLENBQVo7O0VBRUEsVUFBSXVHLEtBQUosRUFBVztFQUNUQSxRQUFBQSxLQUFLLENBQUNDLFNBQU4sQ0FBZ0J5QixHQUFoQixDQUFvQnZPLE9BQU8sQ0FBQ1MsV0FBNUI7RUFFQW1MLFFBQUFBLFFBQVEsQ0FBQ2lCLEtBQUQsQ0FBUixDQUFnQmxHLE9BQWhCLENBQXdCLFVBQVU2SCxPQUFWLEVBQW1CO0VBQ3pDQSxVQUFBQSxPQUFPLENBQUMxQixTQUFSLENBQWtCdEcsTUFBbEIsQ0FBeUJ4RyxPQUFPLENBQUNTLFdBQWpDO0VBQ0QsU0FGRDtFQUdEO0VBQ0YsS0EzQ1M7O0VBOENWOzs7OztFQUtBZ08sSUFBQUEsYUFBYSxFQUFFLFNBQVNBLGFBQVQsR0FBeUI7RUFDdEMsVUFBSXpPLE9BQU8sR0FBRzZHLEtBQUssQ0FBQ2QsUUFBTixDQUFlL0YsT0FBN0I7RUFFQThJLE1BQUFBLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjJDLElBQWhCLENBQXFCTSxTQUFyQixDQUErQnRHLE1BQS9CLENBQXNDeEcsT0FBTyxDQUFDNkcsS0FBSyxDQUFDZCxRQUFOLENBQWVySCxJQUFoQixDQUE3QztFQUVBb0ssTUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCQyxNQUFoQixDQUF1Qm5ELE9BQXZCLENBQStCLFVBQVU2SCxPQUFWLEVBQW1CO0VBQ2hEQSxRQUFBQSxPQUFPLENBQUMxQixTQUFSLENBQWtCdEcsTUFBbEIsQ0FBeUJ4RyxPQUFPLENBQUNTLFdBQWpDO0VBQ0QsT0FGRDtFQUdEO0VBM0RTLEdBQVo7RUE4REE7Ozs7OztFQUtBc0ksRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBVixFQUFpQyxZQUFZO0VBQzNDaUksSUFBQUEsS0FBSyxDQUFDSyxhQUFOO0VBQ0QsR0FGRDtFQUlBOzs7Ozs7RUFLQTFGLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxDQUFDLFFBQUQsRUFBVyxRQUFYLENBQVYsRUFBZ0MsWUFBWTtFQUMxQ2lJLElBQUFBLEtBQUssQ0FBQ3RKLEtBQU47RUFDRCxHQUZEO0VBSUE7Ozs7O0VBSUFpRSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsWUFBVixFQUF3QixZQUFZO0VBQ2xDaUksSUFBQUEsS0FBSyxDQUFDRSxXQUFOO0VBQ0QsR0FGRDtFQUlBLFNBQU9GLEtBQVA7RUFDRDs7RUFFRCxTQUFTRixNQUFULENBQWlCckgsS0FBakIsRUFBd0JpQyxVQUF4QixFQUFvQ0MsTUFBcEMsRUFBNEM7RUFDMUMsTUFBSW1GLE1BQU0sR0FBRztFQUNYOzs7RUFHQXBKLElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0VBQ3RCLFdBQUs0SixLQUFMLEdBQWEsRUFBYjs7RUFFQSxVQUFJN0gsS0FBSyxDQUFDd0IsTUFBTixDQUFhLFVBQWIsQ0FBSixFQUE4QjtFQUM1QixhQUFLcUcsS0FBTCxHQUFhLEtBQUtDLE9BQUwsRUFBYjtFQUNEO0VBQ0YsS0FWVTs7RUFhWDs7Ozs7RUFLQUEsSUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7RUFDMUIsVUFBSUQsS0FBSyxHQUFHaE0sU0FBUyxDQUFDWixNQUFWLEdBQW1CLENBQW5CLElBQXdCWSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxTQUF6QyxHQUFxRFgsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsRUFBaEY7RUFDQSxVQUFJb0gsTUFBTSxHQUFHaEIsVUFBVSxDQUFDZSxJQUFYLENBQWdCQyxNQUE3QjtFQUNBLFVBQUk4RSxlQUFlLEdBQUcvSCxLQUFLLENBQUNkLFFBQTVCO0VBQUEsVUFDSW5ILE9BQU8sR0FBR2dRLGVBQWUsQ0FBQ2hRLE9BRDlCO0VBQUEsVUFFSW9CLE9BQU8sR0FBRzRPLGVBQWUsQ0FBQzVPLE9BRjlCO0VBS0EsVUFBSTZPLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQ2hJLEtBQUssQ0FBQ2QsUUFBTixDQUFlakcsSUFBeEM7RUFDQSxVQUFJZ1AsSUFBSSxHQUFHbFEsT0FBTyxHQUFHaVEsZUFBckI7RUFDQSxVQUFJRSxLQUFLLEdBQUdqRixNQUFNLENBQUM2QyxLQUFQLENBQWEsQ0FBYixFQUFnQm1DLElBQWhCLENBQVo7RUFDQSxVQUFJRSxHQUFHLEdBQUdsRixNQUFNLENBQUM2QyxLQUFQLENBQWEsQ0FBQ21DLElBQWQsQ0FBVjs7RUFFQSxXQUFLLElBQUlsSixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNEQsSUFBSSxDQUFDeUYsR0FBTCxDQUFTLENBQVQsRUFBWXpGLElBQUksQ0FBQzBGLEtBQUwsQ0FBV3RRLE9BQU8sR0FBR2tMLE1BQU0sQ0FBQ2hJLE1BQTVCLENBQVosQ0FBcEIsRUFBc0U4RCxDQUFDLEVBQXZFLEVBQTJFO0VBQ3pFLGFBQUssSUFBSS9ELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdrTixLQUFLLENBQUNqTixNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztFQUNyQyxjQUFJc04sS0FBSyxHQUFHSixLQUFLLENBQUNsTixDQUFELENBQUwsQ0FBU3VOLFNBQVQsQ0FBbUIsSUFBbkIsQ0FBWjtFQUVBRCxVQUFBQSxLQUFLLENBQUNyQyxTQUFOLENBQWdCeUIsR0FBaEIsQ0FBb0J2TyxPQUFPLENBQUNPLFVBQTVCO0VBRUFtTyxVQUFBQSxLQUFLLENBQUNuSSxJQUFOLENBQVc0SSxLQUFYO0VBQ0Q7O0VBRUQsYUFBSyxJQUFJeEcsRUFBRSxHQUFHLENBQWQsRUFBaUJBLEVBQUUsR0FBR3FHLEdBQUcsQ0FBQ2xOLE1BQTFCLEVBQWtDNkcsRUFBRSxFQUFwQyxFQUF3QztFQUN0QyxjQUFJMEcsTUFBTSxHQUFHTCxHQUFHLENBQUNyRyxFQUFELENBQUgsQ0FBUXlHLFNBQVIsQ0FBa0IsSUFBbEIsQ0FBYjs7RUFFQUMsVUFBQUEsTUFBTSxDQUFDdkMsU0FBUCxDQUFpQnlCLEdBQWpCLENBQXFCdk8sT0FBTyxDQUFDTyxVQUE3Qjs7RUFFQW1PLFVBQUFBLEtBQUssQ0FBQ1ksT0FBTixDQUFjRCxNQUFkO0VBQ0Q7RUFDRjs7RUFFRCxhQUFPWCxLQUFQO0VBQ0QsS0FsRFU7O0VBcURYOzs7OztFQUtBYSxJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtFQUN4QixVQUFJYixLQUFLLEdBQUcsS0FBS0EsS0FBakI7RUFDQSxVQUFJYyxnQkFBZ0IsR0FBRzFHLFVBQVUsQ0FBQ2UsSUFBbEM7RUFBQSxVQUNJNkIsT0FBTyxHQUFHOEQsZ0JBQWdCLENBQUM5RCxPQUQvQjtFQUFBLFVBRUk1QixNQUFNLEdBQUcwRixnQkFBZ0IsQ0FBQzFGLE1BRjlCO0VBS0EsVUFBSTJGLElBQUksR0FBR2pHLElBQUksQ0FBQzBGLEtBQUwsQ0FBV1IsS0FBSyxDQUFDNU0sTUFBTixHQUFlLENBQTFCLENBQVg7RUFDQSxVQUFJNE4sT0FBTyxHQUFHaEIsS0FBSyxDQUFDL0IsS0FBTixDQUFZLENBQVosRUFBZThDLElBQWYsRUFBcUJFLE9BQXJCLEVBQWQ7RUFDQSxVQUFJSixNQUFNLEdBQUdiLEtBQUssQ0FBQy9CLEtBQU4sQ0FBWThDLElBQVosRUFBa0JmLEtBQUssQ0FBQzVNLE1BQXhCLENBQWI7RUFDQSxVQUFJOEwsS0FBSyxHQUFHOUUsVUFBVSxDQUFDMkMsS0FBWCxDQUFpQitCLFVBQWpCLEdBQThCLElBQTFDOztFQUVBLFdBQUssSUFBSTNMLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcwTixNQUFNLENBQUN6TixNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztFQUN0QzZKLFFBQUFBLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JMLE1BQU0sQ0FBQzFOLENBQUQsQ0FBMUI7RUFDRDs7RUFFRCxXQUFLLElBQUlnTyxHQUFHLEdBQUcsQ0FBZixFQUFrQkEsR0FBRyxHQUFHSCxPQUFPLENBQUM1TixNQUFoQyxFQUF3QytOLEdBQUcsRUFBM0MsRUFBK0M7RUFDN0NuRSxRQUFBQSxPQUFPLENBQUNvRSxZQUFSLENBQXFCSixPQUFPLENBQUNHLEdBQUQsQ0FBNUIsRUFBbUMvRixNQUFNLENBQUMsQ0FBRCxDQUF6QztFQUNEOztFQUVELFdBQUssSUFBSWlHLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUdyQixLQUFLLENBQUM1TSxNQUE5QixFQUFzQ2lPLEdBQUcsRUFBekMsRUFBNkM7RUFDM0NyQixRQUFBQSxLQUFLLENBQUNxQixHQUFELENBQUwsQ0FBVzFFLEtBQVgsQ0FBaUJ1QyxLQUFqQixHQUF5QkEsS0FBekI7RUFDRDtFQUNGLEtBakZVOztFQW9GWDs7Ozs7RUFLQXBILElBQUFBLE1BQU0sRUFBRSxTQUFTQSxNQUFULEdBQWtCO0VBQ3hCLFVBQUlrSSxLQUFLLEdBQUcsS0FBS0EsS0FBakI7O0VBR0EsV0FBSyxJQUFJN00sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzZNLEtBQUssQ0FBQzVNLE1BQTFCLEVBQWtDRCxDQUFDLEVBQW5DLEVBQXVDO0VBQ3JDaUgsUUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBaEIsQ0FBd0JzRSxXQUF4QixDQUFvQ3RCLEtBQUssQ0FBQzdNLENBQUQsQ0FBekM7RUFDRDtFQUNGO0VBaEdVLEdBQWI7RUFtR0F3RCxFQUFBQSxNQUFNLENBQUM2SSxNQUFELEVBQVMsTUFBVCxFQUFpQjtFQUNyQjs7Ozs7RUFLQXBMLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBTyxDQUFDZ0csVUFBVSxDQUFDMkMsS0FBWCxDQUFpQitCLFVBQWpCLEdBQThCMUUsVUFBVSxDQUFDcUMsSUFBWCxDQUFnQjNILEtBQS9DLElBQXdEMEssTUFBTSxDQUFDUSxLQUFQLENBQWE1TSxNQUE1RTtFQUNEO0VBUm9CLEdBQWpCLENBQU47RUFXQTs7Ozs7RUFJQWlILEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLFlBQVk7RUFDOUIrSCxJQUFBQSxNQUFNLENBQUMxSCxNQUFQO0VBQ0EwSCxJQUFBQSxNQUFNLENBQUNwSixLQUFQO0VBQ0FvSixJQUFBQSxNQUFNLENBQUNxQixNQUFQO0VBQ0QsR0FKRDtFQU1BOzs7OztFQUlBeEcsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLGNBQVYsRUFBMEIsWUFBWTtFQUNwQyxRQUFJVSxLQUFLLENBQUN3QixNQUFOLENBQWEsVUFBYixDQUFKLEVBQThCO0VBQzVCNkYsTUFBQUEsTUFBTSxDQUFDcUIsTUFBUDtFQUNEO0VBQ0YsR0FKRDtFQU1BOzs7OztFQUlBeEcsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBWTtFQUMvQitILElBQUFBLE1BQU0sQ0FBQzFILE1BQVA7RUFDRCxHQUZEO0VBSUEsU0FBTzBILE1BQVA7RUFDRDs7RUFFRCxJQUFJK0IsWUFBWSxHQUFHLFlBQVk7RUFDN0I7OztFQUdBLFdBQVNBLFlBQVQsR0FBd0I7RUFDdEIsUUFBSUMsU0FBUyxHQUFHeE4sU0FBUyxDQUFDWixNQUFWLEdBQW1CLENBQW5CLElBQXdCWSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxTQUF6QyxHQUFxRFgsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsRUFBcEY7RUFDQXJCLElBQUFBLGNBQWMsQ0FBQyxJQUFELEVBQU80TyxZQUFQLENBQWQ7RUFFQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtFQUNEO0VBRUQ7Ozs7Ozs7Ozs7O0VBV0F6TyxFQUFBQSxXQUFXLENBQUN3TyxZQUFELEVBQWUsQ0FBQztFQUN6QjVOLElBQUFBLEdBQUcsRUFBRSxJQURvQjtFQUV6Qm1CLElBQUFBLEtBQUssRUFBRSxTQUFTMkMsRUFBVCxDQUFZbEIsTUFBWixFQUFvQmtMLEVBQXBCLEVBQXdCQyxPQUF4QixFQUFpQztFQUN0QyxVQUFJQyxPQUFPLEdBQUczTixTQUFTLENBQUNaLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JZLFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJXLFNBQXpDLEdBQXFEWCxTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxLQUFsRjs7RUFFQSxVQUFJNkIsUUFBUSxDQUFDVSxNQUFELENBQVosRUFBc0I7RUFDcEJBLFFBQUFBLE1BQU0sR0FBRyxDQUFDQSxNQUFELENBQVQ7RUFDRDs7RUFFRCxXQUFLLElBQUlwRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHb0QsTUFBTSxDQUFDbkQsTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7RUFDdEMsYUFBS3FPLFNBQUwsQ0FBZWpMLE1BQU0sQ0FBQ3BELENBQUQsQ0FBckIsSUFBNEJ1TyxPQUE1QjtFQUVBRCxRQUFBQSxFQUFFLENBQUNHLGdCQUFILENBQW9CckwsTUFBTSxDQUFDcEQsQ0FBRCxDQUExQixFQUErQixLQUFLcU8sU0FBTCxDQUFlakwsTUFBTSxDQUFDcEQsQ0FBRCxDQUFyQixDQUEvQixFQUEwRHdPLE9BQTFEO0VBQ0Q7RUFDRjtFQUVEOzs7Ozs7Ozs7RUFoQnlCLEdBQUQsRUF5QnZCO0VBQ0RoTyxJQUFBQSxHQUFHLEVBQUUsS0FESjtFQUVEbUIsSUFBQUEsS0FBSyxFQUFFLFNBQVMrTSxHQUFULENBQWF0TCxNQUFiLEVBQXFCa0wsRUFBckIsRUFBeUI7RUFDOUIsVUFBSUUsT0FBTyxHQUFHM04sU0FBUyxDQUFDWixNQUFWLEdBQW1CLENBQW5CLElBQXdCWSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxTQUF6QyxHQUFxRFgsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsS0FBbEY7O0VBRUEsVUFBSTZCLFFBQVEsQ0FBQ1UsTUFBRCxDQUFaLEVBQXNCO0VBQ3BCQSxRQUFBQSxNQUFNLEdBQUcsQ0FBQ0EsTUFBRCxDQUFUO0VBQ0Q7O0VBRUQsV0FBSyxJQUFJcEQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR29ELE1BQU0sQ0FBQ25ELE1BQTNCLEVBQW1DRCxDQUFDLEVBQXBDLEVBQXdDO0VBQ3RDc08sUUFBQUEsRUFBRSxDQUFDSyxtQkFBSCxDQUF1QnZMLE1BQU0sQ0FBQ3BELENBQUQsQ0FBN0IsRUFBa0MsS0FBS3FPLFNBQUwsQ0FBZWpMLE1BQU0sQ0FBQ3BELENBQUQsQ0FBckIsQ0FBbEMsRUFBNkR3TyxPQUE3RDtFQUNEO0VBQ0Y7RUFFRDs7Ozs7O0VBZEMsR0F6QnVCLEVBNkN2QjtFQUNEaE8sSUFBQUEsR0FBRyxFQUFFLFNBREo7RUFFRG1CLElBQUFBLEtBQUssRUFBRSxTQUFTd0UsT0FBVCxHQUFtQjtFQUN4QixhQUFPLEtBQUtrSSxTQUFaO0VBQ0Q7RUFKQSxHQTdDdUIsQ0FBZixDQUFYO0VBbURBLFNBQU9ELFlBQVA7RUFDRCxDQTFFa0IsRUFBbkI7O0VBNEVBLFNBQVNRLE1BQVQsQ0FBaUI1SixLQUFqQixFQUF3QmlDLFVBQXhCLEVBQW9DQyxNQUFwQyxFQUE0QztFQUMxQzs7Ozs7RUFLQSxNQUFJMkgsTUFBTSxHQUFHLElBQUlULFlBQUosRUFBYjtFQUVBLE1BQUlRLE1BQU0sR0FBRztFQUNYOzs7RUFHQTNMLElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0VBQ3RCLFdBQUs2TCxJQUFMO0VBQ0QsS0FOVTs7RUFTWDs7Ozs7O0VBTUFBLElBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0VBQ3BCRCxNQUFBQSxNQUFNLENBQUN2SyxFQUFQLENBQVUsUUFBVixFQUFvQmtHLE1BQXBCLEVBQTRCek0sUUFBUSxDQUFDLFlBQVk7RUFDL0NtSixRQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksUUFBWjtFQUNELE9BRm1DLEVBRWpDSSxLQUFLLENBQUNkLFFBQU4sQ0FBZW5HLFFBRmtCLENBQXBDO0VBR0QsS0FuQlU7O0VBc0JYOzs7OztFQUtBZ1IsSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7RUFDeEJGLE1BQUFBLE1BQU0sQ0FBQ0gsR0FBUCxDQUFXLFFBQVgsRUFBcUJsRSxNQUFyQjtFQUNEO0VBN0JVLEdBQWI7RUFnQ0E7Ozs7O0VBSUF0RCxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFZO0VBQy9Cc0ssSUFBQUEsTUFBTSxDQUFDRyxNQUFQO0VBQ0FGLElBQUFBLE1BQU0sQ0FBQzFJLE9BQVA7RUFDRCxHQUhEO0VBS0EsU0FBT3lJLE1BQVA7RUFDRDs7RUFFRCxJQUFJSSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQXZCO0VBQ0EsSUFBSUMsZ0JBQWdCLEdBQUc7RUFDckIsT0FBSyxHQURnQjtFQUVyQixPQUFLLEdBRmdCO0VBR3JCLE9BQUs7RUFIZ0IsQ0FBdkI7O0VBTUEsU0FBU3hGLFNBQVQsQ0FBb0J6RSxLQUFwQixFQUEyQmlDLFVBQTNCLEVBQXVDQyxNQUF2QyxFQUErQztFQUM3QyxNQUFJdUMsU0FBUyxHQUFHO0VBQ2Q7Ozs7O0VBS0F4RyxJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtFQUN0QixXQUFLdEIsS0FBTCxHQUFhcUQsS0FBSyxDQUFDZCxRQUFOLENBQWVsRyxTQUE1QjtFQUNELEtBUmE7O0VBV2Q7Ozs7OztFQU1Ba1IsSUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUJ2SixPQUFqQixFQUEwQjtFQUNqQyxVQUFJd0osS0FBSyxHQUFHeEosT0FBTyxDQUFDbUYsS0FBUixDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBWjs7RUFFQSxVQUFJLEtBQUtlLEVBQUwsQ0FBUSxLQUFSLENBQUosRUFBb0I7RUFDbEIsZUFBT2xHLE9BQU8sQ0FBQ3lKLEtBQVIsQ0FBY0QsS0FBZCxFQUFxQkUsSUFBckIsQ0FBMEJKLGdCQUFnQixDQUFDRSxLQUFELENBQTFDLENBQVA7RUFDRDs7RUFFRCxhQUFPeEosT0FBUDtFQUNELEtBekJhOztFQTRCZDs7Ozs7O0VBTUFrRyxJQUFBQSxFQUFFLEVBQUUsU0FBU0EsRUFBVCxDQUFZN04sU0FBWixFQUF1QjtFQUN6QixhQUFPLEtBQUsyRCxLQUFMLEtBQWUzRCxTQUF0QjtFQUNELEtBcENhOztFQXVDZDs7Ozs7RUFLQXNSLElBQUFBLFFBQVEsRUFBRSxTQUFTQSxRQUFULEdBQW9CO0VBQzVCckksTUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCMkMsSUFBaEIsQ0FBcUJNLFNBQXJCLENBQStCeUIsR0FBL0IsQ0FBbUMxSCxLQUFLLENBQUNkLFFBQU4sQ0FBZS9GLE9BQWYsQ0FBdUJILFNBQXZCLENBQWlDLEtBQUsyRCxLQUF0QyxDQUFuQztFQUNELEtBOUNhOztFQWlEZDs7Ozs7RUFLQTROLElBQUFBLFdBQVcsRUFBRSxTQUFTQSxXQUFULEdBQXVCO0VBQ2xDdEksTUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCMkMsSUFBaEIsQ0FBcUJNLFNBQXJCLENBQStCdEcsTUFBL0IsQ0FBc0NLLEtBQUssQ0FBQ2QsUUFBTixDQUFlL0YsT0FBZixDQUF1QkgsU0FBdkIsQ0FBaUMsS0FBSzJELEtBQXRDLENBQXRDO0VBQ0Q7RUF4RGEsR0FBaEI7RUEyREE2QixFQUFBQSxNQUFNLENBQUNpRyxTQUFELEVBQVksT0FBWixFQUFxQjtFQUN6Qjs7Ozs7RUFLQXhJLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBT3dJLFNBQVMsQ0FBQzhCLEVBQWpCO0VBQ0QsS0FSd0I7O0VBV3pCOzs7Ozs7RUFNQTVFLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULENBQWFoRixLQUFiLEVBQW9CO0VBQ3ZCLFVBQUlxTixnQkFBZ0IsQ0FBQ1EsT0FBakIsQ0FBeUI3TixLQUF6QixJQUFrQyxDQUFDLENBQXZDLEVBQTBDO0VBQ3hDOEgsUUFBQUEsU0FBUyxDQUFDOEIsRUFBVixHQUFlNUosS0FBZjtFQUNELE9BRkQsTUFFTztFQUNMN0MsUUFBQUEsSUFBSSxDQUFDLHdDQUFELENBQUo7RUFDRDtFQUNGO0VBdkJ3QixHQUFyQixDQUFOO0VBMEJBOzs7Ozs7RUFLQW9JLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxDQUFDLFNBQUQsRUFBWSxRQUFaLENBQVYsRUFBaUMsWUFBWTtFQUMzQ21GLElBQUFBLFNBQVMsQ0FBQzhGLFdBQVY7RUFDRCxHQUZEO0VBSUE7Ozs7O0VBSUFySSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsUUFBVixFQUFvQixZQUFZO0VBQzlCbUYsSUFBQUEsU0FBUyxDQUFDeEcsS0FBVjtFQUNELEdBRkQ7RUFJQTs7Ozs7O0VBS0FpRSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsQ0FBQyxjQUFELEVBQWlCLFFBQWpCLENBQVYsRUFBc0MsWUFBWTtFQUNoRG1GLElBQUFBLFNBQVMsQ0FBQzZGLFFBQVY7RUFDRCxHQUZEO0VBSUEsU0FBTzdGLFNBQVA7RUFDRDtFQUVEOzs7Ozs7Ozs7RUFPQSxTQUFTZ0csR0FBVCxDQUFjekssS0FBZCxFQUFxQmlDLFVBQXJCLEVBQWlDO0VBQy9CLFNBQU87RUFDTDs7Ozs7O0VBTUF5SSxJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxDQUFnQjlELFNBQWhCLEVBQTJCO0VBQ2pDLFVBQUkzRSxVQUFVLENBQUN3QyxTQUFYLENBQXFCb0MsRUFBckIsQ0FBd0IsS0FBeEIsQ0FBSixFQUFvQztFQUNsQyxlQUFPLENBQUNELFNBQVI7RUFDRDs7RUFFRCxhQUFPQSxTQUFQO0VBQ0Q7RUFiSSxHQUFQO0VBZUQ7RUFFRDs7Ozs7Ozs7O0VBT0EsU0FBUytELEdBQVQsQ0FBYzNLLEtBQWQsRUFBcUJpQyxVQUFyQixFQUFpQztFQUMvQixTQUFPO0VBQ0w7Ozs7OztFQU1BeUksSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsQ0FBZ0I5RCxTQUFoQixFQUEyQjtFQUNqQyxhQUFPQSxTQUFTLEdBQUczRSxVQUFVLENBQUNxQyxJQUFYLENBQWdCM0gsS0FBaEIsR0FBd0JxRCxLQUFLLENBQUNQLEtBQWpEO0VBQ0Q7RUFUSSxHQUFQO0VBV0Q7RUFFRDs7Ozs7Ozs7O0VBT0EsU0FBU21MLElBQVQsQ0FBZTVLLEtBQWYsRUFBc0JpQyxVQUF0QixFQUFrQztFQUNoQyxTQUFPO0VBQ0w7Ozs7OztFQU1BeUksSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsQ0FBZ0I5RCxTQUFoQixFQUEyQjtFQUNqQyxhQUFPQSxTQUFTLEdBQUczRSxVQUFVLENBQUNvRixNQUFYLENBQWtCRCxJQUFsQixHQUF5QixDQUE1QztFQUNEO0VBVEksR0FBUDtFQVdEO0VBRUQ7Ozs7Ozs7OztFQU9BLFNBQVN5RCxPQUFULENBQWtCN0ssS0FBbEIsRUFBeUJpQyxVQUF6QixFQUFxQztFQUNuQyxTQUFPO0VBQ0w7Ozs7OztFQU1BeUksSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsQ0FBZ0I5RCxTQUFoQixFQUEyQjtFQUNqQyxVQUFJNUcsS0FBSyxDQUFDZCxRQUFOLENBQWVsSCxPQUFmLElBQTBCLENBQTlCLEVBQWlDO0VBQy9CLFlBQUlpQixJQUFJLEdBQUdnSixVQUFVLENBQUNxRSxJQUFYLENBQWdCM0osS0FBM0I7O0VBRUEsWUFBSWdCLFFBQVEsQ0FBQzFFLElBQUQsQ0FBWixFQUFvQjtFQUNsQixpQkFBTzJOLFNBQVMsR0FBRzNOLElBQUksQ0FBQ3VOLE1BQXhCO0VBQ0Q7O0VBRUQsZUFBT0ksU0FBUyxHQUFHM04sSUFBbkI7RUFDRDs7RUFFRCxhQUFPMk4sU0FBUDtFQUNEO0VBbkJJLEdBQVA7RUFxQkQ7RUFFRDs7Ozs7Ozs7O0VBT0EsU0FBU2tFLFFBQVQsQ0FBbUI5SyxLQUFuQixFQUEwQmlDLFVBQTFCLEVBQXNDO0VBQ3BDLFNBQU87RUFDTDs7Ozs7O0VBTUF5SSxJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxDQUFnQjlELFNBQWhCLEVBQTJCO0VBQ2pDLFVBQUkzTyxHQUFHLEdBQUdnSyxVQUFVLENBQUNxQyxJQUFYLENBQWdCM0gsS0FBMUI7RUFDQSxVQUFJb0ssS0FBSyxHQUFHOUUsVUFBVSxDQUFDMkMsS0FBWCxDQUFpQm1DLEtBQTdCO0VBQ0EsVUFBSS9PLE9BQU8sR0FBR2dJLEtBQUssQ0FBQ2QsUUFBTixDQUFlbEgsT0FBN0I7RUFDQSxVQUFJMk8sVUFBVSxHQUFHMUUsVUFBVSxDQUFDMkMsS0FBWCxDQUFpQitCLFVBQWxDOztFQUVBLFVBQUkzTyxPQUFPLEtBQUssUUFBaEIsRUFBMEI7RUFDeEIsZUFBTzRPLFNBQVMsSUFBSUcsS0FBSyxHQUFHLENBQVIsR0FBWUosVUFBVSxHQUFHLENBQTdCLENBQWhCO0VBQ0Q7O0VBRUQsYUFBT0MsU0FBUyxHQUFHRCxVQUFVLEdBQUczTyxPQUF6QixHQUFtQ0MsR0FBRyxHQUFHRCxPQUFoRDtFQUNEO0VBbEJJLEdBQVA7RUFvQkQ7RUFFRDs7Ozs7Ozs7O0VBT0EsU0FBUytTLE9BQVQsQ0FBa0IvSyxLQUFsQixFQUF5QmlDLFVBQXpCLEVBQXFDQyxNQUFyQyxFQUE2QztFQUMzQzs7Ozs7OztFQU9BLE1BQUk4SSxZQUFZLEdBQUcsQ0FBQ0wsR0FBRCxFQUFNQyxJQUFOLEVBQVlDLE9BQVosRUFBcUJDLFFBQXJCLEVBQStCRyxNQUEvQixDQUFzQ2pMLEtBQUssQ0FBQ0csRUFBNUMsRUFBZ0QsQ0FBQ3NLLEdBQUQsQ0FBaEQsQ0FBbkI7RUFFQSxTQUFPO0VBQ0w7Ozs7OztFQU1BbEssSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsQ0FBZ0JxRyxTQUFoQixFQUEyQjtFQUNqQyxXQUFLLElBQUk1TCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHZ1EsWUFBWSxDQUFDL1AsTUFBakMsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7RUFDNUMsWUFBSWtRLFdBQVcsR0FBR0YsWUFBWSxDQUFDaFEsQ0FBRCxDQUE5Qjs7RUFFQSxZQUFJNkMsVUFBVSxDQUFDcU4sV0FBRCxDQUFWLElBQTJCck4sVUFBVSxDQUFDcU4sV0FBVyxHQUFHUixNQUFmLENBQXpDLEVBQWlFO0VBQy9EOUQsVUFBQUEsU0FBUyxHQUFHc0UsV0FBVyxDQUFDbEwsS0FBRCxFQUFRaUMsVUFBUixFQUFvQkMsTUFBcEIsQ0FBWCxDQUF1Q3dJLE1BQXZDLENBQThDOUQsU0FBOUMsQ0FBWjtFQUNELFNBRkQsTUFFTztFQUNMOU0sVUFBQUEsSUFBSSxDQUFDLGdGQUFELENBQUo7RUFDRDtFQUNGOztFQUVELGFBQU84TSxTQUFQO0VBQ0Q7RUFuQkksR0FBUDtFQXFCRDs7RUFFRCxTQUFTdUUsU0FBVCxDQUFvQm5MLEtBQXBCLEVBQTJCaUMsVUFBM0IsRUFBdUNDLE1BQXZDLEVBQStDO0VBQzdDLE1BQUlpSixTQUFTLEdBQUc7RUFDZDs7Ozs7O0VBTUF4SixJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhaEYsS0FBYixFQUFvQjtFQUN2QixVQUFJeU8sU0FBUyxHQUFHTCxPQUFPLENBQUMvSyxLQUFELEVBQVFpQyxVQUFSLENBQVAsQ0FBMkIxQixNQUEzQixDQUFrQzVELEtBQWxDLENBQWhCO0VBRUFzRixNQUFBQSxVQUFVLENBQUNlLElBQVgsQ0FBZ0I2QixPQUFoQixDQUF3QkwsS0FBeEIsQ0FBOEI0RyxTQUE5QixHQUEwQyxpQkFBaUIsQ0FBQyxDQUFELEdBQUtBLFNBQXRCLEdBQWtDLGVBQTVFO0VBQ0QsS0FYYTs7RUFjZDs7Ozs7RUFLQXpMLElBQUFBLE1BQU0sRUFBRSxTQUFTQSxNQUFULEdBQWtCO0VBQ3hCc0MsTUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBaEIsQ0FBd0JMLEtBQXhCLENBQThCNEcsU0FBOUIsR0FBMEMsRUFBMUM7RUFDRDtFQXJCYSxHQUFoQjtFQXdCQTs7Ozs7O0VBS0FsSixFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsTUFBVixFQUFrQixVQUFVTyxPQUFWLEVBQW1CO0VBQ25DLFFBQUk1SCxHQUFHLEdBQUdnSyxVQUFVLENBQUNxQyxJQUFYLENBQWdCM0gsS0FBMUI7RUFDQSxRQUFJMUIsTUFBTSxHQUFHZ0gsVUFBVSxDQUFDMkMsS0FBWCxDQUFpQjNKLE1BQTlCO0VBQ0EsUUFBSThMLEtBQUssR0FBRzlFLFVBQVUsQ0FBQzJDLEtBQVgsQ0FBaUIrQixVQUE3Qjs7RUFFQSxRQUFJM0csS0FBSyxDQUFDd0IsTUFBTixDQUFhLFVBQWIsS0FBNEJTLFVBQVUsQ0FBQ3JCLEdBQVgsQ0FBZTRCLFFBQWYsQ0FBd0IsR0FBeEIsQ0FBaEMsRUFBOEQ7RUFDNURQLE1BQUFBLFVBQVUsQ0FBQ2pCLFVBQVgsQ0FBc0JxQixLQUF0QixDQUE0QixZQUFZO0VBQ3RDSCxRQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksZ0JBQVo7RUFFQXVMLFFBQUFBLFNBQVMsQ0FBQ3hKLEdBQVYsQ0FBY29GLEtBQUssSUFBSTlMLE1BQU0sR0FBRyxDQUFiLENBQW5CO0VBQ0QsT0FKRDtFQU1BLGFBQU9rUSxTQUFTLENBQUN4SixHQUFWLENBQWMsQ0FBQ29GLEtBQUQsR0FBUzlPLEdBQUcsR0FBR2dELE1BQTdCLENBQVA7RUFDRDs7RUFFRCxRQUFJK0UsS0FBSyxDQUFDd0IsTUFBTixDQUFhLFVBQWIsS0FBNEJTLFVBQVUsQ0FBQ3JCLEdBQVgsQ0FBZTRCLFFBQWYsQ0FBd0IsR0FBeEIsQ0FBaEMsRUFBOEQ7RUFDNURQLE1BQUFBLFVBQVUsQ0FBQ2pCLFVBQVgsQ0FBc0JxQixLQUF0QixDQUE0QixZQUFZO0VBQ3RDSCxRQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksZ0JBQVo7RUFFQXVMLFFBQUFBLFNBQVMsQ0FBQ3hKLEdBQVYsQ0FBYyxDQUFkO0VBQ0QsT0FKRDtFQU1BLGFBQU93SixTQUFTLENBQUN4SixHQUFWLENBQWNvRixLQUFLLEdBQUc5TCxNQUFSLEdBQWlCaEQsR0FBRyxHQUFHZ0QsTUFBckMsQ0FBUDtFQUNEOztFQUVELFdBQU9rUSxTQUFTLENBQUN4SixHQUFWLENBQWM5QixPQUFPLENBQUM2RyxRQUF0QixDQUFQO0VBQ0QsR0ExQkQ7RUE0QkE7Ozs7O0VBSUF4RSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFZO0VBQy9CNkwsSUFBQUEsU0FBUyxDQUFDeEwsTUFBVjtFQUNELEdBRkQ7RUFJQSxTQUFPd0wsU0FBUDtFQUNEOztFQUVELFNBQVNuSyxVQUFULENBQXFCaEIsS0FBckIsRUFBNEJpQyxVQUE1QixFQUF3Q0MsTUFBeEMsRUFBZ0Q7RUFDOUM7Ozs7OztFQU1BLE1BQUk3QixRQUFRLEdBQUcsS0FBZjtFQUVBLE1BQUlXLFVBQVUsR0FBRztFQUNmOzs7Ozs7RUFNQXFLLElBQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCbFAsUUFBakIsRUFBMkI7RUFDbEMsVUFBSStDLFFBQVEsR0FBR2MsS0FBSyxDQUFDZCxRQUFyQjs7RUFFQSxVQUFJLENBQUNtQixRQUFMLEVBQWU7RUFDYixlQUFPbEUsUUFBUSxHQUFHLEdBQVgsR0FBaUIsS0FBS21QLFFBQXRCLEdBQWlDLEtBQWpDLEdBQXlDcE0sUUFBUSxDQUFDcEcsbUJBQXpEO0VBQ0Q7O0VBRUQsYUFBT3FELFFBQVEsR0FBRyxPQUFYLEdBQXFCK0MsUUFBUSxDQUFDcEcsbUJBQXJDO0VBQ0QsS0FmYzs7RUFrQmY7Ozs7OztFQU1BNkksSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtFQUNsQixVQUFJeEYsUUFBUSxHQUFHTixTQUFTLENBQUNaLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JZLFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJXLFNBQXpDLEdBQXFEWCxTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxXQUFuRjtFQUVBb0csTUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBaEIsQ0FBd0JMLEtBQXhCLENBQThCK0csVUFBOUIsR0FBMkMsS0FBS0YsT0FBTCxDQUFhbFAsUUFBYixDQUEzQztFQUNELEtBNUJjOztFQStCZjs7Ozs7RUFLQXdELElBQUFBLE1BQU0sRUFBRSxTQUFTQSxNQUFULEdBQWtCO0VBQ3hCc0MsTUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBaEIsQ0FBd0JMLEtBQXhCLENBQThCK0csVUFBOUIsR0FBMkMsRUFBM0M7RUFDRCxLQXRDYzs7RUF5Q2Y7Ozs7OztFQU1BbEosSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZW1KLFFBQWYsRUFBeUI7RUFDOUJySCxNQUFBQSxVQUFVLENBQUMsWUFBWTtFQUNyQnFILFFBQUFBLFFBQVE7RUFDVCxPQUZTLEVBRVAsS0FBS0YsUUFGRSxDQUFWO0VBR0QsS0FuRGM7O0VBc0RmOzs7OztFQUtBL0osSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7RUFDeEJsQixNQUFBQSxRQUFRLEdBQUcsS0FBWDtFQUVBLFdBQUtzQixHQUFMO0VBQ0QsS0EvRGM7O0VBa0VmOzs7OztFQUtBVixJQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtFQUMxQlosTUFBQUEsUUFBUSxHQUFHLElBQVg7RUFFQSxXQUFLc0IsR0FBTDtFQUNEO0VBM0VjLEdBQWpCO0VBOEVBbkQsRUFBQUEsTUFBTSxDQUFDd0MsVUFBRCxFQUFhLFVBQWIsRUFBeUI7RUFDN0I7Ozs7OztFQU1BL0UsSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtFQUNsQixVQUFJaUQsUUFBUSxHQUFHYyxLQUFLLENBQUNkLFFBQXJCOztFQUVBLFVBQUljLEtBQUssQ0FBQ3dCLE1BQU4sQ0FBYSxRQUFiLEtBQTBCUyxVQUFVLENBQUNyQixHQUFYLENBQWU2RixNQUE3QyxFQUFxRDtFQUNuRCxlQUFPdkgsUUFBUSxDQUFDckcsY0FBaEI7RUFDRDs7RUFFRCxhQUFPcUcsUUFBUSxDQUFDdkcsaUJBQWhCO0VBQ0Q7RUFmNEIsR0FBekIsQ0FBTjtFQWtCQTs7Ozs7RUFJQXVKLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFlBQVk7RUFDNUIwQixJQUFBQSxVQUFVLENBQUNXLEdBQVg7RUFDRCxHQUZEO0VBSUE7Ozs7Ozs7RUFNQU8sRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLENBQUMsY0FBRCxFQUFpQixRQUFqQixFQUEyQixnQkFBM0IsQ0FBVixFQUF3RCxZQUFZO0VBQ2xFMEIsSUFBQUEsVUFBVSxDQUFDQyxPQUFYO0VBQ0QsR0FGRDtFQUlBOzs7OztFQUlBaUIsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLEtBQVYsRUFBaUIsWUFBWTtFQUMzQjBCLElBQUFBLFVBQVUsQ0FBQ08sTUFBWDtFQUNELEdBRkQ7RUFJQTs7Ozs7RUFJQVcsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBWTtFQUMvQjBCLElBQUFBLFVBQVUsQ0FBQ3JCLE1BQVg7RUFDRCxHQUZEO0VBSUEsU0FBT3FCLFVBQVA7RUFDRDtFQUVEOzs7Ozs7OztFQU9BLElBQUl5SyxlQUFlLEdBQUcsS0FBdEI7O0VBRUEsSUFBSTtFQUNGLE1BQUlDLElBQUksR0FBR3BRLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixFQUF0QixFQUEwQixTQUExQixFQUFxQztFQUM5Q1UsSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtFQUNsQndQLE1BQUFBLGVBQWUsR0FBRyxJQUFsQjtFQUNEO0VBSDZDLEdBQXJDLENBQVg7RUFNQWpHLEVBQUFBLE1BQU0sQ0FBQ2lFLGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDLElBQXZDLEVBQTZDaUMsSUFBN0M7RUFDQWxHLEVBQUFBLE1BQU0sQ0FBQ21FLG1CQUFQLENBQTJCLGFBQTNCLEVBQTBDLElBQTFDLEVBQWdEK0IsSUFBaEQ7RUFDRCxDQVRELENBU0UsT0FBT0MsQ0FBUCxFQUFVOztFQUVaLElBQUlDLGlCQUFpQixHQUFHSCxlQUF4QjtFQUVBLElBQUlJLFlBQVksR0FBRyxDQUFDLFlBQUQsRUFBZSxXQUFmLENBQW5CO0VBQ0EsSUFBSUMsV0FBVyxHQUFHLENBQUMsV0FBRCxFQUFjLFdBQWQsQ0FBbEI7RUFDQSxJQUFJQyxVQUFVLEdBQUcsQ0FBQyxVQUFELEVBQWEsYUFBYixFQUE0QixTQUE1QixFQUF1QyxZQUF2QyxDQUFqQjtFQUNBLElBQUlDLFlBQVksR0FBRyxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFNBQTNCLEVBQXNDLFlBQXRDLENBQW5COztFQUVBLFNBQVNDLEtBQVQsQ0FBZ0JqTSxLQUFoQixFQUF1QmlDLFVBQXZCLEVBQW1DQyxNQUFuQyxFQUEyQztFQUN6Qzs7Ozs7RUFLQSxNQUFJMkgsTUFBTSxHQUFHLElBQUlULFlBQUosRUFBYjtFQUVBLE1BQUk4QyxRQUFRLEdBQUcsQ0FBZjtFQUNBLE1BQUlDLFdBQVcsR0FBRyxDQUFsQjtFQUNBLE1BQUlDLFdBQVcsR0FBRyxDQUFsQjtFQUNBLE1BQUkvTCxRQUFRLEdBQUcsS0FBZjtFQUNBLE1BQUltSixPQUFPLEdBQUdvQyxpQkFBaUIsR0FBRztFQUFFUyxJQUFBQSxPQUFPLEVBQUU7RUFBWCxHQUFILEdBQXVCLEtBQXREO0VBRUEsTUFBSUosS0FBSyxHQUFHO0VBQ1Y7Ozs7O0VBS0FoTyxJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtFQUN0QixXQUFLcU8sY0FBTDtFQUNELEtBUlM7O0VBV1Y7Ozs7OztFQU1BcEUsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZTNJLEtBQWYsRUFBc0I7RUFDM0IsVUFBSSxDQUFDYyxRQUFELElBQWEsQ0FBQ0wsS0FBSyxDQUFDSyxRQUF4QixFQUFrQztFQUNoQyxhQUFLWSxPQUFMO0VBRUEsWUFBSXNMLEtBQUssR0FBRyxLQUFLQyxPQUFMLENBQWFqTixLQUFiLENBQVo7RUFFQTJNLFFBQUFBLFFBQVEsR0FBRyxJQUFYO0VBQ0FDLFFBQUFBLFdBQVcsR0FBRzdPLEtBQUssQ0FBQ2lQLEtBQUssQ0FBQ0UsS0FBUCxDQUFuQjtFQUNBTCxRQUFBQSxXQUFXLEdBQUc5TyxLQUFLLENBQUNpUCxLQUFLLENBQUNHLEtBQVAsQ0FBbkI7RUFFQSxhQUFLQyxhQUFMO0VBQ0EsYUFBS0MsWUFBTDtFQUVBMUssUUFBQUEsTUFBTSxDQUFDdEMsSUFBUCxDQUFZLGFBQVo7RUFDRDtFQUNGLEtBaENTOztFQW1DVjs7Ozs7RUFLQWtCLElBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULENBQWN2QixLQUFkLEVBQXFCO0VBQ3pCLFVBQUksQ0FBQ1MsS0FBSyxDQUFDSyxRQUFYLEVBQXFCO0VBQ25CLFlBQUkwSCxlQUFlLEdBQUcvSCxLQUFLLENBQUNkLFFBQTVCO0VBQUEsWUFDSXhHLFVBQVUsR0FBR3FQLGVBQWUsQ0FBQ3JQLFVBRGpDO0VBQUEsWUFFSUQsVUFBVSxHQUFHc1AsZUFBZSxDQUFDdFAsVUFGakM7RUFBQSxZQUdJVSxPQUFPLEdBQUc0TyxlQUFlLENBQUM1TyxPQUg5QjtFQU1BLFlBQUlvVCxLQUFLLEdBQUcsS0FBS0MsT0FBTCxDQUFhak4sS0FBYixDQUFaO0VBRUEsWUFBSXNOLE9BQU8sR0FBR3ZQLEtBQUssQ0FBQ2lQLEtBQUssQ0FBQ0UsS0FBUCxDQUFMLEdBQXFCTixXQUFuQztFQUNBLFlBQUlXLE9BQU8sR0FBR3hQLEtBQUssQ0FBQ2lQLEtBQUssQ0FBQ0csS0FBUCxDQUFMLEdBQXFCTixXQUFuQztFQUNBLFlBQUlXLEtBQUssR0FBR3BLLElBQUksQ0FBQ3FLLEdBQUwsQ0FBU0gsT0FBTyxJQUFJLENBQXBCLENBQVo7RUFDQSxZQUFJSSxLQUFLLEdBQUd0SyxJQUFJLENBQUNxSyxHQUFMLENBQVNGLE9BQU8sSUFBSSxDQUFwQixDQUFaO0VBQ0EsWUFBSUksZUFBZSxHQUFHdkssSUFBSSxDQUFDd0ssSUFBTCxDQUFVSixLQUFLLEdBQUdFLEtBQWxCLENBQXRCO0VBQ0EsWUFBSUcsYUFBYSxHQUFHekssSUFBSSxDQUFDd0ssSUFBTCxDQUFVRixLQUFWLENBQXBCO0VBRUFmLFFBQUFBLFFBQVEsR0FBR3ZKLElBQUksQ0FBQzBLLElBQUwsQ0FBVUQsYUFBYSxHQUFHRixlQUExQixDQUFYOztFQUVBLFlBQUloQixRQUFRLEdBQUcsR0FBWCxHQUFpQnZKLElBQUksQ0FBQzJLLEVBQXRCLEdBQTJCNVUsVUFBL0IsRUFBMkM7RUFDekM2RyxVQUFBQSxLQUFLLENBQUNnTyxlQUFOO0VBRUF0TCxVQUFBQSxVQUFVLENBQUNmLElBQVgsQ0FBZ0JMLElBQWhCLENBQXFCZ00sT0FBTyxHQUFHclAsT0FBTyxDQUFDL0UsVUFBRCxDQUF0QztFQUVBd0osVUFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCMkMsSUFBaEIsQ0FBcUJNLFNBQXJCLENBQStCeUIsR0FBL0IsQ0FBbUN2TyxPQUFPLENBQUNNLFFBQTNDO0VBRUF5SSxVQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVksWUFBWjtFQUNELFNBUkQsTUFRTztFQUNMLGlCQUFPLEtBQVA7RUFDRDtFQUNGO0VBQ0YsS0F2RVM7O0VBMEVWOzs7Ozs7RUFNQXVJLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULENBQWE1SSxLQUFiLEVBQW9CO0VBQ3ZCLFVBQUksQ0FBQ1MsS0FBSyxDQUFDSyxRQUFYLEVBQXFCO0VBQ25CLFlBQUluQixRQUFRLEdBQUdjLEtBQUssQ0FBQ2QsUUFBckI7RUFFQSxZQUFJcU4sS0FBSyxHQUFHLEtBQUtDLE9BQUwsQ0FBYWpOLEtBQWIsQ0FBWjtFQUNBLFlBQUlpTyxTQUFTLEdBQUcsS0FBS0EsU0FBTCxDQUFlak8sS0FBZixDQUFoQjtFQUVBLFlBQUlrTyxhQUFhLEdBQUdsQixLQUFLLENBQUNFLEtBQU4sR0FBY04sV0FBbEM7RUFDQSxZQUFJdUIsUUFBUSxHQUFHeEIsUUFBUSxHQUFHLEdBQVgsR0FBaUJ2SixJQUFJLENBQUMySyxFQUFyQztFQUNBLFlBQUk3SyxLQUFLLEdBQUdFLElBQUksQ0FBQ2dMLEtBQUwsQ0FBV0YsYUFBYSxHQUFHeEwsVUFBVSxDQUFDMkMsS0FBWCxDQUFpQitCLFVBQTVDLENBQVo7RUFFQSxhQUFLcEYsTUFBTDs7RUFFQSxZQUFJa00sYUFBYSxHQUFHRCxTQUFoQixJQUE2QkUsUUFBUSxHQUFHeE8sUUFBUSxDQUFDeEcsVUFBckQsRUFBaUU7RUFDL0Q7RUFDQSxjQUFJd0csUUFBUSxDQUFDMUcsUUFBYixFQUF1QjtFQUNyQmlLLFlBQUFBLEtBQUssR0FBR0UsSUFBSSxDQUFDQyxHQUFMLENBQVNILEtBQVQsRUFBZ0JuRixLQUFLLENBQUM0QixRQUFRLENBQUMxRyxRQUFWLENBQXJCLENBQVI7RUFDRDs7RUFFRCxjQUFJeUosVUFBVSxDQUFDd0MsU0FBWCxDQUFxQm9DLEVBQXJCLENBQXdCLEtBQXhCLENBQUosRUFBb0M7RUFDbENwRSxZQUFBQSxLQUFLLEdBQUcsQ0FBQ0EsS0FBVDtFQUNEOztFQUVEUixVQUFBQSxVQUFVLENBQUNyQixHQUFYLENBQWVDLElBQWYsQ0FBb0JvQixVQUFVLENBQUN3QyxTQUFYLENBQXFCeUYsT0FBckIsQ0FBNkIsTUFBTXpILEtBQW5DLENBQXBCO0VBQ0QsU0FYRCxNQVdPLElBQUlnTCxhQUFhLEdBQUcsQ0FBQ0QsU0FBakIsSUFBOEJFLFFBQVEsR0FBR3hPLFFBQVEsQ0FBQ3hHLFVBQXRELEVBQWtFO0VBQ3ZFO0VBQ0EsY0FBSXdHLFFBQVEsQ0FBQzFHLFFBQWIsRUFBdUI7RUFDckJpSyxZQUFBQSxLQUFLLEdBQUdFLElBQUksQ0FBQ3lGLEdBQUwsQ0FBUzNGLEtBQVQsRUFBZ0IsQ0FBQ25GLEtBQUssQ0FBQzRCLFFBQVEsQ0FBQzFHLFFBQVYsQ0FBdEIsQ0FBUjtFQUNEOztFQUVELGNBQUl5SixVQUFVLENBQUN3QyxTQUFYLENBQXFCb0MsRUFBckIsQ0FBd0IsS0FBeEIsQ0FBSixFQUFvQztFQUNsQ3BFLFlBQUFBLEtBQUssR0FBRyxDQUFDQSxLQUFUO0VBQ0Q7O0VBRURSLFVBQUFBLFVBQVUsQ0FBQ3JCLEdBQVgsQ0FBZUMsSUFBZixDQUFvQm9CLFVBQVUsQ0FBQ3dDLFNBQVgsQ0FBcUJ5RixPQUFyQixDQUE2QixNQUFNekgsS0FBbkMsQ0FBcEI7RUFDRCxTQVhNLE1BV0E7RUFDTDtFQUNBUixVQUFBQSxVQUFVLENBQUNmLElBQVgsQ0FBZ0JMLElBQWhCO0VBQ0Q7O0VBRURvQixRQUFBQSxVQUFVLENBQUNlLElBQVgsQ0FBZ0IyQyxJQUFoQixDQUFxQk0sU0FBckIsQ0FBK0J0RyxNQUEvQixDQUFzQ1QsUUFBUSxDQUFDL0YsT0FBVCxDQUFpQk0sUUFBdkQ7RUFFQSxhQUFLbVUsZUFBTDtFQUNBLGFBQUtDLGNBQUw7RUFFQTNMLFFBQUFBLE1BQU0sQ0FBQ3RDLElBQVAsQ0FBWSxXQUFaO0VBQ0Q7RUFDRixLQS9IUzs7RUFrSVY7Ozs7O0VBS0EwTSxJQUFBQSxjQUFjLEVBQUUsU0FBU0EsY0FBVCxHQUEwQjtFQUN4QyxVQUFJbkssS0FBSyxHQUFHLElBQVo7O0VBRUEsVUFBSWpELFFBQVEsR0FBR2MsS0FBSyxDQUFDZCxRQUFyQjs7RUFFQSxVQUFJQSxRQUFRLENBQUM1RyxjQUFiLEVBQTZCO0VBQzNCdVIsUUFBQUEsTUFBTSxDQUFDdkssRUFBUCxDQUFVdU0sWUFBWSxDQUFDLENBQUQsQ0FBdEIsRUFBMkI1SixVQUFVLENBQUNlLElBQVgsQ0FBZ0I2QixPQUEzQyxFQUFvRCxVQUFVdEYsS0FBVixFQUFpQjtFQUNuRTRDLFVBQUFBLEtBQUssQ0FBQytGLEtBQU4sQ0FBWTNJLEtBQVo7RUFDRCxTQUZELEVBRUdpSyxPQUZIO0VBR0Q7O0VBRUQsVUFBSXRLLFFBQVEsQ0FBQzNHLGFBQWIsRUFBNEI7RUFDMUJzUixRQUFBQSxNQUFNLENBQUN2SyxFQUFQLENBQVV1TSxZQUFZLENBQUMsQ0FBRCxDQUF0QixFQUEyQjVKLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjZCLE9BQTNDLEVBQW9ELFVBQVV0RixLQUFWLEVBQWlCO0VBQ25FNEMsVUFBQUEsS0FBSyxDQUFDK0YsS0FBTixDQUFZM0ksS0FBWjtFQUNELFNBRkQsRUFFR2lLLE9BRkg7RUFHRDtFQUNGLEtBdkpTOztFQTBKVjs7Ozs7RUFLQXNFLElBQUFBLGdCQUFnQixFQUFFLFNBQVNBLGdCQUFULEdBQTRCO0VBQzVDakUsTUFBQUEsTUFBTSxDQUFDSCxHQUFQLENBQVdtQyxZQUFZLENBQUMsQ0FBRCxDQUF2QixFQUE0QjVKLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjZCLE9BQTVDLEVBQXFEMkUsT0FBckQ7RUFDQUssTUFBQUEsTUFBTSxDQUFDSCxHQUFQLENBQVdtQyxZQUFZLENBQUMsQ0FBRCxDQUF2QixFQUE0QjVKLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjZCLE9BQTVDLEVBQXFEMkUsT0FBckQ7RUFDRCxLQWxLUzs7RUFxS1Y7Ozs7O0VBS0FtRCxJQUFBQSxhQUFhLEVBQUUsU0FBU0EsYUFBVCxHQUF5QjtFQUN0QyxVQUFJb0IsTUFBTSxHQUFHLElBQWI7O0VBRUFsRSxNQUFBQSxNQUFNLENBQUN2SyxFQUFQLENBQVV3TSxXQUFWLEVBQXVCN0osVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBdkMsRUFBZ0Q5TCxRQUFRLENBQUMsVUFBVXdHLEtBQVYsRUFBaUI7RUFDeEV3TyxRQUFBQSxNQUFNLENBQUNqTixJQUFQLENBQVl2QixLQUFaO0VBQ0QsT0FGdUQsRUFFckRTLEtBQUssQ0FBQ2QsUUFBTixDQUFlbkcsUUFGc0MsQ0FBeEQsRUFFNkJ5USxPQUY3QjtFQUdELEtBaExTOztFQW1MVjs7Ozs7RUFLQW9FLElBQUFBLGVBQWUsRUFBRSxTQUFTQSxlQUFULEdBQTJCO0VBQzFDL0QsTUFBQUEsTUFBTSxDQUFDSCxHQUFQLENBQVdvQyxXQUFYLEVBQXdCN0osVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBeEMsRUFBaUQyRSxPQUFqRDtFQUNELEtBMUxTOztFQTZMVjs7Ozs7RUFLQW9ELElBQUFBLFlBQVksRUFBRSxTQUFTQSxZQUFULEdBQXdCO0VBQ3BDLFVBQUlvQixNQUFNLEdBQUcsSUFBYjs7RUFFQW5FLE1BQUFBLE1BQU0sQ0FBQ3ZLLEVBQVAsQ0FBVXlNLFVBQVYsRUFBc0I5SixVQUFVLENBQUNlLElBQVgsQ0FBZ0I2QixPQUF0QyxFQUErQyxVQUFVdEYsS0FBVixFQUFpQjtFQUM5RHlPLFFBQUFBLE1BQU0sQ0FBQzdGLEdBQVAsQ0FBVzVJLEtBQVg7RUFDRCxPQUZEO0VBR0QsS0F4TVM7O0VBMk1WOzs7OztFQUtBc08sSUFBQUEsY0FBYyxFQUFFLFNBQVNBLGNBQVQsR0FBMEI7RUFDeENoRSxNQUFBQSxNQUFNLENBQUNILEdBQVAsQ0FBV3FDLFVBQVgsRUFBdUI5SixVQUFVLENBQUNlLElBQVgsQ0FBZ0I2QixPQUF2QztFQUNELEtBbE5TOztFQXFOVjs7Ozs7RUFLQTJILElBQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCak4sS0FBakIsRUFBd0I7RUFDL0IsVUFBSXlNLFlBQVksQ0FBQ3hCLE9BQWIsQ0FBcUJqTCxLQUFLLENBQUMxSCxJQUEzQixJQUFtQyxDQUFDLENBQXhDLEVBQTJDO0VBQ3pDLGVBQU8wSCxLQUFQO0VBQ0Q7O0VBRUQsYUFBT0EsS0FBSyxDQUFDaU4sT0FBTixDQUFjLENBQWQsS0FBb0JqTixLQUFLLENBQUMwTyxjQUFOLENBQXFCLENBQXJCLENBQTNCO0VBQ0QsS0FoT1M7O0VBbU9WOzs7OztFQUtBVCxJQUFBQSxTQUFTLEVBQUUsU0FBU0EsU0FBVCxDQUFtQmpPLEtBQW5CLEVBQTBCO0VBQ25DLFVBQUlMLFFBQVEsR0FBR2MsS0FBSyxDQUFDZCxRQUFyQjs7RUFFQSxVQUFJOE0sWUFBWSxDQUFDeEIsT0FBYixDQUFxQmpMLEtBQUssQ0FBQzFILElBQTNCLElBQW1DLENBQUMsQ0FBeEMsRUFBMkM7RUFDekMsZUFBT3FILFFBQVEsQ0FBQzNHLGFBQWhCO0VBQ0Q7O0VBRUQsYUFBTzJHLFFBQVEsQ0FBQzVHLGNBQWhCO0VBQ0QsS0FoUFM7O0VBbVBWOzs7OztFQUtBaUosSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7RUFDeEJsQixNQUFBQSxRQUFRLEdBQUcsS0FBWDtFQUVBNEIsTUFBQUEsVUFBVSxDQUFDakIsVUFBWCxDQUFzQk8sTUFBdEI7RUFFQSxhQUFPLElBQVA7RUFDRCxLQTlQUzs7RUFpUVY7Ozs7O0VBS0FOLElBQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0VBQzFCWixNQUFBQSxRQUFRLEdBQUcsSUFBWDtFQUVBNEIsTUFBQUEsVUFBVSxDQUFDakIsVUFBWCxDQUFzQkMsT0FBdEI7RUFFQSxhQUFPLElBQVA7RUFDRDtFQTVRUyxHQUFaO0VBK1FBOzs7OztFQUlBaUIsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLGFBQVYsRUFBeUIsWUFBWTtFQUNuQzJDLElBQUFBLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjJDLElBQWhCLENBQXFCTSxTQUFyQixDQUErQnlCLEdBQS9CLENBQW1DMUgsS0FBSyxDQUFDZCxRQUFOLENBQWUvRixPQUFmLENBQXVCSyxTQUExRDtFQUNELEdBRkQ7RUFJQTs7Ozs7RUFJQTBJLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQVk7RUFDL0IyTSxJQUFBQSxLQUFLLENBQUM2QixnQkFBTjtFQUNBN0IsSUFBQUEsS0FBSyxDQUFDMkIsZUFBTjtFQUNBM0IsSUFBQUEsS0FBSyxDQUFDNEIsY0FBTjtFQUNBaEUsSUFBQUEsTUFBTSxDQUFDMUksT0FBUDtFQUNELEdBTEQ7RUFPQSxTQUFPOEssS0FBUDtFQUNEOztFQUVELFNBQVNpQyxNQUFULENBQWlCbE8sS0FBakIsRUFBd0JpQyxVQUF4QixFQUFvQ0MsTUFBcEMsRUFBNEM7RUFDMUM7Ozs7O0VBS0EsTUFBSTJILE1BQU0sR0FBRyxJQUFJVCxZQUFKLEVBQWI7RUFFQSxNQUFJOEUsTUFBTSxHQUFHO0VBQ1g7Ozs7O0VBS0FqUSxJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtFQUN0QixXQUFLNkwsSUFBTDtFQUNELEtBUlU7O0VBV1g7Ozs7O0VBS0FBLElBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0VBQ3BCRCxNQUFBQSxNQUFNLENBQUN2SyxFQUFQLENBQVUsV0FBVixFQUF1QjJDLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjZCLE9BQXZDLEVBQWdELEtBQUtzSixTQUFyRDtFQUNELEtBbEJVOztFQXFCWDs7Ozs7RUFLQXBFLElBQUFBLE1BQU0sRUFBRSxTQUFTQSxNQUFULEdBQWtCO0VBQ3hCRixNQUFBQSxNQUFNLENBQUNILEdBQVAsQ0FBVyxXQUFYLEVBQXdCekgsVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBeEM7RUFDRCxLQTVCVTs7RUErQlg7Ozs7O0VBS0FzSixJQUFBQSxTQUFTLEVBQUUsU0FBU0EsU0FBVCxDQUFtQjVPLEtBQW5CLEVBQTBCO0VBQ25DQSxNQUFBQSxLQUFLLENBQUM2TyxjQUFOO0VBQ0Q7RUF0Q1UsR0FBYjtFQXlDQTs7Ozs7RUFJQWxNLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQVk7RUFDL0I0TyxJQUFBQSxNQUFNLENBQUNuRSxNQUFQO0VBQ0FGLElBQUFBLE1BQU0sQ0FBQzFJLE9BQVA7RUFDRCxHQUhEO0VBS0EsU0FBTytNLE1BQVA7RUFDRDs7RUFFRCxTQUFTRyxPQUFULENBQWtCck8sS0FBbEIsRUFBeUJpQyxVQUF6QixFQUFxQ0MsTUFBckMsRUFBNkM7RUFDM0M7Ozs7O0VBS0EsTUFBSTJILE1BQU0sR0FBRyxJQUFJVCxZQUFKLEVBQWI7RUFFQTs7Ozs7Ozs7RUFPQSxNQUFJa0YsUUFBUSxHQUFHLEtBQWY7RUFFQTs7Ozs7Ozs7RUFPQSxNQUFJQyxTQUFTLEdBQUcsS0FBaEI7RUFFQSxNQUFJRixPQUFPLEdBQUc7RUFDWjs7Ozs7RUFLQXBRLElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0VBQ3RCOzs7Ozs7RUFNQSxXQUFLdVEsRUFBTCxHQUFVdk0sVUFBVSxDQUFDZSxJQUFYLENBQWdCNkIsT0FBaEIsQ0FBd0I0SixnQkFBeEIsQ0FBeUMsR0FBekMsQ0FBVjtFQUVBLFdBQUszRSxJQUFMO0VBQ0QsS0FoQlc7O0VBbUJaOzs7OztFQUtBQSxJQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtFQUNwQkQsTUFBQUEsTUFBTSxDQUFDdkssRUFBUCxDQUFVLE9BQVYsRUFBbUIyQyxVQUFVLENBQUNlLElBQVgsQ0FBZ0I2QixPQUFuQyxFQUE0QyxLQUFLNkosS0FBakQ7RUFDRCxLQTFCVzs7RUE2Qlo7Ozs7O0VBS0EzRSxJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtFQUN4QkYsTUFBQUEsTUFBTSxDQUFDSCxHQUFQLENBQVcsT0FBWCxFQUFvQnpILFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjZCLE9BQXBDO0VBQ0QsS0FwQ1c7O0VBdUNaOzs7Ozs7RUFNQTZKLElBQUFBLEtBQUssRUFBRSxTQUFTQSxLQUFULENBQWVuUCxLQUFmLEVBQXNCO0VBQzNCLFVBQUlnUCxTQUFKLEVBQWU7RUFDYmhQLFFBQUFBLEtBQUssQ0FBQ2dPLGVBQU47RUFDQWhPLFFBQUFBLEtBQUssQ0FBQzZPLGNBQU47RUFDRDtFQUNGLEtBbERXOztFQXFEWjs7Ozs7RUFLQU8sSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7RUFDeEJKLE1BQUFBLFNBQVMsR0FBRyxJQUFaOztFQUVBLFVBQUksQ0FBQ0QsUUFBTCxFQUFlO0VBQ2IsYUFBSyxJQUFJdFQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLNk0sS0FBTCxDQUFXNU0sTUFBL0IsRUFBdUNELENBQUMsRUFBeEMsRUFBNEM7RUFDMUMsZUFBSzZNLEtBQUwsQ0FBVzdNLENBQVgsRUFBYzRULFNBQWQsR0FBMEIsS0FBMUI7RUFFQSxlQUFLL0csS0FBTCxDQUFXN00sQ0FBWCxFQUFjNlQsWUFBZCxDQUEyQixXQUEzQixFQUF3QyxLQUFLaEgsS0FBTCxDQUFXN00sQ0FBWCxFQUFjOFQsWUFBZCxDQUEyQixNQUEzQixDQUF4QztFQUVBLGVBQUtqSCxLQUFMLENBQVc3TSxDQUFYLEVBQWMrVCxlQUFkLENBQThCLE1BQTlCO0VBQ0Q7O0VBRURULFFBQUFBLFFBQVEsR0FBRyxJQUFYO0VBQ0Q7O0VBRUQsYUFBTyxJQUFQO0VBQ0QsS0ExRVc7O0VBNkVaOzs7OztFQUtBVSxJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtFQUN4QlQsTUFBQUEsU0FBUyxHQUFHLEtBQVo7O0VBRUEsVUFBSUQsUUFBSixFQUFjO0VBQ1osYUFBSyxJQUFJdFQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLNk0sS0FBTCxDQUFXNU0sTUFBL0IsRUFBdUNELENBQUMsRUFBeEMsRUFBNEM7RUFDMUMsZUFBSzZNLEtBQUwsQ0FBVzdNLENBQVgsRUFBYzRULFNBQWQsR0FBMEIsSUFBMUI7RUFFQSxlQUFLL0csS0FBTCxDQUFXN00sQ0FBWCxFQUFjNlQsWUFBZCxDQUEyQixNQUEzQixFQUFtQyxLQUFLaEgsS0FBTCxDQUFXN00sQ0FBWCxFQUFjOFQsWUFBZCxDQUEyQixXQUEzQixDQUFuQztFQUNEOztFQUVEUixRQUFBQSxRQUFRLEdBQUcsS0FBWDtFQUNEOztFQUVELGFBQU8sSUFBUDtFQUNEO0VBaEdXLEdBQWQ7RUFtR0E5UCxFQUFBQSxNQUFNLENBQUM2UCxPQUFELEVBQVUsT0FBVixFQUFtQjtFQUN2Qjs7Ozs7RUFLQXBTLElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBT29TLE9BQU8sQ0FBQ0csRUFBZjtFQUNEO0VBUnNCLEdBQW5CLENBQU47RUFXQTs7Ozs7RUFJQXRNLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxZQUFWLEVBQXdCLFlBQVk7RUFDbEMrTyxJQUFBQSxPQUFPLENBQUNNLE1BQVI7RUFDRCxHQUZEO0VBSUE7Ozs7O0VBSUF6TSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsV0FBVixFQUF1QixZQUFZO0VBQ2pDMkMsSUFBQUEsVUFBVSxDQUFDakIsVUFBWCxDQUFzQnFCLEtBQXRCLENBQTRCLFlBQVk7RUFDdENnTSxNQUFBQSxPQUFPLENBQUNXLE1BQVI7RUFDRCxLQUZEO0VBR0QsR0FKRDtFQU1BOzs7OztFQUlBOU0sRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBWTtFQUMvQitPLElBQUFBLE9BQU8sQ0FBQ1csTUFBUjtFQUNBWCxJQUFBQSxPQUFPLENBQUN0RSxNQUFSO0VBQ0FGLElBQUFBLE1BQU0sQ0FBQzFJLE9BQVA7RUFDRCxHQUpEO0VBTUEsU0FBT2tOLE9BQVA7RUFDRDs7RUFFRCxJQUFJWSxZQUFZLEdBQUcsaUNBQW5CO0VBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsNkJBQXhCOztFQUVBLFNBQVNDLFFBQVQsQ0FBbUJuUCxLQUFuQixFQUEwQmlDLFVBQTFCLEVBQXNDQyxNQUF0QyxFQUE4QztFQUM1Qzs7Ozs7RUFLQSxNQUFJMkgsTUFBTSxHQUFHLElBQUlULFlBQUosRUFBYjtFQUVBLE1BQUlJLE9BQU8sR0FBR29DLGlCQUFpQixHQUFHO0VBQUVTLElBQUFBLE9BQU8sRUFBRTtFQUFYLEdBQUgsR0FBdUIsS0FBdEQ7RUFFQSxNQUFJOEMsUUFBUSxHQUFHO0VBQ2I7Ozs7OztFQU1BbFIsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7RUFDdEI7Ozs7OztFQU1BLFdBQUttUixFQUFMLEdBQVVuTixVQUFVLENBQUNlLElBQVgsQ0FBZ0IyQyxJQUFoQixDQUFxQjhJLGdCQUFyQixDQUFzQ1EsWUFBdEMsQ0FBVjtFQUVBOzs7Ozs7O0VBTUEsV0FBSy9PLEVBQUwsR0FBVStCLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjJDLElBQWhCLENBQXFCOEksZ0JBQXJCLENBQXNDUyxpQkFBdEMsQ0FBVjtFQUVBLFdBQUtHLFdBQUw7RUFDRCxLQXpCWTs7RUE0QmI7Ozs7O0VBS0FDLElBQUFBLFNBQVMsRUFBRSxTQUFTQSxTQUFULEdBQXFCO0VBQzlCLFdBQUssSUFBSXRVLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS29VLEVBQUwsQ0FBUW5VLE1BQTVCLEVBQW9DRCxDQUFDLEVBQXJDLEVBQXlDO0VBQ3ZDLGFBQUtzUCxRQUFMLENBQWMsS0FBSzhFLEVBQUwsQ0FBUXBVLENBQVIsRUFBVzhKLFFBQXpCO0VBQ0Q7RUFDRixLQXJDWTs7RUF3Q2I7Ozs7O0VBS0F5SyxJQUFBQSxZQUFZLEVBQUUsU0FBU0EsWUFBVCxHQUF3QjtFQUNwQyxXQUFLLElBQUl2VSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtvVSxFQUFMLENBQVFuVSxNQUE1QixFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF5QztFQUN2QyxhQUFLdVAsV0FBTCxDQUFpQixLQUFLNkUsRUFBTCxDQUFRcFUsQ0FBUixFQUFXOEosUUFBNUI7RUFDRDtFQUNGLEtBakRZOztFQW9EYjs7Ozs7O0VBTUF3RixJQUFBQSxRQUFRLEVBQUUsU0FBU0EsUUFBVCxDQUFrQmtGLFFBQWxCLEVBQTRCO0VBQ3BDLFVBQUl0USxRQUFRLEdBQUdjLEtBQUssQ0FBQ2QsUUFBckI7RUFDQSxVQUFJYSxJQUFJLEdBQUd5UCxRQUFRLENBQUN4UCxLQUFLLENBQUNQLEtBQVAsQ0FBbkI7O0VBRUEsVUFBSU0sSUFBSixFQUFVO0VBQ1JBLFFBQUFBLElBQUksQ0FBQ2tHLFNBQUwsQ0FBZXlCLEdBQWYsQ0FBbUJ4SSxRQUFRLENBQUMvRixPQUFULENBQWlCUSxTQUFwQztFQUVBb0wsUUFBQUEsUUFBUSxDQUFDaEYsSUFBRCxDQUFSLENBQWVELE9BQWYsQ0FBdUIsVUFBVTZILE9BQVYsRUFBbUI7RUFDeENBLFVBQUFBLE9BQU8sQ0FBQzFCLFNBQVIsQ0FBa0J0RyxNQUFsQixDQUF5QlQsUUFBUSxDQUFDL0YsT0FBVCxDQUFpQlEsU0FBMUM7RUFDRCxTQUZEO0VBR0Q7RUFDRixLQXJFWTs7RUF3RWI7Ozs7OztFQU1BNFEsSUFBQUEsV0FBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJpRixRQUFyQixFQUErQjtFQUMxQyxVQUFJelAsSUFBSSxHQUFHeVAsUUFBUSxDQUFDeFAsS0FBSyxDQUFDUCxLQUFQLENBQW5COztFQUVBLFVBQUlNLElBQUosRUFBVTtFQUNSQSxRQUFBQSxJQUFJLENBQUNrRyxTQUFMLENBQWV0RyxNQUFmLENBQXNCSyxLQUFLLENBQUNkLFFBQU4sQ0FBZS9GLE9BQWYsQ0FBdUJRLFNBQTdDO0VBQ0Q7RUFDRixLQXBGWTs7RUF1RmI7Ozs7O0VBS0EwVixJQUFBQSxXQUFXLEVBQUUsU0FBU0EsV0FBVCxHQUF1QjtFQUNsQyxXQUFLLElBQUlyVSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtrRixFQUFMLENBQVFqRixNQUE1QixFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF5QztFQUN2QyxhQUFLOE8sSUFBTCxDQUFVLEtBQUs1SixFQUFMLENBQVFsRixDQUFSLEVBQVc4SixRQUFyQjtFQUNEO0VBQ0YsS0FoR1k7O0VBbUdiOzs7OztFQUtBMkssSUFBQUEsY0FBYyxFQUFFLFNBQVNBLGNBQVQsR0FBMEI7RUFDeEMsV0FBSyxJQUFJelUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLa0YsRUFBTCxDQUFRakYsTUFBNUIsRUFBb0NELENBQUMsRUFBckMsRUFBeUM7RUFDdkMsYUFBSytPLE1BQUwsQ0FBWSxLQUFLN0osRUFBTCxDQUFRbEYsQ0FBUixFQUFXOEosUUFBdkI7RUFDRDtFQUNGLEtBNUdZOztFQStHYjs7Ozs7O0VBTUFnRixJQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxDQUFjNEYsUUFBZCxFQUF3QjtFQUM1QixXQUFLLElBQUkxVSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHMFUsUUFBUSxDQUFDelUsTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7RUFDeEM2TyxRQUFBQSxNQUFNLENBQUN2SyxFQUFQLENBQVUsT0FBVixFQUFtQm9RLFFBQVEsQ0FBQzFVLENBQUQsQ0FBM0IsRUFBZ0MsS0FBSzBULEtBQXJDO0VBQ0E3RSxRQUFBQSxNQUFNLENBQUN2SyxFQUFQLENBQVUsWUFBVixFQUF3Qm9RLFFBQVEsQ0FBQzFVLENBQUQsQ0FBaEMsRUFBcUMsS0FBSzBULEtBQTFDLEVBQWlEbEYsT0FBakQ7RUFDRDtFQUNGLEtBMUhZOztFQTZIYjs7Ozs7O0VBTUFPLElBQUFBLE1BQU0sRUFBRSxTQUFTQSxNQUFULENBQWdCMkYsUUFBaEIsRUFBMEI7RUFDaEMsV0FBSyxJQUFJMVUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzBVLFFBQVEsQ0FBQ3pVLE1BQTdCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQTBDO0VBQ3hDNk8sUUFBQUEsTUFBTSxDQUFDSCxHQUFQLENBQVcsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUFYLEVBQW9DZ0csUUFBUSxDQUFDMVUsQ0FBRCxDQUE1QztFQUNEO0VBQ0YsS0F2SVk7O0VBMEliOzs7Ozs7OztFQVFBMFQsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZW5QLEtBQWYsRUFBc0I7RUFDM0JBLE1BQUFBLEtBQUssQ0FBQzZPLGNBQU47RUFFQW5NLE1BQUFBLFVBQVUsQ0FBQ3JCLEdBQVgsQ0FBZUMsSUFBZixDQUFvQm9CLFVBQVUsQ0FBQ3dDLFNBQVgsQ0FBcUJ5RixPQUFyQixDQUE2QjNLLEtBQUssQ0FBQ29RLGFBQU4sQ0FBb0JiLFlBQXBCLENBQWlDLGdCQUFqQyxDQUE3QixDQUFwQjtFQUNEO0VBdEpZLEdBQWY7RUF5SkF0USxFQUFBQSxNQUFNLENBQUMyUSxRQUFELEVBQVcsT0FBWCxFQUFvQjtFQUN4Qjs7Ozs7RUFLQWxULElBQUFBLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7RUFDbEIsYUFBT2tULFFBQVEsQ0FBQ2pQLEVBQWhCO0VBQ0Q7RUFSdUIsR0FBcEIsQ0FBTjtFQVdBOzs7Ozs7RUFLQWdDLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxDQUFDLGFBQUQsRUFBZ0IsWUFBaEIsQ0FBVixFQUF5QyxZQUFZO0VBQ25ENlAsSUFBQUEsUUFBUSxDQUFDRyxTQUFUO0VBQ0QsR0FGRDtFQUlBOzs7OztFQUlBcE4sRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBWTtFQUMvQjZQLElBQUFBLFFBQVEsQ0FBQ00sY0FBVDtFQUNBTixJQUFBQSxRQUFRLENBQUNJLFlBQVQ7RUFDQTFGLElBQUFBLE1BQU0sQ0FBQzFJLE9BQVA7RUFDRCxHQUpEO0VBTUEsU0FBT2dPLFFBQVA7RUFDRDs7RUFFRCxTQUFTUyxRQUFULENBQW1CNVAsS0FBbkIsRUFBMEJpQyxVQUExQixFQUFzQ0MsTUFBdEMsRUFBOEM7RUFDNUM7Ozs7O0VBS0EsTUFBSTJILE1BQU0sR0FBRyxJQUFJVCxZQUFKLEVBQWI7RUFFQSxNQUFJd0csUUFBUSxHQUFHO0VBQ2I7Ozs7O0VBS0EzUixJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtFQUN0QixVQUFJK0IsS0FBSyxDQUFDZCxRQUFOLENBQWU5RyxRQUFuQixFQUE2QjtFQUMzQixhQUFLMFIsSUFBTDtFQUNEO0VBQ0YsS0FWWTs7RUFhYjs7Ozs7RUFLQUEsSUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7RUFDcEJELE1BQUFBLE1BQU0sQ0FBQ3ZLLEVBQVAsQ0FBVSxPQUFWLEVBQW1COEcsUUFBbkIsRUFBNkIsS0FBS3lKLEtBQWxDO0VBQ0QsS0FwQlk7O0VBdUJiOzs7OztFQUtBOUYsSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7RUFDeEJGLE1BQUFBLE1BQU0sQ0FBQ0gsR0FBUCxDQUFXLE9BQVgsRUFBb0J0RCxRQUFwQjtFQUNELEtBOUJZOztFQWlDYjs7Ozs7O0VBTUF5SixJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFldFEsS0FBZixFQUFzQjtFQUMzQixVQUFJQSxLQUFLLENBQUN1USxPQUFOLEtBQWtCLEVBQXRCLEVBQTBCO0VBQ3hCN04sUUFBQUEsVUFBVSxDQUFDckIsR0FBWCxDQUFlQyxJQUFmLENBQW9Cb0IsVUFBVSxDQUFDd0MsU0FBWCxDQUFxQnlGLE9BQXJCLENBQTZCLEdBQTdCLENBQXBCO0VBQ0Q7O0VBRUQsVUFBSTNLLEtBQUssQ0FBQ3VRLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7RUFDeEI3TixRQUFBQSxVQUFVLENBQUNyQixHQUFYLENBQWVDLElBQWYsQ0FBb0JvQixVQUFVLENBQUN3QyxTQUFYLENBQXFCeUYsT0FBckIsQ0FBNkIsR0FBN0IsQ0FBcEI7RUFDRDtFQUNGO0VBL0NZLEdBQWY7RUFrREE7Ozs7OztFQUtBaEksRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBVixFQUFpQyxZQUFZO0VBQzNDc1EsSUFBQUEsUUFBUSxDQUFDN0YsTUFBVDtFQUNELEdBRkQ7RUFJQTs7Ozs7RUFJQTdILEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLFlBQVk7RUFDOUJzUSxJQUFBQSxRQUFRLENBQUMzUixLQUFUO0VBQ0QsR0FGRDtFQUlBOzs7OztFQUlBaUUsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBWTtFQUMvQnVLLElBQUFBLE1BQU0sQ0FBQzFJLE9BQVA7RUFDRCxHQUZEO0VBSUEsU0FBT3lPLFFBQVA7RUFDRDs7RUFFRCxTQUFTRyxRQUFULENBQW1CL1AsS0FBbkIsRUFBMEJpQyxVQUExQixFQUFzQ0MsTUFBdEMsRUFBOEM7RUFDNUM7Ozs7O0VBS0EsTUFBSTJILE1BQU0sR0FBRyxJQUFJVCxZQUFKLEVBQWI7RUFFQSxNQUFJMkcsUUFBUSxHQUFHO0VBQ2I7Ozs7O0VBS0E5UixJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtFQUN0QixXQUFLaUssS0FBTDs7RUFFQSxVQUFJbEksS0FBSyxDQUFDZCxRQUFOLENBQWUvRyxVQUFuQixFQUErQjtFQUM3QixhQUFLMlIsSUFBTDtFQUNEO0VBQ0YsS0FaWTs7RUFlYjs7Ozs7O0VBTUE1QixJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtFQUN0QixVQUFJL0YsS0FBSyxHQUFHLElBQVo7O0VBRUEsVUFBSW5DLEtBQUssQ0FBQ2QsUUFBTixDQUFlaEgsUUFBbkIsRUFBNkI7RUFDM0IsWUFBSTRGLFdBQVcsQ0FBQyxLQUFLZ0UsRUFBTixDQUFmLEVBQTBCO0VBQ3hCLGVBQUtBLEVBQUwsR0FBVWtPLFdBQVcsQ0FBQyxZQUFZO0VBQ2hDN04sWUFBQUEsS0FBSyxDQUFDOE4sSUFBTjs7RUFFQWhPLFlBQUFBLFVBQVUsQ0FBQ3JCLEdBQVgsQ0FBZUMsSUFBZixDQUFvQixHQUFwQjs7RUFFQXNCLFlBQUFBLEtBQUssQ0FBQytGLEtBQU47RUFDRCxXQU5vQixFQU1sQixLQUFLZ0ksSUFOYSxDQUFyQjtFQU9EO0VBQ0Y7RUFDRixLQW5DWTs7RUFzQ2I7Ozs7O0VBS0FELElBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0VBQ3BCLFdBQUtuTyxFQUFMLEdBQVVxTyxhQUFhLENBQUMsS0FBS3JPLEVBQU4sQ0FBdkI7RUFDRCxLQTdDWTs7RUFnRGI7Ozs7O0VBS0FnSSxJQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtFQUNwQixVQUFJaUUsTUFBTSxHQUFHLElBQWI7O0VBRUFsRSxNQUFBQSxNQUFNLENBQUN2SyxFQUFQLENBQVUsV0FBVixFQUF1QjJDLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQjJDLElBQXZDLEVBQTZDLFlBQVk7RUFDdkRvSSxRQUFBQSxNQUFNLENBQUNrQyxJQUFQO0VBQ0QsT0FGRDtFQUlBcEcsTUFBQUEsTUFBTSxDQUFDdkssRUFBUCxDQUFVLFVBQVYsRUFBc0IyQyxVQUFVLENBQUNlLElBQVgsQ0FBZ0IyQyxJQUF0QyxFQUE0QyxZQUFZO0VBQ3REb0ksUUFBQUEsTUFBTSxDQUFDN0YsS0FBUDtFQUNELE9BRkQ7RUFHRCxLQS9EWTs7RUFrRWI7Ozs7O0VBS0E2QixJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtFQUN4QkYsTUFBQUEsTUFBTSxDQUFDSCxHQUFQLENBQVcsQ0FBQyxXQUFELEVBQWMsVUFBZCxDQUFYLEVBQXNDekgsVUFBVSxDQUFDZSxJQUFYLENBQWdCMkMsSUFBdEQ7RUFDRDtFQXpFWSxHQUFmO0VBNEVBbkgsRUFBQUEsTUFBTSxDQUFDdVIsUUFBRCxFQUFXLE1BQVgsRUFBbUI7RUFDdkI7Ozs7OztFQU1BOVQsSUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtFQUNsQixVQUFJL0QsUUFBUSxHQUFHK0osVUFBVSxDQUFDZSxJQUFYLENBQWdCQyxNQUFoQixDQUF1QmpELEtBQUssQ0FBQ1AsS0FBN0IsRUFBb0NxUCxZQUFwQyxDQUFpRCxxQkFBakQsQ0FBZjs7RUFFQSxVQUFJNVcsUUFBSixFQUFjO0VBQ1osZUFBT29GLEtBQUssQ0FBQ3BGLFFBQUQsQ0FBWjtFQUNEOztFQUVELGFBQU9vRixLQUFLLENBQUMwQyxLQUFLLENBQUNkLFFBQU4sQ0FBZWhILFFBQWhCLENBQVo7RUFDRDtFQWZzQixHQUFuQixDQUFOO0VBa0JBOzs7Ozs7RUFLQWdLLEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxDQUFDLFNBQUQsRUFBWSxRQUFaLENBQVYsRUFBaUMsWUFBWTtFQUMzQ3lRLElBQUFBLFFBQVEsQ0FBQ2hHLE1BQVQ7RUFDRCxHQUZEO0VBSUE7Ozs7Ozs7OztFQVFBN0gsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLENBQUMsWUFBRCxFQUFlLE9BQWYsRUFBd0IsU0FBeEIsRUFBbUMsYUFBbkMsRUFBa0QsUUFBbEQsQ0FBVixFQUF1RSxZQUFZO0VBQ2pGeVEsSUFBQUEsUUFBUSxDQUFDRSxJQUFUO0VBQ0QsR0FGRDtFQUlBOzs7Ozs7O0VBTUEvTixFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsQ0FBQyxXQUFELEVBQWMsTUFBZCxFQUFzQixXQUF0QixDQUFWLEVBQThDLFlBQVk7RUFDeER5USxJQUFBQSxRQUFRLENBQUM3SCxLQUFUO0VBQ0QsR0FGRDtFQUlBOzs7OztFQUlBaEcsRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBWTtFQUM5QnlRLElBQUFBLFFBQVEsQ0FBQzlSLEtBQVQ7RUFDRCxHQUZEO0VBSUE7Ozs7O0VBSUFpRSxFQUFBQSxNQUFNLENBQUM1QyxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFZO0VBQy9CdUssSUFBQUEsTUFBTSxDQUFDMUksT0FBUDtFQUNELEdBRkQ7RUFJQSxTQUFPNE8sUUFBUDtFQUNEO0VBRUQ7Ozs7Ozs7O0VBTUEsU0FBU0ssZUFBVCxDQUF5QkMsTUFBekIsRUFBaUM7RUFDL0IsTUFBSTFTLFFBQVEsQ0FBQzBTLE1BQUQsQ0FBWixFQUFzQjtFQUNwQixXQUFPMVIsUUFBUSxDQUFDMFIsTUFBRCxDQUFmO0VBQ0QsR0FGRCxNQUVPO0VBQ0x2VyxJQUFBQSxJQUFJLENBQUMsc0NBQUQsQ0FBSjtFQUNEOztFQUVELFNBQU8sRUFBUDtFQUNEOztFQUVELFNBQVN3VyxXQUFULENBQXNCdFEsS0FBdEIsRUFBNkJpQyxVQUE3QixFQUF5Q0MsTUFBekMsRUFBaUQ7RUFDL0M7Ozs7O0VBS0EsTUFBSTJILE1BQU0sR0FBRyxJQUFJVCxZQUFKLEVBQWI7RUFFQTs7Ozs7O0VBS0EsTUFBSWxLLFFBQVEsR0FBR2MsS0FBSyxDQUFDZCxRQUFyQjtFQUVBOzs7Ozs7OztFQU9BLE1BQUltUixNQUFNLEdBQUdELGVBQWUsQ0FBQ2xSLFFBQVEsQ0FBQ2hHLFdBQVYsQ0FBNUI7RUFFQTs7Ozs7O0VBS0EsTUFBSXRCLFFBQVEsR0FBRytELFFBQVEsQ0FBQyxFQUFELEVBQUt1RCxRQUFMLENBQXZCOztFQUVBLE1BQUlvUixXQUFXLEdBQUc7RUFDaEI7Ozs7OztFQU1BQyxJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlRixNQUFmLEVBQXVCO0VBQzVCLFVBQUksT0FBTzdLLE1BQU0sQ0FBQ2dMLFVBQWQsS0FBNkIsV0FBakMsRUFBOEM7RUFDNUMsYUFBSyxJQUFJQyxLQUFULElBQWtCSixNQUFsQixFQUEwQjtFQUN4QixjQUFJQSxNQUFNLENBQUN0VSxjQUFQLENBQXNCMFUsS0FBdEIsQ0FBSixFQUFrQztFQUNoQyxnQkFBSWpMLE1BQU0sQ0FBQ2dMLFVBQVAsQ0FBa0IsaUJBQWlCQyxLQUFqQixHQUF5QixLQUEzQyxFQUFrREMsT0FBdEQsRUFBK0Q7RUFDN0QscUJBQU9MLE1BQU0sQ0FBQ0ksS0FBRCxDQUFiO0VBQ0Q7RUFDRjtFQUNGO0VBQ0Y7O0VBRUQsYUFBTzdZLFFBQVA7RUFDRDtFQW5CZSxHQUFsQjtFQXNCQTs7Ozs7RUFJQStELEVBQUFBLFFBQVEsQ0FBQ3VELFFBQUQsRUFBV29SLFdBQVcsQ0FBQ0MsS0FBWixDQUFrQkYsTUFBbEIsQ0FBWCxDQUFSO0VBRUE7Ozs7OztFQUlBeEcsRUFBQUEsTUFBTSxDQUFDdkssRUFBUCxDQUFVLFFBQVYsRUFBb0JrRyxNQUFwQixFQUE0QnpNLFFBQVEsQ0FBQyxZQUFZO0VBQy9DaUgsSUFBQUEsS0FBSyxDQUFDZCxRQUFOLEdBQWlCRCxZQUFZLENBQUNDLFFBQUQsRUFBV29SLFdBQVcsQ0FBQ0MsS0FBWixDQUFrQkYsTUFBbEIsQ0FBWCxDQUE3QjtFQUNELEdBRm1DLEVBRWpDclEsS0FBSyxDQUFDZCxRQUFOLENBQWVuRyxRQUZrQixDQUFwQztFQUlBOzs7OztFQUlBbUosRUFBQUEsTUFBTSxDQUFDNUMsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBWTtFQUM5QitRLElBQUFBLE1BQU0sR0FBR0QsZUFBZSxDQUFDQyxNQUFELENBQXhCO0VBRUF6WSxJQUFBQSxRQUFRLEdBQUcrRCxRQUFRLENBQUMsRUFBRCxFQUFLdUQsUUFBTCxDQUFuQjtFQUNELEdBSkQ7RUFNQTs7Ozs7RUFJQWdELEVBQUFBLE1BQU0sQ0FBQzVDLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQVk7RUFDL0J1SyxJQUFBQSxNQUFNLENBQUNILEdBQVAsQ0FBVyxRQUFYLEVBQXFCbEUsTUFBckI7RUFDRCxHQUZEO0VBSUEsU0FBTzhLLFdBQVA7RUFDRDs7RUFFRCxJQUFJSyxVQUFVLEdBQUc7RUFDZjtFQUNBM04sRUFBQUEsSUFBSSxFQUFFQSxJQUZTO0VBR2ZtSSxFQUFBQSxTQUFTLEVBQUVBLFNBSEk7RUFJZm5LLEVBQUFBLFVBQVUsRUFBRUEsVUFKRztFQUtmeUQsRUFBQUEsU0FBUyxFQUFFQSxTQUxJO0VBTWY2QixFQUFBQSxJQUFJLEVBQUVBLElBTlM7RUFPZjFCLEVBQUFBLEtBQUssRUFBRUEsS0FQUTtFQVFmTixFQUFBQSxJQUFJLEVBQUVBLElBUlM7RUFTZnBELEVBQUFBLElBQUksRUFBRUEsSUFUUztFQVVmbUcsRUFBQUEsTUFBTSxFQUFFQSxNQVZPO0VBV2Z1QyxFQUFBQSxNQUFNLEVBQUVBLE1BWE87RUFZZnJDLEVBQUFBLEtBQUssRUFBRUEsS0FaUTtFQWFmM0csRUFBQUEsR0FBRyxFQUFFQSxHQWJVO0VBZWY7RUFDQXFMLEVBQUFBLEtBQUssRUFBRUEsS0FoQlE7RUFpQmZpQyxFQUFBQSxNQUFNLEVBQUVBLE1BakJPO0VBa0JmRyxFQUFBQSxPQUFPLEVBQUVBLE9BbEJNO0VBbUJmYyxFQUFBQSxRQUFRLEVBQUVBLFFBbkJLO0VBb0JmUyxFQUFBQSxRQUFRLEVBQUVBLFFBcEJLO0VBcUJmRyxFQUFBQSxRQUFRLEVBQUVBLFFBckJLO0VBc0JmTyxFQUFBQSxXQUFXLEVBQUVBO0VBdEJFLENBQWpCOztFQXlCQSxJQUFJTSxPQUFPLEdBQUcsVUFBVUMsS0FBVixFQUFpQjtFQUM3QmhVLEVBQUFBLFFBQVEsQ0FBQ2lVLFFBQUQsRUFBV0QsS0FBWCxDQUFSOztFQUVBLFdBQVNDLFFBQVQsR0FBb0I7RUFDbEJ0VyxJQUFBQSxjQUFjLENBQUMsSUFBRCxFQUFPc1csUUFBUCxDQUFkO0VBQ0EsV0FBTzNULHlCQUF5QixDQUFDLElBQUQsRUFBTyxDQUFDMlQsUUFBUSxDQUFDNVQsU0FBVCxJQUFzQjVCLE1BQU0sQ0FBQ29CLGNBQVAsQ0FBc0JvVSxRQUF0QixDQUF2QixFQUF3RGpOLEtBQXhELENBQThELElBQTlELEVBQW9FaEksU0FBcEUsQ0FBUCxDQUFoQztFQUNEOztFQUVEakIsRUFBQUEsV0FBVyxDQUFDa1csUUFBRCxFQUFXLENBQUM7RUFDckJ0VixJQUFBQSxHQUFHLEVBQUUsT0FEZ0I7RUFFckJtQixJQUFBQSxLQUFLLEVBQUUsU0FBU3NCLEtBQVQsR0FBaUI7RUFDdEIsVUFBSUUsVUFBVSxHQUFHdEMsU0FBUyxDQUFDWixNQUFWLEdBQW1CLENBQW5CLElBQXdCWSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxTQUF6QyxHQUFxRFgsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsRUFBckY7RUFFQSxhQUFPSSxHQUFHLENBQUM2VSxRQUFRLENBQUN2VyxTQUFULENBQW1CMkMsU0FBbkIsSUFBZ0M1QixNQUFNLENBQUNvQixjQUFQLENBQXNCb1UsUUFBUSxDQUFDdlcsU0FBL0IsQ0FBakMsRUFBNEUsT0FBNUUsRUFBcUYsSUFBckYsQ0FBSCxDQUE4RnlCLElBQTlGLENBQW1HLElBQW5HLEVBQXlHTCxRQUFRLENBQUMsRUFBRCxFQUFLZ1YsVUFBTCxFQUFpQnhTLFVBQWpCLENBQWpILENBQVA7RUFDRDtFQU5vQixHQUFELENBQVgsQ0FBWDtFQVFBLFNBQU8yUyxRQUFQO0VBQ0QsQ0FqQmEsQ0FpQlo5USxLQWpCWSxDQUFkOztFQzlqSEEsSUFBSUEsT0FBSixDQUFVLFFBQVYsRUFBb0I7RUFBRW5JLEVBQUFBLElBQUksRUFBRSxVQUFSO0VBQW9CRSxFQUFBQSxPQUFPLEVBQUUsQ0FBN0I7RUFBZ0NHLEVBQUFBLFFBQVEsRUFBRTtFQUExQyxDQUFwQixFQUFzRStGLEtBQXRFOzs7OyJ9
