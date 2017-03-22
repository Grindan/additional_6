function multiply(first, second) {
    first = first.split("").reverse();
    second = second.split("").reverse();
    var result = [];

    for (var i = 0; i < first.length; i++) {
        for (var j = 0; j < second.length; j++) {
            if (!result[i + j])
                result[i + j] = 0;
            result[i + j] += +first[i] * +second[j];
        }
    }

    for (var i = 0; i < result.length; i++) {
        if (result[i] > 9) {
            if (!result[i + 1])
                result[i + 1] = 0;
            result[i + 1] += ~~(result[i] / 10);
            result[i] = result[i] % 10;
        }
    }
    return result.reverse().join("");
}

function getFactorial(number) {
    if (number == 0) return "1";
    var result = "1";
    for (var i = 1; i <= number; i++) {
        result = multiply(result, i + "");
    }
    return result;
}

function getDoubleFactorial(number) {
    if (number == 0) return "1";
    var result = "1";
    for (var i = number; i > 0; i -= 2) {
        result = multiply(result, i + "");
    }
    return result;
}

module.exports = function zeros(expression) {
    var multipliers = expression.split("*");
    var doubleFactorial = [];
    var factorial = [];
    var i;

    for (i = 0; i < multipliers.length; i++) {
        var item = multipliers[i];
        if (item[item.length - 2] == "!") {
            doubleFactorial[doubleFactorial.length] = item.slice(0, -2);
        } else {
            factorial[factorial.length] = item.slice(0, -1);
        }
    }

    factorial = factorial.map(getFactorial);
    doubleFactorial = doubleFactorial.map(getDoubleFactorial);

    var result = "1";
    for (i = 0; i < factorial.length; i++) {
        result = multiply(result, factorial[i]);
    }
    for (i = 0; i < doubleFactorial.length; i++) {
        result = multiply(result, doubleFactorial[i]);
    }

    var zerosCount = 0;
    for (i = result.length - 1; i >= 0; i--) {
        if (result[i] == "0")
            zerosCount += 1;
        else
            return zerosCount;
    }

    return zerosCount;
}