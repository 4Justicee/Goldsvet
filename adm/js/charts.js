$(document).ready(function(){
    
    if($("#morris-line-example").length > 0){
        Morris.Line({
          element: 'morris-line-example',
          data: [
            { y: '2006', a: 100, b: 90 },
            { y: '2007', a: 75,  b: 65 },
            { y: '2008', a: 50,  b: 40 },
            { y: '2009', a: 75,  b: 65 },
            { y: '2010', a: 50,  b: 40 },
            { y: '2011', a: 75,  b: 65 },
            { y: '2012', a: 100, b: 90 }
          ],
          xkey: 'y',
          ykeys: ['a', 'b'],
          labels: ['Series A', 'Series B'],
          resize: true,
          lineColors: ['#436182', '#5bb75b']
        });


        Morris.Area({
            element: 'morris-area-example',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            resize: true,
            lineColors: ['#436182', '#5bb75b']
        });


        Morris.Bar({
            element: 'morris-bar-example',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            barColors: ['#436182', '#5bb75b']
        });


        Morris.Donut({
            element: 'morris-donut-example',
            data: [
                {label: "Download Sales", value: 12},
                {label: "In-Store Sales", value: 30},
                {label: "Mail-Order Sales", value: 20}
            ],
            colors: ['#436182', '#5bb75b', '#da4f49']
        });    
    }
    
    if($("#chart-dashboard").length > 0){
        var vNew = [], vRet = [], vTotal = [];

        vNew = [[0, 2385],[1,2127],[2,1432]];
        vRet = [[0,1553],[1,1301],[2,819]];
        vTotal = [[0,3938],[1,3428],[2,2251]];

        window.cd = Morris.Line({
          element: 'chart-dashboard',
          data: [            
            { y: '2014-06', a: 1432, b: 442, c: 1874 },
            { y: '2014-07', a: 1121, b: 680, c: 1801 },
            { y: '2014-08', a: 738, b: 435, c: 1173 },            
            { y: '2014-09', a: 1432, b: 819, c: 2251 },
            { y: '2014-10', a: 2385, b: 1553, c: 3938 },
            { y: '2014-11', a: 2127, b: 1301, c: 3428 }
          ],
          xkey: 'y',
          ykeys: ['a', 'b', 'c'],
          labels: ['New', 'Returned', 'Total'],
          resize: true,
          lineColors: ['#436182','#da4f49','#faa732']
        });
        $(".c_layout,.c_screen").on("click",function(){
            window.cd.redraw();
        });
    }    
    
    if($("#chart_activity").length > 0){
        
        var stuff = [], contacts = [];

        for (var i = 0; i < 7; i += 1) {
            stuff.push([i, parseInt(Math.random() * 30)]);
            contacts.push([i, parseInt(Math.random() * 30)]);
        }

        $.plot($("#chart_activity"), [ { data: stuff, label: "stuff"}, { data: contacts, label: "contacts"}], {xaxis: {show: true}, yaxis: { show: true}});
        
    }
    
    if($(".visitsChart-2").length > 0){

        var d1 = [];
        
        for (var i = 1; i <= 30; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);

        $.plot($(".visitsChart-2"), [ { data: d1 }], {xaxis: {show: true}, yaxis: { show: true}});
    
    }      
    
    
    if($("#chart-1").length > 0){

        /* CHART - 1*/

        var sin1 = [], sin2 = [], cos1 = [], cos2 = [];

        for (var i = 0; i < 14; i += 0.3) {
            sin1.push([i, Math.sin(i)]);
            sin2.push([i, Math.sin(i-1.57)]);
            cos1.push([i, Math.cos(i)]);
            cos2.push([i, Math.cos(i+1.57)]);
        }

        $.plot($("#chart-1"), [ { data: sin1, label: "sin(x)"}, { data: sin2, label: "sin(y)"} , { data: cos1, label: "cos(x)"}, { data: cos2, label: "cos(y)"} ], {
                series: {lines: { show: true }, points: { show: true }},
                grid: { hoverable: true, clickable: true },
                yaxis: { min: -1.1, max: 1.1 }
                });

        /* eof CHART - 1*/
    
    }    

    if($("#chart-2").length > 0){
        

        var d1 = [];
        for (var i = 0; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);

        var d2 = [];
        for (var i = 0; i <= 10; i += 1)
            d2.push([i, parseInt(Math.random() * 30)]);

        var d3 = [];
        for (var i = 0; i <= 10; i += 1)
            d3.push([i, parseInt(Math.random() * 30)]);

        var stack = 0, bars = true, lines = false, steps = false;


        $.plot($("#chart-2"), [ { data: d1, label: "data 1" }, { data: d2, label: "data 2" }, { data: d3, label: "data 3" } ], {
            series: {
                stack: stack,
                lines: { show: lines, fill: true, steps: steps },
                bars: { show: bars, barWidth: 0.6 }
            }
        });
        
        
    }

    if($("#chart-3").length > 0){
        
        var data = [];
        	        
	for( var i = 0; i < 5; i++)	
		data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random()*100)+1 };
	

        $.plot($("#chart-3"), data, 
	{
            series: {
                pie: { show: true }
            },
            legend: { show: false }
	});

    }

    if($("#chart-4").length > 0){
        
        var data = [], totalPoints = 300;
        
        var updateInterval = 30;

        

        var plot = $.plot($("#chart-4"), [ getRandomData() ], {
            series: { shadowSize: 0 }, 
            yaxis: { min: 0, max: 100 },
            xaxis: { show: false }
        });

        update();
            
    }


    if($("#chart-widget").length > 0){
        var val1 = [], val2 = [], val3 = [];

        for (var i=0; i < 7; i++) {
            val1.push([i, Math.random() * i]);
            val2.push([i, Math.random() * i]);
            val3.push([i, Math.random() * i]);
        }

        $.plot($("#chart-widget"), [ { data: val1, label: "purchases"}, { data: val2, label: "visits"}, { data: val3, label: "returns"} ], {
                series: {lines: { show: true }, points: { show: true }},
                grid: { hoverable: true, clickable: true },
                legend: {show: false},
                xaxis: {show: null}, 
                yaxis: {show: null}                
        });
    }
    if($("#chart-widget2").length > 0){       
        
        var data = [];        	               		
	data[0] = { label: "", data: 14 };
        data[1] = { label: "", data: 24 };
        data[2] = { label: "", data: 32 };
        data[3] = { label: "", data: 30 };

        $.plot($("#chart-widget2"), data, 
	{
            series: {
                pie: { show: true }
            },
            legend: { show: true }
	});

    }


    function update() {
        plot.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();

        setTimeout(update, updateInterval);
    }

    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }

    function showTooltip(x, y, contents) {
        $('<div class="ct">' + contents + '</div>').css({
            position: 'absolute',
            'z-index': '10',
            display: 'none',
            top: y,
            left: x + 10,
            border: '2px solid #000',
            padding: '2px',
            'background-color': '#111',
            'border-radius': '3px',
            color: '#FFF'            
        }).appendTo("body").fadeIn(200);
    }    

    var previousPoint = null;
    
    $("#chart-1, #chart-widget").bind("plothover", function (event, pos, item) {
        
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $(".ct").remove();
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY,
                            item.series.label + " of " + x + " = " + y);
            }
        }else {
            $(".ct").remove();
            previousPoint = null;            
        }

    });
   
   
   
});
