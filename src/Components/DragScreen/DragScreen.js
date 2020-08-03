// App.js
import React from 'react';
import Draggable from 'react-draggable';
import {connect} from 'react-redux';

class DragScreen extends React.Component {
    state = {
        boxes: this.props.reduxState.setPosition
      }
    
      onStart(e) {
        console.log('onstart e',e)
        let elems = document.getElementsByClassName('react-draggable');
        let zIndexArray = [];
        console.log('elems', elems)
        console.log('elems length', elems.length)
        for(let i = 0; i < elems.length; i++) {
          elems[i].style.position = 'relative';
          console.log('zIndex',elems[i].style.zIndex)
          if(elems[i].style.zIndex === '' || elems[i].style.zIndex === 0){
              elems[i].style.zIndex = i + 1;
          }
          zIndexArray.push({index: i, zIndex:elems[i].style.zIndex})
        }
        console.log('zIndex Array before', zIndexArray)
        zIndexArray.sort((a,b)=>a.zIndex - b.zIndex);
        console.log('zIndex Array after', zIndexArray)

        const highestZIndex = zIndexArray.pop()
        console.log('before', e.currentTarget.style.zIndex)
        if(Number(e.currentTarget.style.zIndex) !== Number(highestZIndex.zIndex)){
            e.currentTarget.style.zIndex = Number(highestZIndex.zIndex) + 1;
        }
        console.log('after', e.currentTarget.style.zIndex)

        console.log('highest zindex', e.currentTarget.style.zIndex);
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
                onStart={this.onStart}
                
                >
                    <div className="drag-box" style={{backgroundColor: box.color}}>
                        
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

