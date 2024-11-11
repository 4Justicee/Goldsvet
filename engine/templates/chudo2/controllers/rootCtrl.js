
app.controller('lotterynyController', ['$scope', '$filter', '$interval', '$rootScope', '$http',
    function ($scope, $filter, $interval, $rootScope, $http) {

        $scope.winners = [];

        $scope.popup = {

            flag: false,

            open: function () {
                this.flag = true;
            },

            close: function () {
                this.flag = false;
            },

            status: function () {
                return this.flag;
            }

        };
        $scope.popup_info = {

            flag: false,

            open: function () {
                this.flag = true;
            },

            close: function () {
                this.flag = false;
            },

            status: function () {
                return this.flag;
            }

        };

        if (( new Date() ).getMonth() != 11) {
            $scope.today = 0;
            $scope.firstSlide = 0;
        } else {
            $scope.today = ( new Date ).getDate();
            $scope.firstSlide = $scope.today - 1;
        }

        // if( $scope.model.route.host == 'localhost' ) {
        //     $scope.today = 23;
        // }

        $scope.setTimer = function () {
            var timer = ( new Date(( new Date() ).getFullYear(), ( new Date() ).getMonth(), ( new Date() ).getDate() + 1) ) - Date.now();
            timer = timer - ( ( new Date ).getTimezoneOffset() + 180 ) * 60 * 1000;
            return ( ( $filter('countdown')(timer) ).split(' ') )[1];
        };

        //console.log($scope.today);

        //$scope.today = 25;

        $scope.timer = $scope.setTimer();
        $scope.time = $interval(function () {
            $scope.timer = $scope.setTimer();
        }, 1000);

        $scope.rewards = [
            {
                id: 16,
                day: '16',
                date: '16               ',
                img: '/engine/templates/chudoslot/img/lottery/win_item_1.jpg',
                imgUnknown: '/engine/templates/chudoslot/img/lottery/undefined.jpg',
                bonusImg: '/engine/templates/chudoslot/img/lottery/bonus_1.png',
                name: '                         ,                                                      ',
                title: '                                                                 ',
                description: '                                                                                                                   ,                                       122 504           ',
                bonusName: '                                 '
            },
            {
                id: 19,
                day: '19',
                date: '19               ',
                img: '/engine/templates/chudoslot/img/lottery/win_item_2.jpg',
                imgUnknown: '/engine/templates/chudoslot/img/lottery/undefined.jpg',
                bonusImg: '/engine/templates/chudoslot/img/lottery/bonus_2.png',
                name: '          , Rosa Grand Milano - Starhotels Collezione',
                title: '                                                                                     ',
                description: '                                                   Rosa Grand Milano, Starhotels Collezione.                                     213 648             ',
                bonusName: '                                        '
            },
            {
                id: 22,
                day: '22',
                date: '22               ',
                img: '/engine/templates/chudoslot/img/lottery/win_item_3.jpg',
                imgUnknown: '/engine/templates/chudoslot/img/lottery/undefined.jpg',
                bonusImg: '/engine/templates/chudoslot/img/lottery/bonus_3.png',
                name: '          , Molitor Paris - MGallery by Sofitel',
                title: '                                                                                     ',
                description: '                                        Molitor Paris, MGallery by Sofitel                  .                                     360 218             ',
                bonusName: '                                                       '
            },
            {
                id: 25,
                day: '25',
                date: '25               ',
                img: '/engine/templates/chudoslot/img/lottery/win_item_4.jpg',
                imgUnknown: '/engine/templates/chudoslot/img/lottery/undefined.jpg',
                bonusImg: '/engine/templates/chudoslot/img/lottery/bonus_4.png',
                name: '      -        , The Peninsula New York',
                title: '                        -                                                                  ',
                description: '                                        The Peninsula New York,                                     668 034           ',
                bonusName: '                                               '
            },
            {
                id: 28,
                day: '28',
                date: '28               ',
                img: '/engine/templates/chudoslot/img/lottery/win_item_5.jpg',
                imgUnknown: '/engine/templates/chudoslot/img/lottery/undefined.jpg',
                bonusImg: '/engine/templates/chudoslot/img/lottery/bonus_5.png',
                name: '            , Malliott Kudrinskaya Skyscraper',
                title: '                                                                     ',
                description: '                                                                   Malliott Kudrinskaya Skyscraper,                                     248 927             ',
                bonusName: '                                            '
            },
            {
                id: 31,
                day: '31',
                date: '31               ',
                img: '/engine/templates/chudoslot/img/lottery/win_item_6.jpg',
                imgUnknown: '/engine/templates/chudoslot/img/lottery/undefined.jpg',
                bonusImg: '/engine/templates/chudoslot/img/lottery/bonus_6.png',
                name: '          -                  ,                    ',
                title: '                                            -                                                            ',
                description: '                                                                      -            .                                     159 200             ',
                bonusName: '            ,         !'
            }
        ];

        $scope.todayItem = $scope.rewards.filter(function (item) {
            return item.id == $scope.today;
        })[0];

        $scope.dayFilter = function (item) {
            return item.id < $scope.today;
        };

        $scope.setCurObj = function (item, func) {
            func.open('winItemPopup');
            $scope.curObj = item;
        };

        $http.get('/engine/ajax/winners.php').then(
            function (answer) {
                $scope.winners = answer.data;
            },
            function (answer) {
            }
        );
    }]);