const Pageres = require('pageres');
const restify = require('restify');
const parser = require('json-parser');
var base64Img = require('base64-img');
var fs = require('fs');

// function to encode file data to base64 encoded string
// function base64_encode(file) {
//     // read binary data
//     var bitmap = fs.readFileSync(file);
//     // convert binary data to base64 encoded string
//     return new Buffer(bitmap).toString('base64');
// }

						//console.log(fileName);



const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.post('/getSg', function (req, res) {

	
	var jsonObject = parser.parse(req.body);
	url = jsonObject.url;
	delay = jsonObject.delay;
	console.log(url);
	console.log(delay)
	var count = 0;
	var list = [];
	console.log("Calling --> " + url)

	for (var i = 0; i < delay; i++) {
		console.log('loop' + i);
		fileName = Math.floor(Math.random() * (1000 - 100) + -100);
		const pageres = new Pageres({
				delay: i
			})
			// .src(url, ['300x250'], {crop: true, filename: fileName})
			.src(url, ['300x250'], {
				crop: false,
				filename: fileName
			}).dest(__dirname).run().then( function (data) {

						count = count+1;
						
						if(data != ''){
							
							//var base64str = base64_encode(data+'.png');
							list.push(data);
							console.log("Success");
						//console.log(list);	

						if(list != '' && list.length == delay){

						res.send(list);
						console.log("Success");
						console.log(list);
						}
					}
														
//return list;
		}).catch( function () {
				count = count + 1;
                // list.push(fileName);
                if (count == delay) {
                    res.send(list);
                }
						console.log("Promise Rejected");
					});
			}


});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});



