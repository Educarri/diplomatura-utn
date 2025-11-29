import dotenv from 'dotenv';
dotenv.config();

// Build a safe MongoDB URI taking into account that dotenv does not expand
// variables inside other variables (i.e. DB_URI=${MONGODB_URI}/... will be
// literal). Prefer an explicit DB_URI only if it looks like a valid mongodb URI.
const rawDbUri = process.env.DB_URI;
const mongoEnv = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let mongodbUri = undefined;
if (rawDbUri && typeof rawDbUri === 'string' && rawDbUri.startsWith('mongodb')) {
  mongodbUri = rawDbUri;
} else if (mongoEnv && dbName) {
  // Handle common mongoEnv shapes, e.g.:
  // 1) mongodb+srv://.../??appName=...  -> replace '/?' with '/DB_NAME?'
  // 2) mongodb+srv://.../?appName=...   -> replace '/?' with '/DB_NAME?'
  // 3) mongodb://...                     -> append '/DB_NAME'
  if (mongoEnv.includes('/?')) {
    mongodbUri = mongoEnv.replace('/?', `/${dbName}?`);
  } else if (mongoEnv.includes('?')) {
    // Has params but no slash before params
    const parts = mongoEnv.split('?');
    mongodbUri = `${parts[0]}/${dbName}?${parts.slice(1).join('?')}`;
  } else if (mongoEnv.endsWith('/')) {
    mongodbUri = `${mongoEnv}${dbName}`;
  } else {
    mongodbUri = `${mongoEnv}/${dbName}`;
  }
} else if (mongoEnv) {
  // No DB name provided, fall back to whatever MONGODB_URI is (may default
  // to the 'test' DB on the server side).
  mongodbUri = mongoEnv;
} else if (rawDbUri) {
  // rawDbUri exists but didn't start with 'mongodb' (e.g. contains '${...}'),
  // try to avoid using it because it's invalid; set undefined so connection
  // will fail with a clearer message.
  mongodbUri = undefined;
}

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};