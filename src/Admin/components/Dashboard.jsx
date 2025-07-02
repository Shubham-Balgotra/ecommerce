import { Grid } from '@mui/material'
import React from 'react'
import Achievements from './dashboard_components/Achievements'
import MonthlyOverview from './dashboard_components/MonthlyOverview'

const Dashboard = () => {
  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Achievements/>
            </Grid>
            <Grid item xs={12} md={8}>
                <MonthlyOverview/>
            </Grid>
        </Grid>
    </div>
  )
}

export default Dashboard