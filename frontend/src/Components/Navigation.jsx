import React, { useState } from "react";
import {AppBar, Box, Tab, Tabs, Toolbar, Typography} from "@mui/material"
const Navigation = () => {
    const [value, setValue] = useState();
  return (
    <div>
        <AppBar>
            <Toolbar>
                <Typography variant="h4">JWT</Typography>
                <Box sx={{ marginLeft: "auto"}}>
                    <Tabs textColor="inherit" onChange={(e, val) => setValue(val)} 
                    value={value}
                    >
                        <Tab label="Login"/>
                        <Tab label="Signup"/>
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navigation