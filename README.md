## Getting Started
## Frontend
npm install

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Backend
create the .env file 

## without docker

pip install -r requirements.txt

python manage.py migrate 

python manage.py runserver

## with docker

docker-compose build

docker-compose up 

## access the django docker container 

docker exec -it <container_name_or_id> /bin/bash

python manage.py migrate



