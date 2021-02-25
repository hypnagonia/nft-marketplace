const headers = {
    pinata_api_key: '42efd7336f09d6f1b1ac',
    pinata_secret_api_key: '35722554991b4ede00d3e3d1dda327383e1023fce5aad5409f5c998f770bb223',
    'Content-Type': 'application/json'
}

const baseUrl = 'https://api.pinata.cloud'

const testAuthentication = () => {
  const url = `${baseUrl}/data/testAuthentication`;
  return fetch(url, {
    headers
  })
};

const JSONBody = {
  pinataMetadata: {
    name: "ItemStatus",
    keyvalues: {
      ItemID: "Item001",
      CheckpointID: "Checkpoint002",
      Source: "CompanyA",
      WeightInKilos: 5.25
    }
  },
  pinataContent: {
    itemName: "exampleItemName",
    inspectedBy: "Inspector001",
    dataValues: [
      {
        prop: "value"
      }
    ]
  }
};

const pinJSONToIPFS = () => {
  const url = `${baseUrl}/pinning/pinJSONToIPFS`;
  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(JSONBody)
  })
};

// pinJSONToIPFS()

