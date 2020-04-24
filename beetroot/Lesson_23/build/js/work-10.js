!(function (t) {
  "function" == typeof define && define.amd ? define("work10", t) : t();
})(function () {
  "use strict";
  var t = prompt("Enter a day"),
    e = prompt("Enter a month"),
    r = prompt("Enter a year"),
    n = new Date(Number(r), Number(e - 1), Number(t) + 1);
  alert(
    n.toLocaleString("ru", { day: "2-digit", month: "short", year: "2-digit" })
  );
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay0xMC5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3dvcmstMTAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbmNvbnN0IGlucHV0RGF5ID0gcHJvbXB0KFwiRW50ZXIgYSBkYXlcIik7XHJcbmNvbnN0IGlucHV0TW9udGggPSBwcm9tcHQoXCJFbnRlciBhIG1vbnRoXCIpO1xyXG5jb25zdCBpbnB1dFllYXIgPSBwcm9tcHQoXCJFbnRlciBhIHllYXJcIik7XHJcbmNvbnN0IGRhdGUgPSBuZXcgRGF0ZShcclxuICBOdW1iZXIoaW5wdXRZZWFyKSxcclxuICBOdW1iZXIoaW5wdXRNb250aCAtIDEpLFxyXG4gIE51bWJlcihpbnB1dERheSkgKyAxXHJcbik7XHJcbmFsZXJ0KFxyXG4gIGRhdGUudG9Mb2NhbGVTdHJpbmcoXCJydVwiLCB7XHJcbiAgICBkYXk6IFwiMi1kaWdpdFwiLFxyXG4gICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgIHllYXI6IFwiMi1kaWdpdFwiLFxyXG4gIH0pXHJcbik7XHJcbiJdLCJuYW1lcyI6WyJpbnB1dERheSIsInByb21wdCIsImlucHV0TW9udGgiLCJpbnB1dFllYXIiLCJkYXRlIiwiRGF0ZSIsIk51bWJlciIsImFsZXJ0IiwidG9Mb2NhbGVTdHJpbmciLCJkYXkiLCJtb250aCIsInllYXIiXSwibWFwcGluZ3MiOiJvR0FDQSxJQUFNQSxFQUFXQyxPQUFPLGVBQ2xCQyxFQUFhRCxPQUFPLGlCQUNwQkUsRUFBWUYsT0FBTyxnQkFDbkJHLEVBQU8sSUFBSUMsS0FDZkMsT0FBT0gsR0FDUEcsT0FBT0osRUFBYSxHQUNwQkksT0FBT04sR0FBWSxHQUVyQk8sTUFDRUgsRUFBS0ksZUFBZSxLQUFNLENBQ3hCQyxJQUFLLFVBQ0xDLE1BQU8sUUFDUEMsS0FBTSJ9
