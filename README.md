# Descrição
O propósito da aplicação Gamification é oferecer um sistema às empresas pelo qual ela poderá oferecer bonificação aos seus funcionários pelo desempenho profissional. O administrador/RH atribui créditos aos funcionários de acordo com a sua performance e estes por sua vez poderão realizar resgates de produtos conforme o saldo de créditos que possui.

# Tecnologias
•	<b>Nestjs:</b> Utilizado como framework backend, trabalhando por debaixo dos panos com Nodejs e Express;<br>

•	<b>Postgresql:</b> Banco de dados relacional utilizado para armazenar informações do projeto;<br>

•	<b>TypeORM:</b> ORM utilizado para comunicação com banco de dados;<br>

•	<b>Swagger:</b> Utilizado para documentação de rotas e seus métodos atrelados juntamente com os respectivos payloads;<br>

•	<b>Class-Validator:</b> Usado para validações de payloads da aplicação;<br>

•	<b>Jest:</b> Biblioteca de teste para realizar os teste unitários e validação de serviços e rotas;<br>

•	<b>Supertest:</b> Biblioteca que fornece abstração de alto nível que falicita a realizações dos testes das requisições HTTP;<br>

•	<b>Multer:</b> biblioteca Node.js middleware para lidar com dados do tipo multipart/form-data, simplificando o processo de upload de arquivos.<br>

# Instalar projeto
Para iniciar é necessário clonar o repositório para sua máquina com o comando:<br>
`git clone https://github.com/arnia-linkcom-gamification/Frontend-Culture-Code.git`<br>

Após isso é necessário acessar a pasta criada atráves do comando:<br>
`cd ./Frontend-Culture-Code`<br>

Agora é necessário instalar as dependencias do projeto para que ele possa rodar em sua máquina com o comando:<br>
`npm instal`

# Inicializar projeto
###### Rodar no modo de desenvolvimento:
`npm run start:dev`

###### Modo de produção
`npm run build`<br>
`npm run start:prod`

# Documentação
Para acessar a documentação do projeto [clique aqui](https://backend-culture-code-production.up.railway.app/docs) 

# Diagrama de entidades e relacionamento
Para visualizar o diagrama da aplicação [clique aqui](https://github.com/arnia-linkcom-gamification/Backend-Culture-Code/assets/116851717/6b4bd259-786a-4705-858a-f065bbcf8fb1)	

# Testes
Para rodar os testes:<br>
`npm test`
