import Client from '../../models/ca/clients/clientModel.js';

const createClient = async (data) => {

  const { firstName, lastName, email, phone, panCardNo, aadharNumber, address } = data;

  const clientExists = await Client.findOne({ panCardNo });
  if (clientExists) {
    throw new Error(" User with this Pan Card already exists");
  }

  const newClient = new Client({
    firstName, lastName, email, phone, panCardNo, aadharNumber, address,
  });

  await newClient.save();
}

export default createClient;