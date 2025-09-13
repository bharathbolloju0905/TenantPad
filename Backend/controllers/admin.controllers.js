const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const Tenant = require('../models/tenant.model');

module.exports.inviteUser = async (req, res) => {
  try {
    const role = req.user.role;
    const { email } = req.body;
    const password = "password";

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden - Admins only' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username: email,
      email,
      password: hashedPassword,
      tenant: req.user.tenant,
      role: 'member'
    });

    return res.status(201).json({
      message: 'User invited successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports.upgradeTenant = async (req, res) => {
  try {
    const role = req.user.role;
    const { slug } = req.params;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden - Admins only' });
    }

    const tenantId = req.user.tenant;
    const foundTenant = await Tenant.findById(tenantId);
    if (!foundTenant || foundTenant.slug !== slug) {
      return res.status(404).json({ message: 'Tenant not found or not authorized' });
    }

    foundTenant.plan = 'pro';
    await foundTenant.save();

    return res.status(200).json({
      message: 'Tenant upgraded to pro successfully',
      tenant: foundTenant
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
