FROM node:20

ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app
COPY . .

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]