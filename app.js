require('./SK/SK');

SK.loader.init({
    "App": __dirname + "/app"
})





SK.define("aaa",{
	constructor:function(){
		console.log(111);
	}
})


SK.create("aaa");