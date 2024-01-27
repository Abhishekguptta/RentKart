import { Router } from 'express'
import User from '../models/user.js';
import auth from '../middleware/auth.js'

const router = new Router();


router.post('/user', async(req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({
        success: true,
        data: user,
        error: null,
      });
  } catch(error) {
    res.status(404).send({
      success: false,
      error: error.message,
    })
  }
})

// sign up
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken()
    res.status(201).send({
      success: true,
      data: {
        user,
        token
      },
      error: null,
    });
} catch(error) {
  res.status(404).send({
    success: false,
    error: error.message,
  })
}
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken()
    res.status(201).send({
      success: true,
      data: {
        user,
        token
      },
      error: null,
    });
} catch(error) {
  res.status(404).send({
    success: false,
    error: error.message,
  })
}
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(201).send({
      success: true,
      data: "Logged out successfully",
      error: null,
    });
  } catch(error) {
    res.status(404).send({
      success: false,
      error: error.message,
    })
}});

router.get("/users/me", auth, async (req, res) => {
  res.send({
    data: req.user,
    success: true,
    error: null,
  });
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    if (!req.user) {
      return res.status(404).send();
    }
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});


export default router;