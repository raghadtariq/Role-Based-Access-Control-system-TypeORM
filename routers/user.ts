import express from 'express';
import { validateUser } from '../middleware/validation/user.js';
import { authorize } from '../middleware/auth/authorize.js';
import insertPermission  from '../controllers/permission.js'
import {insertUser,getUsers,login} from '../controllers/user.js'
import {insertRole,insertRolewithUser} from '../controllers/role.js'
import { authenticate } from '../middleware/auth/authenticate.js';

const router = express.Router();

router.post('/', authorize('POST_users'), validateUser, (req, res, next) => {
    insertUser(req.body).then(() => {
      res.status(201).send()
    })
  });

  router.post('/role', authorize('POST_users/role'), authenticate, (req, res, next) => {
    insertRole(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });
  
  router.post('/rolePermission', authorize('POST_users/role'), authenticate, (req, res, next) => {
    insertRolewithUser(req.body)
  });
  
  router.post('/permission', authenticate, (req, res, next) => {
    insertPermission(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/user', authorize('GET_users/role'), authenticate, async (req, res, next) => {
    try {
      const users = await getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  });

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

  export default router;