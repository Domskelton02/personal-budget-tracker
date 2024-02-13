import sha256 from 'crypto-js/sha256';


export const registerUser = async (userData) => {
  const userDataCopy = { ...userData };

  userDataCopy.password = sha256(userData.password).toString();

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDataCopy),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to register: ${errorData}`);
  }

  return response.json();
};

