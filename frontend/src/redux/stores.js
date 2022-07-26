import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth"
import commentReducer from "./reducer/comment"
export default configureStore({
    reducer:{
        auth:authReducer,

    }
})