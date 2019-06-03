import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import './Admin_Student.css';
import Admin_NavBar from './Admin_NavBar';



class Admin_Student extends React.Component 
{
   
    render()
    {
        return (
            <div className= 'Admin-whole'>
                   <Admin_NavBar/>
               <div className="Admin-Card-Holder">
                    <div className = 'Admin-Cards'>
                
                        <List>
                            {/** Implemented a scrollbar */}
                        <Card className='Admin-studentholder' style={{maxHeight: 200, overflow: 'auto'}}> 
                            <div>
                                <b>
                                Students:
                                </b>
                                <Divider/>
                            </div>
                            <div className = "Admin-Searchbarholder">
                                <SearchIcon />
                                <InputBase 
                                placeholder="Search Students"
                                width= "50%"
                                />
                            </div>
                            <CardContent>
                            
                            </CardContent>
                            
                        </Card>   
                        </List>
                
                    </div>
                    <div className = 'Admin-Cards'>
                        {/** Implemented a scrollbar */}
                        <Card className='Admin-contactholder' style={{maxHeight: 200, overflow: 'auto'}}> 
                            <div>
                            <b>
                                Companies:
                            </b>
                            <Divider/>
                            </div>
                            <div className = "Admin-Searchbarholder">
                                <SearchIcon />
                                <InputBase color= "white"
                                placeholder="Search Companies"
                                />
                            </div>
                            <CardContent>
                            
                            </CardContent>
                        
                        </Card>   
                    </div>
                </div>
            </div>
          );
    }
}

export default Admin_Student;