app.post('/recover', function(req, res) {
  var input_token = req.body.token;

  models.User.find({
    where: { id: req.body.user }
  }).success(function(user) {
    var user_token = user.recovery_token;

    if (user_token === null) {
      res.status(404).send('Unknown token');
      return;
    }

    for (var i = 0; i < input_token.length; i++) {
      if (input_token[i] != user_token[i]) {
        res.status(404).send('Unknown token');
        return;
      }
    }

    user.recovery_token = null;
    user.password = req.params.new_password;
    user.save().success(function() {
      res.redirect('/recovery-successful');
    });
  });
});
