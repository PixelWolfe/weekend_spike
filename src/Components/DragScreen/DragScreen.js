// App.js
import React from 'react';
import Draggable from 'react-draggable';
import {connect} from 'react-redux';


// <Draggable
// onStop={this.handleEvent}
// defaultPosition={{x: this.state.x, y: this.state.y}}
// >
//     <div className="drag-box">
//         <span>{JSON.stringify(this.state)}</span>
//     </div>
// </Draggable> 


class DragScreen extends React.Component {
    state = {
        boxes: this.props.reduxState.setPosition
      }
    
      handleEvent = (e, data, index) => {
          
            this.setState(state => ({
                boxes: state.boxes.map(
                box => (box.id === index ? Object.assign(box, { x: data.x, y: data.y }) : box)
              )
            }));

        console.log(e, data)
        const payload = this.state.boxes
        this.props.dispatch({type: 'SET_POSITION', payload})
        }

render(){
    return(
        <>
        {JSON.stringify(this.state)}
        {
            this.state.boxes.length > 0 ?
            this.state.boxes.map((box)=>
                <Draggable
                onStop={(e,data)=>this.handleEvent(e, data, box.id)}
                defaultPosition={{x: box.x, y: box.y}}
                key={box.id}
                >
                    <div className="drag-box">
                        <span>{box.name}<br/>
                        <br/>
                        {JSON.stringify(box.x)}<br/>
                        <br/>
                        {JSON.stringify(box.y)}
                        </span>
                    </div>
                </Draggable>
                ):
                <>
                </>
        }
    </>
    )
}
}

const mapStateToProps=(reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(DragScreen);

