docker build -t MexicanTrainScorecard-image .

docker tag MexicanTrainScorecard-image registry.heroku.com/MexicanTrainScorecard/web


docker push registry.heroku.com/MexicanTrainScorecard/web

heroku container:release web -a MexicanTrainScorecard