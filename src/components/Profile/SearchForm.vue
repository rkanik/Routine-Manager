<template>
    <div class="search-form" v-bind:class="{'light-colors':lightTheme}">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <select class="form-control" v-model="formData.level">
                            <option value="NONE">Select Level</option>
                            <option value="L1">L1 - First Year</option>
                            <option value="L2">L2 - Second Year</option>
                            <option value="L3">L3 - Third Year</option>
                            <option value="L4">L4 - Fourth Year</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <select class="form-control" v-model="formData.term">
                            <option value="NONE">Select Term</option>
                            <option value="T1">Term - 1</option>
                            <option value="T2">Term - 2</option>
                            <option value="T3">Term - 3</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 col-sec">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Enter Section" v-model="formData.section">
                    </div>
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-outline-secondary btn-go" @click="onClickShow()">SHOW</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/** IMPORTS */
import {bus} from "../../../main";
export default {
    name:'SearchForm',
    props:{d:Object},
    data(){
        return{

            /** Booleans */
            lightTheme:false,

            /** Objects */
            formData:this.d

            /** Arrays */

            /** Strings */
            
        }
    },
    created(){
        this.FetchTheme();
        bus.$on('ThemeChanged',x => this.FixTheme(x));
    },
    methods:{
        onClickShow(){
            bus.$emit('SearchFormData',this.formData);
        },
        FixTheme(x) {
            this.lightTheme = x;
            localStorage.setItem("Theme", x);
        },
        FetchTheme() {
            if (localStorage.getItem("Theme") !== undefined) {
                if (localStorage.getItem("Theme") === "true") {
                    this.FixTheme(true);
                } else {
                    this.FixTheme(false);
                }
            } else {
                this.FixTheme(false);
            }
        }
    }
}
</script>
<style lang="scss" scoped>

.search-form{
    padding-top: 1rem;
    background-color: #191919;
    .form-group{
        .form-control {
            background-color: transparent;
            border-color: #313131;
            color: #bdbdbd;
            option{
                background-color: #191919;
            }
        }
    }
    .btn-go {
        width: 100%;
        border-color: #424242;
        letter-spacing: 2px;
    }
}

.light-colors{
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
    .form-group{
        .form-control {
            background-color: transparent;
            border-color: #e0e0e0;
            color: #313131;
            option{
                background-color: white;
            }
        }
    }
    .btn-go {
        border-color: #e0e0e0;
    }
}

@media (max-width: 576px) {
    .search-form{
        .col-md-4,.col-md-2{
            max-width: 50%;
        }
        .col-md-4:first-child,
        .col-sec{
            padding-right: 0;
        }
    }
}

</style>

