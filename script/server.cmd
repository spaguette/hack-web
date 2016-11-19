echo 'Installing yarn locally'
npm i yarn@0.17.6 -q
echo 'Installing project npm dependencies'
npm run yarn
echo 'Starting dev-web-server'
npm start