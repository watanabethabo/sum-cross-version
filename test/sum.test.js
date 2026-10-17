// 版本無關的測試：只用 Node 自古內建的 assert，確保「唯一變因是 Node 版本」。
var assert = require('assert');
var sum = require('../src/sum').sum;

// (1) 正確性：四個斷言（純函式，結果具決定性，跑一次即可）
assert.strictEqual(sum([]), 0);
assert.strictEqual(sum([1, 2, 3]), 6);
assert.strictEqual(sum([5, -2, -1]), 2);
var threw = false;
try { sum('123'); } catch (e) { threw = (e instanceof TypeError); }
assert.ok(threw, '非陣列應丟出 TypeError');

// (2) 有界的小量測：固定工作量（約 1 億次加法），毫秒級完成。
//     acc 若在各版本完全相同，即為「跨版本數值行為一致」的證據。
var arr = [];
for (var i = 0; i < 1000; i++) arr.push(i);   // 0..999，單次總和 = 499500
var ITER = 100000;
var start = Date.now();
var acc = 0;
for (var k = 0; k < ITER; k++) { acc += sum(arr); }
var ms = Date.now() - start;

console.log('RESULT node=' + process.version + ' assertions=PASS acc=' + acc + ' iters=' + ITER + ' elapsed_ms=' + ms);
