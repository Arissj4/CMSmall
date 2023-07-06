import React, { useState } from "react";
import {Button, Container, Row, Col, Form} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import '../css/managepage.css'

const Managepage = (props) => {
    
    const [webname, setWebname] = useState(props.websitename);
    const [editname, setEditname] = useState(true);

    // Check if any changes have been made
    if (props.changemanagement === true) {
        props.getallpages();
        props.setChangemanagement(false);
    }

    const edit = (index) => {
        props.setTypeofpage("managepage");
        props.setIndexedit(index);
        props.getusers();
    }

    const del = async (id) => {
        const pageid = {pageid: id}
        props.delpage(pageid);
        props.setChangemanagement(true);
    }

    const name = () => {
        if (editname === true){
            setEditname(false);
        }else{
            setEditname(true);
        }
        props.setChangemanagement(true);
    }

    const chnagename = () => {
        props.updatewebsitename({webname: webname});
        props.setChangewebname(true);
        props.setChangemanagement(true);
        setEditname(true);
    }

    const senddata = (index) => {
        props.setTypeofpage("managepage");
        props.setIndexcontent(index);
    }

    return (
        <>
            <Container fluid>
                <Row id="change-name">
                    <Col >
                        <Form.Label>Website Name: </Form.Label>
                    </Col>
                    <Col >
                        <Form.Control type="text" placeholder={webname} onChange={t => setWebname(t.target.value)} disabled={editname}/>
                    </Col>
                </Row>
                <Row id="change-name-buttons">
                    <Button type="button" onClick={() => name()} >Edit</Button>
                    <Button type="button" onClick={() => chnagename()} >Change</Button>
                </Row>
            </Container>

            <Container fluid className="justify-content-md-center data">
                    <Row id="datadetails">
                        {props.allpages.map((item, index) => (
                            <Col md={4} key={index}>
                                <p id="title"><Link to={"/" + item.title + "/"} onClick={()=> senddata(index)}>{item.title}</Link></p>
                                <p id="details">
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
                                    <Row>
                                        <Col sx={6} id="" style={{textAlign: 'right'}}>
                                            Creation Date:
                                        </Col>
                                        <Col sx={6} id="" style={{textAlign: 'left', padding: '0px'}}>
                                            {item.creationdate}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sx={6} id="" style={{textAlign: 'right'}}>
                                            Status:
                                        </Col>
                                        <Col sx={6} id="" style={{textAlign: 'left', padding: '0px'}}>
                                            {item.status}
                                        </Col>
                                    </Row>
                                </p>
                                <Row>
                                    <Col sx={6} id="actionslabel">
                                        Actions:
                                    </Col>
                                </Row>
                                <p id="actions">
                                    <LinkContainer to={`/editpage/`}>
                                        <Button variant="primary" type="button" onClick={() => edit(index)}>Edit</Button>
                                    </LinkContainer>
                                    <Button variant="primary" type="button" style={{marginLeft: '1em'}} onClick={() => del(item.pageid)} >Delete</Button>
                                </p>
                            </Col>
                        ))}
                    </Row>
            </Container>
        </>
    );
};

export default Managepage;