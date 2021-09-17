const express = require('express')
const app = express()
const port = 80

app.use(express.json());

var fs = require('file-system');
var dayjs = require('dayjs')


app.use((err, req, res, next) => {    // syntax error in json
  // fs.writeFile(`./logs/office-hub.log`, `${dayjs().format()}   :  not formatted data :  ${JSON.stringify(req)}\r\n`, { flag: 'a' }, function (err) { })
  // console.error(`${dayjs().format()}:`,req)
  //next().
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    setTimeout(() => {
      res.status(400).send({ status: 404, message: err.message });
    }, 100)

  } else
    // setTimeout(() => {
    // res.status(200).json({ msg: "" })
    //  res.status(422).json({ error: 'Data is not valid', body: req.body })
    // }, 100)
    next()
})

app.post('/', (req, res, next) => {   // data
  if (req.body != undefined && req.body.length > 1 && req.body[0].h) {
    let responseBody = { UTC: Math.floor((new Date).getTime() / 1000) }
    fs.writeFile('./logs/office-hub.log', `${dayjs().format()} ( ${Math.floor(Date.now() / 1000)} ) :   ${JSON.stringify(req.body)} \r\n`, { flag: 'a' }, function (err) { })
    console.log(req.body)
    setTimeout(() => {
      res.status(200).send(responseBody)
    }, 100)

  }
  else
    next()

})


app.post('/', (req, res, next) => {   /// heartbeat
  if (req.body != undefined && req.body.length == 1 && req.body[0].h) {
    //let responseBody = { UTC: Math.floor((new Date).getTime() / 1000) }
    // let responseBody = { msg: "" }
    let responseBody = { UTC: Math.floor((new Date).getTime() / 1000) }
    fs.writeFile('./logs/office-hub.log', `${dayjs().format()} ( ${Math.floor(Date.now() / 1000)} ) :    ${JSON.stringify(req.body)} \r\n`, { flag: 'a' }, function (err) { })
    console.log(req.body)
    setTimeout(() => {
      res.status(200).send(responseBody)
      // res.status(200).json(responseBody)
    }, 100)

  }
  else
    res.status(422).json({ error: 'Data is not valid', body: req.body })
})

app.all('/', (err, req, res, next) => {
  // fs.writeFile(`./logs/office-hub.log`, `${dayjs().format()}   :  not formatted data :  ${JSON.stringify(req)}\r\n`, { flag: 'a' }, function (err) { })
  // console.error(`${dayjs().format()}:`,req)
  //next().
  // if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
  //   res.status(400).send({ status: 404, message: err.message });
  // } else
  // setTimeout(() => {
  // res.status(200).json({ msg: "" })
  // }, 100)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})