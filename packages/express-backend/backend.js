import express from 'express'
import cors from 'cors'
import userServices from './user-services.js'
import inventoryServices from './inventory-services.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config()
const app = express()
const port = 8000

const corsOptions = {
 origin: [
  'http://localhost:5173',
  'https://ambitious-wave-0b9c2fc1e.5.azurestaticapps.net',
 ], // Allowed origins
 methods: ['GET', 'POST', 'PUT', 'DELETE'],
 credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())

app.post('/login', async (req, res) => {
 try {
  const { email, password } = req.body
  console.log(req.body)
  // Debug statements
  console.log('Received email: ', email)
  console.log('Received Password: ', password)

  const user = await userServices.findUserByEmail(email)
  if (!user) {
   return res.status(404).json({ message: 'User not Found' })
  }
  const isFound = await bcrypt.compare(password, user.password)
  if (!isFound) {
   return res.status(401).json({ message: 'Invalid Credentials' })
  }
  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
   expiresIn: '15m',
  })
  res
   .status(200)
   .json({ message: 'Login Successful. Redirecting...', user, token })
 } catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Error' })
 }
})

app.post('/signup', async (req, res) => {
 try {
  const { email, password } = req.body

  console.log('Sign up email:', email)
  const existingUser = await userServices.findUserByEmail(email)
  if (existingUser) {
   return res.status(409).json({ message: 'User already exists' })
  }
  const createdUser = await userServices.addUser({ email, password })
  res.status(201).json(createdUser)
 } catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Error during registration' })
 }
})

app.get('/auth-user', (req, res) => {
 console.log('Received request to /auth-user')
 const authHeader = req.headers['authorization']
 console.log('Authorization header:', authHeader)
 const token = authHeader && authHeader.split(' ')[1]
 if (!token) {
  return res.status(401).json({ message: 'Token Missing or invalid' })
 }
 jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
  if (err) {
   console.log('JWT verification error:', err)
   return res.status(403).json({ message: 'Unauthorized' })
  }
  console.log('User authenticated:', user)
  res.status(200).json({ message: 'Authenticated', user })
 })
})

app.post('/login', async (req, res) => {
 try {
  const { email, password } = req.body
  console.log(req.body)
  // Debug statements
  console.log('Received email: ', email)
  console.log('Received Password: ', password)

  const user = await userServices.findUserByEmail(email)
  if (!user) {
   return res.status(404).json({ message: 'User not in the database' })
  }
  const isFound = await bcrypt.compare(password, user.password)
  if (!isFound) {
   return res.status(401).json({ message: 'Invalid credentials' })
  }
  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
   expiresIn: '15m',
  })
  res
   .status(200)
   .json({ message: 'Login Successful. Redirecting...', user, token })
 } catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Error' })
 }
})

app.get('/login/:email_id', async (req, res) => {
  const emailID = req.params['email_id'];
  const result = await userServices.findUserById(emailID);
  if (result === undefined || result === null)
  {
    res.status(404).send('Resource not found.');
  }
  else
  {
    res.send(result);
  }
})

app.post('/login/:email_id', async (req, res) => {
  const emailID = req.params['email_id']
  const { Item: itemID } = req.body
  try {
    const response = await userServices.addItem(emailID, itemID)
    res.status(200).send("Item added to user")
    // TODO: Also set item as "claimed"
  } catch {
    res.status(404).send('User not found.')
  }
})

app.get('/items/ownedby/:email_id', async (req, res) => {
  const emailID = req.params['email_id']
  try{
    const user = await userServices.findUserById(emailID)
    const itemList = user.myitems
    const sentList = []
    for (let i = 0; i < user.myitems.length; i++)
    {
      const item = await inventoryServices.findItemByID(itemList[i])
      if (item != null)
      {
        sentList.push(item)
      }

    }
    res.status(200).send(sentList)
  } catch {
    res.status(404).send("User not found")
  }
})

app.get('/login', async (req, res) => {
 try {
  const users = await userServices.getUsers()
  res.json(users)
 } catch (error) {
  res.status(500).send('error', error)
 }
})

app.get('/items', async (req, res) => {
 try {
  const items = await inventoryServices.getItems()
  res.json(items)
 } catch (error) {
  res.status(500).send('error')
 }
})

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/uploads', express.static('uploads'))
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, './uploads/')
 },
 filename: (req, file, cb) => {
  cb(null, Date.now() + '-' + file.originalname)
 },
})

const upload = multer({ storage, limits: { fileSize: 50 * 1600 * 1600 } })

app.post('/create-item', upload.single('image'), async (req, res) => {
 try {
  console.log('Request body:', req.body)
  console.log('Uploaded file:', req.file)
  const { Item, Category, Location, Date, Status } = req.body

  const imageUrl = req.file
   ? `https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/uploads/${req.file.filename}`
   : null

  console.log('Creating item:', {
   Item,
   Category,
   Location,
   Date,
   Status,
   imageUrl,
  })

  const itemData = {
   Item,
   Category,
   Location,
   Date,
   Status,
   image: imageUrl,
  }

  const createdItem = await inventoryServices.addItem(itemData)

  if (!createdItem) {
   return res.status(400).json({ message: 'Failed to create the item.' })
  }

  console.log('Item Created Successfully')
  res.status(201).json(createdItem)
 } catch (error) {
  console.error('Error creating item:', error)
  res.status(500).json({ message: 'Internal Server Error' })
 }
})

app.delete('/items/:id', async (req, res) => {
 try {
  const { id } = req.params

  console.log('Request to delete item by ID:', id)

  const itemToDelete = await inventoryServices.findItemByID(id)

  if (!itemToDelete) {
   return res.status(404).json({ message: 'Item not found.' })
  }
  
  const deletedItem = await inventoryServices.deleteItemByID(id)

  if (deletedItem) {
   console.log('Item deleted successfully:', id)
   return res.status(200).json({ message: 'Item deleted successfully.' })
  } else {
   return res.status(500).json({ message: 'Failed to delete the item.' })
  }
 } catch (error) {
  console.error('Error deleting item by ID:', error)
  return res.status(500).json({ message: 'Internal Server Error.' })
 }
})

// eslint-disable-next-line no-unused-vars
function authorizeUser(req, res, next) {
 const authHeader = req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1]
 if (!token) {
  res.status(401).end()
 } else {
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
   if (decoded) {
    next()
   } else {
    res.status(401).end()
   }
  })
 }
}

app.get('/items/:id', async (req, res) => {
 const id = req.params['id']
 console.log('Id is ', id)
 const result = await inventoryServices.findItemByID(id)
 console.log('Result is', result)
 if (result === undefined || result === null) {
  res.status(404).send('Resource not found.')
 } else {
  res.send(result)
 }
})

app.get('/', (req, res) => {
 res.send('Running')
})

app.listen(process.env.PORT || port, () => {
 console.log(`REST API is listening. http://localhost:${port}`)
})
