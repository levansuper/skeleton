SK.define('SK.chain.Chain',{ 
    extend:'SK.core.Class',       
    constructor:function(config){
        this.chain = [];
        this.currentIndex = 0;
        this.callParent(config);
    },
    next:function(){
        var me = this;
        var ci = me.currentIndex;
        me.currentIndex++;
        var cf = me.getFunction(ci);
        var args = Array.prototype.slice.call(arguments, 0);
        args.push(function() {
            me.next.apply(me, arguments);
        })
        return cf.apply(me, args);
    },
    getFunction:function(index){
        return this.chain[index] || function(){};
    },
    add:function(fn){
        var me= this;
        fn.prototype.next = function(){return me.next.call(me)}
        me.chain.push(fn);
        return me;
    },
    run:function(){
        var me =  this;
        
        me.next.apply(me,arguments);
    }
})
