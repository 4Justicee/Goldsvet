app.controller('lotteryCtrl', ['$scope', '$rootScope',  function ($scope, $rootScope) {

    $scope.model = $rootScope.model;
    $scope.db = $rootScope.db;

    function addZeros(n) {
        return n <= 9 ? '0' + n : n;
    }

    var system = $scope.model.system;
    var data;
    system.debug = true;
    system.log('lotteryCtrl loaded');

    $scope.lotteryName = $scope.model.route.section;
    var oneHour = 1000 *60 *60;
    var oneDay = oneHour * 24;


    if ($scope.model.route.host === 'localhost') {
        $scope.lotteryName = 'lottery-elka2';
    }

    $scope.db.get.lottery.data($scope.lotteryName).then(
        function (answer) {
            data = answer;
            restructLotteryData();
        },
        function (answer) {
            system.log('reject: ' + answer);
        }
    );

    $scope.db.get.lottery.winners($scope.lotteryName).then(
        function (answer) {
            $scope.winners = answer;
            restructLotteryData();
        },
        function (answer) {
            system.log('reject: ' + answer);
            $scope.winners = false;
        }
    );


    var today = new Date();
    today.setHours( today.getHours() + 3, today.getMinutes() + today.getTimezoneOffset()  );
    var today = today.getFullYear()+'-'+addZeros( today.getMonth()+1 )+'-'+addZeros( today.getDate() );
    var today = new Date(today).getTime();

    $scope.now = new Date();
    $scope.lotteryItemCurrentKey = null;
    $scope.lotteryItemsPast = [];
    $scope.numberOfGifts = 0;
    $scope.tomorrow = tomorrow();

    function moscowOffset() {
        return ( new Date().getTimezoneOffset() + 180 )  * 60 * 1000;
    }

    function tomorrow() {
        return new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate() + 1) - moscowOffset();
    }

    $scope.$on('user_login', function () {
        restructLotteryData();
    });
    $scope.$on('user_logout', function () {
        restructLotteryData();
    });
    
    $scope.model.system.popup.close();

    $scope.openModal = function (key) {
        $scope.setTimePeriod($scope.lotteryData[key].period);
        $scope.lotteryItemCurrentKey = key;
        $scope.model.system.popup.open("winItemPopup");
    };

    $scope.setTimePeriod = function (time) {
        $scope.period = {};
        $scope.period[time] = true;
    };

    function timeConverter(timestamp) {
        var a = new Date(timestamp);
        var months = ['            ', '              ', '          ', '            ', '      ', '        ', '        ', '              ', '              ', '              ', '            ', '              '];
        var time = a.getDate() + ' ' + months[a.getMonth()];
        return time;
    }

    $scope.getTooltipUrl = function (today) {

        var tmpl = [
            '/tooltipUnReg.html',
            '/tooltip.html'
        ];

        var index = $scope.model.system.auth.status() ? 1 : 0;

        return today ? tmpl[index] : '';

    };

    function restructLotteryData() {

        var flag = true;

        $scope.lotteryData = data.map(function (item, key) {
            item.UNIXtime = new Date(item.date).getTime();
            console.log("item:",item.date, "today:", today);

            if (item.UNIXtime === today) {
                item.isToday = true;
                $scope.todayKey = key;
                item.period = "now";
                $scope.lotteryItemNow = item;
                if (flag) {
                    $scope.afterPreviosDateKey = key;
                    flag = false;
                }
            }

            if (item.UNIXtime > today) {
                if (flag) {
                    $scope.afterPreviosDateKey = key;
                    flag = false;
                }
                item.period = "future";
                $scope.numberOfGifts += item.numOfGifts;
            }

            if (item.UNIXtime < today) {
                item.period = "past";
                $scope.ifIsPast = true;
                if ($scope.winners) {
                    var winners = $scope.winners.filter(function (winnersItem) {
                        return winnersItem.date === item.date;
                    })[0];
                }
                if (winners)
                    item['winners'] = winners.winners;
            }

            return item;

        });

        var lastDay = $scope.lotteryData[$scope.lotteryData.length - 1].UNIXtime;
        var dayLeft = lastDay - today;


        $scope.ifFirstDay = $scope.lotteryData[1].UNIXtime <= today;
        $scope.dayLeft = dayLeft / oneDay;
        $scope.timeOfTicketSell = timeConverter($scope.lotteryData[$scope.afterPreviosDateKey - 1].UNIXtime);

    }

}]);
