exports.max = function (num1, num2) {
    return num1 > num2 ? num1 : num2;
}

exports.min = function (num1, num2) {
    return num1 < num2 ? num1 : num2;
}

exports.maxInArr = function (arr) {
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
            maxIndex = i;
        }
    }
    var res = {
        value: max,
        index: maxIndex
    }
    return res;
}

exports.minInArr = function (arr) {
    var min = arr[0];
    var minIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
            minIndex = i;
        }
    }
    var res = {
        value: min,
        index: minIndex
    }
    return res;
}

//             (min      , max            )
exports.random = function (min, max) {
    var result = min + Math.floor(Math.random() * (max - min));
    return result;
}



exports.randomMoney = function (totalBet, max) {
    var div = Math.floor(max / totalBet);
    var mul = this.random(0, div);
    return totalBet * mul;
}

//       
exports.probability = function (prob) {
    var n = Math.floor(Math.random() * 100); //0 - 99       
    if (n < prob)
        return true;
    else
        return false;
}

//                 
exports.shuffle = function (arr) {
    if (arr.length <= 0) {
        return arr;
    }

    let a = 0;
    let b = 0;
    let tmp;
    for (var i = 0; i < arr.length; i++) {
        a = this.random(0, arr.length);
        b = this.random(0, arr.length);

        tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    return arr;
};

//                    
exports.view2String = function (view) {
    return view.join();
}

//                                       
exports.symbolsFromLine = function (view, payLine) {
    var result = [];

    for (let i = 0; i < payLine.length; i++) {
        var index = payLine[i];
        result[i] = view[index];
    }

    return result;
}

//                   
exports.symbolCountFromView = function (view, symbol) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == symbol)
            result++;
    }
    return result;
}

//              
exports.clone = function (arr) {
    var cloned = [];
    arr.forEach(
        function (item) {
            cloned.push(item);
        }
    );

    return cloned;
};

//                                            
exports.remove = function (arr, removeIndex) {
    var removed = [];
    for (var i = 0; i < arr.length; i++) {
        if (i == removeIndex)
            continue;
        removed.push(arr[i]);
    }
    return removed;
};


//                                               
exports.count = function (arr, element) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            count++;
        }
    }
    return count;
};

/**
 * @author Rich
 * randomPositionArray -                 
 * @param {*} w - width
 * @param {*} h - height
 * @param {*} c - count
 */
exports.randomPositionArray = function (w, h, c) {
    let result = [];
    for (let i = 0; i < w * h; i++) {
        result.push(i);
    }
    result = this.shuffle(result);
    return result.slice(0, c);
}

/**
 * @author JackSon
 * sameArray -                               
 */
exports.sameArray = function (len, value) {
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(value);
    }
    return result;
}
/**
 * @author JackSon
 * positionsFromView -                                                                
 */
exports.positionsFromView = function (view, func = Function(item)) {
    var res = [];

    for (var i = 0; i < view.length; ++i) {
        if (func(view[i])) {
            res.push(i);
        }
    }

    return res;
}


exports.getMaskView = function (view, max, func = Function(item)) {
    var res = [...view];

    for (var i = 0; i < view.length; ++i) {
        if (func(view[i])) {
            res[i] = this.random(3, max);
        }
    }

    return res;
}

exports.Result4Client = function (obj) {
    var str = "";
    for (let index in obj) {
        str += index + "=" + obj[index] + "&";
    }
    return str;
}
//=================================================================================
//       


exports.MIN_FACTOR = 0.8;
exports.MAX_FACTOR = 1.2;