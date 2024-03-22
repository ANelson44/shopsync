import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import List from '../components/List';

const Dashboard = () => {
  const [lists, setLists] = useState([]);

  const addNewList = () => {
    const newList = {
      id: lists.length,
      name: `List ${lists.length + 1}`,
      items: []
    };
    setLists([...lists, newList]);
  };

  const handleAddItemToList = (listId, itemName) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, items: [...list.items, itemName] } : list
    );
    setLists(updatedLists);
  };

  const handleDeleteItemFromList = (listId, itemIndex) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, items: list.items.filter((_, index) => index !== itemIndex) } : list
    );
    setLists(updatedLists);
  };

  const handleUpdateListName = (listId, newName) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, name: newName } : list
    );
    setLists(updatedLists);
  };

  return (
    <Container fluid className="bg-dark text-white vh-100 p-2">
      <Row className="my-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Button onClick={addNewList} variant="outline-light">New List</Button>
        </Col>
      </Row>
      {lists.map(list => (
        <Row key={list.id} className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
          <List
          id={list.id}
          name={list.name}
          items={list.items}
          addItem={handleAddItemToList}
          deleteItem={handleDeleteItemFromList}
          updateListName={handleUpdateListName}
          />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Dashboard;
