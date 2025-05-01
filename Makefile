all:
	make build_init
	make build_frontend
	make build_backend

install_dependencies:
	@echo "🔧 Installing system dependencies..."
	sudo apt update && sudo apt install -y \
		make git curl brotli gzip \
		libjpeg-dev libtiff-dev libpng-dev libwebp-dev libraw-dev libheif-dev libgif-dev libvips-dev \
		ffmpeg
	@echo "📦 Installing Node and Go dependencies..."
	pnpm install

build_init:
	go get ./...
	go generate -x ./server/...

build_frontend:
	make build_frontend_old
	cd public && make compress

build_frontend_old:
	NODE_ENV=production pnpm run build
	mkdir -p ./server/ctrl/static/www/canary/
	cp -R ./public/assets ./server/ctrl/static/www/canary/
	cp -R ./public/*.html ./server/ctrl/static/www/canary/

build_backend:
	CGO_ENABLED=1 go build --tags "fts5" -ldflags "-linkmode=external -extldflags=-lsharpyuv" -o dist/organiStash cmd/main.go

build_backend_arm64:
	CGO_ENABLED=1 GOOS=linux GOARCH=arm GOARM=7 CC=arm-linux-gnueabihf-gcc go build -o dist/organiStash cmd/main.go

build_backend_amd64:
	GOOS=linux CGO_ENABLED=1 GOARCH=amd64 CC=gcc go build -o dist/organiStash cmd/main.go

clean_frontend:
	rm -rf server/ctrl/static/www/
