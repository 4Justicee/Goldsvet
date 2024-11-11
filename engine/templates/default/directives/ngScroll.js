

    app.directive("ngScroll", function ($window) {
    return {
        link: function(scope, element, attrs) {
            scope.scrolled = {};

            var res = {
                check: function( cond ){
                    var name = attrs.name;
                    if(name) {
                        scope.scrolled[name] = cond ? true : false;
                    }else{
                        console.error('name is empty');
                    }
                }
            };

            angular.element($window).bind("scroll", function() {

                if( attrs.ngScroll && !isNaN(attrs.ngScroll) ) {  //is Number
                    res.check( this.pageYOffset >= attrs.ngScroll );

                }else{
                    var elemTop      = element[0].getBoundingClientRect().top
                       ,elemHeight   = element[0].offsetHeight
                       ,windowHeight = this.innerHeight;

                    switch( attrs.ngScroll ){
                        case 'top':
                            res.check( elemTop <= 10 );
                            break;
                        case 'btm':
                            res.check( (elemTop+elemHeight) <= windowHeight );
                            break;
                        default:
                            res.check( this.pageYOffset >= 140 );
                            break;
                    }
                }
                scope.$apply();
            });
        }
    }

});