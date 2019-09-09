<template>
    <div class="container">
        <table>
            <thead><tr><th>Day/Time</th><th v-for="(slot, index) in slots" :key="index">{{slot}}</th></tr></thead>
            <tbody>
                <tr v-for="(day, index) in routine" :key="index">
                    <th>{{aDays[index]}}</th>
                    <td v-for="(rou, index) in day" :key="index">
                        <p>{{rou.Course}}</p><p>{{rou.Teacher}}</p><p>{{rou.Room}}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: "TableView",
    props:{routine:Object,slots:Array,aDays:Object},
};
</script>
<style lang="scss" scoped>
table{
    width: 100%;
    margin: 1rem 0;
    background-image: url('../../assets/images/footer-bg.jpg');
    border-collapse: collapse;
    thead{
        tr{
            background-color: #006064;
        }
        th{
            padding: 0.4rem 0 0.4rem 1rem;
            font-size: 1em;
            font-weight: 500;
            color: #bdbdbd;
            border-right: 1px solid #313131;
        }
        th:last-child{
            border-right-color: #006064;
        }th:first-child{
            border-left: 1px solid #006064;
        }
    }
    tbody{
        tr{
            background-color: #1919199c;
        }
        td,th{
            padding: 0.6rem 0 0.6rem 1rem;
            border: 1px solid #292929;
            p{
                margin: 0 ;
                font-weight: 300;
                font-size: 15px;
            }
        }
    }
}
.card{
    background-color: #191919;
    padding: 0 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #202020;
    .card-title,label{
        margin-bottom: 0;
    }
    label{
        font-size: 0.9em;
    }
}

.light-colors{
    thead{
        tr{
            background-color: #009688;
        }
        th{
            color: white;
            border-right: 1px solid #f5f5f5;
        }
        th:last-child{
            border-right-color: #009688;
        }th:first-child{
            border-left: 1px solid #009688;
        }
    }
    tbody{
        tr{
            background-color: white;
        }
        td,th{
            border: 1px solid #dfdfdf;
            color: #424242;
            font-weight: 400;
            p{
                color: #424242;
                font-weight: 400;
            }
        }
    }  
}
.light-card{
    background-color: white !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
    border: none;
    .card-title{
        color: #424242;
    }
}
</style>
