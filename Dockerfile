FROM registry.cn-shenzhen.aliyuncs.com/jsp-public/node:lts-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM registry.cn-shenzhen.aliyuncs.com/jsp-public/node:lts-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM registry.cn-shenzhen.aliyuncs.com/jsp-public/node:lts-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM registry.cn-shenzhen.aliyuncs.com/jsp-public/node:lts-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]