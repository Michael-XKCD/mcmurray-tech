# Build stage
FROM hugomods/hugo:exts-0.153.2 AS builder

WORKDIR /src

# Install git
RUN apk add --no-cache git

# Copy the entire site
COPY . .

# Clone PaperMod theme at the exact commit used in submodule
RUN rm -rf themes/PaperMod && \
    git clone https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod && \
    cd themes/PaperMod && \
    git checkout 7d061d56d4664bd9c8241eb904994c98b928f0c8

# Build the site
RUN hugo --minify --environment production

# Verify build output
RUN ls -la /src/public/ && echo "\n=== CSS Files ===" && find /src/public -name "*.css" -type f

# Production stage
FROM nginx:alpine

# Copy built site from builder
COPY --from=builder /src/public /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
