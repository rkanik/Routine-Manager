<template>
    <div class="signedBox pt-1">
        <div class="container">
            <div class="row text-light">
                <div class="col">
                    <div class="col-box">
                        <label>Overview</label>
                        <p class="lead">
                            <span>Course: </span><strong>{{5}}</strong><span> | </span>
                            <span>Class: </span><strong>3 days</strong><span> | </span>
                        </p>
                    </div>
                </div>

                <div class="col">
                    <div class="col-box">
                        <label>Name</label>
                        <p class="lead">{{userName}}</p>
                    </div>
                </div>

                <div class="col" v-if="userEmail!=null">
                    <div class="col-box">
                        <label>Email</label>
                        <p class="lead" >{{userEmail}}</p>
                    </div>
                </div>
                
                <div class="col">
                    <div class="col-box">
                        <label>Semester info</label>
                        <p class="lead">
                            <span>Level: </span><strong>{{userLevel}}</strong><span> | </span>
                            <span>Term: </span><strong>{{userTerm}}</strong><span> | </span>
                            <span>Section: </span><strong>{{userSection}}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="quickSettings text-center">
                <div class="btn-con">
                    <button @click="showEditCourseModal()">Edit Course</button>
                    <button @click="changeViewType('table')" :class="{active:viewType=='table'}">Table View</button>
                    <button @click="changeViewType('tab')" :class="{active:viewType=='tab'}">Card View</button>
                    <button @click="OnClickUpdateInfo()">Update info</button>
                    <button @click="OnClickTeachers()" v-bind:class="{active:tabTeachers}">Teachers</button>
                    <button class="active" @click="ChangeTheme()">{{theme}}</button>
                    <button @click="showRoutineSearchForm()" v-bind:class="{active:searchExpanded}">{{BtnSearch}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { mapGetters , mapMutations } from "vuex";

export default {
    name:'SignedBox',
    props:{
        signedData:Object,
    },
    data(){
        return{
            tableViewActive:Boolean,
            tabViewActive:Boolean,
            tabTeachers:false,
            lightTheme:false,
            searchExpanded:false,
            
            BtnSearch:'SEARCH',
            theme:'DARK'
        }
    },
    created(){
        /** Fetch Theme **/
        //this.FetchTheme();
        //this.fetchViewType();
    },
    computed:{
        ...mapGetters([
            'userName','userEmail',
            'userLevel','userTerm',
            'userSection','viewType'
        ]),
    },
    methods:{
        ...mapMutations(['setViewType']),
        OnClickTeachers(){
            if( this.tabTeachers ){
                bus.$emit('CollapseTeachers');
                this.tabTeachers=false;
            }else{
                bus.$emit('ShowTeachers');
                this.tabTeachers=true;
            }
        },
        OnClickUpdateInfo(){
            bus.$emit('ClickedUpdate');
        },
        showEditCourseModal(){
            bus.$emit("OnClickEditCourse");
        },
        changeViewType(x){
            this.$store.dispatch('changeViewType',x)
        },
        fetchViewType(){
            let type = localStorage.getItem('ViewType');
            if( localStorage.getItem('ViewType')){
                if(type==='Table'){this.tableViewActive=true;this.tabViewActive=false}
                else if(type==='Tab'){this.tabViewActive=true;this.tableViewActive=false;}
            }
        },
        showRoutineSearchForm(){
            if( this.BtnSearch === 'SEARCH' ){
                this.searchExpanded=true;
                bus.$emit('ShowRSF');
                this.BtnSearch = "COLLAPSE";
            }else{
                this.searchExpanded=false;
                bus.$emit('HideRSF');
                this.BtnSearch = "SEARCH";
            }
           
        },
        FixTheme(x){
            this.lightTheme=x;
            bus.$emit('ThemeChanged',x);
            localStorage.setItem('Theme',x);
            this.SetThemeButton(x);
        },
        FetchTheme(){
            if(localStorage.getItem('Theme')!==undefined){
                if(localStorage.getItem('Theme')==='true'){
                this.FixTheme(true);this.SetThemeButton(true)}
                else{this.FixTheme(false);this.SetThemeButton(false)}   
            }else{this.FixTheme(false);this.SetThemeButton(false)}
        },
        SetThemeButton(x){
            if(x){this.theme='LIGHT';
            }else{this.theme='DARK';}
        },
        ChangeTheme(){
            if(this.theme==='DARK'){
                this.FixTheme(true);
            }else{this.FixTheme(false)}
        }
    }
}
</script>
<style lang="scss" scoped>

.signedBox{
    background-color: #191919;
    padding: 0 1rem;
    position: relative;
    width: 100%;
    box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
    box-sizing: border-box;
    .col-md-3{
        margin-top: 0.2rem;
        padding-left: 1rem;
        padding-right: 0;
    }
    .col-md-3:last-child{
        padding-right: 1rem;
    }
    .col-box{
        background-color: #202020;
        padding: 1rem;height: 100%;
        box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
        border-radius: 4px;
        p,label{
            padding: 0;
            margin: 0;
        }
        label{
            font-size: 14px;
            color: #009688;
        }
        p{
            font-size: 1.1em;
        }
        span{
            color: #bdbdbd;
        }
    }
    .col:first-child{
        border-left: none;
    }
    .col:last-child{
        border-right: none;
    }
}
.quickSettings{
    width: 100%;
    padding: 1.4rem 1rem;
    overflow: hidden;
}
.btn-con{
    button{
        margin: 0.2rem 0.2rem;
        background-color: #191919;
        border:1px solid #313131;
        color: #9e9e9e;border-radius: 2rem;
        padding: 0.3rem 1rem;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 0.9em;
        letter-spacing: 1px;
    }
    button:hover{
        background-color: #313131;
    }
    .active{
        border-color: #009688;
        color: #009688;
    }
}

// LIGHT THEME //
.light-colors{
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
    .col{
        background-color: white;
        box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
        .lead{
            color: #313131;
        }
    }
    .btn-con{
        button{
            background-color: white;
            border: none;color: #424242;
            box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
            font-weight: 400;
        }
        .active,button:hover{
            background-color: #e0f2f1;
            color: #009688;
        }
    }
}

@media (max-width: 576px) {
    .signedBox{
        padding-top: 0.8rem !important;
    }
    .col-sm-6{
        max-width: 50%;
        margin-bottom: 1rem;
    }
    .col-sm-6:last-child{
        padding-right: 0 !important;
    }
    .container{
        padding-left: 0;
    }
    
}
</style>
