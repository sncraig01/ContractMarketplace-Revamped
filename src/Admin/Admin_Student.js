import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import './Admin_Student.css';


class Admin_Student extends React.Component 
{
   
    render()
    {
        return (
            <div className= 'Admin-whole'>
                <div className = 'Admin-Cards'>
               
                     <List>
                         {/** Implemented a scrollbar */}
                    <Card className='Admin-header' style={{maxHeight: 200, overflow: 'auto'}}> 
                        <div>
                        <b>
                           Students:
                        </b>
                        </div>
                        <CardContent>
                        
                        </CardContent>
                        
                    </Card>   
                    </List>
            
                </div>
                <div className = 'Admin-Cards'>
                       {/** Implemented a scrollbar */}
                    <Card className='Admin-header' style={{maxHeight: 200, overflow: 'auto'}}> 
                        <div>
                        <b>
                            Availible Contracts:
                        </b>
                        </div>
                        <CardContent>
                        
                        </CardContent>
                    
                    </Card>   
                </div>
            </div>
          );
    }
}

export default Admin_Student;