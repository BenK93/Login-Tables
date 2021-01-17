
import React, { Component } from 'react';
import PersonalTable from "../Tables/PersonalTable";
import ProjectsTable from "../Tables/ProjectsTable";
import Statistics from "../General/Statistics";
import * as actions from "../../store/actions/authAction"
import {connect } from "react-redux";
import { Button, Divider } from 'antd';
import {LogoutOutlined} from '@ant-design/icons'
import {Pages, Search, ChevronLeft,ChevronRight,LastPage,FirstPage,ArrowDownward,ViewColumn,AddBox,Clear, FilterList} from '@material-ui/icons';

const Icons = ({
    Filter :() => <FilterList/>, 
    Search :() => <Search/>,
    Page :() => <Pages/>,
    NextPage :() => <ChevronRight/>,
    PreviousPage :() => <ChevronLeft/>,
    LastPage :() => <LastPage/>,
    FirstPage :() => <FirstPage/>,
    SortArrow :() => <ArrowDownward/>,
    ViewColumn :() => <ViewColumn/>,
    AddBox :() => <AddBox/>,
    Clear :() => <Clear/>,
})

class InfoPage extends Component {
    state = {
        projects: [],
        personalInfo: {
            name: "",
            team: "",
            joinedAt: "",
            avatar: "",
        }
    }

    async componentWillMount () {
        let token = window.sessionStorage.getItem('token');
        let name = window.sessionStorage.getItem('name');
        let team = window.sessionStorage.getItem('team');
        let joinedAt = window.sessionStorage.getItem('joinedAt');
        let avatar = window.sessionStorage.getItem('avatar');
        const res = await fetch('https://private-052d6-testapi4528.apiary-mock.com/info',{
            headers: {
                "Content-Type": "application/json",
                "Token": token,
              } 
            }
        )
        const data = await res.json();
        this.setState({ projects: data});
        this.setState(prevState => {
            let personalInfo = Object.assign({}, prevState.personalInfo);  
            personalInfo.name = name;                 
            personalInfo.team = team;                  
            personalInfo.joinedAt = joinedAt;               
            personalInfo.avatar = avatar;             
            return { personalInfo}; 
          });
    }

    redirectHome = () => {
        this.props.logout()
        this.props.history.push('/');
    }

    render() {        
        return (
            <div>                
                <Divider orientation="right" plain>
                    <p className="welcome-user">
                        Welcome {this.state.personalInfo.name}  
                    </p>
                    <Button
                    onClick={this.redirectHome}
                    type="primary"
                    icon={<LogoutOutlined />} 
                    htmlType="submit">
                        Logout
                    </Button>
                </Divider>
                
                <PersonalTable
                    Icons={Icons}
                    personalInfo={this.state.personalInfo}
                />
                <Statistics
                    projects={this.state.projects}
                />
                <ProjectsTable
                    Icons={Icons}
                    projects={this.state.projects}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}
export default connect(null, mapDispatchToProps)(InfoPage)