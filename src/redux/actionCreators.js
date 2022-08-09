import {BUG_ADDED, BUG_RESOLVED} from "../redux/actions"



export const bugAdded = (description) => ({
    type:BUG_ADDED,
    payload:{
        description:description
    }
})

export const bugResolved = (id) => ({
    type:BUG_RESOLVED,
    payload:{
        id
    }
})