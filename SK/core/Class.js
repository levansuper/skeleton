SK.define('SK.core.Class',{
    mixins:{
      'listener':'SK.utils.Listener'  
    },
    extend:'SK.Base',
    init:function(){
    },
    constructor:function(config){
             SK.apply(this,config);
    }
    
    
})