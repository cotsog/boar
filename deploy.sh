#!/usr/bin/env bash
echo "Starting to deploy"

if [[ $TRAVIS_PULL_REQUEST == "false" && $TRAVIS_BRANCH == "master" ]] ; then
  gulp build --production
  cd ./dist
  git init
  git config user.email "soos.gabor86@gmail.com"
  git config user.name "blacksonic"
  git add -A .
  git commit -m "Deploy from build #${TRAVIS_BUILD_NUMBER} commit ${TRAVIS_COMMIT}"
  git remote add heroku git@heroku.com:boar-online.git

  gem install heroku
  echo "Host heroku.com" >> ~/.ssh/config
  echo "   StrictHostKeyChecking no" >> ~/.ssh/config
  echo "   CheckHostIP no" >> ~/.ssh/config
  echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

  heroku keys:clear
  yes | heroku keys:add
  yes | git push -f heroku master
else
  echo "Not possible to deploy"
fi

echo "done."