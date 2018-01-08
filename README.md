# soundslike
Enable users to discover music by traversing a music relationship graph that is built by other users. Target audience are users who are looking to actively curate music by building the graph or consuming the graph.

## Setup
You'll need python 3, pip, postgresql, and [virtualenvwrapper](http://virtualenvwrapper.readthedocs.io/en/latest/index.html)

1. Create a database user and a test database (named something like `soundslike-test`)
2. Run `mkvirtualenv soundslike` to create a new virtualenv
3. Add the following line to `$WORKON_HOME/soundslike/bin/preactivate`

```shell
export TEST_DATABASE_URL=postgresql://username:pass@localhost:5432/soundslike-test
```

and the following line to `$WORKON_HOME/soundslike/bin/postactivate`

```shell
unset TEST_DATABASE_URL
```

4. `pip install -r requirements.txt` to install dependencies in your new virtualenv
5. Optional: Install [autoenv](https://github.com/kennethreitz/autoenv) on your box to get localized env variables and stuff



