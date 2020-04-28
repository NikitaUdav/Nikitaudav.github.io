(function (factory) {
  typeof define === 'function' && define.amd ? define('work1', factory) :
  factory();
}((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var car2 = {
    manufacturer: "BMW",
    model: "X5",
    yeaManufacture: 2016,
    averageSpeed: 100
  };


  var travelTime = function travelTimeFunc() {
    var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var car = arguments.length > 1 ? arguments[1] : undefined;

    if (_typeof(car) === "object" && typeof distance !== "string") {
      var result = distance / car.averageSpeed;
      result / 4 > 1 ? result += Math.floor(result / 4) : result;
      return result.toFixed(2);
    } else return "error";
  };

  var di = 800;
  console.log(travelTime(di, car2));

})));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay0xLmpzIiwic291cmNlcyI6WyJzcmMvanMvd29yay0xLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5jb25zdCBjYXIgPSB7XHJcbiAgbWFudWZhY3R1cmVyOiBcIlRlc2xhXCIsXHJcbiAgbW9kZWw6IFwiWFwiLFxyXG4gIHllYU1hbnVmYWN0dXJlOiAyMDE5LFxyXG4gIGF2ZXJhZ2VTcGVlZDogMzUwLFxyXG59O1xyXG5jb25zdCBjYXIyID0ge1xyXG4gIG1hbnVmYWN0dXJlcjogXCJCTVdcIixcclxuICBtb2RlbDogXCJYNVwiLFxyXG4gIHllYU1hbnVmYWN0dXJlOiAyMDE2LFxyXG4gIGF2ZXJhZ2VTcGVlZDogMTAwLFxyXG59O1xyXG5jb25zdCBjYXJTaG93ID0gZnVuY3Rpb24gQ2FyU2hvd0Z1bmMob2JqLCBrZXkgPSAxKSB7XHJcbiAgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGNvbnNvbGUubG9nKGDQn9GA0L7QuNC30LLQvtC00LjRgtC10LvRjCAke29iaj8ubWFudWZhY3R1cmVyfWApO1xyXG4gICAgY29uc29sZS5sb2coYNCc0L7QtNC10LvRjCAke29iaj8ubW9kZWx9YCk7XHJcbiAgICBjb25zb2xlLmxvZyhg0JPQvtC0INC/0YDQvtC40LfQstC+0LTRgdGC0LLQsCAke29iaj8ueWVhTWFudWZhY3R1cmV9YCk7XHJcbiAgICBjb25zb2xlLmxvZyhg0KHRgNC10LTQvdGP0Y8g0YHQutC+0YDQvtGB0YLRjCAke29iaj8uYXZlcmFnZVNwZWVkfWApO1xyXG4gIH0gZWxzZSByZXR1cm4gYElzIG5vdCBvYmplY3RgO1xyXG59O1xyXG4vL2NhclNob3coY2FyMik7XHJcbmNvbnN0IHRyYXZlbFRpbWUgPSBmdW5jdGlvbiB0cmF2ZWxUaW1lRnVuYyhkaXN0YW5jZSA9IDEsIGNhcikge1xyXG4gIGlmICh0eXBlb2YgY2FyID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBkaXN0YW5jZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgbGV0IHJlc3VsdCA9IGRpc3RhbmNlIC8gY2FyLmF2ZXJhZ2VTcGVlZDtcclxuICAgIHJlc3VsdCAvIDQgPiAxID8gKHJlc3VsdCArPSBNYXRoLmZsb29yKHJlc3VsdCAvIDQpKSA6IHJlc3VsdDtcclxuICAgIHJldHVybiByZXN1bHQudG9GaXhlZCgyKTtcclxuICB9IGVsc2UgcmV0dXJuIGBlcnJvcmA7XHJcbn07XHJcbmNvbnN0IGRpID0gODAwO1xyXG5jb25zb2xlLmxvZyh0cmF2ZWxUaW1lKGRpLCBjYXIyKSk7XHJcbiJdLCJuYW1lcyI6WyJjYXIyIiwibWFudWZhY3R1cmVyIiwibW9kZWwiLCJ5ZWFNYW51ZmFjdHVyZSIsImF2ZXJhZ2VTcGVlZCIsInRyYXZlbFRpbWUiLCJ0cmF2ZWxUaW1lRnVuYyIsImRpc3RhbmNlIiwiY2FyIiwicmVzdWx0IiwiTWF0aCIsImZsb29yIiwidG9GaXhlZCIsImRpIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBT0EsSUFBTUEsSUFBSSxHQUFHO0VBQ1hDLEVBQUFBLFlBQVksRUFBRSxLQURIO0VBRVhDLEVBQUFBLEtBQUssRUFBRSxJQUZJO0VBR1hDLEVBQUFBLGNBQWMsRUFBRSxJQUhMO0VBSVhDLEVBQUFBLFlBQVksRUFBRTtFQUpILENBQWI7OztFQWVBLElBQU1DLFVBQVUsR0FBRyxTQUFTQyxjQUFULEdBQTJDO0VBQUEsTUFBbkJDLFFBQW1CLHVFQUFSLENBQVE7RUFBQSxNQUFMQyxHQUFLOztFQUM1RCxNQUFJLFFBQU9BLEdBQVAsTUFBZSxRQUFmLElBQTJCLE9BQU9ELFFBQVAsS0FBb0IsUUFBbkQsRUFBNkQ7RUFDM0QsUUFBSUUsTUFBTSxHQUFHRixRQUFRLEdBQUdDLEdBQUcsQ0FBQ0osWUFBNUI7RUFDQUssSUFBQUEsTUFBTSxHQUFHLENBQVQsR0FBYSxDQUFiLEdBQWtCQSxNQUFNLElBQUlDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixNQUFNLEdBQUcsQ0FBcEIsQ0FBNUIsR0FBc0RBLE1BQXREO0VBQ0EsV0FBT0EsTUFBTSxDQUFDRyxPQUFQLENBQWUsQ0FBZixDQUFQO0VBQ0QsR0FKRCxNQUlPO0VBQ1IsQ0FORDs7RUFPQSxJQUFNQyxFQUFFLEdBQUcsR0FBWDtFQUNBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWVYsVUFBVSxDQUFDUSxFQUFELEVBQUtiLElBQUwsQ0FBdEI7Ozs7In0=
