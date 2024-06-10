import { configureStore } from "@reduxjs/toolkit";

import postReduser from './post.slice';
import { useDispatch } from "react-redux";
export const store  = configureStore(
    {
        reducer:{
            post:postReduser
        }
    }
)
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()