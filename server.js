const express = require("express");
const app = express();
const fs = require('fs');
var CronJob = require('cron').CronJob;
const axios = require('axios');
let port  = 8000;
const items = require('./items')
let server = app.listen(port, () => {
     console.log(`Listening to the port ${port}`)
})



var silverJob = new CronJob(
	'*/10 * * * * *',
	() => {
		axios.get('http://ec2-34-196-142-118.compute-1.amazonaws.com/GetXRateResponse/xe')
        .then((res) => {
            
            let arr = res.data.items.map((ele) => {
				fs.appendFile(`Data10Seconds//${ele.curr + '-XAU'}.txt`,String(ele.xauPrice +','), function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
				fs.appendFile(`Data10Seconds//${ele.curr + '-XAG'}.txt`,String(ele.xagPrice +','), function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
			})
        })
	},
	null,
	true,
	'America/Los_Angeles'
);

silverJob.start();







app.get('/GetData/:instruments/:timeStamp' , function(req,res){
    console.log(req.params)
       var file = req.params.instruments.substring(0, 7);
       console.log(file)
      var timeStamp = 0;
      
    
      if(timeStamp == '0') {
    
      
    

    
        fs.readFile(`Data10Seconds/${file}.txt`,"utf8", function(err, str){
          if (err)
          {
           console.log(err)
          
          } else {
       
            res.setHeader('Cache-Control', 'public, max-age=10');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.contentType('application/json');
            res.jsonp([str]);
          }
    
        });
    
    
      }
}
)