<template>
    <div id="header" class="text-left text-light">
        <div class="container">
            <h4 class="pt-3 app-name">Routine Manager CSE <span class="beta orng-5">BETA{{version}}</span></h4>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Student ID" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button" id="button-addon2">SIGNIN</button>
                </div>
            </div>
            <div class="SignedIn"> 
                <p class="lead">{{signedId}}</p>
                <button class="btn btn-outline-danger btn-sm">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>

/** IMPORTS */
import pac from "../../../package.json";

export default {
    name:'Header',
    data(){
        return{
            signedId:'',inputId:'',
            isSignedIn:false,
            lightTheme:false,
            tabCollapsed:true,
            version:pac.version,
            active:'Student'
        }
    },
    created(){

        /** Fetch Theme **/
        // this.FetchTheme();
        // bus.$on('ThemeChanged',x=>{this.FixTheme(x)});

        // bus.$on('signedData', data =>{this.isSignedIn=true;this.signedId=data.ID;});
        // if( localStorage.isSignedIn ){
        //     this.isSignedIn=true;
        //     this.signedId=JSON.parse(localStorage.signedData).ID;
        // }
    },
    methods:{
        onTabItemSelected(x){
            this.active = x ;
            bus.$emit(x,x);
        },
        onClickMenuToggler(){
            if( this.tabCollapsed ){
                this.tabCollapsed=false;
            }else(this.tabCollapsed=true)
        },
        onClickSignin(){
            if( this.inputId.trim()!==''){bus.$emit('showLoading');bus.$emit('SigninStudent',this.inputId.trim());}
        },
        onClickLogout(){
            
            localStorage.removeItem('signedData');
            this.signedId='',this.inputId='',this.isSignedIn=false;
            bus.$emit('loggedOut');
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
#header{
    height: 4rem;overflow: hidden;
    background-color: #191919;
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
