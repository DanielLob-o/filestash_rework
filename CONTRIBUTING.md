### License for contributions

As the copyright owner, you agree to license your contributions under an irrevocable MIT license.


### Building from source

*Prerequisites*: Git, Make, Node, Go, Glib 2.0

```
# Download the source
git clone https://github.com/DanielLob-o/filestash_rework
cd filestash_rework

# Install dependencies
pnpm install --legacy-peer-deps # frontend dependencies
make build_init # install the required static libraries
mkdir -p ./dist/data/state/
cp -R config ./dist/data/state/

# Create the build
make build_frontend
make build_backend

# Run the program
./dist/organiStash
```
