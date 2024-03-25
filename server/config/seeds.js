const db = require('./connection');
const { User, Item, List } = require('../models');
const cleanDB = require('./shopsyncDB');

db.once('open', async () => {
  await cleanDB('List', 'lists');
  await cleanDB('Item', 'items');
  await cleanDB('User', 'users');

  // Create the user
  const newUser = await User.create({
    userName: 'Pamela12',
    email: 'pamela@testmail.com',
    password: 'password12345',
  });

  console.log('User seeded:', newUser,);

  const itemList1 = await Item.insertMany([
    {
      name: 'Tin of Cookies',
      quantity: 2
    },
    {
      name: 'Milk',
      quantity: 1
    },
  ]);

  const itemList2 = await Item.insertMany([
    {
      name: 'pop',
      quantity: 2
    },
    {
      name: 'eggs',
      quantity: 1
    },
  ]);


  // Use the user's _id to set the createdBy field of the lists
  await List.insertMany([
    { title: 'Shopping List 1', createdBy: newUser._id, items: itemList1 },
    { title: 'Household Supplies', createdBy: newUser._id, items: itemList2},
  ]);

  console.log('Lists seeded with items');

console.log('displaying all lists');
  const list = await List.find();

  console.log(list);
    console.log('seed complete')

  process.exit();
});