FROM node:8.11.3-alpine

RUN mkdir -p /api

WORKDIR /api

ADD . /api

# In case in compile (prod) time needs theis env var, good to have as example
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn run build && \
    yarn cache clean

CMD [ "yarn", "run", "prod" ]