import React, {useState, useEffect} from "react";
import { Container, Form, Table, Button, Nav, ListGroup, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import '../css/main.css'

const Main_content = (props) => {

    const [refresh, setRefresh] = useState(false);
    const [show, setShow] = useState(false);

    const [chorono, setChorono] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          const temp = await props.publishedpages();
          temp.sort((a, b) => (a.publicationdate > b.publicationdate ? 1 : -1));
          setChorono(temp);
          setRefresh(true);
        };
    
        fetchData();
      }, []);

    const senddata = (index) => {
        props.setIndexcontent(index);
        props.setPubpages(chorono);
    }

    return (
        <>
            {refresh ? null : <div id="loading">Loading...</div>}
            <Container fluid className="justify-content-md-center data">
                    <Row id="datadetails">
                        {chorono.map((item, index) => (
                            <Col md={4} key={index}>
                                <div id="title"><Link to={"/" + item.title + "/"} onClick={()=> senddata(index)}>{item.title}</Link></div>
                                <div id="details">
                                    <Row>
                                        <Col sx={6} id="" style={{textAlign: 'right'}}>
                                            Author:
                                        </Col>
                                        <Col sx={6} id="" style={{textAlign: 'left', padding: '0px'}}>
                                            {item.author}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sx={6} id="" style={{textAlign: 'right'}}>
                                            Publishing Date:
                                        </Col>
                                        <Col sx={6} id="" style={{textAlign: 'left', padding: '0px'}}>
                                            {item.publicationdate}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        ))}
                    </Row>
            </Container>
        </>
    );
}

export default Main_content;