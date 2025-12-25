# Build stage
FROM hugomods/hugo:exts-0.149.1 AS builder

WORKDIR /src

# Install git for submodule support
RUN apk add --no-cache git

# Copy the entire site
COPY . .

# Initialize and update git submodules (PaperMod theme)
RUN git submodule update --init --recursive

# Build the site
RUN hugo --minify --environment production

# Production stage
FROM nginx:alpine

# Copy built site from builder
COPY --from=builder /src/public /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
