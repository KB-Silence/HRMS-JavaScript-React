import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDefault } from "../store/Actions/naviActions";

export default function HandleActiveMenuItem() {
    
    const dispatch = useDispatch()
    return useEffect(() => {
        dispatch(setDefault())
    })
}