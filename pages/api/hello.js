/* 
Any file inside the folder pages/api is mapped to /api/* 
and will be treated as an API endpoint (An API endpoint is the end of 
an API connection, where an API call is received.) 
*/

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
