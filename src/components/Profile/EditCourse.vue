<template>
    <div class="EditCourse" v-bind:class="{'light-colors':lightTheme}">
        <div class="overlay show"></div>
        <div class="modal">
            <img class="close" @click="OnClickClose()" src="../../../assets/svg/close.svg">
            <div class="content">
                <div class="text-center">
                    <p class="lead m-0 mt-3">Manage your courses</p>
                    <h3 class="lead-2 grey-3">Add or Remove your courses</h3>
                </div>
                <hr>
                <div class="form-container">
                    <form class="form">
                        <div class="line row" v-for="(course,index) in Courses" v-bind:key="index">
                            <div class="col col-md-1">
                                <div class="line-no">
                                    <p>{{index+1}}</p>
                                </div>
                            </div>
                            <div class="col col-md-6">
                                <div class="form-group">
                                    <input type="text" v-model="course.Code" class="form-control" placeholder="Course code" >
                                </div>
                            </div>
                            <div class="col col-md-4">
                                <div class="form-group">
                                    <input type="text" v-model="course.Section" class="form-control" placeholder="Section" >
                                </div>
                            </div>
                            <div class="col col-md-1">
                                <div @click="onClickDelete(index)" class="close-box">
                                    <img src="../../../assets/svg/close.svg">
                                </div>
                            </div>
                        </div>
                        <div @click="onClickAddNew()" class="add-new">
                            <img src="../../../assets/svg/add.svg">
                        </div>
                        <p class="error">{{errorMassage}}</p>
                    </form>
                </div>
                <button class="btn-save btn btn-sm" @click="onClickSave()">UPDATE</button>
            </div>
        </div>
    </div>
</template>

<script>

import {bus} from "../../../main";

export default {
    name:'EditCourseModal',
    data(){
        return{
            Courses:[],
            errorMassage:'',
            signedId:'',
            lightTheme:false
        }
    },
    created(){
        this.FetchTheme()
        this.getFormattedCourses()
    },
    methods:{
        OnClickClose(){bus.$emit('CloseEditCourse')},
        getFormattedCourses(){
            let signedData = JSON.parse(localStorage.signedData);
            this.signedId=signedData.ID;
            signedData.Courses.forEach(course=>{this.Courses.push({Code:course.split('(')[0],Section:course.split('(')[1].split(')')[0]});})
        },
        onClickSave(){
            if(!this.checkIfHasAnyError()){this.updateCourses()
            }else{this.errorMassage='Empty field error!'}
        },
        updateCourses(){
            bus.$emit('UpdatedCourses',this.ReFormatCourses())
        },
        ReFormatCourses(){
            let reFormatted = this.Courses.map( el =>{
                return el.Code.toUpperCase()+"("+el.Section.toUpperCase()+')';
            })
            return reFormatted;
        },
        checkIfHasAnyError(){
            let isError = false ;
            this.Courses.forEach( el => {
                if( el.Code.trim() === '' || el.Section.trim() === '' ){
                    isError = true ;
                }
            })
            return isError ;
        },
        onClickDelete(index){
            if(this.Courses.length > 3 ){
                this.Courses.splice(index,1);
                this.errorMassage='';
            }else{
                this.errorMassage='Minimun course level has reached!'
            }
        },
        onClickAddNew(){
            let last_el = this.Courses[this.Courses.length-1];
            if(last_el.Code.trim()!=='' && last_el.Section.trim()!==''){
                if(this.Courses.length >= 8){
                    this.errorMassage='Maximum course level has reached';
                }else{
                    this.Courses.push({Code:'',Section:''});
                    this.errorMassage=''
                }
            }else{
                this.errorMassage="You can't leave these field empty!"
            }
        },
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
.overlay{
    position: fixed;top: 0;left: 0;
    display: block;height: 100%;
    width: 100%;z-index: 10;background-color: rgba(0, 0, 0, 0.65);
}
.lead{font-size:1.5em}
.lead-2{font-weight:400}
.modal{
    position: fixed;
    height: auto;
    min-height: 30rem;
    transform: translate(-50%,-50%);
    border-radius: 0.5rem;
    padding: 1rem;top:50%;left:50%;
    display:block;width: 32rem;
    padding-bottom: 4rem;
    z-index: 11;background-color: #313131;
    .form-container{
        padding: 0 4rem;
    }
    .form{
        position: relative;
        .form-group{
            margin-bottom: 0
        }
        .form-control{
            background: #292929;
            border: none;
            color: #bdbdbd;
            border-radius: 0;
        }
    }
    .row{
        .col-md-6{
            border-right: 1px solid #313131;
        }.col{padding:0;margin-bottom:0.5rem}
        .line-no{
            text-align: center;padding-top: 0.5rem;
            background-color: #292929;
            height: 100%;border-right: 1px solid #313131;
            border-top-left-radius: 2rem;
            border-bottom-left-radius: 2rem;
            p{
                margin: 0;
            }
        }
    }
    .close-box{
        overflow: hidden;text-align: center;
        height: 100%;border-left: 1px solid #313131;
        background-color: #292929;padding-top: 0.4rem;
        border-top-right-radius: 2rem;padding-right: 0.1rem;
        border-bottom-right-radius: 2rem;
        img{
            height: 0.7rem;
            opacity: 0.4;
        }
        img:hover{
            opacity: 1;
        }
    }
}
.close{
    height: 1rem;
}
.add-new{
    background-color: #292929;
    position: absolute;width: 2.2rem;
    right: -0.8rem;bottom:-2rem;
    cursor: pointer;height: 2.2rem;
    padding-top: 0.35rem;text-align: center;
    border-radius: 50%;box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
    transition: background-color 0.3s ease-in-out;
    img{
        height: 1rem;
        opacity: 0.4;
        transition: opacity 0.3s ease-in-out;
    }
}
.add-new:hover{
    background-color: #009688;
    img{
        opacity: 1;
    }
}
.btn-save{
    border: 1px solid #9e9e9e;
    border-radius: 2rem;
    color: #9e9e9e;
    padding-left:1.5rem;
    padding-right: 1.5rem;
    position: absolute;
    transition: background-color 0.3s ease;
    left: 4rem;bottom: 2rem;
}
.btn-save:hover{
    background-color: #9e9e9e;
}
.error{
    color: #e57373;
    font-weight: 300;
}

.light-colors{
    .overlay{
        background-color: rgba(0, 0, 0, 0.8);
    }
    .modal{
        background-color: white;
        .form{
            .form-control{
                background-color: #eeeeee;
                color: #313131;
            }
        }
        .row{
            .col-md-6{
                border-color: white;
            }
            .line-no{
                background-color: #eeeeee;
                border-color: white;
                p{
                    color: #313131;
                }
            }
        }
        .close-box{
            background-color: #eeeeee;
            border-color: white;
            img{
                opacity: 1;
            }
            img:hover{
                opacity: 0.5;
            }
        }
    }
    .add-new{
        background-color: #8d8c8c;
        img{
            opacity: 1;
        }
    }
    .add-new:hover{
        background-color: #686868;
        img{
            opacity: 1;
        }
    }
    .btn-save{
        border-color: #424242;
        color: #424242;
    }
    .btn-save:hover{
        border-color: #eeeeee;
        color: #eeeeee;
    }
    .lead-2{
        color: #313131;
    }
}

@media (max-width: 576px) {
    .modal{
        max-width: 95%;
        .form-container{
            padding: 0 1rem;
            .col-md-1{
                max-width: 15%;
            }
        }
        .btn-save{
            left: 1rem;
        }
    }
}
</style>
