const express = require('express');
const request = require('request-promise');

const {check, query, validationResult} = require('express-validator/check')
const app = express();

app.set('port', 3000);
app.set('view engine','ejs');

/*GET API for Getting country list based on Region*/
/*Query parameter -q*/

app.get('/list',
[
query("q", "invalid region").isIn(['Asia', 'Africa', 'Americas','Europe','Oceania'])
],(req, res, next) => {
    try{
        validationResult(req).throw();
        var region = req.query.q;
        var regionAPI = `https://restcountries.eu/rest/v2/region/${region}`;
        request(regionAPI, function (error, response, body) {
            if(response.statusCode == 200){
                var countries = JSON.parse(body);
                var result = countries.map(country => country.name);
                res.send({
                    body: result,
                    statusCode: 200
                })
            }else{
                res.send({
                    body: 'Inavlid Region',
                    statusCode: 400
                })
            }
    
        });
    }catch(err){
        res.send({
            body: 'Inavlid Region',
            statusCode: 400
        })
    }
});

/*GET API for sorting country based on population when region is specified*/
/*Params - region*/


app.get('/list/:region/sort',
[
check("region", "invalid region").isIn(['Asia', 'Africa', 'Americas','Europe','Oceania'])
],async (req, res, next) => {
    try{

        validationResult(req).throw();
        var region = req.params.region;
        console.log('region',region);
        var options = {
            method: 'GET',
            uri:`https://restcountries.eu/rest/v2/region/${region}`,
            json: true 
        };
        var countries = await request(options);
        var countryFullData = [];
        var i =0;
        if(countries){
            var countryList = countries.map(country => country.name);

            countryList.forEach(async (country) => {
                var countryAPI = encodeURI(`https://restcountries.eu/rest/v2/name/${country}`);
                var countryData = await request(countryAPI);
                countryData = JSON.parse(countryData);
                countryFullData.push(countryData[0]);
                if(i == countryList.length - 1){
                    countryFullData.sort(function(a, b){
                        return a.population-b.population
                    })
                    var result = countryFullData.map(country => country.name);
                    res.send({
                        body: result,
                        statusCode: 200
                    })
                }
                i++;
            });
        }else{
            res.send({
                body: 'Inavlid Region',
                statusCode: 400
            })
        }
    }catch(err){
        res.send({
            body: 'Inavlid Region',
            statusCode: 400
        })
    }
});

const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

server.timeout = 1800000;

module.exports = app;