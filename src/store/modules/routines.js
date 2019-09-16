
import rData from "../../../data/json/routines/Fall2019/V1.json"
import courses from "../../../data/json/courses/V1.json"
import teachers from "../../../data/json/teachers/V1.json"


const state = {
    mRoutines:rData.routines,
    emptyRooms:rData.emptyRooms,
    labs:rData.labs,

    userRoutine:{},
    sRoutine:{},
    tabActiveDay:'',
    sActiveDay:'',

    fullSlots:["08:30-10:00","10:00-11:30","11:30-01:00","01:00-02:30","02:30-04:00","04:00-05:30"],
    shortSlots:["08:30","10:00","11:30","01:00","02:30","04:00"],
    fullDays:["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
    shortDays:["Sat","Sun","Mon","Tue","Wed","Thu","Fri"],
    assocDays:{Sun:'Sunday',Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Saturday'}
}

const getters = {
    userRoutine : state => state.userRoutine,
    sRoutine : state => state.sRoutine,
    routineDays : state => Object.keys(state.userRoutine),
    sRoutineDays : state => Object.keys(state.sRoutine),
    fullSlots : state => state.fullSlots,
    shortSlots : state => state.shortSlots,
    fullDays : state => state.fullDays,
    shortDays : state => state.shortDays,
    assocDays : state => state.assocDays,
    tabActiveDay : state => state.tabActiveDay,
    sActiveDay : state => state.sActiveDay,
    noOfClassesInWeek : state => Object.keys(state.userRoutine).length
}

const mutations = {
    onClickAdvFSeacrch : ( state , data ) => {
        let routine = {};
        let mCode = data.code.toUpperCase()+"("+data.section.toUpperCase()+")";
        for( let day in state.mRoutines ){
            for( let slot in state.mRoutines[day] ){
                let psRoutine = state.mRoutines[day][slot];
                psRoutine.forEach( rou => {
                    if( mCode === rou.Course ){
                        let r = rou;r.Day = day;r.Time = slot;
                        let viewType = localStorage.viewType;
                        if( viewType === 'table' ){
                            let index = state.shortSlots.indexOf(slot)
                            if( routine[day] ){routine[day].splice(index,1,r);
                            }else{routine[day]=[]
                                let c=0;while(c<6){routine[day].push('');c++}
                                routine[day].splice(index,1,r);
                            }
                        }else if( viewType === 'tab' ){
                            r.Name = ex.getTeacherName( r.Teacher );
                            if( routine[day] ){routine[day].push(r);
                            }else{routine[day]=[];routine[day].push(r)}
                        }
                    }
                })
            }
        }
        state.sActiveDay = Object.keys(routine)[0];
        state.sRoutine = routine;
    },
    changeRoutineFormat : ( state , type ) => {
        if( type === 'table' ){ 
            state.userRoutine = ex.tabToTable(state,state.userRoutine)
            sessionStorage.userRoutine = JSON.stringify(state.userRoutine);
        }
        else if( type === 'tab' ){ 
            state.userRoutine = ex.tableToTab(state.userRoutine )
            sessionStorage.userRoutine = JSON.stringify(state.userRoutine)
        }
    },
    onSelectedTab : ( state , day ) => {
        state.tabActiveDay = state.sActiveDay = day
    },
    routineOnCreateApp : state => {
        if(sessionStorage.userRoutine){
            state.tabActiveDay = ex.dayOfWeek();
            state.userRoutine=JSON.parse(sessionStorage.userRoutine)
        }
    },
    onClickSearch : ( state , data ) => {
        state.sActiveDay = ex.dayOfWeek();
        let codes = ex.getCourseCodes( data.level , data.term );
        let mergedCodes = ex.getMergedCodes( codes , data.section.toUpperCase() )
        state.sRoutine = ex.getRoutine( mergedCodes , data );
    },
    initUserRoutine : (state , data ) => {
        console.log('initUserRoutine=>',data);
        state.userRoutine =  ex.getRoutine( data.courses , data );
        sessionStorage.userRoutine = JSON.stringify(state.userRoutine)
    },
}

const actions = {
    async changeViewType({commit},type){
        await commit('changeRoutineFormat',type)
        commit('setViewType',type);
    },
    async initSignup({dispatch} , data ){
        let codes = ex.getCourseCodes( data.level , data.term )
        data.section = data.section.toUpperCase();
        let signupData = {id:data.id,name:data.name,
            email:data.email,level:data.level,
            term:data.term,section:data.section,
            courses:ex.getMergedCodes(codes,data.section)
        }
        await dispatch('apiSignupUser',signupData.id);
        dispatch('firebaseSignupUser',signupData);
    }
}

const ex = {
    dayOfWeek(){
        return Object.keys(state.assocDays)[new Date().getDay()];
    },
    getRoutine( courses , data ) {
        console.log('getRoutine=>',data);
        let routine = {};let viewType = localStorage.viewType;
        for( let day in state.mRoutines ){
            for( let slot in state.mRoutines[day] ){
                let psRoutine = state.mRoutines[day][slot];
                psRoutine.forEach( rou => {
                    if( courses.includes(rou.Course)){
                        let r = rou;r.Day = day;r.Time = slot;
                        r.Title = ex.getCourseTitle( data.level , data.term , rou.Course.split('(')[0] )
                        r.Name = ex.getTeacherName( r.Teacher );
                        if( viewType === 'table' ){
                            let index = state.shortSlots.indexOf(slot)
                            if( routine[day] ){
                                routine[day].splice(index,1,r);
                            }else{
                                routine[day]=[]
                                let c=0;while(c<6){routine[day].push('');c++}
                                routine[day].splice(index,1,r);
                            }
                        }else if( viewType === 'tab' ){
                            if( routine[day] ){routine[day].push(r);
                            }else{routine[day]=[];routine[day].push(r)}
                        }
                    }
                });
            }
        }
        if(viewType==='tab'&&routine[ex.dayOfWeek()]===undefined){ex.pushEmptyRoutine(routine)}
        return routine;
    },
    pushEmptyRoutine(routine){
        return routine[ex.dayOfWeek()]=[{Title:'There is no class today!',m:'Enjoy your day'}]
    },
    tabToTable( state , routine ){
        if(routine[ex.dayOfWeek()][0].m){delete routine[ex.dayOfWeek()]}
        for(let day in routine){
            let temp = routine[day];routine[day]=[];
            let c=0;while(c<6){routine[day].push('');c++}
            temp.forEach( r => {
                let i = state.shortSlots.indexOf(r.Time);
                routine[day].splice( i , 1 , r );
            })
        }
        return routine
    },
    tableToTab( routine ){
        for(let day in routine){routine[day]=routine[day].filter(r=>r!=='')}
        if(routine[ex.dayOfWeek()]===undefined){ex.pushEmptyRoutine(routine)}
        return routine
    },
    getTeacherName( initial ){
        let name ;
        teachers.forEach( teacher => {
            if( teacher.Initial === initial ){
                name = teacher.Name ;
                return;
            }
        })
        return name
    },
    getCourseTitle( level , term , code  ){
        let title = "";courses[level+term].forEach( course => {
            if(course.Code===code){title=course.Title}
        })
        if( title === '' ){
            for( let lt in courses ){
                courses[lt].forEach( course => {
                    if(course.Code===code){title=course.Title}
                })
            }
        }
        return title;
    },
    getMergedCodes( codes , section ){
        return codes.map( code => code+'('+section+')')
    },
    getCourseCodes( level , term ){
        return courses[level+term].map( item => item.Code )
    }
}

export default {
    state , actions , mutations , getters
}