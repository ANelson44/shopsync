import React, { useState } from 'react';
import { Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

const List = ({ id, name, addItem, items, deleteItem, updateListName }) => {
  const [newItemText, setNewItemText] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleAddItem = async () => {
    const trimmedText = newItemText.trim();
    if (trimmedText !== '') {
      setNewItemText('');
      console.log('trimmedText: ',trimmedText);
      try {
        await addItem(id, trimmedText);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const handleNameEdit = () => {
    updateListName(id, editedName);
    setIsEditingName(false);
  };

  return (
    <div className="my-3 p-3 bg-light text-dark rounded">
      {isEditingName ? (
        <InputGroup className="mb-3">
          <FormControl
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleNameEdit}
            onKeyPress={(e) => e.key === 'Enter' && handleNameEdit()}
            autoFocus
          />
        </InputGroup>
      ) : (
        <div className="d-flex justify-content-between">
          <h5 style={{ cursor: 'pointer' }} onClick={() => setIsEditingName(true)}>{name}</h5>
          <Button variant="outline-secondary" size="sm" onClick={() => setIsEditingName(true)}>Edit Name</Button>
        </div>
      )}

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Add new item..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <Button variant="outline-secondary" onClick={handleAddItem}>Add</Button>
      </InputGroup>
      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            {item}
            <Button variant="danger" size="sm" onClick={() => deleteItem(id, index)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default List;
