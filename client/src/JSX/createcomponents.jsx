import React from "react";
import {Button, Container, Row, Col, Form, Image} from "react-bootstrap";
import '../css/createcomponents.css'


function Headerblock (props) {

    return (
        <>
            <Form>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label>Header size (1-6):</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={a => props.setheadersize(a.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </Form.Select>

                    <Form.Label>Header text:</Form.Label>
                    <Form.Control value={props.headerText} type="text" placeholder="Header text" onChange={a => props.setheadertext(a.target.value)}/>

                    <Button variant="primary" type="button" onClick={props.addheader} style={{marginTop:'1em', marginBottom:'1em'}}>
                        Add Header
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
};

function Paragraphblock (props) {
    return (
        <>
            <Form>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label>Paragraph text:</Form.Label>
                    <textarea value={props.paragraphText} onChange={a => props.setparagraphtext(a.target.value)} rows={5} cols={100}/>
                    <Button variant="primary" type="button" onClick={props.addparagraph} style={{marginTop:'1em', marginBottom:'1em'}}>
                        Add Paragraph
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
};

function Imageblock (props) {
    return (
        <>
            <Form id="imgform">
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label>Default Images:</Form.Label>
                    <Container className="allimages">
                        <Row className="justify-content-center">
                            {props.images.map((item, index) => (
                                <Col md={3}>
                                    <div key={index}>
                                        <Image key={index} src={"http://localhost:5173/src/pictures/" + item.name} width={150} height={150} rounded />
                                        <Form.Check type="radio" onChange={() => props.setImagename(item.name)} name="group1" />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <Button variant="primary" type="button" onClick={props.addimage} style={{marginTop:'1em', marginBottom:'1em'}}>
                        Add Image
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
};


const blocks = {Headerblock, Paragraphblock, Imageblock};
export default blocks;