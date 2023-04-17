const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('/db');

//APIを作成
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello Express');
});

//User情報を全て取得する
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.row);
  });
});

//特定のUserを取得する
app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.row);
  });
});

//userを追加する
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  //userが既に存在しているかどうか確認
  pool.query(
    'SELECT s FROM users s WHERE s.email = $1',
    [email],
    (error, results) => {
      if (results.rows.length) {
        res.send('既にユーザーが存在しています');
      }
      pool.query(
        'INSERT INTO users(name, email, age) values($1,$2,$3)',
        [name, email, age],
        (error, results) => {
          if (error) throw error;
          res.status(201).send('ユーザー作成に成功しました');
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log('server is running on PORT' + PORT);
});
