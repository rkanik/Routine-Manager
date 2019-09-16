<template>
    <div class="signedBox bgMedium pt-1">
        <div class="container">
            <div class="row text-light">
                <div class="col">
                    <div class="col-box bgSecondary">
                        <label class="tAccent">Overview</label>
                        <p class="lead tMedium">
                            <span>Course: </span><strong>{{noOfCourses}}</strong><span> | </span>
                            <span>Class: </span><strong>{{noOfClassesInWeek}} days</strong>
                        </p>
                    </div>
                </div>

                <div class="col">
                    <div class="col-box bgSecondary">
                        <label class="tAccent">Name</label>
                        <p class="lead tMedium">{{userName}}</p>
                    </div>
                </div>

                <div class="col" v-if="userEmail!=''">
                    <div class="col-box bgSecondary">
                        <label class="tAccent">Email</label>
                        <p class="lead tMedium" >{{userEmail}}</p>
                    </div>
                </div>
                
                <div class="col">
                    <div class="col-box bgSecondary">
                        <label class="tAccent">Semester info</label>
                        <p class="lead tMedium">
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
                    <button class="br bgPrimary tSecondary" @click="showEditCourse">Edit Course</button>
                    <button class="br bgPrimary tSecondary" @click="changeViewType('table')" :class="{active:viewType=='table'}">Table View</button>
                    <button class="br bgPrimary tSecondary" @click="changeViewType('tab')" :class="{active:viewType=='tab'}">Card View</button>
                    <button class="br bgPrimary tSecondary" @click="OnClickUpdateInfo()">Update info</button>
                    <button class="br bgPrimary tSecondary" @click="OnClickTeachers()" v-bind:class="{active:tabTeachers}">Teachers</button>
                    <button class="br bgPrimary tSecondary active" @click="ChangeTheme()">{{theme}}</button>
                    <button class="br bgPrimary tSecondary" @click="showRoutineSearchForm()" v-bind:class="{active:searchExpanded}">{{BtnSearch}}</button>
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
    computed:{
        ...mapGetters([
            'userName','userEmail',
            'userLevel','userTerm','noOfCourses',
            'userSection','viewType','noOfClassesInWeek'
        ]),
    },
    methods:{
        ...mapMutations(['setViewType','showEditCourse']),
        changeViewType(type){this.$store.dispatch('changeViewType',type)}
    }
}
</script>
<style lang="scss" scoped>

.signedBox{
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
        padding: 1rem;height: 100%;
        box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
        border-radius: 4px;
        p,label{
            padding: 0;
            margin: 0;
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
        border-radius: 2rem;
        padding: 0.3rem 1rem;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 0.9em;
        letter-spacing: 1px;
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
