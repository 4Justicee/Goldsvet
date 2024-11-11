var app = angular.module('chudoApp', ['duScroll']);

app.config(['$locationProvider', '$sceProvider', '$httpProvider', function($locationProvider, $sceProvider, $httpProvider){

    //$httpProvider.defaults.withCredentials = true;

    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false,
         rewriteLinks: false
     });

    $sceProvider.enabled(false);
    //console.log('config');
}]);

app.run(    ['$rootScope', 'storage', 'popup','$location', '$q', '$http',
    function( $rootScope,  $storage,  $popup,  $location, $q, $http ) {

        var metaTags = document.getElementsByTagName('meta');

        function getTicketsSum() {
            for (var l = metaTags.length - 1; l >= 0; l--) {
                if ( metaTags[l].getAttribute('name') === 'tickets' )
                    return metaTags[l].getAttribute('content') || "0";
            }
            return "0";
        }

        function getUserLogin(){
            for (var l = metaTags.length - 1; l >= 0; l--) {
                if ( metaTags[l].getAttribute('name') === 'login' )
                    return metaTags[l].getAttribute('value');
            }
            return "";
        }

        function getUserStatus(){

            //return document.head.querySelector("[name=logged]").content === 'true';

            for (var l = metaTags.length - 1; l >= 0; l--) {
                if ( metaTags[l].getAttribute('name') === 'logged' ) {
                    return metaTags[l].getAttribute('content') === 'true';
                }
            }
            return false;

        }

        $rootScope.db = {
            get: {
                lottery: {
                    list: function(){
                        var def = $q.defer();
                        var params = {
                            params: {
                                type: 'lotteries'
                            }
                        };
                        $http.get( '/content/lott.json' ).then(
                            function( answer ){
                                def.resolve( answer.data );
                            },
                            function( answer ){
                                //TODO: errors
                            }
                        );
                        return def.promise;
                    },
                    item: function( alias ){

                    },
                    data: function( filename ){
                        var def = $q.defer();
                        $http.get( 'content/' + filename + '.json' ).then(
                            function( answer ){
                                if( answer.data.success ){
                                    def.resolve( answer.data.content );
                                }else{
                                    def.reject( answer.data.error );
                                }
                            },
                            function( answer ){
                                def.reject( '                                               ' );
                            }
                        );
                        return def.promise;
                    },
                    winners: function( filename ){
                        var def = $q.defer();
                        $http.get( '/engine/ajax/winners.php', { withCredentials: false} ).then(
                            function( answer ){
                                if( answer.data.success ){
                                    def.resolve( answer.data.content );
                                }else{
                                    def.reject( answer.data.error );
                                }
                            },
                            function( answer ){
                                def.reject( '                                                                    .' );
                            }
                        );
                        return def.promise;
                    }
                }
            }
        };

        $rootScope.model = {
            system: {
                user: {
                  profile: {
                      tickets: "0",
                      login: ""
                  }
                },
                popup: $popup,
                auth: {
                    stat: false,
                    status: function() {
                        return this.stat;
                    }
                },
                debug: false,
                log: function( message ){
                    if(this.debug){
                        console.debug('debug:', message );
                    }
                }
            },
            route: {
                scheme: $location.protocol(),
                host: $location.host(),
                path: $location.path(),
                section: ($location.path().split('/'))[1],
                page: ($location.path().split('/'))[2],
                module: ($location.path().split('/'))[3],
                params: ($location.path().split('/'))[4]
            }
        };

        $rootScope.model.system.user.profile.tickets = getTicketsSum();
        $rootScope.model.system.user.profile.login = getUserLogin();
        $rootScope.model.system.auth.stat = getUserStatus();
    }]);

app.factory("storage", ['$window', '$rootScope', function($window, $rootScope) {
    storage = {
        write: function( param, val ){
            $window.localStorage && $window.localStorage.setItem( param, val );
            return this;
        },
        read: function( param ){
            return $window.localStorage && $window.localStorage.getItem( param );
        },
        writeObj: function( param, val ){
            $window.localStorage && $window.localStorage.setItem( param, JSON.stringify( val ) );
            return this;
        },
        readObj: function( param ){
            return JSON.parse( $window.localStorage && $window.localStorage.getItem( param ) );
        }
    };

    return storage;
}]);


