import Client from '../../models/client/clientModel.js';

const createClient = async (data) => {

  const { userId, firstName, lastName, email, phone, panCardNo, aadharNumber, address } = data;

  // same user duplicate check
  const clientExists = await Client.findOne({ panCardNo, userId });

  if (clientExists) {

    new Error("Client already exists");
    
  }

  const newClient = new Client({
    userId,
    firstName,
    lastName,
    email,
    phone,
    panCardNo,
    aadharNumber,
    address,
  });

  await newClient.save();

  return newClient;
}

export default createClient;