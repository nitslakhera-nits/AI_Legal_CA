import Client from '../models/clientModel.js';

const createClient = async (data) => {

  const { userId, firstName, lastName, email, phone, panCardNo, aadharNumber, address } = data;

  const clientExists = await Client.findOne({ panCardNo });
  if (clientExists) {
    throw new Error(" User with this Pan Card already exists");
  }

  const newClient = new Client({
    userId, firstName, lastName, email, phone, panCardNo, aadharNumber, address,
  });

  await newClient.save();
  return newClient;
}

export default createClient;