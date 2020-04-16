#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборкиdeploy
cd build

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
# напрмер git push -f https://github.com/a1exalexander/cahee.git master:gh-pages

git push -f https://github.com/Nikitaudav/Exam_HTML.git master:gh-pages

cd -