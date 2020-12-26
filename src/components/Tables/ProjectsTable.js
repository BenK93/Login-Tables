import React, { PureComponent } from 'react';
import Avatar from 'react-avatar';
import MaterialTable from 'material-table';

export default class ProjectsTable extends PureComponent {
    render() {
        return (
            <div>
                <MaterialTable
                title="Projects Data Table"
                icons ={this.props.Icons}
                columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Name', field: 'name' },
                    { title: 'Score', field: 'score', type: 'numeric',
                     render: rowData => 
                     {if(rowData.score >= 90 ){
                        return  <Avatar  size={40} round={true} value={String(rowData.score)} color={'green'}/>
                     }else if(rowData.score >=  70){
                        return <Avatar  size={40} round={true} value={String(rowData.score)} color={'grey'} />
                     }else{
                        return <Avatar  size={40} round={true} value={String(rowData.score)}color={'red'} />  
                     }
                    }
                    },
                    { title: 'Durations Days', field: 'durationInDays', type: 'numeric' },
                    { title: 'Total Bugs', field: 'bugsCount', type: 'numeric' },
                    { title: 'Made Deadline', field: 'madeDadeline' },
                ]}
                data={
                    this.props.projects.map(p => ({id: p.id, name: p.name, score: p.score, durationInDays: p.durationInDays ,bugsCount: p.bugsCount , madeDadeline: p.madeDadeline}))
                }
                options={{
                    filtering: true, 
                    headerStyle: {
                        backgroundColor: '#5f63ea',
                        fontWeight: 700, 
                        color: '#FFF'
                      }
                }}
                />
            </div>
        )
    }
}
