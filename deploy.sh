echo "Starting to deploy"
echo $NODE_ENV
if [[ $TRAVIS_PULL_REQUEST == "false" && $TRAVIS_BRANCH == "master" ]]
  then
    echo "On master, no pull request"
else
  then
    echo "Not possible to deploy"
fi
echo "done."