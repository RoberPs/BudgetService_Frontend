"use client"
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export const ProgressBar = ({percentage}:{percentage:number}) => {
  return (
    <div className='flex justify-center p-10'>
        <CircularProgressbar 
           value={percentage}
           
           styles={buildStyles({
              pathColor:percentage >=100 ? '#dc2626' :'#efb509',
              trailColor:'#e1e1e1',
              textColor:percentage >=100 ? '#dc2626' :'#efb509',
              textSize:'10px'
            })}
           text={`${percentage}% Gastado`}
           

        />
    </div>
  )
}

