require('./SK/SK');

SK.loader.init({
    "App": __dirname + "/app"
})



a = SK.create("SK.server.Http",{
    port:8000
});
b = SK.create("SK.server.Http",{
    port:8001
});





