// todo move settings to config
export const ipfsClient = require("ipfs-http-client")({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

export const get = hash => {
  // todo
  return ''
}

export const add = async data => {
  const res = await ipfsClient.add(data);
  return res
}

export const ipfsGateway = 'https://ipfs.io/ipfs/'
