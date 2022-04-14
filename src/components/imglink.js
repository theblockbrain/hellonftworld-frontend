export const imglink = (link) => {
  if (link.startsWith("ipfs://")) {
    return `https://cf-ipfs.com/ipfs/${link.substring(7)}`
  } else return link
}