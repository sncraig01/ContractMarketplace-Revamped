import React from "react";
import Card from '@material-ui/core/Card';
import RevTekHomeNavBar from "./RevTekHomeNavBar";
import Divider from '@material-ui/core/Divider';
import "./RevTekHome.css"

class RevTekHome extends React.Component
{

    componentDidMount()
    {

    }

    render()
    {
    return (
        <div>
            <RevTekHomeNavBar/>
            <div className="RevTekHome-Header">
                WELCOME TO REVTEK
            </div>
            <div className="RevTekHome-Body">
                <Card className='RevTekHome-Info'style={{maxHeight: 300, overflow: 'auto'}}>
                   <b>About us</b>
                   <Divider/>
                    <div>
                    Here at RevTek we are dedicated to connecting companies and students in order to foster
                    both individual and company growth. 
                    </div>
                </Card>
            </div>
        </div>
    )
    }
    
}

export default RevTekHome;
