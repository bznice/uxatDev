# uxatDev
Draft repository, to test ideas during uXat development.
  Tens uXat?
        Manda aí, falamos por lá!


draft notes:

- html disposition:

  1- index html:
    2- ngInc uxatInit html:
      3- ngInc div letters w/ secret,
        4- hide if secret was actionated;
      3- ngInc uxatAccess html:
        4- hided while secret not actionated;
        4- contains login and create user modes to use app
        4- h1 title;
        4- four ngIncs:
          5- div with input text to insert pin, and button,
            6- hide after validation;
          5- div with two buttons, login and create,
            6- hided while not validated;
          5- div to login, inputs 4 nick and pass, buttons 4 login and back,
            6- hided while not selected login mode;
          5- div to create, inputs 4 nick, pass and repeat pass, buttons 4 create and back,
            6- hided while not selected create mode,
            6- after create, login is performed;
        4- after logged, hide this ngInc and show iframe;
      3- iframe with the rest of app,
        4- hided while not logged;

  1- uxat html (iframe):
    2- reminder:
      3- this will be inside uxatInit.html,
      3- which is inside index.html,
      3- however it doesn't share page space with other components
      3- (they will all be hidden);
    