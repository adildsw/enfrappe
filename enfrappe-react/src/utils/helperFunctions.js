export const modifyKeyInDict = (dict, key, value) => {
    for (const k in dict) {
        if (k === key)
            dict[k] = value;
        else if (typeof dict[k] === 'object')
            modifyKeyInDict(dict[k], key, value);
    }
}

const dictLookup = (dict, key) => {
    for (var k in dict) {
        var value = dict[k];
        if (key == k) {
            return [k, value];
        }
        if (typeof (value) === "object" && !Array.isArray(value)) {
            var y = dictLookup(value, key);
            if (y && y[0] == key) return y;
        }
        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; ++i) {
                var x = dictLookup(value[i], key);
                if (x && x[0] == key) return x;
            }
        }
    }
    return null;
}

export const getValueFromDict = (dict, key) => {
    var x = dictLookup(dict, key);
    if (x) return x[1];
    return null;
}
  