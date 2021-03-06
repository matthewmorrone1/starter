(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var numbers = exports;
numbers.basic = require('./numbers/basic');
numbers.calculus = require('./numbers/calculus');
numbers.complex = require('./numbers/complex');
numbers.dsp = require('./numbers/dsp');
numbers.matrix = require('./numbers/matrix');
numbers.prime = require('./numbers/prime');
numbers.statistic = require('./numbers/statistic');
numbers.generate = require('./numbers/generators');
numbers.random = require('./numbers/random');
numbers.EPSILON = 0.001;
},{"./numbers/basic":2,"./numbers/calculus":3,"./numbers/complex":4,"./numbers/dsp":5,"./numbers/generators":6,"./numbers/matrix":7,"./numbers/prime":8,"./numbers/random":9,"./numbers/statistic":10}],2:[function(require,module,exports){
var basic = exports;
basic.sum = function (arr) {
	if (Object.prototype.toString.call(arr) === '[object Array]') {
		var total = 0;
		for (var i = 0 ; i < arr.length ; i++) {
			if (typeof(arr[i]) === 'number') {
				total = total + arr[i];
			} else {
				throw new Error('All elements in array must be numbers');
			}
		}
		return total;
	} else {
		throw new Error('Input must be of type Array');
	}
};
basic.subtraction = function (arr) {
	if (Object.prototype.toString.call(arr) === '[object Array]') {
		var total = arr[0];
		if (typeof(total) !== 'number') {
			throw new Error('All elements in array must be numbers');
		}
		for (var i = 1, length = arr.length; i < length; i++) {
			if (typeof(arr[i]) === 'number') {
				total -= arr[i];
			} else {
				throw new Error('All elements in array must be numbers');
			}
		}
		return total;
	} else {
		throw new Error('Input must be of type Array');
	}
};
basic.product = function (arr) {
	if (Object.prototype.toString.call(arr) === '[object Array]') {
		var total = arr[0];
		if (typeof(total) !== 'number') {
			throw new Error('All elements in array must be numbers');
		}
		for (var i = 1, length = arr.length; i < length; i++) {
			if (typeof(arr[i]) === 'number') {
				total = total * arr[i];
			} else {
				throw new Error('All elements in array must be numbers');
			}
		}
		return total;
	} else {
		throw new Error('Input must be of type Array');
	}
};
basic.square = function (num) {
	return num * num;
};
basic.binomial = function (n, k) {
	var arr = [];
	function _binomial (n, k) {
		if (n >= 0 && k === 0) return 1;
		if (n === 0 && k > 0) return 0;
		if (arr[n] && arr[n][k] > 0) return arr[n][k];
		if (!arr[n]) arr[n] = [];
		return arr[n][k] = _binomial(n - 1, k - 1) + _binomial(n - 1, k);
	}
	return _binomial(n, k);
};
basic.factorial = function (num){
	var i = 2, o = 1;
	while (i <= num) {
		o *= i++;
	}
	return o;
};
basic.gcd = function (a, b) {
	var c;
	a = +a;
	b = +b;
	if (a !== a || b !== b) {
		return NaN;
	}
	if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
		return Infinity;
	}
	if ((a % 1 !== 0) || (b % 1 !== 0)) {
		throw new Error("Can only operate on integers");
	}
	while (b) {
		c = a % b;
		a = b;
		b = c;
	}
	return (0 < a) ? a : -a;
};
basic.lcm = function (num1, num2) {
	return Math.abs(num1 * num2) / basic.gcd(num1, num2);
};
basic.random = function (arr, quant, allowDuplicates) {
	if (arr.length === 0){
		throw new Error('Empty array');
	} else if (quant > arr.length  && !allowDuplicates){
		throw new Error('Quantity requested exceeds size of array');
	}
	if (allowDuplicates === true) {
		var result = [], i;
		for (i = 0; i < quant; i++) {
			result[i] = arr[Math.floor(Math.random() * arr.length)];
		}
		return result;
	} else {
		return basic.shuffle(arr).slice(0, quant);
	}
};
basic.shuffle = function (array) {
	var m = array.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
};
basic.max = function (array) {
	return Math.max.apply(Math, array);
};
basic.min = function (array) {
	return Math.min.apply(Math, array);
};
basic.range = function (start, stop, step) {
	var array, i = 0, len;
	if (arguments.length <= 1) {
		stop = start || 0;
		start = 0;
	}
	step = step || 1;
	if (stop < start) {
		step = 0 - Math.abs(step);
	}
	len = Math.max(Math.ceil((stop - start) / step) + 1, 0);
	array = new Array(len);
	while (i < len) {
		array[i++] = start;
		start += step;
	}
	return array;
};
basic.isInt = function (n) {
	return n % 1 === 0;
};
basic.divMod = function (a, b) {
	if (!basic.isInt(a) || !basic.isInt(b)) return false;
	return [Math.floor(a / b), a % b];
};
basic.powerMod = function (a, b, m) {
	if (b < -1) return Math.pow(a, b) % m;
	if (b === 0) return 1 % m;
	if (b >= 1) {
		var result = 1;
		while (b > 0) {
			if ((b % 2) === 1) {
				result = (result * a) % m;
			}
			a = (a * a) % m;
			b = b >> 1;
		}
		return result;
	}
	if (b === -1) return basic.modInverse(a, m);
	if (b < 1) {
		return basic.powerMod(a, Math.pow(b, -1), m);
	}
};
basic.egcd = function (a, b) {
	var x = (+b && +a) ? 1 : 0,
			y = b ? 0 : 1,
			u = (+b && +a) ? 0 : 1,
			v = b ? 1 : 0;
	b = (+b && +a) ? +b : 0;
	a = b ? a : 1;
	while (b) {
		var dm = basic.divMod(a, b),
				q = dm[0],
				r = dm[1];
		var m = x - u * q,
				n = y - v * q;
		a = b;
		b = r;
		x = u;
		y = v;
		u = m;
		v = n;
	}
	return [a, x, y];
};
basic.modInverse = function (a, m) {
	var r = basic.egcd(a, m);
	if (r[0] != 1) throw new Error('No modular inverse exists');
	return r[1] % m;
};
basic.numbersEqual = function(first, second, epsilon) {
	return (first - second) < epsilon && (first - second) > -epsilon;
};
basic.fallingFactorial = function(n, k) {
	var i = (n-k+1), r = 1;
	if(n<0) { throw new Error("n cannot be negative"); }
	if(k>n) { return 0; }
	while(i <= n) {
		r *= i++;
	}
	return r;
}
},{}],3:[function(require,module,exports){
var numbers = require('../numbers');
var calculus = exports;
calculus.pointDiff = function (func, point) {
	var a = func(point - 0.001);
	var b = func(point + 0.001);
	return (b - a) / (0.002);
};
calculus.Riemann = function (func, start, finish, n, sampler) {
	var inc = (finish - start) / n;
	var totalHeight = 0;
	var i;
	if (typeof sampler === 'function') {
		for (i = start; i < finish; i += inc) {
			totalHeight += func(sampler(i, i + inc));
		}
	} else {
		for (i = start; i < finish; i += inc) {
			totalHeight += func(i);
		}
	}
	return totalHeight * inc;
};
function SimpsonDef (func, a, b) {
	var c = (a + b) / 2;
	var d = Math.abs(b - a) / 6;
	return d * (func(a) + 4 * func(c) + func(b));
}
function SimpsonRecursive (func, a, b, whole, eps) {
	var c = a + b;
	var left = SimpsonDef(func, a, c);
	var right = SimpsonDef(func, c, b);
	if (Math.abs(left + right - whole) <= 15 * eps) {
		return left + right + (left + right - whole) / 15;
	} else {
		return SimpsonRecursive(func, a, c, eps / 2, left) + SimpsonRecursive(func, c, b, eps / 2, right);
	}
}
calculus.adaptiveSimpson = function (func, a, b, eps) {
	eps = (typeof eps === 'undefined') ? numbers.EPSILON : eps;
	return SimpsonRecursive(func, a, b, SimpsonDef(func, a, b), eps);
};
calculus.limit = function (func, point, approach) {
	if (approach === 'left') {
		return func(point - 1e-15);
	} else if (approach === 'right') {
		return func(point + 1e-15);
	} else if (approach === 'middle') {
		return (calculus.limit(func, point, 'left') + calculus.limit(func, point, 'right')) / 2;
	} else {
		throw new Error('Approach not provided');
	}
};
calculus.StirlingGamma = function (num) {
	return Math.sqrt(2 * Math.PI / num) * Math.pow((num / Math.E), num);
};
calculus.LanczosGamma = function (num) {
	var p = [
		0.99999999999980993, 676.5203681218851, -1259.1392167224028,
		771.32342877765313, -176.61502916214059, 12.507343278686905,
		-0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
	];
	var i;
	var g = 7;
	if(num < 0.5) return Math.PI / (Math.sin(Math.PI * num) * calculus.LanczosGamma(1 - num));
	num -= 1;
	var a = p[0];
	var t = num + g + 0.5;
	for (i = 1; i < p.length; i++) {
		a += p[i] / (num + i);
	}
	return Math.sqrt(2 * Math.PI) * Math.pow(t, num + 0.5) * Math.exp(-t) * a;
};
calculus.MonteCarlo = function(func, N) {
	if (arguments.length < 2) {
		throw new Error('Please enter at least one interval.');
	} else if (N <= 0) {
		throw new Error('Please use a positive integer for N.');
	}
	var L = [];
	N = Math.ceil(N);
	for (var i=2; i<arguments.length; i++) {L.push(arguments[i]);}
	var coeff = L.map(function(l) {
		return l[1] - l[0];
	}).reduce(function(a,b) {
		return a*b;
	}) / N;
	var fvals = numbers.matrix.transpose(L.map(function(l) {
		return numbers.statistic.randomSample(l[0],l[1],N);
	})).map(function(l) {
		return func.apply(null, [ l[0],l[1],l[2] ]);
	});
	return coeff * fvals.reduce(function(a,b) {return a+b;});
}
},{"../numbers":1}],4:[function(require,module,exports){
var numbers = require('../numbers');
var basic = numbers.basic;
var Complex = function (re, im) {
	this.re = re;
	this.im = im;
	this.r  = this.magnitude();
	this.t  = this.phase();
};
Complex.prototype.add = function(addend) {
	return new Complex(this.re + addend.re, this.im + addend.im);
};
Complex.prototype.subtract = function (subtrahend) {
	return new Complex(this.re - subtrahend.re, this.im - subtrahend.im);
};
Complex.prototype.multiply = function (multiplier) {
	var re = this.re * multiplier.re - this.im * multiplier.im;
	var im = this.im * multiplier.re + this.re * multiplier.im;
	return new Complex(re, im);
};
Complex.prototype.divide = function (divisor) {
	var denominator = divisor.re * divisor.re + divisor.im * divisor.im;
	var re = (this.re * divisor.re + this.im * divisor.im) / denominator;
	var im = (this.im * divisor.re - this.re * divisor.im) / denominator;
	return new Complex(re,im);
};
Complex.prototype.magnitude = function () {
	return Math.sqrt(this.re * this.re + this.im * this.im);
};
Complex.prototype.phase = function () {
	return Math.atan2(this.im, this.re);
};
Complex.prototype.conjugate = function () {
	return new Complex(this.re, -1 * this.im);
};
Complex.prototype.pow = function(n) {
	var constant = Math.pow(this.magnitude(), n);
	return new Complex(constant * Math.cos(n * this.phase()), constant * Math.sin(n * this.phase()));
};
Complex.prototype.complexPow = function(complexN) {
	var realSqPlusImSq =  Math.pow(this.re, 2) + Math.pow(this.im, 2);
	var multiplier = Math.pow(realSqPlusImSq, complexN.re / 2) * Math.pow(Math.E, -complexN.im * this.phase());
	var theta = complexN.re * this.phase() + .5 * complexN.im * Math.log(realSqPlusImSq);
	return new Complex(multiplier * Math.cos(theta), multiplier * Math.sin(theta));
};
Complex.prototype.roots = function(n) {
	var result = new Array(n);
	for(var i = 0; i < n; i++) {
		var theta = (this.phase() + 2*Math.PI*i) / n;
		var radiusConstant = Math.pow(this.magnitude(), 1 / n);
		result[i] = (new Complex(radiusConstant * Math.cos(theta), radiusConstant * Math.sin(theta)))
	}
	return result;
};
Complex.prototype.sin = function() {
	var E = new Complex(Math.E, 0);
	var i = new Complex(0, 1);
	var negativeI = new Complex(0, -1);
	var numerator = E.complexPow(i.multiply(this)).subtract(E.complexPow(negativeI.multiply(this)));
	return numerator.divide(new Complex(0, 2));
};
Complex.prototype.cos = function() {
	var E = new Complex(Math.E, 0);
	var i = new Complex(0, 1);
	var negativeI = new Complex(0, -1);
	var numerator = E.complexPow(i.multiply(this)).add(E.complexPow(negativeI.multiply(this)));
	return numerator.divide(new Complex(2, 0));
};
Complex.prototype.tan = function() {
	return this.sin().divide(this.cos());
};
Complex.prototype.equals = function(complex, epsilon) {
	return basic.numbersEqual(this.re, complex.re, epsilon) &&
				basic.numbersEqual(this.im, complex.im, epsilon);
};
module.exports = Complex;
},{"../numbers":1}],5:[function(require,module,exports){
var numbers = require('../numbers');
var Complex = numbers.complex
var dsp = exports;
dsp.segment = function (arr, start, step) {
	var result = [];
	for (var i = start; i < arr.length; i += step) {
		result.push(arr[i]);
	}
	return result;
};
dsp.fft = function (x) {
	var N = x.length;
	if (N <= 1) {
		return [new Complex(x[0], 0)];
	}
	if (Math.log(N) / Math.LN2 % 1 !== 0) {
		throw new Error ('Array length must be integer power of 2');
	}
	var even = dsp.fft(dsp.segment(x, 0, 2));
	var odd = dsp.fft(dsp.segment(x, 1, 2));
	var res = [], Nby2 = N / 2;
	for (var k = 0; k < N; k++) {
		var tmpPhase = -2 * Math.PI * k / N;
		var phasor = new Complex(Math.cos(tmpPhase), Math.sin(tmpPhase));
		if (k < Nby2) {
			res[k] = even[k].add(phasor.multiply(odd[k]));
		} else {
			res[k] = even[k - Nby2].subtract(phasor.multiply(odd[k - Nby2]));
		}
	}
	return res;
};
},{"../numbers":1}],6:[function(require,module,exports){
var generate = exports;
generate.fibonacci = function (n) {
	var bitSystem = function(n) {
		var bit, bits = [];
		while (n > 0) {
			bit = (n < 2) ? n : n % 2;
			n = Math.floor(n / 2);
			bits.push(bit);
		}
		return bits.reverse();
	};
	var a = 1;
	var b = 0;
	var c = 1;
	var system = bitSystem(n);
	var temp;
	for (var i = 0; i < system.length; i++) {
		var bit = system[i];
		if (bit) {
			temp = [(a + c) * b, (b * b) + (c * c)];
			a = temp[0];
			b = temp[1];
		} else {
			temp = [(a * a) + (b * b), (a + c) * b];
			a = temp[0]
			b = temp[1];
		}
		c = a + b;
	}
	return b;
};
generate.collatz = function (n, result) {
	result.push(n);
	if (n === 1) {
		return;
	} else if (n % 2 === 0) {
		generate.collatz(n / 2, result);
	} else {
		generate.collatz(3 * n + 1, result);
	}
};
},{}],7:[function(require,module,exports){
var matrix = exports;
matrix.deepCopy = function(arr) {
	if (arr[0][0] === undefined) {
		throw new Error('Input cannot be a vector.');
	}
	var result = new Array(arr.length);
	for (var i = 0; i < arr.length; i++) {
		result[i] = arr[i].slice();
	}
	return result;
};
matrix.isSquare = function(arr) {
	var rows = arr.length;
	for (var i = 0, row; row = arr[i]; i++) {
		if (row.length != rows) return false;
	}
	return true;
};
matrix.addition = function (arrA, arrB) {
	if ((arrA.length === arrB.length) && (arrA[0].length === arrB[0].length)) {
		var result = new Array(arrA.length);
		if (!arrA[0].length) {
			for (var i = 0; i < arrA.length; i++) {
				result[i] = arrA[i] + arrB[i];
			}
		} else {
			for (var i = 0; i < arrA.length; i++) {
					result[i] = new Array(arrA[i].length);
					for (var j = 0; j < arrA[i].length; j++) {
						result[i][j] = arrA[i][j] + arrB[i][j];
					}
			}
		}
		return result;
	} else {
		throw new Error('Matrix mismatch');
	}
};
matrix.scalar = function (arr, val) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			arr[i][j] = val * arr[i][j];
		}
	}
	return arr;
};
matrix.transpose = function (arr) {
	var result = new Array(arr[0].length);
	for (var i = 0; i < arr[0].length; i++) {
		result[i] = new Array(arr.length);
		for (var j = 0; j < arr.length; j++) {
			result[i][j] = arr[j][i];
		}
	}
	return result;
};
matrix.identity = function (n) {
	var result = new Array(n);
	for (var i = 0; i < n ; i++) {
		result[i] = new Array(n);
		for (var j = 0; j < n; j++) {
			result[i][j] = (i === j) ? 1 : 0;
		}
	}
	return result;
};
matrix.dotproduct = function (vectorA, vectorB) {
	if (vectorA.length === vectorB.length) {
		var result = 0;
		for (var i = 0; i < vectorA.length; i++) {
			result += vectorA[i] * vectorB[i];
		}
		return result;
	} else {
		throw new Error("Vector mismatch");
	}
};
matrix.multiply = function (arrA, arrB) {
	if (arrA[0].length === arrB.length) {
		var result = new Array(arrA.length);
		for (var x = 0; x < arrA.length; x++) {
			result[x] = new Array(arrB[0].length);
		}
		var arrB_T = matrix.transpose(arrB);
		for (var i = 0; i < result.length; i++) {
			for (var j = 0; j < result[i].length; j++) {
				result[i][j] = matrix.dotproduct(arrA[i],arrB_T[j]);
			}
		}
		return result;
	} else {
		throw new Error("Array mismatch");
	}
};
matrix.determinant = function (m) {
	var numRow = m.length;
	var numCol = m[0].length;
	var det = 0;
	var row, col;
	var diagLeft, diagRight;
	if (numRow !== numCol) {
		throw new Error("Not a square matrix.")
	}
	if (numRow === 1) {
		return m[0][0];
	}
	else if (numRow === 2) {
		return m[0][0] * m[1][1] - m[0][1] * m[1][0];
	}
	for (col = 0; col < numCol; col++) {
		diagLeft = m[0][col];
		diagRight = m[0][col];
		for( row=1; row < numRow; row++ ) {
			diagRight *= m[row][(((col + row) % numCol) + numCol) % numCol];
			diagLeft *= m[row][(((col - row) % numCol) + numCol) % numCol];
		}
		det += diagRight - diagLeft;
	}
	return det;
};
matrix.lupDecomposition = function(arr) {
	if (!matrix.isSquare(arr)) {
		throw new Error("Matrix must be square.");
	}
	var size = arr.length;
	var LU = matrix.deepCopy(arr);
	var P = matrix.transpose(matrix.identity(size));
	var currentRow;
	var currentColumn = new Array(size);
	this.getL = function(a) {
		var m = a[0].length;
		var L = matrix.identity(m);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < m; j++) {
				if (i > j) {
					L[i][j] = a[i][j];
				}
			}
		}
		return L;
	};
	this.getU = function(a) {
		var m = a[0].length;
		var U = matrix.identity(m);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < m; j++) {
				if (i <= j) {
					U[i][j] = a[i][j];
				}
			}
		}
		return U;
	};
	for (var j = 0; j < size; j++) {
		var i;
		for (i = 0; i < size; i++) {
			currentColumn[i] = LU[i][j];
		}
		for (i = 0; i < size; i++) {
			currentRow = LU[i];
			var minIndex = Math.min(i,j);
			var s = 0;
			for (var k = 0; k < minIndex; k++) {
				s += currentRow[k]*currentColumn[k];
			}
			currentRow[j] = currentColumn[i] -= s;
		}
		var pivot = j;
		for (i = j + 1; i < size; i++) {
			if (Math.abs(currentColumn[i]) > Math.abs(currentColumn[pivot])) {
				pivot = i;
			}
		}
		if (pivot != j) {
			LU = matrix.rowSwitch(LU, pivot, j);
			P = matrix.rowSwitch(P, pivot, j);
		}
		if (j < size && LU[j][j] !== 0) {
			for (i = j + 1; i < size; i++) {
				LU[i][j] /= LU[j][j];
			}
		}
	}
	return [this.getL(LU), this.getU(LU), P];
};
matrix.rotate = function (point, degree, direction) {
	if (point.length === 2) {
		var negate = direction === 'clockwise' ? -1 : 1;
		var radians = degree * (Math.PI / 180);
		var transformation = [
			[Math.cos(radians), -1 * negate * Math.sin(radians)],
			[negate * Math.sin(radians), Math.cos(radians)]
		];
		return matrix.multiply(transformation, point);
	} else {
		throw new Error('Only two dimensional operations are supported at this time');
	}
};
matrix.scale = function (point, sx, sy) {
	if (point.length === 2) {
		var transformation = [
			[sx, 0],
			[0, sy]
		];
		return matrix.multiply(transformation, point);
	} else {
		throw new Error('Only two dimensional operations are supported at this time');
	}
};
matrix.shear = function (point, k, direction) {
	if (point.length === 2) {
		var xplaceholder = direction === 'xaxis' ? k : 0;
		var yplaceholder = direction === 'yaxis' ? k : 0;
		var transformation = [
			[1, xplaceholder],
			[yplaceholder, 1]
		];
		return matrix.multiply(transformation, point);
	} else {
		throw new Error('Only two dimensional operations are supported at this time');
	}
};
matrix.affine = function (point, tx, ty) {
	if (point.length === 2) {
		var transformation = [
			[1, 0, tx],
			[0, 1, ty],
			[0, 0, 1 ]
		];
		var newpoint = [
			[point[0][0]],
			[point[1][0]],
			[1]
		];
		var transformed = matrix.multiply(transformation, newpoint);
		return [
			[transformed[0][0]],
			[transformed[1][0]]
		];
	} else {
		throw new Error('Only two dimensional operations are supported at this time');
	}
};
matrix.rowScale = function (m, row, scale) {
	var result = new Array(m.length);
	for (var i = 0; i < m.length; i++) {
		result[i] = new Array(m[i].length);
		for (var j = 0; j < m[i].length; j++) {
			if (i === row) {
				result[i][j] = scale * m[i][j];
			} else {
				result[i][j] = m[i][j];
			}
		}
	}
	return result;
};
matrix.rowSwitch = function (m, row1, row2) {
	var result = new Array(m.length);
	for (var i = 0; i < m.length; i++) {
		result[i] = new Array(m[i].length);
		for (var j = 0; j < m[i].length; j++) {
			if (i === row1) {
				result[i][j] = m[row2][j];
			} else if (i === row2) {
				result[i][j] = m[row1][j];
			} else {
				result[i][j] = m[i][j];
			}
		}
	}
	return result;
};
matrix.rowAddMultiple = function (m, from, to, scale){
	var result = new Array(m.length);
	for (var i = 0; i < m.length; i++) {
		result[i] = new Array(m[i].length);
		for (var j = 0; j < m[i].length; j++) {
			if (i === to) {
				result[to][j] = m[to][j] + scale * m[from][j];
			} else {
				result[i][j] = m[i][j];
			}
		}
	}
	return result;
};
matrix.GaussJordanEliminate = function(m, epsilon) {
	var eps = (typeof epsilon == 'undefined') ? 1e-10 : epsilon;
	var h = m.length;
	var w = m[0].length;
	var y = -1;
	var y2, x;
	while (++y < h) {
		var maxrow = y;
		y2 = y;
		while (++y2 < h) {
			if(Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
				maxrow = y2;
		}
		var tmp = m[y];
		m[y] = m[maxrow];
		m[maxrow] = tmp;
		if(Math.abs(m[y][y]) <= eps) {
			return m;
		}
		y2 = y;
		while (++y2 < h) {
			var c = m[y2][y] / m[y][y];
			x = y - 1;
			while (++x < w) {
				m[y2][x] -= m[y][x] * c;
			}
		}
	}
	y = h;
	while (--y >= 0) {
		var c = m[y][y];
		y2 = -1;
		while (++y2 < y) {
			x = w;
			while (--x >= y) {
				m[y2][x] -=  m[y][x] * m[y2][y] / c;
			}
		}
		m[y][y] /= c;
		x = h - 1;
		while (++x < w) {
			m[y][x] /= c;
		}
	}
	return m;
};
matrix.rowReduce = function(m, epsilon) {
	return matrix.GaussJordanEliminate(m, epsilon);
}
matrix.inverse = function(m) {
	var n = m.length;
	if (n === m[0].length) {
		var identity = matrix.identity(n);
		for(var i=0; i<n; i++) {
			m[i] = m[i].concat(identity[i]);
		}
		m = matrix.GaussJordanEliminate(m);
		for(var i=0; i<n; i++) {
			m[i] = m[i].slice(n);
		}
		return m;
	} else {
		throw new Error('The given matrix must be square');
	}
}
matrix.getCol = function(M, n) {
	var result = [];
	if (n < 0) {
		throw new Error('The specified column must be a positive integer.');
	} else if (n >= M[0].length) {
		throw new Error('The specified column must be between 0 and the number of columns - 1.');
	}
	for (var i=0; i<M.length; i++) {
		result.push(M[i][n]);
	}
	return result;
}
matrix.reorderRows = function(M, L) {
	var result = [];
	if (L === undefined) {
		throw new Error('Please enter a desired reordering array.');
	} else if (L.length !== M.length) {
		throw new Error ('The reordered matrix must have the same number of rows as the original matrix.');
	}
	for (var i=0; i<L.length; i++) {
		if (L[i] < 0) {
			throw new Error('The desired order of the rows must be positive integers.');
		} else if (L[i] >= L.length) {
			throw new Error('The desired order of the rows must start at 0 and end at the number of rows - 1.');
		} else {
			result.push(M[L[i]]);
		}
	}
	return result;
}
matrix.reorderCols = function(M, L) {
	var result = [];
	if (L === undefined) {
		throw new Error('Please enter a desired reordering array.');
	} else if (L.length !== M[0].length) {
		throw new Error('The reordered matrix must have the same number of columns as the original matrix.');
	}
	for (var i=0; i<L.length; i++) {
		if (L[i] < 0) {
			throw new Error('The desired order of the rows must be positive integers.');
		} else if (L[i] >= L.length) {
			throw new Error('The desired order of the rows must start at 0 and end at the number of rows - 1.');
		} else {
			result.push(matrix.getCol(M, L[i]) );
		}
	}
	return matrix.transpose(result);
}
matrix.reverseRows = function(M) {
		var L = [];
		for (var i=M.length-1; i>-1; i--) {
				L.push(i);
		}
		return matrix.reorderRows(M,L);
}
matrix.reverseCols = function(M) {
		var L = [];
		for (var i=M.length-1; i>-1; i--) {
				L.push(i);
		}
		return matrix.reorderCols(M,L);
}
matrix.zeros = function(n,m) {
	var M = [];
	if ((n < 1) || (m < 1)) {
		throw new Error('Please enter the matrix dimensions as positive integers.')
	}
	n = Math.ceil(n);
	m = Math.ceil(m);
	for (var i=0; i<n; i++) {
		var empty = [];
		for (var j=0; j<m; j++) {
			empty.push(0);
		}
		M.push(empty);
	}
	return M;
}
matrix.zigzag = function(n, point, dir) {
	if (n <= 1) {
		throw new Error('Matrix size must be at least 2x2.');
	}
	n = Math.ceil(n);
	var mat = matrix.zeros(n,n);
	var BRH = function(M) {
		var jump = false,
				tl = n*n,
				br = 1,
				inc = 1;
		M[0][0] = tl;
		M[n-1][n-1] = br;
		for (var i=1; i<n; i++) {
			if (jump) {
				tl -= 4*inc;
				br += 4*inc;
				inc++;
			} else {
				tl--;
				br++;
			}
			M[0][i] = tl;
			M[n-1][n-1-i] = br;
			jump = !jump;
		}
		var dec = true;
		for (var i=1; i<n; i++) {
			var row = 0,
					col = i,
					val = M[row][col];
			for (var j=1; j<i+1;j++) {
				if (dec) {
					val -= 1;
				} else {
					val += 1;
				}
				row++;
				col--;
				M[row][col] = val;
			}
				dec = !dec;
		}
		if (n%2 ==0) {
			dec = true;
		} else {
			dec = false;
		}
		for (var i=1; i<n-1; i++) {
			row = n-1;
			col = i;
			val = M[row][col];
			for (var j=1; j<n-i; j++) {
				if (dec) {
					val--;
				} else {
					val++;
				}
				row--;
				col++;
				M[row][col] = val;
			}
			dec = !dec;
		}
		return M;
	}
	var BRV = function(M)
		return matrix.transpose(BRH(M));
	}
	var BLH = function(M)
		return matrix.reverseCols(BRH(M));
	}
	var BLV = function(M)
		return matrix.reverseRows(TLV(BLH(M)));
	}
	var TRH = function(M)
		return matrix.reverseRows(BRH(M));
	}
	var TRV = function(M)
		return matrix.reverseRows(BRV(M));
	}
	var TLH = function(M)
		return matrix.reverseCols(matrix.reverseRows(BRH(M)));
	}
	var TLV = function(M)
		return matrix.transpose(TLH(M));
	}
	if ((point === 'BR') && (dir === 'H')) {return (BRH(mat));}
	else if ((point === 'BR') && (dir === 'V')) {return (BRV(mat));}
	else if ((point === 'BL') && (dir === 'H')) {return (BLH(mat));}
	else if ((point === 'BL') && (dir === 'V')) {return (BLV(mat));}
	else if ((point === 'TR') && (dir === 'H')) {return (TRH(mat));}
	else if ((point === 'TR') && (dir === 'V')) {return (TRV(mat));}
	else if ((point === 'TL') && (dir === 'H')) {return (TLH(mat));}
	else if ((point === 'TL') && (dir === 'V')) {return (TLV(mat));}
	else {throw new Error('Please enter the direction (V,H) and corner (BR,BL,TR,TL) correctly.');}
}
},{}],8:[function(require,module,exports){
var basic = require('./basic');
var prime = exports;
prime.simple = function (val) {
	if (val === 1) return false;
	else if (val === 2) return true;
	else if (val !== undefined) {
		var start = 1;
		var valSqrt = Math.ceil(Math.sqrt(val));
		while (++start <= valSqrt) {
			if (val % start === 0) {
				return false;
			}
		}
		return true;
	}
};
prime.factorization = function (num) {
	num = Math.floor(num);
	var root;
	var factors = [];
	var x;
	var sqrt = Math.sqrt;
	var doLoop = 1 < num && isFinite(num);
	while (doLoop) {
		root = sqrt(num);
		x = 2;
		if (num % x) {
			x = 3;
			while ((num % x) && ((x += 2) < root)) {}
		}
		x = (root < x) ? num : x;
		factors.push(x);
		doLoop = (x !== num);
		num /= x;
	}
	return factors;
};
prime.millerRabin = function(n, k) {
	if (arguments.length === 1) k = 20;
	if (n === 2) return true;
	if (!basic.isInt(n) || n <= 1 || n % 2 === 0) return false;
	var s = 0;
	var d = n - 1;
	while (true) {
		var dm = basic.divMod(d, 2);
		var quotient = dm[0];
		var remainder = dm[1];
		if (remainder === 1) break;
		s += 1;
		d = quotient;
	}
	var tryComposite = function (a) {
		if (basic.powerMod(a, d, n) === 1) return false;
		for (var i = 0; i < s; i ++) {
			if (basic.powerMod(a, Math.pow(2, i) * d, n) === n - 1) return false;
		}
		return true;
	}
	for (var i = 0; i < k; i++) {
		var a = 2 + Math.floor(Math.random() * (n - 2 - 2));
		if (tryComposite(a)) return false;
	}
	return true;
};
prime.sieve = function (n) {
	if (n < 2) return [];
	var result = [2];
	for (var i = 3; i <= n; i++) {
		var notMultiple = false;
		for (var j in result) {
			notMultiple = notMultiple || (0 === i % result[j]);
		}
		if (!notMultiple) {
			result.push(i);
		}
	}
	return result;
};
prime.coprime = function (a, b) {
	return basic.gcd(a, b) === 1;
};
prime.getPerfectPower = function(n) {
	var test = prime.getPrimePower(n);
	if (test && test[1] > 1) return test;
	return false;
};
prime.getPrimePower = function(n) {
	if (n < 2) return false;
	if (prime.millerRabin(n)) return [n, 1];
	if (n % 2 === 0) return [2, n.toString(2).length - 1];
	var factors = prime.factorization(n);
	if (!factors) return false;
	var len = factors.length;
	for (var i = 0; i < len; i++) {
		var t = 0, p = 0;
		while (t <= n) {
			t = Math.pow(factors[i], p);
			if (t / n === 1) return [factors[i], p];
			p++;
		}
	}
	return false;
};
},{"./basic":2}],9:[function(require,module,exports){
var basic = require('./basic');
var random = exports;
random.sample = function (lower, upper, n) {
	var sample = [];
	sample.length = n;
	for (var i=0; i<n; i++) {
		sample[i] = lower + (upper - lower) * Math.random();
	}
	return sample;
};
random.boxMullerTransform = function(mu, sigma) {
	if (arguments.length <= 1) sigma = 1;
	if (arguments.length === 0) mu = 0;
	var u = 0,
			v = 0,
			s;
	do {
		u = Math.random() * 2 - 1;
		v = Math.random() * 2 - 1;
		s = u * u + v * v;
	} while (s === 0 || s > 1)
	var c = Math.sqrt(-2 * Math.log(s)/s),
			x = u * c,
			y = v * c,
			x = mu + x * sigma,
			y = mu + y * sigma;
	return [x, y];
};
random.irwinHall = function(n, sub) {
	if (arguments.length === 1) sub = 0;
	var sum = 0;
	for (var i = 0; i < n; i++) sum += Math.random();
	return sum - sub;
};
random.bates = function(n, b, a) {
	if (arguments.length <= 2) a = 0;
	if (arguments.length === 1) b = 1;
	var sum = 0;
	for (var i = 0; i < n; i++) sum += (b - a)*Math.random() + a;
	return sum/n;
};
random.distribution = {};
random.distribution.normal = function(n, mu, sigma) {
	if (arguments.length <= 2) sigma = 1;
	if (arguments.length === 1) mu = 0;
	return random.distribution.boxMuller(n, mu, sigma);
};
random.distribution.logNormal = function(n, mu, sigma) {
	if (arguments.length <= 2) sigma = 1;
	if (arguments.length === 1) mu = 0;
	var exponential = function(x) {
		return Math.exp(x);
	};
	return random.distribution.boxMuller(n, mu, sigma).map(exponential);
};
random.distribution.boxMuller = function(n, mu, sigma, rc) {
	if (arguments.length <= 3) rc = false;
	if (arguments.length <= 2) sigma = 1;
	if (arguments.length === 1) mu = 0;
	var results = [];
	for (var i = 0; i < n; i++) {
		var randomBMT = random.boxMullerTransform(mu, sigma);
		results.push((rc) ? randomBMT : randomBMT[0]);
	}
	return results;
};
random.distribution.irwinHall = function(n, m, sub) {
	if (arguments.length <= 2) sub = 0;
	if (arguments.length === 1) m = n;
	var results = new Array(n);
	for (var i = 0; i < n; i++) {
		results[i] = random.irwinHall(m, sub);
	}
	return results;
};
random.distribution.irwinHallNormal = function(n) {
	return random.distribution.irwinHall(n, 12, 6);
};
random.distribution.bates = function(n, b, a) {
	if (arguments.length <= 2) a = 0;
	if (arguments.length === 1) b = n;
	var results = new Array(n);
	for (var i = 0; i < n; i++) {
		results[i] = random.bates(n, b, a);
	}
	return results;
};
},{"./basic":2}],10:[function(require,module,exports){
var basic = require('./basic');
var statistic = exports;
statistic.mean = function (arr) {
	var count = arr.length;
	var sum = basic.sum(arr);
	return sum / count;
};
statistic.median = function (arr) {
	return statistic.quantile(arr, 1, 2);
};
statistic.mode = function (arr) {
	var counts = {};
	for (var i = 0, n = arr.length; i < n; i++) {
		if (counts[arr[i]] === undefined) {
			counts[arr[i]] = 0;
		} else {
			counts[arr[i]]++;
		}
	}
	var highest;
	for (var number in counts) {
		if (counts.hasOwnProperty(number)) {
			if (highest === undefined || counts[number] > counts[highest]) {
				highest = number;
			}
		}
	}
	return Number(highest);
};
statistic.quantile = function (arr, k, q) {
	var sorted, count, index;
	if (k === 0) return Math.min.apply(null, arr);
	if (k === q) return Math.max.apply(null, arr);
	sorted = arr.slice(0);
	sorted.sort(function (a, b) { return a - b; });
	count = sorted.length;
	index = count * k / q;
	if (index % 1 === 0) return 0.5 * sorted[index - 1] + 0.5 * sorted[index];
	return sorted[Math.floor(index)];
};
statistic.report = function(array) {
	return {
		mean: statistic.mean(array),
		firstQuartile: statistic.quantile(array, 1, 4),
		median: statistic.median(array),
		thirdQuartile: statistic.quantile(array, 3, 4),
		standardDev: statistic.standardDev(array)
	}
};
statistic.randomSample = function (lower, upper, n) {
	var sample = [];
	sample.length = n;
	for (var i=0; i<n; i++) {
		sample[i] = lower + (upper - lower) * Math.random();
	}
	return sample;
};
statistic.standardDev = function (arr) {
	var count = arr.length;
	var mean = statistic.mean(arr);
	var squaredArr = [];
	for (var i = 0; i < arr.length; i++) {
		squaredArr[i] = Math.pow((arr[i] - mean),2);
	}
	return Math.sqrt((1 / count) * basic.sum(squaredArr));
};
statistic.correlation = function (arrX, arrY) {
	if (arrX.length == arrY.length) {
		var covarXY = statistic.covariance(arrX, arrY);
		var stdDevX = statistic.standardDev(arrX);
		var stdDevY = statistic.standardDev(arrY);
		return covarXY / (stdDevX * stdDevY);
	} else {
		throw new Error('Array mismatch');
	}
};
statistic.rSquared = function (source, regression) {
	var residualSumOfSquares = basic.sum(source.map(function (d,i) {
		return basic.square(d - regression[i]);
	}));
	var totalSumOfSquares = basic.sum(source.map(function (d) {
		return basic.square(d - statistic.mean(source));
	}));
	return 1 - (residualSumOfSquares / totalSumOfSquares);
};
statistic.exponentialRegression = function (arrY) {
	var n = arrY.length;
	var arrX = basic.range(1,n);
	var xSum = basic.sum(arrX);
	var ySum = basic.sum(arrY);
	var yMean = statistic.mean(arrY);
	var yLog = arrY.map(function (d) { return Math.log(d); });
	var xSquared = arrX.map(function (d) { return d * d; });
	var xSquaredSum = basic.sum(xSquared);
	var yLogSum = basic.sum(yLog);
	var xyLog = arrX.map(function (d, i) { return d * yLog[i]; });
	var xyLogSum = basic.sum(xyLog);
	var a = (yLogSum * xSquaredSum - xSum * xyLogSum) / (n * xSquaredSum - (xSum * xSum));
	var b = (n * xyLogSum - xSum * yLogSum) / (n * xSquaredSum - (xSum * xSum));
	var fn = function(x) {
		if (typeof x === 'number') {
			return Math.exp(a) * Math.exp(b * x);
		} else {
			return x.map(function (d) {
				return Math.exp(a) * Math.exp(b * d);
			});
		}
	};
	fn.rSquared = statistic.rSquared(arrY, arrX.map(fn));
	return fn;
};
statistic.linearRegression = function (arrX, arrY) {
	var n = arrX.length;
	var xSum = basic.sum(arrX);
	var ySum = basic.sum(arrY);
	var xySum = basic.sum(arrX.map(function (d, i) { return d * arrY[i]; }));
	var xSquaredSum = basic.sum(arrX.map(function (d) { return d * d; }));
	var xMean = statistic.mean(arrX);
	var yMean = statistic.mean(arrY);
	var b = (xySum - 1 / n * xSum * ySum) / (xSquaredSum - 1 / n * (xSum * xSum));
	var a = yMean - b * xMean;
	return function(x) {
		if (typeof x === 'number') {
			return a + b * x;
		} else {
			return x.map(function (d) {
				return a + b * d;
			});
		}
	}
};
 statistic.covariance = function (set1, set2) {
	if (set1.length == set2.length) {
		var n = set1.length;
		var total = 0;
		var sum1 = basic.sum(set1);
		var sum2 = basic.sum(set2);
		for (var i = 0; i < n; i++) {
			total += set1[i] * set2[i];
		}
		return (total - sum1 * sum2 / n) / n;
	} else {
		throw new Error('Array mismatch');
	}
};
},{"./basic":2}]},{},[1]);
