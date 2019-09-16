<template>
    <div id="header" class="bgMedium tPrimary text-left">
        <div class="container overflow-hidden position-relative h-100">
            <h4 class="pt-3 app-name">Routine Manager CSE <span class="beta orng-5">BETA{{version}}</span></h4>
            <div class="input-group" v-if="!isSignedIn" v-bind:class="{inputError:inputError}" >
                <input type="text" v-model="inputId" @keyup="onKeyUp" class="form-control" placeholder="Student ID" aria-describedby="btnSignin">
                <div class="input-group-append">
                    <button @click="onClickSignin()" class="btn btn-primary" type="button" id="btnSignin">SIGNIN</button>
                </div>
            </div>
            <div class="SignedIn" v-if="isSignedIn"> 
                <p class="lead">{{userId}}</p>
                <button class="btn btn-outline-danger btn-sm" @click="onClickLogout">Logout</button>
            </div>
            <div class="progress bSecondary" v-bind:class="{animate:isLoading}">
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>

/** IMPORTS */
import pac from "../../../package.json";
import { mapGetters, mapMutations } from 'vuex';

export default {
    name:'Header',
    data(){
        return{
            inputId:'',
            version:pac.version,
            inputError:false
        }
    },
    computed:{
        ...mapGetters(['isSignedIn','isLoading','userId']),
    },
    methods:{
        ...mapMutations(['onClickLogout']),
        onKeyUp( event ){
            if(  this.inputId.trim() !== ''  ){
                this.inputError = false
                if( event.keyCode === 13 ){
                    this.$store.dispatch('signinUser',this.inputId )
                }
            }else{this.inputError=true}
        },
        onClickSignin(){
            if( this.inputId.trim() !== '' ){
                this.inputError = false
                this.$store.dispatch('signinUser',this.inputId )
            }
            else{this.inputError = true}
        }
    }
}
</script>

<style lang="scss" scoped>
#header{
    height: 4rem;overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.2);
    .app-name{
        letter-spacing: 1px;
        font-weight: 400;
        user-select: none;
        float: left;
    }
    .beta{font-size: 0.6rem}
    .tab-items{
        display: none;
    }
    .menu-toggle{display: none}
    .progress {
        display: block;
        height: 2px;width: 100%;
        position: absolute;
        left: 0;right: 0;bottom: 0.2rem;
        background-color: #191919;
        span {
            display: none;position: absolute;
            top: 0;left: 0;width: 100%;height: 100%;
            background-color: #313131;
        }
    }
    .animate {
        span {
            display: block;width: 50%;
            animation: progress_anim 1s linear infinite;
        }
    }
}
@keyframes progress_anim {
    0% {width: 0%;left: 0}
    50% {left: 0;width: 50%}
    100% {width: 10%;left: 90%}
}
.rounded{
    border-radius: 0.5rem !important;
}
.SignedIn{
    float: right;
    margin-top: 1rem;
    .lead{float: left}
    .btn{float: right;margin-left: 1rem}
}
.input-group{
    float: right;
    width: 16rem;
    margin-top: 1rem;
    .form-control,
    .btn-primary{
        height: 2rem;
        font-size: 1em;
        padding: 0.2rem 1rem ;
    }
    .form-control{
        background: transparent;
        border-color: #424242;
        color: #bdbdbd;
    }
    .btn-primary{
        font-size: 0.9em;
        letter-spacing: 1px;
        border-color: #009688;
        background-color: #009688;
    }
    .btn-primary:hover{
        border-color: #00796b;
        background-color: #00796b;
    }
}

.inputError{
    input{border-color: #f44336 !important}
    button{
        border-color: #f44336 !important;
        background-color: #f44336 !important
    }
}

// Themeing //
.light-colors{
    background-color: white !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
    border: none;
    .app-name{
        color: #313131;
    }
    .lead{
        color: #313131;
    }
    .form-control{
        border-color: #bdbdbd;
        color: #313131;
    }
    .menu-toggle.active{
        background-color: #f5f5f5;
    }
    .tab-items{
        ul{
            li{
                color: #313131 !important;
            }
            li.active,
            li:hover{
                background-color: #eeeeee !important;
            }
        }
    }

}

@media (max-width: 576px) {
    #header{
        height: auto;padding-bottom: 1rem;
        .app-name{
            text-align: center;
            float: unset;line-height: 1.5;
            .beta{display: none}
        }
        .SignedIn{
            float: unset;margin-top: 0;
            .lead{
                text-align: center;
                float: unset;width: 100%;
                margin-bottom: 0.5rem;
            }
            .btn{float: right}
        }
        .menu-toggle{
            display: block;float: left;
            padding: 0.5rem;cursor: pointer;
            img{
                height: 1.1rem;
            }
        }
        .menu-toggle.active{
            background-color: #212121;
        }
        .input-group{
            float: right;
            margin-top: 0.5rem;
        }
        .tab-items{
            height:auto;display: block;
            max-height: 0;
            transition: max-height 0.4s ease-in-out;
            ul{
                margin: 0;
                padding: 1rem 3rem;
                li{
                    text-align: center;
                    list-style-type: none;
                    padding: 0.4rem 1rem;
                    border-radius: 2rem;
                    color: #9e9e9e;
                    margin-bottom: 0.2rem;
                    user-select: none;
                }
                li.active,
                li:hover{
                    background-color: #212121;
                }
            }
        }
        .tab-items.show{
            max-height: 11rem;
        }
    }
}
</style>
