import React, { useEffect, useState } from 'react'
import { Row, Container, Col, Card, Navbar, Nav, Form, } from 'react-bootstrap';

const MiApi = () => {

    const [dataApi, setDataApi] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState([]);

    const [select, setSelect] = useState('deMenor');

    const placa = (a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0;

    const underPlaca = (a, b) =>
        a.name < b.name ? 1 : a.name > b.name ? -1 : 0;

    const ordenar = (e) => {
        setSelect(e.target.value)
    }

    useEffect(() => {
        (async () => {
            const url = 'https://rickandmortyapi.com/api/character';
            const response = await fetch(url);
            const data = await response.json()
            if (data.results) {
                setDataApi(data.results)
            }
            console.log(data.results);
        })()
    }, []);


    useEffect(() => {
        setFilteredCharacters(
            dataApi
                .filter((character) =>
                    character.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
        );
    }, [searchTerm, dataApi, select]);

    return (
        <div>
            <Navbar bg='dark' variant='dark' expand='ls'>
                <Container fluid>
                    <Navbar.Brand >Buscar Personaje </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='navabarScroll'>
                        <Nav
                            className='me-auto my-2 my-lg-0'
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className='d-flex'>
                            <Form.Control
                                type='text'
                                placeholder='Buscar personaje'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </Form>
                    </Navbar.Collapse>
                    <Form.Select onChange={ordenar}>
                        <option value="deMenor" >Filtrar de la A / Z</option>
                        <option value="deMayor">Filtrar de la Z / A</option>
                    </Form.Select>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    {filteredCharacters
                        .sort(select === "deMenor" ? placa : underPlaca)
                        .map((character, index) => (
                            <Col key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={character.image} />
                                    <Card.Body>
                                        <Card.Title>{character.name}</Card.Title>
                                        <Card.Text>
                                            <p> Genero: {character.gender} </p>
                                            <p> Especie: {character.species} </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card></Col>
                        ))}
                </Row>
            </Container>

        </div>
    )
}

export default MiApi