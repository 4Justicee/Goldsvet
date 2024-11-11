!function(p) {
    "use strict";
    var t = function () { };
    t.prototype.send = function (t, i, o, e, n, a, s, r) {
        a || (a = 3e3),
            s || (s = 1);
        var c = {
            heading: t,
            text: i,
            position: o,
            loaderBg: e,
            icon: n,
            hideAfter: a,
            stack: s
        };
        r && (c.showHideTransition = r),
            console.log(c),
            p.toast().reset("all"),
            p.toast(c)
    }
        ,
        p.NotificationApp = new t,
        p.NotificationApp.Constructor = t
} (window.jQuery)