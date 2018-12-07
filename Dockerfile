FROM austinpray/python-node:3.4-8.12.0

WORKDIR /soundslike

COPY ./ /soundslike

RUN pip install -r requirements.txt
RUN npm install
RUN npm run build

CMD ['python', 'manage.py', 'gunicorn']