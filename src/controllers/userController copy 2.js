const pool = require('../config/db');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const supabase = require('@supabase/supabase-js');

const supabaseUrl = 'https://project_ref.supabase.co';
const supabaseAnonKey = 'anonKey';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

const getSessionToken = async () => {
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  if (error) throw error;
  return session.access_token;
};

const createS3Client = async () => {
  const sessionToken = await getSessionToken();

  return new S3Client({
    forcePathStyle: true,
    region: 'project_region',
    endpoint: 'https://project_ref.supabase.co/storage/v1/s3',
    credentials: {
      accessKeyId: 'project_ref',
      secretAccessKey: 'anonKey',
      sessionToken: sessionToken,
    },
  });
};

const createUserTable = () => {
  const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            phone_number VARCHAR(20),
            city VARCHAR(255),
            state VARCHAR(255),
            role VARCHAR(50),
            status BOOLEAN DEFAULT TRUE,
            picture VARCHAR(255)
          );
    `;

  pool
    .query(query)
    // .then(() => console.log('Users table created successfully'))
    // .catch(err => console.error('Error creating users table', err));
};

const createUser = async (req, res) => {
  const { email, password, first_name, last_name, phone_number, city, state, role, status, picture } = req.body;
  const createdDate = new Date().toISOString(); // Automatically set the current date/time

  try {
    const result = await pool.query(
      `INSERT INTO users (email, password, created_date, first_name, last_name, phone_number, city, state, role, status, picture)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [email, password, createdDate, first_name, last_name, phone_number, city, state, role, status, picture]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { email, password, first_name, last_name, phone_number, city, state, role, status, picture } = req.body;

//   try {
//     const result = await pool.query(
//       `UPDATE users
//       SET email = $1, password = $2, first_name = $3, last_name = $4, phone_number = $5, city = $6, state = $7, role = $8, status = $9, picture = $10
//       WHERE id = $11 RETURNING *`,
//       [email, password, first_name, last_name, phone_number, city, state, role, status, picture, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Check if the user exists
    const checkUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (checkUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare the update query
    const updateColumns = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`);
    const updateValues = Object.values(updates);
    updateValues.push(id);

    // Construct the SQL query
    const query = `
      UPDATE users
      SET ${updateColumns.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING *
    `;

    // Execute the update query
    const result = await pool.query(query, updateValues);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadPicture = async (req, res) => {
  const { pictureBuffer, pictureName } = req.body;

  try {
    const s3Client = await createS3Client();
    const putObjectCommand = new PutObjectCommand({
      Bucket: 'your-bucket-name',
      Key: pictureName,
      Body: pictureBuffer,
      ContentType: 'image/jpeg',
    });

    await s3Client.send(putObjectCommand);
    res.status(200).json({ message: 'Picture uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePicture = async (req, res) => {
  const { pictureName } = req.body;

  try {
    const s3Client = await createS3Client();
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: 'your-bucket-name',
      Key: pictureName,
    });

    await s3Client.send(deleteObjectCommand);
    res.status(200).json({ message: 'Picture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserTable,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadPicture,
  deletePicture,
};
