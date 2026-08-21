FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG PAYLOAD_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SERVER_URL
ARG PAYLOAD_PUBLIC_DRAFT_SECRET
ARG NEXT_PRIVATE_DRAFT_SECRET
ARG REVALIDATION_KEY
ARG NEXT_PRIVATE_REVALIDATION_KEY
ARG NEXT_PUBLIC_IS_LIVE
ARG PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY

RUN yarn build

FROM base AS runtime

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production --frozen-lockfile
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/media ./media
COPY --from=builder /home/node/app/next.config.js ./next.config.js
COPY --from=builder /home/node/app/csp.js ./csp.js
COPY --from=builder /home/node/app/redirects.js ./redirects.js

EXPOSE 3000

CMD ["node", "dist/server.js"]
