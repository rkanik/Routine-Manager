<template>
    <div class="card p-0 text-left">
        <div class="card-top">
            <h5 class="card-title mb-0">{{data.Title}}</h5>
            <div class="card-overlay"></div>
            <img :src='imgSrc' class="card-img-top">
        </div>
        <div class="card-body pt-2">
            <p class="lead"><span class="accent">Code: </span>{{data.Course}}</p>
            <p class="lead"><span class="accent">Time: </span>{{data.Time}}</p>
            <p class="lead"><span class="accent">Room: </span>{{data.Room}}</p>
            <hr>
            <span class="text-info">Teacher</span>
            <p class="lead"><span class="accent">Initial: </span>{{data.Teacher}}</p>
            <p class="lead" v-if="data.Teacher"><span class="accent">Name: </span>{{data.Name}}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name:'card',
    props:{
        data:Object,
        imgSrc:String
    },
}
</script>

<style lang="scss" scoped>
    .card{
        width: 16rem !important;
        min-height: 20rem;
        background-color: #212121;
        border: none  !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.2);
        color: #e0e0e0;overflow: hidden;
        .card-top{
            width: 100%;position: relative;height: 8rem;
            .card-overlay{
                width: 100%;height: 100%;
                position: absolute;
                z-index: 10;
                background: rgb(33,33,33);
                background: linear-gradient(0deg, 
                rgba(33,33,33,1) 0%, 
                rgba(33,33,33,0.95) 30%, 
                rgba(33,33,33,0.75) 60%, 
                rgba(15,15,15,0.50) 80%, 
                rgba(0,0,0,0) 100%);
            }
            .card-img-top{
                width: 100%;height: 100%;
                object-position: center;
                object-fit: cover;
                z-index: 0;
                transition: transform 0.5s ease-in-out;
            }
            .card-title{
                position: absolute;bottom: 0;
                z-index: 20;left: 1rem;
            }
        }
        .card-body{
            z-index: 10;
            background-color: #212121;
            .lead{
                font-size: 1em;
                margin-bottom: 0;
                font-weight: 400;
                color: #bdbdbd;
            }
            .accent{
                font-weight: 300;
            }
            hr{
                border-color: #313131;
            }
            .text-info{
                font-size: 0.9em;
            }
        }
        
    }
    .card:hover{
        .card-top{
            .card-img-top{
                transform: scale(1.2);
                z-index: 0;
            }
        }
    }
</style>