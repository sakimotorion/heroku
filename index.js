const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fs = require('fs');
const csv = require('csv');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res, next) => {
    let code = '';
    if(req.query.code){
      code = req.query.code
    }
    var jsondata = {message: "code"}
    // trim:trueにするとカンマの前後のスペースが削除されます
    const parser = csv.parse({ columns: true, trim: true },
      (e, result) => (e) ? console.error(e) : console.log(result)
    );

    // 読み込みとparserの処理を実行
    fs.createReadStream(__dirname + '/public/38EHIME.CSV').pipe(parser);
    res.set({
      'Content-Type': 'text/javascript; charset=utf-8'
    })
    res.end(JSON.stringify(jsondata))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
