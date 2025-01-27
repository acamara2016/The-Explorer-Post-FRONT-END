import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  BA,
  BDiv,
  BStrong,
  BH3,
  BH4,
  BImg
} from 'bootstrap-4-react';
import axios from 'axios';
import Like from './buttons/LikeButton'
import Follows from '../follow.component';
import {Link} from 'react-router-dom';
const style = {
  h: {
    fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif'
  },
  header: {
    lineHeight: '1',
    logo: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontSize: '2.25rem'
    }
  },
  navigator: {
    position: 'relative',
    zIndex: '2',
    height: '2.75rem',
    overflowY: 'hidden'
  },
  jumbovision: {
    header: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontSize: '3rem'
    }
  },
  featured: {
    card: {
      height: 'min-content',
      background:'transparent',
      image: {
        borderRadius: '0 3px 3px 0'
      }
    }
  },
  blog: {
    post: {
      marginBottom: '4rem',
      title: {
        fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
        fontSize: '2.5rem',
        marginBottom: '0.25rem'
      },
      meta: {
        marginBottom: '1.25rem',
        color: '#999'
      }
    },
    pagination: {
      marginBottom: '4rem',
      button: {
        borderRadius: '2rem'
      }
    }
  },
  footer: {
    padding: '2.5rem 0',
    color: '#999',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderTop: '.05rem solid #e5e5e5'
  }
}

const Sidebar = props => (
  <React.Fragment>
    <BDiv p="3">
      <Follows/>
    </BDiv>
  </React.Fragment>
)



const Featured = props => (
  <Row mb="2"> 
      {props.features.map((feature)=>{
         return <Col key={feature._id} id={feature._id} md="6">
         <Card flex="md-row" mb="4" shadow="sm" style={style.featured.card}>
           <Card.Body display="flex" flex="column" alignItems="start">
             <BStrong display="inline-block" mb="2" text="primary">@<Link to={`/user/${feature.authorId}`}>{feature.authorId}</Link></BStrong>
             <BH3 mb="0" style={style.h}>
               <BA text="dark" href="#">{feature.title}</BA>
             </BH3>
             <BDiv text="muted" mb="1">{feature.published}</BDiv>
             <Card.Text mb="auto">
               {feature.content.substring(0,20)}...
             </Card.Text>
             <Link to={'/p/'+feature._id}>more details</Link>

           </Card.Body>
           <BImg src={feature.photo} flex="auto" display="none lg-block" style={style.featured.card.image} />
         </Card>
       </Col>
      })}
    </Row>
)


const Top = props => (
  <div>
  <Container>
  <Row>
  <Col col="12 md-8"><Featured features={props.data} /></Col>
  <Col col="6 md-4"><Sidebar/></Col>
  </Row>
</Container>
</div>
)




class Post extends Component {
  constructor(){
    super();
    this.state = {
      post:[]
    }
  }
  componentDidMount(){
    axios.get('https://csci4140-group1.herokuapp.com/api/post/all')
        .then((response) => {
            //console.log(response.data);
            this.setState({
                post : response.data
            })
    });
  }
  render() {
    return (
      <React.Fragment>
        <Top data={this.state.post} />
      </React.Fragment>
    );
  }
}

export default Post;