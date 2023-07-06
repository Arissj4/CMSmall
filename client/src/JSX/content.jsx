import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../CSS/content.css";

function Content (props) {
    
    const [pagedetails, setPagedetails] = useState([]);
    const [pagecontent, setPagecontent] = useState([]);

    useEffect(() => {
        if (props.typeofpage === "mypage" || props.typeofpage === "managepage") {
            setPagedetails(props.allpages[props.indexcontent]);
            setPagecontent(JSON.parse(props.allpages[props.indexcontent].content));
        } else if (props.typeofpage === "pubpage") {
            if (props.pubpages[props.indexcontent] === undefined || props.pubpages[props.indexcontent].content === undefined){
                setPagedetails(['Not Found']);
                setPagecontent([{type: "header", size:'1', text: 'Content Not Found'}]);
            } else{
                setPagedetails(props.pubpages[props.indexcontent]);
                setPagecontent(JSON.parse(props.pubpages[props.indexcontent].content));
            }
        }
    }, [props.indexcontent, props.allpages, props.pubpages, props.typeofpage]);

    return (
        <>
            <Container fluid id="contform">
                <Row key={props.indexcontent}>
                    <Col md={12} id="title">
                        <h1>{pagedetails.title}</h1>
                    </Col>
                    <Col md={12} id="det">
                        <p>Author: {pagedetails.author}</p>
                        <p>Creation Date: {pagedetails.creationdate}</p>
                        <p>Publishing Date: {pagedetails.publicationdate}</p>
                        <p>Stauts: {pagedetails.status}</p>
                    </Col>
                </Row>
                <Row>
                    <Col id="page">
                        {pagecontent.map((item, index) => (
                            <>
                                {item.type === "header" ? React.createElement("h"+ item.size, {key: index, }, item.text) : null}   
                                {item.type === "p" ? React.createElement("p", {key: index, }, item.text) : null}
                                {item.type === "img" ? React.createElement("img", {key: index, src: 'http://localhost:5173/src/pictures/' + item.name, alt: item.name, }) : null}
                            </>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default Content;