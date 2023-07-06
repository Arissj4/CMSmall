import React, {useState} from "react";
import {Button, Row, Col, Container} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import '../css/allpages.css'

const Allpages = (props) => {

    // Check if any changes have been made
    if (props.changemypage === true) {
        props.getallpages();
        props.setChangemypage(false);
    }

    const edit = (index) => {
        props.setTypeofpage("mypage");
        props.setIndexedit(index);
        props.getusers();
    }

    const del = async (id) => {
        const pageid = {pageid: id}
        props.delpage(pageid);
        props.setChangemypage(true);
    }

    const senddata = (index) => {
        props.setTypeofpage("mypage");
        props.setIndexcontent(index);
    }

    return (
        <>
            <Container fluid className="justify-content-md-center data">

                <Row id="addbutton">
                    <LinkContainer to="/createpage/">
                        <Button variant="primary" type="submit" style={{marginTop:'1em', marginBottom:'1em'}}>
                            Add Page
                        </Button>
                    </LinkContainer>
                </Row>

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
                            {console.log(item.author)}
                            {item.author === props.userinfo.username ?
                                <>
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
                                </>
                            : null}
                            
                        </Col>
                    ))}   
                </Row>
            </Container>
        </>
    );
}

export default Allpages;