# Build stage
FROM hugomods/hugo:exts-0.149.1 AS builder

WORKDIR /src

# Install git
RUN apk add --no-cache git

# Copy the entire site
COPY . .

# Clone PaperMod theme at the exact commit used in submodule
RUN rm -rf themes/PaperMod && \
    git clone https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod && \
    cd themes/PaperMod && \
    git checkout 6e10faefc871d8ff3c96136f6b287ac7984bf40d

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
