# jsgalume


Cópia descarada e mal feita em Javascript do [Pygalume](https://github.com/indacode/pygalume), feito só para aprendizado e diversão. :]


## Como usar?

Pra instalar todas as dependências:

`npm install`


Para baixar a letra da música `Last Kiss` do `Pearl Jam`:

`node index.js -a "Pearl Jam" -m "Last Kiss"`

Para listar a discografia do `Pearl Jam`:

`node index.js -a "Pearl Jam" -d`

Mais informações:

`node index.js --help`


# Desenvolvedor

Para rodar usando Docker, primeiro crie uma imagem do Dockerfile:

`docker build -t node-app .`

Agora execute:

`docker run -it -v $(pwd):/app node-app node /app/index.js -a "Pearl Jam" -m "Last Kiss"`

