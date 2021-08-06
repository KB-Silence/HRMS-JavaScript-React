import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDefault } from "../store/Actions/naviActions";

export default function ActiveItem() {
    
    const dispatch = useDispatch()
    return useEffect(() => {
        dispatch(setDefault())
    })
}