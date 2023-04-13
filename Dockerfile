FROM node:18.15.0-alpine

ADD .output /webapp/.output

EXPOSE 3000

WORKDIR /webapp/.output

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", "/webapp/.output/server/index.mjs"]