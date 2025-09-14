
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Tenant = require('./models/tenant.model');
const User = require('./models/user.model');
const dotenv = require('dotenv');
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URL);

  await Tenant.deleteMany({});
  await User.deleteMany({});

  const acme = await Tenant.create({ name: 'acme', slug: 'acme', plan: 'free' });
  const globex = await Tenant.create({ name: 'globex', slug: 'globex', plan: 'free' });

  const passwordHash = await bcrypt.hash('password', 10);

  await User.create([{ email: 'admin@acme.test', username: 'admin@acme.test', password: passwordHash, role: 'admin', tenant: acme._id },
                     { email: 'user@acme.test', username: 'user@acme.test', password: passwordHash, role: 'member', tenant: acme._id },
                     { email: 'admin@globex.test', username: 'admin@globex.test', password: passwordHash, role: 'admin', tenant: globex._id },
                     { email: 'user@globex.test', username: 'user@globex.test', password: passwordHash, role: 'member', tenant: globex._id }]);

  console.log('Seed complete');
  process.exit(0);
}
seed();