app.factory('popup', [ 'storage', function ( $storage ) {

    return {
        message: {
            title:'Title',
            body:'body',
            button: false
        },
        collection: [],

        say: function( title, message, button ){
            this.message.title = title;
            this.message.body = message;
            this.message.button = button;
            this.open( 'simple' );
        },

        state_save: function () {
            $storage.write('popup.collection', this.collection.slice(0,10));
        },
        state_restore: function () {
            return $storage.read('popup.collection');
        },
        open: function (name) {
            this.collection.unshift(name);
            this.state_save();
        },
        close: function () {
            this.collection.unshift('');
            this.state_save();
        },
        status: function (name) {
            ls = this.state_restore();
            this.collection = (ls) ? ls.split(',') : [];
            return (name) ? name===this.collection[0] : !!this.collection[0];
        },
        back: function () {
            this.collection.shift();
            this.state_save();
        }
    };

}]);
app.filter('countdown', function(){
    return function( unixTime,settings ){

        var t = new Date( unixTime );

        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;
        days = days < 10 ? '0' + days : days;

        seconds = seconds < 0 ? '00' : seconds;
        minutes = minutes < 0 ? '00' : minutes;
        hours = hours < 0 ? '00' : hours;
        days = days < 0 ? '00' : days;


        switch (settings) {
            case 1 : {
                return { days: days, hours: hours, minutes: minutes, seconds: seconds };
            }
            default : {
                return days + ' ' + hours + ':' + minutes + ':' + seconds;
            }
        }

    };
});
app.component('lotteryMap', {
    template: '' +
    '<img class="map_bg" src="/engine/templates/chudoslot/img/lottery-20/map.jpg">' +
    '<lottery-map-item data="lotteryMapItem" class="map_item map_item_{{lotteryMapItem.id}} lottery-map__item_position" ng-repeat="lotteryMapItem in $ctrl.data"></lottery-map-item>' ,
    controller: function () {
        this.pushCurrentObjectKey = function (key) {
            this.currentKey = key;
            this.model.system.popup.open('winItemPopup');
        }
    },
    bindings: {
        data: '<',
        currentKey: '=',
        model: '<'
    }
});

app.component('lotteryMapItem', {
    template:
    '<div ng-click="$ctrl.parent.pushCurrentObjectKey($ctrl.data.key)" class="lottery-map__item-block lottery-map__item-block_{{$ctrl.data.timeClass}}">' +
        '<img class="lottery-map__item-img" ng-src="/engine/templates/chudoslot/img/lottery-20/{{$ctrl.data.id}}-ball-{{$ctrl.data.timeClass}}.png" >' +
    '</div>' +
    '<div ng-if="$ctrl.data.template" class="lottery-map__item-tooltip map_item_popup map_item_popup_{{$ctrl.data.id}}" ng-hide="hide">' +
        '<div class="map_item_popup__block">' +
            '<span ng-click="hide = true" class="popup_register__close-icon"></span> ' +
        '<div>' +
            '<h5 ng-show="$ctrl.data.template.status">                                                       !</h5>' +
            '<h5 ng-show="!$ctrl.data.template.status">                                                           </h5>' +
            '<p ng-show="$ctrl.data.template.status" class="layout_content__highlight-txt">                          {{model.system.user.profile.tickets}}                                                        !                                                                                </p> ' +
            '<p ng-show="!$ctrl.data.template.status" class="layout_content__highlight-txt">                              ,              10                                                                                                    </p> ' +
            '<button ng-click="$ctrl.parent.pushCurrentObjectKey($ctrl.data.key)" ng-show="$ctrl.data.template.status" class="lottery__button button">                         </button>' +
            '<button href="#registration-modal"  ng-show="!$ctrl.data.template.status" class="fancybox-registration lottery__reg-button button">                                      </button>' +
        '</div>' +
        '</div>'+
    '</div>',
    require: {
        parent: '^lotteryMap'
    },
    controller: ['$rootScope',function($rootScope) {
        this.model = $rootScope.model;
    }],
    bindings: {
        data: '<'
    }
});

app.component('timer', {
    templateUrl: '/timer.html',
    controller: ['$filter', '$interval', function( $filter, $interval ) {

        var self = this;
        self.time = self.to - self.from;

        self.timer = $filter('countdown')( update(0), 1);
        var timeId = $interval(function () {
            self.timer = $filter('countdown')( update(1000), 1);
        }, 1000);

        function update(interval) {
            self.time -= interval;
            return self.time;
        }

    }],
    bindings: {
        from: '<',
        to: '<'
    }
});