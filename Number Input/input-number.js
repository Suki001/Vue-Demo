//数字输入框组件
function isValueNumber(value){
    return (/(^-?[0-9]+\.{ 1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{ 1}$)/).test(value+'');
}
Vue.component('input-number',{
    template:'\
            <div class="input-number">\
            <input \
                type="text" \
                :value="currentValue" \
                @change="handleChange">\
            <button \
                @click="handleDown" \
                :disabled="currentValue<=min">-</button>\
            <button \
                @click="handleUp" \
                :disabled="currentValue>=max" >+</button>\
            </div>',
    props:{//传递数据
        max:{ //使用v-bind指令动态地绑定了props的值，当父组件中的数据发生变化，也会传递給子组件
            type: Number,
            default: Infinity
        },
        min:{
            type: Number,
            default: -Infinity
        },
        value:{
            type: Number,
            default: 0
        },
    },
    data: function(){
        return{
            currentValue: this.value
        }
    },
    watch:{
        currentValue: function(val){  // 监听currentValue,当currentValue变化时，更新父组件中的value
            this.$emit('input',val);
            this.$emit('on-change',val);
        },
        value: function(val){  // 监听value,当父组件中value发生变化，更新子组件中的currentValue
            this.updateValue(val);
        }
    },
    methods:{
        handleDown: function(){
            if(this.currentValue<=this.min) return;
            this.currentValue-=1;
        },
        handleUp: function(){
            if(this.currentValue>=this.max) return;
            this.currentValue+=1;
        },
        updateValue: function(val){
            if(val>this.max) val=this.max;
            if(val<this.min) val=this.min;
            this.currentValue=val;
        },
        handleChange: function(event){
            var val=event.target.value.trim();
            var max=this.max;
            var min=this.min;
             if(isValueNumber(val)){
                 val=Number(val);
                 this.currentValue=val;
                 if(val>max){
                     this.currentValue=max;
                 }else if(val<min) {
                     this.currentValue = min;
                 }
             }else{
                 event.target.value=this.currentValue;
             }
        }
    },
    mounted: function(){
        this.updateValue(this.value);
    }
})