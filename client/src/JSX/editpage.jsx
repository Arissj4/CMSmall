import React, {useState} from "react";
import {Alert, Button, Form, Row, Col} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import blocks from "./createcomponents";
import '../css/editpage.css'

function Editpage (props){

    // States of edit page
    const [pageid, setPageid] = useState(props.allpages[props.indexedit].pageid);
    const [title, setTitle] = useState(props.allpages[props.indexedit].title);
    const [author, setAuthor] = useState(props.allpages[props.indexedit].author);
    const [creationdate, setCreationdate] = useState(props.allpages[props.indexedit].creationdate);
    const [publicationdate, setPublicationdate] = useState(props.allpages[props.indexedit].publicationdate);

    
    // Message for creating page
    const [message, setMessage] = useState('');

    setTimeout(() => {
        setMessage('');
    }, 10000);

    // State of navigation
    const [nav, setNav] = useState(false);
    const [nav2, setNav2] = useState(false);

    // Message for reordering
    const [reordermessage, setReordermessage] = useState('');

    setTimeout(() => {
        setReordermessage('');
    }, 10000);

    // Render page after reordering
    const [change, setChange] = useState(false);

    // Show change author
    const [changeauthor, setChangeauthor] = useState(false);

    // Contents of page
    const [contents, setContents] = useState(JSON.parse(props.allpages[props.indexedit].content));

    // ----------------------------------------------

    // Header block details and creation
    const [headerSize, setHeaderSize] = useState('1');
    const [headerText, setHeaderText] = useState('');

    const addheader = (event) => {
        event.preventDefault();
        if (headerText === '') {
            alert('Please enter text for header');
            return;
        }
        const headertag = {type: 'header', size: headerSize, text: headerText};
        setContents(contents => [...contents, headertag])
        setHeaderblock(false);
    }

    // ----------------------------------------------

    // Paragraph block details and creation
    const [paragraphText, setParagraphText] = useState('');

    const addparagraph = (event) => {
        event.preventDefault();
        if (paragraphText === '') {
            alert('Please enter text for paragraph');
            return;
        }
        const paratag = {type: 'p', text: paragraphText};
        setContents(contents => [...contents, paratag])
        setParagraphblock(false);
    }

    // ----------------------------------------------

    // Image block details and creation
    const [imagename, setImagename] = useState('');
    const [images, setImages] = useState([]);

    const addimage = (event) => {
        event.preventDefault();
        if (imagename === '') {
            alert('Please enter name for image');
            return;
        }
        const imagetag = {type: 'img', name: imagename};
        setContents(contents => [...contents, imagetag])
        setImageblock(false);
    }

    // ----------------------------------------------

    // Control buttons of create blocks

    const [headerblock, setHeaderblock] = useState(false);
    const [paragraphblock, setParagraphblock] = useState(false);
    const [imageblock, setImageblock] = useState(false);

    const openheaderform = (event) => {
        event.preventDefault();
        if (headerblock === true) {
            setHeaderblock(false);
        }else {
            setParagraphblock(false);
            setImageblock(false);
            setHeaderblock(true);
        }
    };

    const openparagraphform = (event) => {
        event.preventDefault();
        if (paragraphblock === true) {
            setParagraphblock(false);
        }else {
            setHeaderblock(false);
            setImageblock(false);
            setParagraphblock(true);
        }
    };

    const openimageform = async (event) => {
        event.preventDefault();
        if (imageblock === true) {
            setImageblock(false);
        }else {
            setHeaderblock(false);
            setParagraphblock(false);
            setImageblock(true);
            setImages(await props.getpics());
        }
    };

    // ----------------------------------------------

    // Buttons of edit components
    const deletecontent = (index) => {
        setContents(contents.filter((a) => a !== contents[index]));
        setChange(!change);
    }

    const upindex = (index) => {
        setReordermessage('');
        if (index === 0){
            setReordermessage('Cannot move up.');
        } else {
            let a = contents[index];
            let b = contents[index-1];
            contents[index] = b ;
            contents[index-1] = a;
        }
        setChange(!change);
    }

    const downindex = (index) => {
        setReordermessage('');
         if (index === contents.length-1){
            setReordermessage('Cannot move down.');
        }else {
            let a = contents[index];
            let b = contents[index+1];
            contents[index] = b ;
            contents[index+1] = a;
        }
        setChange(!change);
    }

    // ----------------------------------------------

    const handlesubmit = (event) => {
        event.preventDefault();

        if (title === '') {
            setMessage("Title cannot be empty.");
            return;
        }

        let countheader = 0;
        let countpara = 0;
        let countimg = 0;
        for (let i = 0; i < contents.length; i++) {
            if (contents[i].type === 'header'){
                countheader++;
            }
            else if (contents[i].type === 'p') {
                countpara++;
            }
            else if (contents[i].type === 'img') {
                countimg++;
            }
        }
        if (countheader === 0) {
            setMessage("Page must have at least one header.");
            return;
        }
        if (countpara === 0 && countimg === 0) {
            setMessage("Page must have at least one paragraph or image.");
            return;
        }

        const page = {pageid, title, author, creationdate, publicationdate, status, contents };
        props.uppage(page);
        props.setChangemanagement(true);
        if (props.typeofpage === 'mypage'){
            setNav(true);
        }else {
            setNav2(true);
        }
        
    };

    return(
        <>
            <Form onSubmit={handlesubmit}>
                <Row id="backbutton">
                    <LinkContainer to="/allpages/">
                        <Button variant="primary" type="" style={{marginTop:'1em', marginBottom:'1em'}}>
                            Back
                        </Button>
                    </LinkContainer>    
                </Row>

                <Form.Group controlId="formBasicEmail" id="mainform">
                    <Row className="info">
                        <Col md={6}>
                            <Form.Label>Page Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title" value={title} onChange={text => setTitle(text.target.value)} required={true}/>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Author:</Form.Label>
                            <Form.Control type="text" placeholder={props.allpages[props.indexedit].author} disabled={true} />
                            {props.userrole === 'admin' ? 
                                <>
                                <Form.Label>Chage the Author: </Form.Label>
                                <Form.Select aria-label="Default select example" value={author} onChange={a => setAuthor(a.target.value)} required={true}>
                                    {props.users.map((item, index) => (
                                        <option key={index} value={item.username}>{item.username}</option>
                                    ))}
                                </Form.Select>
                                </>
                            :null}
                        </Col>
                        <Col md={6}>
                            <Form.Label>Creation Date:</Form.Label>
                            <Form.Control type="date" defaultValue={creationdate} disabled={true}/>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Publication Date:</Form.Label>
                            <Form.Control type="date" onChange={ndate => setPublicationdate(ndate.target.value)}/>
                        </Col>
                    </Row>
                    
                    {message && <Row> <Alert variant="danger" className="alert2" onClose={() => setMessage('')} dismissible>{message}</Alert></Row>}

                    <Row className="creation">
                        <Form.Label style={{fontSize: '1.1em'}}>Add content (at least One Header and at least One Image or Paragraph) :</Form.Label>
                        <Col className="creationbuttons">
                            <Button type="button" onClick={openheaderform} style={{marginTop:'1em', marginBottom:'1em'}}>
                            Add Header
                            </Button>
                            <Button type="button" onClick={openimageform} style={{marginTop:'1em', marginBottom:'1em'}}>
                                Add Image
                            </Button>
                            <Button type="button" onClick={openparagraphform} style={{marginTop:'1em', marginBottom:'1em'}}>
                                Add Paragraph
                            </Button>

                            <Button type="submit" onClick={handlesubmit} className="createbutton">
                                Update Page
                            </Button>
                        </Col>
                    </Row>
                                   
                    {headerblock ? <blocks.Headerblock setheadertext={setHeaderText} addheader={addheader} setheadersize={setHeaderSize} headertext={headerText}/> : null}
                    {paragraphblock ? <blocks.Paragraphblock setparagraphtext={setParagraphText} addparagraph={addparagraph} paratext={paragraphText}/> : null}
                    {imageblock ? <blocks.Imageblock setimagename={setImagename} images={images} getpics={props.getpics} setImagename={setImagename} addimage={addimage} /> : null}

                    <div className="middle"></div>

                    {reordermessage && <Row> <Alert variant="danger" className="alert2" onClose={() => setReordermessage('')} dismissible>{reordermessage}</Alert></Row>}

                    {contents.map((item, index) => (
                        <div key={index} className="newcompo">
                            {item.type === 'img'? React.createElement('img', {key: index, src: 'http://localhost:5173/src/pictures/' + item.name, alt: item.name, width: '90%', height: '300'}) : null}
                            {item.type === 'header'? React.createElement('h'+item.size, {key:index}, item.text) : null}
                            {item.type === 'p'? React.createElement('p', {key: index}, item.text) : null}
                            <Row className="buts">
                                <Col>
                                    <button type="button" onClick={() => upindex(index)}>Up</button>
                                </Col>
                                <Col>
                                    <button type="button" onClick={() => downindex(index)}>Down</button>
                                </Col>
                                <Col>
                                    <button type="button" onClick={() => deletecontent(index)}>Delete</button>
                                </Col>
                            </Row>
                        </div>
                    ))}

                </Form.Group>
            </Form>
            
            {nav ? <Navigate to="/allpages/" /> : null}
            {nav2 ? <Navigate to="/managepage/" /> : null}

        </>
    )
};

export default Editpage;