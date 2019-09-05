<template>
    <div class="card">
        <div class="card-top">
            <h5 class="card-title mb-0">{{data.title}}</h5>
            <div class="card-overlay"></div>
            <img :src='require(`../../../assets/images/${data.img}`)' class="card-img-top">
        </div>
        <div class="card-body pt-2">
            <p class="lead"><span class="accent">Code: </span>CSE101</p>
            <p class="lead"><span class="accent">Time: </span>{{data.time}}</p>
            <p class="lead"><span class="accent">Room: </span>{{data.room}}</p>
            <hr>
            <p class="lead"><span class="accent">Teacher: </span>{{data.teacher}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'card',
    props:['data']
}
</script>

<style lang="scss">
    .card{
        width: 16rem;min-height: 20rem;
        background-color: #212121;border: none;
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