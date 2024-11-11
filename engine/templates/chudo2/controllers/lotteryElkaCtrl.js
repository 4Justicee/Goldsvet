app.controller('lotteryElkaCtrl',
    ['$scope', '$rootScope', '$http', '$filter', '$interval', function( $scope, $rootScope, $http, $filter, $interval ) {

        $scope.model = $rootScope.model;

        var data;
        $http.get( '/content/lotteryData.json' ) //../src/content/lotteryData.json
            .then(
                function( answer ){
                    data = answer.data;
                    $http.get('/engine/ajax/winners.php')
                        .then(
                            function( answer ){
                                $scope.winners = answer.data.content;
                                restructLotteryData();
                            },
                            function( answer ){
                                answer.data = JSON.parse('{"success": true, "content": [' +
                                    '{"id": 1, "winners": "02 R***UDIK, J***ANOVA, E***NA.KOVALEV78", "date": "2017-01-02"},' +
                                    '{"id": 1, "winners": "05 R***UDIK, J***ANOVA, E***NA.KOVALEV78", "date": "2017-01-05"},' +
                                    '{"id": 1, "winners": "08 R***UDIK, J***ANOVA, E***NA.KOVALEV78", "date": "2017-01-08"},' +
                                    '{"id": 1, "winners": "11 R***UDIK, J***ANOVA, E***NA.KOVALEV78", "date": "2017-01-11"},' +
                                    '{"id": 1, "winners": "14 R***UDIK, J***ANOVA, E***NA.KOVALEV78", "date": "2017-01-14"},' +
                                    '{"id": 1, "winners": "17 R***UDIK, J***ANOVA, E***NA.KOVALEV78", "date": "2017-01-17"}' +
                                    '], "message": "Ok"}');
                                $scope.winners = answer.data.content;
                                restructLotteryData();
                            }
                        );
                },
                function( answer ){

                }
            );

        var todayString = new Date().toJSON().split('T')[0];
        var today =  new Date( todayString ).getTime();
        //console.log(today);
        //today = new Date('2017-01-08').getTime();



        $scope.lotteryItemCurrentKey = false;

        $scope.lotteryItemsPast = [];

        $scope.test = function() {
            console.log($scope.lotteryItemCurrentKey);
            console.log($scope.lotteryItemsPast);

        };

        $scope.setTimer = function(){
            var timer = ( new Date( ( new Date() ).getFullYear(), ( new Date() ).getMonth(), ( new Date() ).getDate()+1) ) - Date.now();
            timer = timer - ( ( new Date ).getTimezoneOffset() + 180 )  * 60 * 1000;
            return ( ( $filter( 'countdown' )( timer ) ).split(' ') )[1];
        };

        $scope.timer = $scope.setTimer();
        $scope.time = $interval( function(){
            $scope.timer = $scope.setTimer();
        }, 1000 );

        $scope.$watch('lotteryItemCurrentKey', function() {
            if (typeof $scope.lotteryItemCurrentKey === "number")
                restructModal();
        });

        $scope.$on('user_login', function () {
            restructLotteryData();
            restructModal();
        });

        $scope.$on('user_logout', function () {
            restructLotteryData();
            restructModal();
        });

        $scope.setTimePeriod = function (time) {
            switch (time) {
                case('past'):
                    $scope.ifPast = true;
                    $scope.ifNow = false;
                    $scope.ifFuture = false;
                    break;

                case('now'):
                    $scope.ifPast = false;
                    $scope.ifNow = true;
                    $scope.ifFuture = false;
                    break;

                case('future'):
                    $scope.ifPast = false;
                    $scope.ifNow = false;
                    $scope.ifFuture = true;
                    break;

            }
        };

        function restructModal() {
            switch ($scope.lotteryData[$scope.lotteryItemCurrentKey].timeClass) {

                case('past'):
                    $scope.openedGiftDisc = data.modalModel.openedGiftDiscPast
                        .replace('{%day%}', $scope.lotteryData[$scope.lotteryItemCurrentKey].day);
                    $scope.lotteryGiftImage = $scope.lotteryData[$scope.lotteryItemCurrentKey].img;
                    $scope.giftName =  $scope.lotteryData[$scope.lotteryItemCurrentKey].name;
                    $scope.setTimePeriod('past');
                    break;

                case('now'):
                    $scope.openedGiftDisc = data.modalModel.openedGiftDiscNow;
                    $scope.lotteryGiftImage = $scope.model.system.auth.status() ? $scope.lotteryData[$scope.lotteryItemCurrentKey].img : $scope.lotteryData[$scope.lotteryItemCurrentKey].imgUnknown;
                    $scope.giftName = $scope.lotteryData[$scope.lotteryItemCurrentKey].name;
                    $scope.setTimePeriod('now');
                    break;

                case('future'):
                    $scope.openedGiftDisc = data.modalModel.openedGiftDiscFuture
                        .replace('{%day%}', $scope.lotteryData[$scope.lotteryItemCurrentKey].day);
                    $scope.lotteryGiftImage = $scope.lotteryData[$scope.lotteryItemCurrentKey].imgUnknown;
                    $scope.giftName = data.modalModel.giftNameNow;
                    $scope.giftNameFuture = data.modalModel.giftNameFuture;
                    $scope.setTimePeriod('future');
                    break;

            }
        }

        function timeConverter(timestamp){
            var a = new Date(timestamp);
            var months = ['            ','              ','          ','            ','      ','        ','        ','              ','              ','              ','            ','              '];
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = date + ' ' + month;
            return time;
        }

        function getPreviousLotteryDay() {
            var i = $scope.lotteryData.length - 1;
            for (; i >= 0; i--) {
                if (new Date($scope.lotteryData[i].date).getTime() < today )
                    return new Date($scope.lotteryData[i].date).getTime();
            }
        }

        function restructLotteryData() {
            var isAuth = $scope.model.system.auth.status();

            $scope.lotteryData = data.lotteryMapItems.sort(function(prev, next) {
                if (new Date(prev.date).getTime() > new Date(next.date).getTime()) {
                    return 1;
                }
                if (new Date(prev.date).getTime() < new Date(next.date).getTime()) {
                    return -1;
                }
            }).map(function(item,key) {

                var itemDate = new Date(item.date).getTime();
                item['key'] = key;
                if (itemDate === today) {
                    item['timeClass'] = "now";
                    item['template'] = isAuth ? {status: true} : {status: false};
                    $scope.lotteryItemNow = item;
                }
                if (itemDate > today) {
                    item['timeClass'] = "future";
                }
                if (itemDate < today) {
                    item['timeClass'] = "past";
                    $scope.lotteryItemsPast[$scope.lotteryItemsPast.length] = item;
                    var winners = $scope.winners.filter(function(winnersItem) {
                        return winnersItem.date === item.date;
                    })[0];
                    if(winners)
                        item['winners'] = winners.winners;
                }

                return item;

            });


            var lastDay = new Date($scope.lotteryData[$scope.lotteryData.length-1].date).getTime();
            var dayLeft = lastDay - today;

            $scope.ifFirstDay = new Date($scope.lotteryData[0].date).getTime() === today;
            $scope.dayLeft = dayLeft / (1000 * 60 * 60 * 24);
            $scope.numberOfGifts = $scope.dayLeft * 3;
            $scope.timeOfTicketSell = timeConverter( getPreviousLotteryDay() );
        }


}]);
