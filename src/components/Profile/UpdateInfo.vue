<template>
    <div v-bind:class="{'light-colors':lightTheme}">
        <div class="overlay show"></div>
        <div class="mod">
            <div v-if="showLoader" class="loader">
                <Loader1 class="loading"/>
            </div>
            <img class="close" @click="closeModal()" src="../../../assets/svg/close.svg">
            <div class="content">
                <div class="text-center">
                    <h5 class="lead mt-3">Update your information</h5>
                    <h3 class="lead2 grey-3">Please fill up the form correctly</h3>
                </div>
                <hr>
                <form>
                    <div v-if="error" class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> Fill the information correctly.
                        <button type="button" @click="error=false" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="form-group">
                        <input v-bind:class="{disabled:data.btn==='UPDATE'}" type="text" v-model="data.ID" class="form-control" placeholder="Enter your ID">
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="data.Name" class="form-control" placeholder="Enter your Name" >
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="data.Email" aria-describedby="helpId" placeholder="Enter email address">
                        <small id="helpId" v-bind:class="{'red-3':emError}" class="form-text text-muted ml-4">{{emMes}}</small>
                    </div>
                    <div class="form-group">
                        <div class="arrow_down">
                            <img src="../../../assets/svg/arrow_down.svg">
                        </div>
                        <select class="form-control" v-model="data.Level">
                            <option value="NONE" selected>Select Level</option>
                            <option value="L1">Level - 1</option>
                            <option value="L2">Level - 2</option>
                            <option value="L3">Level - 3</option>
                            <option value="L4">Level - 4</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <div class="arrow_down">
                            <img src="../../../assets/svg/arrow_down.svg">
                        </div>
                        <select class="form-control" v-model="data.Term">
                            <option value="NONE" selected>Select Term</option>
                            <option value="T1">Term - 1</option>
                            <option value="T2">Term - 2</option>
                            <option value="T3">Term - 3</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="data.Section" placeholder="Enter your Section">
                    </div>
                    <button class="btn btn-outline-info btn-sm mt-2 ml-2" @click="OnClickSave()" type="button">{{btn}}</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
/** IMPORTS */
import {bus} from "../../../main";
import db from "../../../firebase/firebaseInit";

/** COMPONENTS */
import Loader1 from "../../Loaders/Loader1";

export default {
    name: "UpdateInfo",
    props: {
        data:{}
    },
    components:{Loader1},
    data() {
        return {
            /** Booleans */
            error: false,showLoader:false,
            lightTheme:false,emError:false,

            /** Objects */
            courses: {},

            /** Strings */
            btn:this.data.btn,
            emMes:'You can leave this empty',
            
        };
    },
    created(){
        this.FetchTheme();
    },
    methods: {
        OnClickSave() {
            if(this.CheckForError()){this.error=true;}
            else if( this.data.Email !== '' && !this.ValidateEmail(this.data.Email) ){
                this.emMes = 'Please enter a valid email address';this.emError=true;}
            else{
                this.showLoader=true;
                this.emMes = 'You can leave this empty'
                this.emError=false;this.error=false
                if(this.btn==='SAVE'){bus.$emit("SaveStudent")
                }else if(this.btn==='UPDATE'){bus.$emit("UpdateStudent")}
            }
        },
        CheckForError(){
            let err = false ;
            if( this.data.ID.trim() === '' || this.data.Name.trim()==='' || this.data.Section.trim()===''){
                err = true ;
            }else if( this.data.Level === 'NONE' || this.data.Term === 'NONE' ){
                err = true ;
            }else{
                err = false ;
            }
            return err;
        },
        ValidateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        getCourseCodes(){
            return this.data[this.data.level+this.data.term].map(x=>{return x.Code+'('+this.data.section.toUpperCase()+')'})
        },
        closeModal() {
            bus.$emit("CloseUpdateModal");
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
};
</script>
<style lang="scss" scoped>
.overlay {
    position: fixed;top: 0;left: 0;
    display: none;height: 100%;width: 100%;
    z-index: 10;background-color: rgba(0, 0, 0, 0.65);
}
.show {
    display: block;
}
.loader{
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;top: 0;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 12;
    .loading{
        margin-top: calc(50% - 20px);
    }
}
.mod{
    position: fixed;
    transform: translate(-50%, -50%);
    border-radius: 4px;transition: all 0.3s ease-in-out;
    padding: 1rem;padding-bottom: 2rem;
    top: 50%;left: 50%;z-index: 11;
    height: min-content;width: 30rem;
    background-color: #313131;
    form {
        padding: 0 2rem;
        .form-group{
            margin-bottom: 0.8rem;
            position: relative;
        }
        .form-control {
            color: #bdbdbd;
            border: none;
            background-color: #292929;
            border-radius: 2rem;
            padding-left: 1.5rem;
        }
        .alert-danger{
            transition: all 0.3s ease-in-out;
            background-color: transparent;
            border-color: #f44336;
            color: #f44336;
        }
    }
}
.lead2{
    font-weight: 400;
}
.red-3{
    color: #e57373 !important;
}
.disabled{
    pointer-events: none;
    color: #424242 !important;
}
.close{
    height: 1rem;
}
.arrow_down{
    position: absolute;
    right: 0;width: 2rem;
    height: 100%;pointer-events: none;
    background-color: #292929;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    padding-top: 0.4rem;
    img{
        width: 1rem;
    }
}

.light-colors{
    .overlay{
        background-color: rgba(0, 0, 0, 0.75);
    }
    .mod{
        background-color: white;
        .form-control{
            background-color: #eeeeee;
            color: #212121;
        }
        .form-control.placeholder{
            color: #757575;
        }
    }
    .lead,.lead2{
        color: #212121
    }
    .disabled{
        color: #9e9e9e !important;
    }
    .arrow_down{
        background-color: #eeeeee;
    }
}

@media (max-width: 576px) {
    .mod{
        max-width: 95%;
        form{
            padding: 0 1rem;
        }
    }
}
</style>
