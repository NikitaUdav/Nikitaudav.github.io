(function (factory) {
  typeof define === 'function' && define.amd ? define('work3', factory) :
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

  var isObject = function isObject(obj) {
    return _typeof(obj) === "object";
  };

  var time = {
    hours: 15,
    minutes: 0,
    seconds: 0
  };

  var showTime = function showTimeFunc(time) {
    if (isObject(time)) {
      var now = new Date();
      now.setDate(1);
      now.setHours(time.hours, time.minutes, time.seconds);
      return now.toLocaleTimeString("ru", {
        day: "numeric",
        hours: "numeric",
        minutes: "numeric",
        seconds: "numeric"
      });
    } else {
      return "time must be an object!";
    }
  };

  var changeTime = {
    seconds: function setSecondsFunc(time, seconds) {
      if (isObject(time)) {
        return time.seconds = +seconds;
      } else {
        return "time must be an object!";
      }
    },
    minutes: function setMinutesFunc(time, minutes) {
      if (isObject(time)) {
        return time.minutes = +minutes;
      } else {
        return "time must be an object!";
      }
    },
    hours: function setHoursFunc(time, hours) {
      if (isObject(time)) {
        return time.hours = +hours;
      } else {
        return "time must be an object!";
      }
    }
  };
  console.log(showTime(time));
  console.log("Plus ".concat(changeTime === null || changeTime === void 0 ? void 0 : changeTime.seconds(time, 120), " seconds"));
  console.log(showTime(time));
  console.log("-------------");
  console.log(showTime(time));
  console.log("Plus ".concat(changeTime === null || changeTime === void 0 ? void 0 : changeTime.minutes(time, 12), " minutes"));
  console.log(showTime(time));
  console.log("-------------");
  console.log(showTime(time));
  console.log("Plus ".concat(changeTime === null || changeTime === void 0 ? void 0 : changeTime.hours(time, 120), " Hours"));
  console.log(showTime(time));
  console.log("-------------");

})));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay0zLmpzIiwic291cmNlcyI6WyJzcmMvanMvd29yay0zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3QgaXNPYmplY3QgPSAob2JqKSA9PiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xubGV0IHRpbWUgPSB7XG4gIGhvdXJzOiAxNSxcbiAgbWludXRlczogMCxcbiAgc2Vjb25kczogMCxcbn07XG5jb25zdCBzaG93VGltZSA9IGZ1bmN0aW9uIHNob3dUaW1lRnVuYyh0aW1lKSB7XG4gIGlmIChpc09iamVjdCh0aW1lKSkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgbm93LnNldERhdGUoMSk7XG4gICAgbm93LnNldEhvdXJzKHRpbWUuaG91cnMsIHRpbWUubWludXRlcywgdGltZS5zZWNvbmRzKTtcbiAgICByZXR1cm4gbm93LnRvTG9jYWxlVGltZVN0cmluZyhcInJ1XCIsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBob3VyczogXCJudW1lcmljXCIsXG4gICAgICBtaW51dGVzOiBcIm51bWVyaWNcIixcbiAgICAgIHNlY29uZHM6IFwibnVtZXJpY1wiLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcInRpbWUgbXVzdCBiZSBhbiBvYmplY3QhXCI7XG4gIH1cbn07XG5jb25zdCBjaGFuZ2VUaW1lID0ge1xuICBzZWNvbmRzOiBmdW5jdGlvbiBzZXRTZWNvbmRzRnVuYyh0aW1lLCBzZWNvbmRzKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRpbWUpKSB7XG4gICAgICByZXR1cm4gKHRpbWUuc2Vjb25kcyA9ICtzZWNvbmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwidGltZSBtdXN0IGJlIGFuIG9iamVjdCFcIjtcbiAgICB9XG4gIH0sXG4gIG1pbnV0ZXM6IGZ1bmN0aW9uIHNldE1pbnV0ZXNGdW5jKHRpbWUsIG1pbnV0ZXMpIHtcbiAgICBpZiAoaXNPYmplY3QodGltZSkpIHtcbiAgICAgIHJldHVybiAodGltZS5taW51dGVzID0gK21pbnV0ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJ0aW1lIG11c3QgYmUgYW4gb2JqZWN0IVwiO1xuICAgIH1cbiAgfSxcbiAgaG91cnM6IGZ1bmN0aW9uIHNldEhvdXJzRnVuYyh0aW1lLCBob3Vycykge1xuICAgIGlmIChpc09iamVjdCh0aW1lKSkge1xuICAgICAgcmV0dXJuICh0aW1lLmhvdXJzID0gK2hvdXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwidGltZSBtdXN0IGJlIGFuIG9iamVjdCFcIjtcbiAgICB9XG4gIH0sXG59O1xuY29uc29sZS5sb2coc2hvd1RpbWUodGltZSkpO1xuY29uc29sZS5sb2coYFBsdXMgJHtjaGFuZ2VUaW1lPy5zZWNvbmRzKHRpbWUsIDEyMCl9IHNlY29uZHNgKTtcbmNvbnNvbGUubG9nKHNob3dUaW1lKHRpbWUpKTtcbmNvbnNvbGUubG9nKGAtLS0tLS0tLS0tLS0tYCk7XG5jb25zb2xlLmxvZyhzaG93VGltZSh0aW1lKSk7XG5jb25zb2xlLmxvZyhgUGx1cyAke2NoYW5nZVRpbWU/Lm1pbnV0ZXModGltZSwgMTIpfSBtaW51dGVzYCk7XG5jb25zb2xlLmxvZyhzaG93VGltZSh0aW1lKSk7XG5jb25zb2xlLmxvZyhgLS0tLS0tLS0tLS0tLWApO1xuY29uc29sZS5sb2coc2hvd1RpbWUodGltZSkpO1xuY29uc29sZS5sb2coYFBsdXMgJHtjaGFuZ2VUaW1lPy5ob3Vycyh0aW1lLCAxMjApfSBIb3Vyc2ApO1xuY29uc29sZS5sb2coc2hvd1RpbWUodGltZSkpO1xuY29uc29sZS5sb2coYC0tLS0tLS0tLS0tLS1gKTtcbiJdLCJuYW1lcyI6WyJpc09iamVjdCIsIm9iaiIsInRpbWUiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic2hvd1RpbWUiLCJzaG93VGltZUZ1bmMiLCJub3ciLCJEYXRlIiwic2V0RGF0ZSIsInNldEhvdXJzIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiZGF5IiwiY2hhbmdlVGltZSIsInNldFNlY29uZHNGdW5jIiwic2V0TWludXRlc0Z1bmMiLCJzZXRIb3Vyc0Z1bmMiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFDQSxJQUFNQSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxHQUFEO0VBQUEsU0FBUyxRQUFPQSxHQUFQLE1BQWUsUUFBeEI7RUFBQSxDQUFqQjs7RUFDQSxJQUFJQyxJQUFJLEdBQUc7RUFDVEMsRUFBQUEsS0FBSyxFQUFFLEVBREU7RUFFVEMsRUFBQUEsT0FBTyxFQUFFLENBRkE7RUFHVEMsRUFBQUEsT0FBTyxFQUFFO0VBSEEsQ0FBWDs7RUFLQSxJQUFNQyxRQUFRLEdBQUcsU0FBU0MsWUFBVCxDQUFzQkwsSUFBdEIsRUFBNEI7RUFDM0MsTUFBSUYsUUFBUSxDQUFDRSxJQUFELENBQVosRUFBb0I7RUFDbEIsUUFBTU0sR0FBRyxHQUFHLElBQUlDLElBQUosRUFBWjtFQUNBRCxJQUFBQSxHQUFHLENBQUNFLE9BQUosQ0FBWSxDQUFaO0VBQ0FGLElBQUFBLEdBQUcsQ0FBQ0csUUFBSixDQUFhVCxJQUFJLENBQUNDLEtBQWxCLEVBQXlCRCxJQUFJLENBQUNFLE9BQTlCLEVBQXVDRixJQUFJLENBQUNHLE9BQTVDO0VBQ0EsV0FBT0csR0FBRyxDQUFDSSxrQkFBSixDQUF1QixJQUF2QixFQUE2QjtFQUNsQ0MsTUFBQUEsR0FBRyxFQUFFLFNBRDZCO0VBRWxDVixNQUFBQSxLQUFLLEVBQUUsU0FGMkI7RUFHbENDLE1BQUFBLE9BQU8sRUFBRSxTQUh5QjtFQUlsQ0MsTUFBQUEsT0FBTyxFQUFFO0VBSnlCLEtBQTdCLENBQVA7RUFNRCxHQVZELE1BVU87RUFDTCxXQUFPLHlCQUFQO0VBQ0Q7RUFDRixDQWREOztFQWVBLElBQU1TLFVBQVUsR0FBRztFQUNqQlQsRUFBQUEsT0FBTyxFQUFFLFNBQVNVLGNBQVQsQ0FBd0JiLElBQXhCLEVBQThCRyxPQUE5QixFQUF1QztFQUM5QyxRQUFJTCxRQUFRLENBQUNFLElBQUQsQ0FBWixFQUFvQjtFQUNsQixhQUFRQSxJQUFJLENBQUNHLE9BQUwsR0FBZSxDQUFDQSxPQUF4QjtFQUNELEtBRkQsTUFFTztFQUNMLGFBQU8seUJBQVA7RUFDRDtFQUNGLEdBUGdCO0VBUWpCRCxFQUFBQSxPQUFPLEVBQUUsU0FBU1ksY0FBVCxDQUF3QmQsSUFBeEIsRUFBOEJFLE9BQTlCLEVBQXVDO0VBQzlDLFFBQUlKLFFBQVEsQ0FBQ0UsSUFBRCxDQUFaLEVBQW9CO0VBQ2xCLGFBQVFBLElBQUksQ0FBQ0UsT0FBTCxHQUFlLENBQUNBLE9BQXhCO0VBQ0QsS0FGRCxNQUVPO0VBQ0wsYUFBTyx5QkFBUDtFQUNEO0VBQ0YsR0FkZ0I7RUFlakJELEVBQUFBLEtBQUssRUFBRSxTQUFTYyxZQUFULENBQXNCZixJQUF0QixFQUE0QkMsS0FBNUIsRUFBbUM7RUFDeEMsUUFBSUgsUUFBUSxDQUFDRSxJQUFELENBQVosRUFBb0I7RUFDbEIsYUFBUUEsSUFBSSxDQUFDQyxLQUFMLEdBQWEsQ0FBQ0EsS0FBdEI7RUFDRCxLQUZELE1BRU87RUFDTCxhQUFPLHlCQUFQO0VBQ0Q7RUFDRjtFQXJCZ0IsQ0FBbkI7RUF1QkFlLE9BQU8sQ0FBQ0MsR0FBUixDQUFZYixRQUFRLENBQUNKLElBQUQsQ0FBcEI7RUFDQWdCLE9BQU8sQ0FBQ0MsR0FBUixnQkFBb0JMLFVBQXBCLGFBQW9CQSxVQUFwQix1QkFBb0JBLFVBQVUsQ0FBRVQsT0FBWixDQUFvQkgsSUFBcEIsRUFBMEIsR0FBMUIsQ0FBcEI7RUFDQWdCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZYixRQUFRLENBQUNKLElBQUQsQ0FBcEI7RUFDQWdCLE9BQU8sQ0FBQ0MsR0FBUjtFQUNBRCxPQUFPLENBQUNDLEdBQVIsQ0FBWWIsUUFBUSxDQUFDSixJQUFELENBQXBCO0VBQ0FnQixPQUFPLENBQUNDLEdBQVIsZ0JBQW9CTCxVQUFwQixhQUFvQkEsVUFBcEIsdUJBQW9CQSxVQUFVLENBQUVWLE9BQVosQ0FBb0JGLElBQXBCLEVBQTBCLEVBQTFCLENBQXBCO0VBQ0FnQixPQUFPLENBQUNDLEdBQVIsQ0FBWWIsUUFBUSxDQUFDSixJQUFELENBQXBCO0VBQ0FnQixPQUFPLENBQUNDLEdBQVI7RUFDQUQsT0FBTyxDQUFDQyxHQUFSLENBQVliLFFBQVEsQ0FBQ0osSUFBRCxDQUFwQjtFQUNBZ0IsT0FBTyxDQUFDQyxHQUFSLGdCQUFvQkwsVUFBcEIsYUFBb0JBLFVBQXBCLHVCQUFvQkEsVUFBVSxDQUFFWCxLQUFaLENBQWtCRCxJQUFsQixFQUF3QixHQUF4QixDQUFwQjtFQUNBZ0IsT0FBTyxDQUFDQyxHQUFSLENBQVliLFFBQVEsQ0FBQ0osSUFBRCxDQUFwQjtFQUNBZ0IsT0FBTyxDQUFDQyxHQUFSOzs7OyJ9
