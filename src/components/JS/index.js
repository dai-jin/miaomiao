import Vue from 'vue';
import MessageBox from './MessageBox';

export const messageBox = (function(){

    return function( opts ){  //配置参数

        var defaults = {   //默认值  相当于是独立的弹窗
            title : '',
            content : '',
            cancel : '',
            ok : '',
            handleCancel : null,
            handleOk : null
        };
    
        var MyComponent = Vue.extend(MessageBox);

        for(var attr in opts){
            defaults[attr] = opts[attr];
        }

        var vm = new MyComponent({
            el : document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild( vm.$el );
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild( vm.$el );
                }
            }
        });

        document.body.appendChild( vm.$el );

    };

})();