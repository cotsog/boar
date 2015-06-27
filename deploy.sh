echo "Starting to deploy"

if [[ $TRAVIS_PULL_REQUEST == "false" && $TRAVIS_BRANCH == "master" ]]
  gulp build --production
  cd ./dist
  git init
  git add -A .
  git commit -m "Deploy from build #${TRAVIS_BUILD_NUMBER} commit ${TRAVIS_COMMIT}"
else
  echo "Not possible to deploy"
fi

echo "done."