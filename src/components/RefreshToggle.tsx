import { FormControlLabel, Switch } from "@mui/material"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../hooks/useRedux"
import { toggleRefreshActive } from "../redux/refresh/refreshSlice"

export const RefreshToggle = () => {
    const dispatch = useDispatch()
    const refreshActive = useAppSelector(({ refresh }) => refresh.active)

    const handleToggleClick = useCallback(() => {
        dispatch(toggleRefreshActive())
    }, [dispatch])

    return (
        <FormControlLabel 
            label="V2" 
            control={<Switch checked={refreshActive} 
            onClick={handleToggleClick} />} 
        />
    )
}

export default RefreshToggle