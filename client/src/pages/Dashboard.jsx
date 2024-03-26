import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LISTS, ADD_LIST, ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST, UPDATE_LIST_NAME } from '../utils/mutations';
import List from '../components/List';

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_LISTS);

  const [addList] = useMutation(ADD_LIST);
  const [addItemToList] = useMutation(ADD_ITEM_TO_LIST);
  const [deleteItemFromList] = useMutation(DELETE_ITEM_FROM_LIST);
  const [updateListName] = useMutation(UPDATE_LIST_NAME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddNewList = async () => {
    await addList({
      variables: { title: `List ${data.lists.length + 1}` },
      refetchQueries: [{ query: GET_LISTS }],
    });
  };

  const handleAddItem = async (listId, name) => {
    await addItemToList({
      variables: { listId, name },
      refetchQueries: [{ query: GET_LISTS }],
    });
  };

  const handleDeleteItem = async (listId, itemId) => {
    await deleteItemFromList({
      variables: { listId, itemId },
      refetchQueries: [{ query: GET_LISTS }],
    });
  };

  const handleRenameList = async (listId, newName) => {
    await updateListName({
      variables: { listId, newName },
      refetchQueries: [{ query: GET_LISTS }],
    });
  };

  return (
    <Container fluid className="bg-dark text-white vh-100 p-2">
      <Row className="my-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Button onClick={handleAddNewList} variant="outline-light">New List</Button>
        </Col>
      </Row>
      {data && data.lists.map(list => (
        <Row key={list._id} className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <List
              id={list._id}
              name={list.name}
              items={list.items}
              addItem={(itemName) => handleAddItem(list._id, itemName)}
              deleteItem={(itemIndex) => handleDeleteItem(list._id, list.items[itemIndex]._id)}
              updateListName={(newName) => handleRenameList(list._id, newName)}
            />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Dashboard;
