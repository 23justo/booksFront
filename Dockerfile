# Install dependencies in the build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Copy the application files
COPY . .

# Build the Next.js app
RUN yarn build

# Run the app in production
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn", "start"]