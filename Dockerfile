FROM node:lts as build-web

RUN mkdir -p /src/build
WORKDIR /src/build

COPY client/package*.json ./
RUN npm config set loglevel warn
RUN npm install --silent

COPY client/ .
RUN npm run build:prod

# ------------------------------------------ #

FROM python:3-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY api/requirements.txt .
RUN pip install -r requirements.txt

COPY api/ .
COPY --from=build-web /src/build/dist/play/ ./static/

EXPOSE 5000

ENTRYPOINT ["python", "run.py"]