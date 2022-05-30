import React from "react";
import NavigationBar from "../../components/NavBar/NavigationBar";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div className = "Home">
                <div className="navigationbar-container">
                    <NavigationBar/>
                </div>
           </div>
        )
    }
}

export default Home;