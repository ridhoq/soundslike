from flask import Flask 
from flask import Flask, current_app

app = Flask(__name__)
with app.app_context():
	print (current_app.name)

@app.route('/')
def helloworld(): 
	return '<h>Hello World</h>'

@app.route('/user/<name>')
def user(name):
	return '<h>Hello, {0}!</h>'.format(name)

if __name__ == '__main__': 
	app.run(debug = True)