import { configureStore } from "@reduxjs/toolkit";
import slicer from "../../authSlice"
import slicer2 from "../../captionSlice"

const store = configureStore({
    reducer: {
        auth: slicer,
        authCaption: slicer2
    }
})
export default store