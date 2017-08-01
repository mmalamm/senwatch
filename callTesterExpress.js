const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;

let testObj = { pp_id: 'B001288' };
const pp3update = require('./update_sens/pp3update');

app.listen(port, () => console.log('Ayo big server running on port ', port));

app.get('/', (req, res) => {
  pp3update.pp3update(res, testObj);
});

// const express = require('express');
// const app = express();
// const request = require('request');
// const port = process.env.PORT || 3000;
//
// let testObj = { crp_id: 'N00026823', iter:[] };
// const crpReq = require('./crpReq');
// console.log(crpReq);
// crpReq.crpReq(testObj, testObj.iter);
//
//
//
//
//
//
// app.listen(port, () => console.log('Ayo big server running on port ', port));
//
// app.get('/', (req, res) => {
//   res.json(testObj);
// });
