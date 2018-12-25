# soundslike
Enable users to discover music by traversing a music relationship graph that is built by other users. Target audience are users who are looking to actively curate music by building the graph or consuming the graph.

## Setup
You'll need `docker` and `docker-compose`
1. Run `docker-compose up` from the root directory. After it completes, you should be able to hit http://localhost:8888 to see the web app

## Testing
After running the above steps, in a separate shell instance, run `docker-compose exec app make test` to run the python tests