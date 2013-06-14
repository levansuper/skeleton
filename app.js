require('./SK/SK');
SK.loader.init({
    "App": __dirname + "/app"
})



a = SK.define("SampleClass",{
    
});
s = SK.create('SampleClass',{
    a:function(){
        this.fireEvent('event',1,2,3);
    }
    
    
});
s.on('joni',function(a,b,c){
    console.log(a,b,c,1)    
})
s.on('joni',function(a,b,c){
    a++;
    b++;
    c++;
    console.log(a,b,c,2)    
})

b.a();


console.log(b.eventPool);

