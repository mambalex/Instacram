
## How to get started

#Step 1 Run the backend server

You will need python 3.6 or 3.7 on your own computer - python 3.5 or earlier will not work.

```bash
cd backend
# create a sandbox for the backend
virtualenv -p /usr/bin/python3 env
# enter sandbox
source env/bin/activate
# set up sandbox
pip install -r requirements.txt
# run backend! Will run on port 5000.
# go to http://127.0.0.1:5000/ to see the docs!
python run.py
```

Once you are done, run the following
command to exit the sandbox

```bash
deactivate
```

#Step 2 Run the frontend app

```bash
# install helper scripts
npm install

# start the dev server on first available port.. likely 8080
npm start

```



