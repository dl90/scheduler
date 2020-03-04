## user
- get user: `app.get('/api/v1/user/:id', (req, res) => {})`
- create new user: `app.post('/api/v1/user/', (req, res) => {})`
- delete user: `app.delete('/api/v1/user/', (req, res) => {})`

## meetings
- get all user's meetings: `app.get('/api/v1/users/:username/meetings', (req, res) => {})`
- get user's specific meetings: `app.get('/api/v1/users/:username/meetings/:meeting_name', (req, res) => {})`
- Create new meeting: `app.post('/api/v1/users/:username/meetings', (req, res) => {})`
- modify specific meeting: `app.put('/api/v1/users/:username/meetings/:meeting_name', (req, res) => {})`
- delete specific meeting: `app.delete('/api/v1/users/:username/meetings/:meeting_name', (req, res) => {})`

## contacts
- get all user's contacts: `app.get('/api/v1/user/:id/contact', (req, res) => {})`
- create new contacts: `app.post('/api/v1/user/:id/contact', (req, res) => {})`
- find specific contact: `app.post('/api/v1/user/:id/contact?name=test', (req, res) => {})`
- modify specific contact: `app.put('/api/v1/user/:id/contact/id', (req, res) => {})`
- delete specific contact: `app.delete('/api/v1/user/:id/contact/id', (req, res) => {})`