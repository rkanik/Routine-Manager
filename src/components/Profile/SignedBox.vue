<template>
    <div class="signedBox pt-1" v-bind:class="{'light-colors':lightTheme}">
        <div class="container">
            <div class="row text-light">
                <div class="col-md-3 col-sm-6">
                    <div class="col">
                        <label>Name</label>
                        <p class="lead">{{signedData.Name}}</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="col">
                        <label>Email</label>
                        <p class="lead" v-if="signedData.Email">{{signedData.Email}}</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="col">
                        <label>Semester</label>
                        <p class="lead"><span>Level: </span>{{signedData.Level}} <span>Term: </span>{{signedData.Term}}</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="col">
                        <label>Section</label>
                        <p class="lead"><span>Section: </span>{{signedData.Section}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="quickSettings text-center">
                <div class="btn-con">
                    <button @click="showEditCourseModal()">Edit Course</button>
                    <button @click="changeViewType('Table')" v-bind:class="{active:tableViewActive}">Table View</button>
                    <button @click="changeViewType('Tab')" v-bind:class="{active:tabViewActive}">Card View</button>
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
        this.FetchTheme();
        this.fetchViewType();
    },
    methods:{
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
            localStorage.setItem('ViewType',x);
            this.fetchViewType();
            bus.$emit('SettingChanged','ViewType');
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
    box-sizing: border-box;
    .col-md-3{
        margin-top: 0.2rem;
        padding-left: 1rem;
        padding-right: 0;
    }
    .col-md-3:last-child{
        padding-right: 1rem;
    }
    .col{
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
