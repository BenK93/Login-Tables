import React, { PureComponent } from 'react'
import Avatar from 'react-avatar';
import MaterialTable from 'material-table';


export default class PersonalTable extends PureComponent {
    render() {
        return (
                <MaterialTable
                
                title="Personal Info"
                icons ={this.props.Icons}
                columns={[
                    { title: 'Name', field: 'name', },
                    { title: 'Team', field: 'team' },
                    { title: 'Joined Date', field: 'joinedAt' },
                    { title: 'Avatar', field: 'avatar', render: rowData => <Avatar maxInitials={1} size={40} round={true} src={rowData.avatar} />  },
                ]}
                data={[
                    { name: this.props.personalInfo.name,
                     team: this.props.personalInfo.team,
                     joinedAt: this.props.personalInfo.joinedAt,
                     avatar: this.props.personalInfo.avatar },                     
                ]}
                options={{
                    maxBodyHeight:200, 
                    headerStyle: {
                        backgroundColor: '#137d1c',
                        fontWeight: 700, 
                        color: '#FFF'
                      }
                }}
                 />
        )
    }
}
