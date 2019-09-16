<template>
    <div id="Settings">
        <div class="set-group rounded">
            <div class="container">
                <p class="set-group-title tAccent mt-2 mb-4">Basic settings</p>
                <div class="row pb-3 mt-2">
                    <label class="text-accent col m-0">Light theme</label><br>
                    <div class="switch-con col">
                        <c-switch class="float-right" :name='"theme"' :checked='false'/>
                    </div>
                </div>
                <div class="row pb-3 mt-4">
                    <label class="text-accent col m-0">Accent colors</label><br>
                    <div class="switch-con col">
                        <Accents class="float-right"/>
                        <!-- <button @click="onChangeAccent('teal')">teal</button>
                        <button @click="onChangeAccent('orange')">orange</button> -->
                    </div>
                </div>
                <div class="row pb-3 mt-3">
                    <label class="text-accent col m-0">Ramadan time</label><br>
                    <div class="switch-con col">
                        <c-switch class="float-right" :name='"ramadan"' :checked='false'/>
                    </div>
                </div>
                <div class="row pb-3 mt-3">
                    <label class="text-accent col m-0">Card view</label><br>
                    <div class="switch-con col">
                        <c-switch class="float-right" :name='"cardView"' :checked='false'/>
                    </div>
                </div>
                <div class="row pb-3 mt-3">
                    <label class="text-accent col m-0">Sidebar collapsed</label><br>
                    <div class="switch-con col">
                        <c-switch class="float-right" :name='"sidebar"' :checked='isSidebarCollapsed'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Switch from "../components/switch/Switch";
import Accents from "../components/layouts/Accents";
import { mapGetters, mapMutations } from 'vuex';

export default {
    name:'Settings',
    components:{'c-switch':Switch,Accents},
    data(){return{
        tabActive:'Table',
        lightTheme:true,
    }},
    methods:{
        ...mapMutations(['onChangeAccent'])
    },
    computed: {
        ...mapGetters(['isSidebarCollapsed'])
    },
}
</script>

<style lang="scss" scoped>
#Settings{
    padding: 1rem 0;
    width: 44rem;
    margin: 2rem auto;
}
.set-group{
    padding: 1rem;
    background-color: #202020;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
    .set-group-title{
        text-transform: uppercase;
        font-weight: bold;
    }
    label{
        color: #bdbdbd;
    }
    .row{
        border-bottom: 1px solid #282828;
    }
    .row:last-child{
        border-bottom: none;
    }
}
.tab-view {
    position: relative;
    border: 1px solid #212121;
    cursor: pointer;
    overflow: hidden;
    border-radius: 4px;
    margin-left: 1rem;
    padding: 0;
    img{
        height: 100%;width: 100%;
        transition: transform 0.3s ease-in-out;
    }
    p{
        position: absolute;
        bottom: 0; left: 1rem;
        z-index: 100;
        color: white;
    }
    
}
.tab-view img:hover{
    transform: scale(1.2);
}
.active{
    border-color: #009688;
}
// THEAMIG //
.light-colors{
    background-color: #fafafa;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
    border: none;
}
</style>
