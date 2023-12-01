import React, {Component} from 'react'
import * as C from "./CommentStyle";
import * as D from "../FindDetail/FindDetailStyle";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

class CommentList extends Component {

   constructor(props) {
      super(props);
      this.state = {
        show: false,
        selectedPostId: null // to store the selected post ID for deletion
      };
    }
  
    handleClose = () => {
      this.setState({ show: false });
    };
  
    handleShow = (postId) => {
      this.setState({ show: true, selectedPostId: postId });
    };
  
    handleDelete = () => {
      // Implement your delete logic here using this.state.selectedPostId
      // Once the deletion is done, close the modal
      this.setState({ show: false });
    };

   rendList = () => this.props.list.map( (v,k) => {

      
      return(
         <C.CommentListStyle>
            <C.DeleteContainer>
               <C.UserRow>
                  <Col>{v.userid}</Col>
               </C.UserRow>
               <C.DeleteButton variant="warning" type="submit" onClick={() => this.handleShow(v.p_id)}>삭제</C.DeleteButton>
                <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <D.ModalTitleSize>댓글이 삭제되었습니다.</D.ModalTitleSize>
            </Modal.Header>
            <Modal.Footer>
              
              <D.ModalButton variant="warning" onClick={this.handleDelete}>
                완료
              </D.ModalButton>
            </Modal.Footer>
          </Modal>

            </C.DeleteContainer>
            <C.ContentRow>
               <Col><span>{v.content}</span></Col>
            </C.ContentRow>
            <C.DateRow>
               <Col>{new Date(v.date).toLocaleDateString()}</Col>
            </C.DateRow>
         </C.CommentListStyle>
      )
   })

   render() {
      return(
         <li>
            {this.rendList()}
         </li>
      )
   }
}

export default CommentList