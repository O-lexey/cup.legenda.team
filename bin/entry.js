var xssFilters = require('xss-filters');
const fs = require('fs');
const http = require('http');
var url = require('url');

let jsdom = require('jsdom').JSDOM,

uri = '/var/www/cup.legenda.team/index.html',
 
// the options that I will be giving to jsdom
options = {
    runScripts: 'dangerously',
    resources: "usable"
};

const serv = http.createServer(function (req, res) {

    var q = url.parse(req.url, true).query;

    var first = xssFilters.inHTMLData(q.first);
    var last = xssFilters.inHTMLData(q.last);
    var year = xssFilters.inHTMLData(q.year);
    var team = xssFilters.inHTMLData(q.team);
    var si = xssFilters.inHTMLData(q.si);
    var course = xssFilters.inHTMLData(q.course.substr(0,3));

    jsdom.fromFile(uri, options).then(function (dom) {
 
        let window = dom.window,
        document = window.document;
    
        var entries = document.getElementById('entries');
    
        var row = entries.insertRow(1);
    
        row.innerHTML = `
            <td>${last}</td>
            <td>${first}</td>
            <td>${year}</td>
            <td>${team}</td>
            <td>${si}</td>
            <td>${course}</td>
            <td>&nbsp;</td>
    
        `;
        
        var o = dom.serialize();
    
        fs.writeFile(uri,o,function(err) {
            if (err) return console.error(err);
        });

        res.statusCode = 302;
        res.setHeader('Location','https://cup.legenda.team/add.html');
        res.end;
     
    }).catch (function (e) {
     
        console.log(e);
     
    });    

    }

);

serv.listen(1309);