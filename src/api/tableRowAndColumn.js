// 判断obj是属于什么类型
function getType(obj) {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    if(obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}

// 深度克隆
function deepClone(data){
    var type = getType(data);
    var obj;
    if(type === 'array'){
        obj = [];
    } else if(type === 'object'){
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if(type === 'array'){
        for(var i = 0, len = data.length; i < len; i++){
            obj.push(deepClone(data[i]));
        }
    } else if(type === 'object'){
        for(var key in data){
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}

// 把含有数组的对象拆成一个个对象
export const getNewDataAndMap = (propName, data) => {
    // propName是要取出的item是的名称，data是包含所有总单的数组
    var newData = [];
    var map = {};
    var rowIndex = 0;
    let bool = true;
    for(var i = 0;i < data.length;i++){
        // console.log(data[i]);
        var items = data[i][propName];
        if(items == null){
            continue;
        }else {
            let bool = false;
            var size = items.length;
            for(var j = 0;j < items.length;j++){
                var newDataElement = deepClone(data[i]);
                for(var prop in items[j]){
                    newDataElement[propName + "_" + prop] = items[j][prop];
                }
                newDataElement.items = null;
                newData.push(newDataElement);
            }
            map[rowIndex] = size;
            rowIndex = rowIndex + size;
        }
    }

    var rs = {
        data: newData,
        map: map
    };
    return rs;
}