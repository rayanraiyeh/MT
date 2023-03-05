import styled from '@emotion/styled';
import axios from 'axios';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setColumnsData } from '../../../redux/users/jobsDataSlice';
import Card from './card';

const mapStateToProps = (state) => ({
  columnsData: state.jobsDataSlice.columnsData,
});

const Container = styled.div`
  display: flex;
`;
const ListEmpsAndCars = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const ColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 50h;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

class JobsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if ((source.droppableId !== destination.droppableId)) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      this.props.dispatch(setColumnsData({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },

      }))

    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      this.props.dispatch(setColumnsData({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      }))
    }
  };
  handleSaveClick = (columns) => {
    let isValid = true
    Object.keys(columns).map((item) => {
      if (columns[item].title === "Employees") {
        let findCarsInEmps = columns[item].items.find((x) =>
          x.isCar
        )
        if (findCarsInEmps) {
          isValid = false
          toast.error(`cannot add ${findCarsInEmps.type} in Employees column !`)
        }
        else if (columns[item].items.length === 5) {
          isValid = false
          toast.error(`please put the employees in the specified job !`)
        }
      }
      else if (columns[item].title === "Cars") {
        let findEmpsInCars = columns[item].items.find((x) =>
          x.isEmployee
        )
        if (findEmpsInCars) {
          isValid = false
          toast.error(`cannot add ${findEmpsInCars.type} in Cars column !`)
        }
      }
      else {
        let filterNbofEmps = []
        filterNbofEmps = columns[item].items.filter((x) =>
          x.isEmployee
        )
        let filterNbOfCars = columns[item].items.filter((x) =>
          x.isCar
        )
        if (filterNbofEmps.length > 2) {
          isValid = false
          toast.error(`cannot add more than 2 employees in ${columns[item].title} !`)
        }
        if (filterNbOfCars.length > 1) {
          isValid = false
          toast.error(`cannot add more than 1 Car in ${columns[item].title} !`)
        }
        if (filterNbOfCars.length === 1 && filterNbofEmps.length === 0) {
          isValid = false
          toast.error(`please add an employee in ${columns[item].title} !`)
        }
        if (filterNbofEmps.length <= 2 && filterNbofEmps.length > 0 && filterNbOfCars.length === 0) {
          isValid = false
          toast.error(`please add a car in ${columns[item].title} !`)
        }
      }
    }
    )
    if (isValid) {
      let data =  this.props.columnsData
      var config = {
        method: "post",
        url: 'http://localhost:3001/save_jobs_details',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          if (response.status === 200) {
            toast.success(`Successfully saved !`)
          }
          else {
            toast.error(`Error: Save Failed !`)
          }
        })
        .catch((error) => {
          // toast.error(`Error: Save Failed !`)
        });
    };
  }

  render() {
    return (
      <div>
          <div style={{ position: "fixed", width: "inherit", marginTop: "-18px"}}>
          <MDBBtn onClick={() => this.handleSaveClick(this.props.columnsData)} style={{ width: "57px", height: "53px" }} floating tag='a'>
            <MDBIcon style={{ fontSize: "24px", marginTop: "6px" }} fas icon='save' />
          </MDBBtn>
      </div>
      <DragDropContext
        onDragEnd={(result) => this.onDragEnd(result, this.props.columnsData)}
      >
        <Container >
          <ColumnStyles>
            {this.props.columnsData && Object.entries(this.props.columnsData).map(([columnId, column], index) => {
              return (
                <div style={{marginTop:"40px"}} key={index}>
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided, snapshot) => (
                      <ListEmpsAndCars
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <Title>{column.title}</Title>
                        {column.items.map((item, index) => (
                          <div key={index}>
                            <Card item={item} index={index} />
                          </div>
                        ))}
                        {provided.placeholder}
                      </ListEmpsAndCars>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </ColumnStyles>
        </Container>
        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
      </DragDropContext>
      </div>

    );
  }
}
export default connect(mapStateToProps)(JobsDetails);




























