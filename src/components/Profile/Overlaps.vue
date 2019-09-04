<template>
    <div class="Overlaps">
        <div class="container">
            <p class="text-accent mb-1">Overlaps</p>
            <div class="row">
                <div class="col-md-4" v-for="(a,i) in overlaps" v-bind:key="i">
                    <div class="box" v-bind:class="{'light-colors':lightTheme}">
                        <p>{{a[0].Day}}</p>
                        <p>{{a[0].Time}}</p>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <p>{{a[0].Course}}</p>
                                <p>{{a[0].Title}}</p>
                            </div>
                            <div class="col-md-6">
                                <p>{{a[1].Course}}</p>
                                <p>{{a[1].Title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { bus } from "../../../main";
export default {
    name:'Overlaps',
    props:{
        overlaps:{}
    },
    data(){
        return{
            lightTheme:false
        }
    },
    created(){
        /** Fetch Theme **/
        this.FetchTheme();
        bus.$on('ThemeChanged',x=>{this.FixTheme(x)});
    },
    methods:{
        FixTheme(x){
            this.lightTheme=x;
            localStorage.setItem('Theme',x);
        },
        FetchTheme(){
            if(localStorage.getItem('Theme')!==undefined){
                if(localStorage.getItem('Theme')==='true'){
                this.FixTheme(true)}else{this.FixTheme(false);}   
            }else{this.FixTheme(false)}
        }
    }
}
</script>
<style lang="scss" scoped>
.Overlaps{
    overflow: hidden;
    margin-bottom: 1rem;
}
.box{
    text-align: center;
    background-color: #202020;
    border: 1px solid #f4433650;
    border-radius: 0.2rem;
    padding: 1rem;
    height: 100%;
    p{
        margin: 0;
    }
    hr{
        border-color: #f4433650;
    }
}
.light-colors{
    background-color: #f5f5f5;
    border: 1px solid #f4433670;
    p{
        color: #424242;
        font-weight: 400;
    }
    hr{
        border-color: #f4433670;
    }
}
</style>